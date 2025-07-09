const jwt = require("jsonwebtoken");
const secretkey = "chavemuitosecreta";

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, secretkey); 
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token inválido ou expirado" });
    }
};