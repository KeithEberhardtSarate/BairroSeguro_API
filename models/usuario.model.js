const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario', {
    nome: String,
    email: String,
    telefone: String,
    rua: String,
    numero: String,
    bairro: String,
    cep: String,
    cidade: String,
    estado: String,
    uf: String,
    nomeUsuario: String,
    senha: String,
    foto: String,
    tipo: String
})

module.exports = Usuario