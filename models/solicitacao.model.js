const mongoose = require('mongoose')

const Solicitacao = mongoose.model('Solicitacao', {
    tipo: String,
    idConta: String,
    idAgente: String,
    dataCriacao: { type: Date, default: Date.now },
    dataFinalizacao: { type: Date, default: null},
    isFinalizada: { type: Boolean, default: false },
})

module.exports = Solicitacao