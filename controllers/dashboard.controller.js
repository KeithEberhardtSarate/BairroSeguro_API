const Conta = require('../models/conta.model');

async function getDashboard(req, res) {
  try {
    const retorno = {};
    const contas = await Conta.find()
    const usuarios = await Usuario.find()

    retorno.contasPendentes = contas.filter(x => x.isAtiva == false).length
    retorno.escoltasSolicitadas = 0
    retorno.escoltasEmAndamento = 0
    retorno.agentes = usuarios.filter(x => x.tipo == 'agente').length

    res.status(200).json(retorno)
  } catch (error) {
    res.status(500).json({error: error})
  }
}

module.exports = {
    getDashboard
};