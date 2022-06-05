const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario', {
    idConta: String,
    nome: String,
    email: String,
    telefone: String,
    senha: String,
    foto: String,
    tipo: String
})

module.exports = Usuario