const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user')
const bookRoutes = require('./routes/book')
const reviewRoutes = require('./routes/review')

const app = express();
app.use(cors());
app.use(express.json())

//Rotas
app.use('/api/user', userRoutes)
app.use('/api/books/search', bookRoutes)
app.use('/api/review', reviewRoutes )

app.listen(3001,() => {
    console.log('Servidor rodando na porta 3001');
})

