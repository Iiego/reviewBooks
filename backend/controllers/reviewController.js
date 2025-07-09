const database = require("../database");

exports.review = (req, res) => {
  try {
    const { score, idBook, comment } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }

    if (!idBook || isNaN(score) || score < 1 || score > 5) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    if (comment && comment.length > 1000) {
      return res
        .status(400)
        .json({ message: "O comentário não pode exceder 1000 caracteres" });
    }

    database.query(
      `INSERT INTO review (book_id, user_id, score, comment) 
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
         score = VALUES(score),
         comment = VALUES(comment)`,
      [idBook, userId, score, comment || null],
      (err, results) => {
        if (err) {
          console.error("Erro no banco:", err);
          return res.status(500).json({
            message: "Erro ao salvar avaliação",
            error: err.sqlMessage,
          });
        }

        const message =
          results.affectedRows === 2
            ? "Avaliação e comentário atualizados com sucesso!"
            : "Avaliação e comentário registrados com sucesso!";

        res.status(201).json({
          message,
          reviewId: results.insertId || 0,
        });
      }
    );
  } catch (err) {
    console.error("Erro geral:", err);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

exports.getAllBookReviews = (req, res) => {
  try{
    const userId = req.userId;
    const { idBook } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        message: "Token inválido ou expirado",
      });
    }

    database.query(
      "SELECT id, score,comment FROM review WHERE book_id = ?",
      [idBook],
      (err, results) => {
        if (err) {
          console.error("Erro no banco de dados:", err);
          return res.status(500).json({
            message: "Erro ao buscar avaliações",
            error: err.sqlMessage,
          });
        }
        
        if (results.length === 0) {
          return res.status(200).json({
            message: "Nenhuma avaliação encontrada para este livro",
            reviews: [],
          });
        }

        return res.status(200).json({
          message: "Avaliações recuperadas com sucesso",
          reviews: results,
        });

      }
    )

  }catch{}
}

exports.getAllUserReviews = (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Token inválido ou expirado",
      }); 
    }

    database.query(
      "SELECT id, score,comment,book_id FROM review WHERE user_id = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Erro no banco de dados:", err);
          return res.status(500).json({
            message: "Erro ao buscar avaliações",
            error: err.sqlMessage,
          });
        }
        if (results.length === 0) {
          return res.status(200).json({
            message: "Nenhuma avaliação encontrada para este usuário",
            reviews: [],
          });
        }
        return res.status(200).json({
          message: "Avaliações recuperadas com sucesso",
          reviews: results,
        });
      }
    );
  } catch (err) {
    console.error("Erro geral:", err);
    res.status(500).json({
      message: "Erro interno no servidor",
      error: err.message,
    });
  }
};

exports.editReview = (req, res) => {
  try {
    const { score, idReview, comment } = req.body;
    const userId = req.userId;

    if (!idReview || isNaN(score) || score < 1 || score > 5) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }

    database.query(
      "UPDATE review SET score = ?, comment = ? WHERE id = ? AND user_id = ?",
      [score, comment || null, idReview, userId],
      (err, results) => {
        if (err) {
          console.error("Erro no banco de dados", err);
          return res.status(500).json({
            message: "Erro ao salvar a atualização dos dados",
            error: err.sqlMessage,
          });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({
            message: "Review não encontrada ou usuário não autorizado",
          });
        }
        res.status(200).json({
          message: "Avaliação e comentário atualizados com sucesso!",
          updatedFields: {
            score,
            comment: comment || null,
          },
        });
      }
    );
  } catch (err) {
    console.error("Erro geral:", err);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};
