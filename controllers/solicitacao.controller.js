const Solicitacao = require('../models/solicitacao.model');

async function createSolicitacao(req, res) {
  const {
    tipo,
    idConta,
    idAgente,
    dataCriacao,
    dataFinalizacao,
    isFinalizada,
  } = req.body

    const solicitacao = {
        tipo,
        idConta,
        idAgente,
        dataCriacao,
        dataFinalizacao,
        isFinalizada,
    }

    try {
        const solicitacaoCreated = await Solicitacao.create(solicitacao)

        res.status(201).json({_id: solicitacaoCreated._id})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
    createSolicitacao,
};