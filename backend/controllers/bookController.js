const axios = require("axios");
const database = require("../database");

exports.search = async (req, res) => {
  try {
    console.log("Query recebida:", req.query.query);
    const { query } = req.query;

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    console.log("URL da API:", apiUrl);

    const response = await axios.get(apiUrl);
    console.log("Resposta da API:", response.data.items?.length);

    res.json(response.data.items || []);
  } catch (error) {
    console.error("Erro completo:", error);
    res.status(500).json({ message: "Erro ao buscar livros" });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const bookId = req.body

    database.query("SELECT id, score, user_id FROM review WHERE book_id = ?",
      [bookId],
      (err, results) => {
        if (err) {
          console.error("Erro no banco:", err);
          return res.status(500).json({
            message: "Erro ao buscar avaliações",
            error: err.sqlMessage,
          });
        }

        const message =
          results.affectedRows === 2
            ? "Avaliação do livro puxada com sucesso!"
            : "Nenhuma avaliação encontrada para este livro";

        res.status(201).json({
          message,
          reviewId: results.insertId || 0,
        });
      }
    )
  } catch (err) { }
}
