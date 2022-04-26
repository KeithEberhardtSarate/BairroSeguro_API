const mongoose = require('mongoose')

const Conta = mongoose.model('Conta', {
    dataCriacao: { type: Date, default: Date.now },
    idMoradorPrincipal: String,
    idsMoradores: [[String]],
    isAtiva: { type: Boolean, default: false },
})

module.exports = Conta