const mongoose = require('mongoose')

const Conta = mongoose.model('Conta', {
    dataCriacao: { type: Date, default: Date.now },
    idMoradorPrincipal: String,
    idsMoradores: [[String]],
    rua: String,
    numero: String,
    bairro: String,
    cep: String,
    cidade: String,
    estado: String,
    uf: String,
    isAtiva: { type: Boolean, default: false },
})

module.exports = Conta