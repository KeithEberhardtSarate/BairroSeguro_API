const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario', {
    nome: String,
    email: String,
    telefone: String,    
    nomeUsuario: String,
    senha: String,
    foto: String,
    tipo: String
})

module.exports = Usuario