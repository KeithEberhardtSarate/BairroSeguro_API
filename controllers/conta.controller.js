const Conta = require('../models/conta.model');

async function createConta(req, res) {
  const {
    idMoradorPrincipal,
  } = req.body

    const conta = {
      idMoradorPrincipal,
    }

    try {
        await Conta.create(conta)

        res.status(201).json({message: 'Conta inserida com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function ativarConta(req, res) {
  const id = req.params.id

    const conta = {
      isAtiva: true,
    }
    
    try {
        const updatedConta = await Conta.updateOne({_id: id}, conta)

        if(updatedConta.matchedCount === 0){
            res.status(422).json({message: 'Conta ativa com sucesso'})
            return
        }

        res.status(200).json(conta)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function desativarConta(req, res) {
  const id = req.params.id

    const conta = {
      isAtiva: false,
    }
    
    try {
        const updatedConta = await Conta.updateOne({_id: id}, conta)

        if(updatedConta.matchedCount === 0){
            res.status(422).json({message: 'Conta ativa com sucesso'})
            return
        }

        res.status(200).json(conta)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
  createConta,
  ativarConta,
  desativarConta,
};