const mysql = require("mysql2");
require('dotenv').config();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const database = mysql.createConnection(dbConfig);

database.connect(err => {
    if(err){
        console.log('Erro ao conectar ao banco de dados',err);
        return;
    }
    console.log('Conectardo ao Banco')
});

module.exports = database;