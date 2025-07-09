const database = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretkey = "chavemuitosecreta";

exports.register = async (req, res) => {
    const { username, password } = req.body;
    
    // Validação básica
    if (!username || !password) {
      return res.status(400).json({ message: "Nome de usuário e senha são obrigatórios" });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      database.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Erro no registro:", err);
            
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(400).json({ message: "Nome de usuário já existe" });
            }
            
            return res.status(500).json({ 
              message: "Erro ao registrar usuário",
              error: err.message 
            });
          }
          
          res.status(201).json({ 
            message: "Usuário registrado com sucesso!",
            userId: result.insertId 
          });
        }
      );
    } catch (err) {
      console.error("Erro no hash da senha:", err);
      res.status(500).json({ 
        message: "Erro ao processar registro",
        error: err.message 
      });
    }
  };

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username e password são obrigatórios" });
  }

  try {
    database.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, results) => {
        if (err) return res.status(500).json({ error: "Erro no servidor" });

        if (results.length === 0) {
          return res.status(401).json({ message: "Usuário não encontrado" });
        }

        const user = results[0];

        try {
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return res.status(401).json({ message: "Senha incorreta" });
          }

          const token = jwt.sign({ userId: user.id }, secretkey, {
            expiresIn: "10h",
          });
          return res.status(200).json({ token, userId: user.id });
        } catch (bcryptErr) {
          console.error(bcryptErr);
          return res.status(500).json({ error: "Erro ao verificar senha" });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao processar login" });
  }
};
