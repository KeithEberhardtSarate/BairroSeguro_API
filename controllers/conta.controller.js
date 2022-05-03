const Conta = require('../models/conta.model');
const Usuario = require('../models/usuario.model');

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

async function getContas(req, res) {
  try {
    const retorno = [];
    const contas = await Conta.find()

    if(conta){
      contas.map(async conta => {
        let usuarioPrincipalDaConta = await Usuario.findOne({_id: conta.idMoradorPrincipal});

        retorno.push({
          _id,
          idMoradorPrincipal,
          dataCriacao: conta.dataCriacao,
          isAtiva: conta.isAtiva,
          cepDaConta: conta.cep,
          nome: usuarioPrincipalDaConta.nome,
          email: usuarioPrincipalDaConta.email,
          telefone: usuarioPrincipalDaConta.telefone,
          qtdUsuarios: conta.idsMoradores.length + 1
        });
      });
    }

    res.status(200).json(retorno)
  } catch (error) {
      res.status(500).json({error: error})
  }
}

async function getContaById(req, res) {
  const id = req.params.id
  try {
    const conta = await Conta.findOne({_id: id})

    if(!conta){
      res.status(422).json({message: 'Usuário não encontrado'})
      return
    }
    
    const usuarioPrincipalDaConta = await Usuario.findOne({_id: conta.idMoradorPrincipal})

    const retorno = {
      _id,
      idMoradorPrincipal,
      dataCriacao: conta.dataCriacao,
      isAtiva: conta.isAtiva,
      cepDaConta: conta.cep,
      nome: usuarioPrincipalDaConta.nome,
      email: usuarioPrincipalDaConta.email,
      telefone: usuarioPrincipalDaConta.telefone,
      qtdUsuarios: conta.idsMoradores.length + 1
    }

    res.status(200).json(retorno)
  } catch (error) {
      res.status(500).json({error: error})
  }
}

module.exports = {
  createConta,
  ativarConta,
  desativarConta,
  getContas,
  getContaById,
};