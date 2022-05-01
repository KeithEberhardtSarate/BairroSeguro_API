const Usuario = require('../models/usuario.model');
const Conta = require('../models/conta.model');

async function createUsuario(req, res) {
  const {
    idConta,
    nome,
    email,
    telefone,
    rua,
    numero,
    bairro,
    cep,
    cidade,
    estado,
    uf,
    nomeUsuario,
    senha,
    foto,
    tipo,
  } = req.body

    const usuario = {
      nome,
      email,
      telefone,      
      nomeUsuario,
      senha,
      foto,
      tipo,
    }

    try {
        const usuarioSaved = await Usuario.create(usuario)

        // Se for um morador e não tiver id da conta, cria uma conta associada ao usuário
        if(tipo === 'morador' && !idConta) {
          const conta = {
            idMoradorPrincipal: usuarioSaved._id,
            rua,
            numero,
            bairro,
            cep,
            cidade,
            estado,
            uf,
          }
  
          await Conta.create(conta)
        }
        
        // Se for um morador e tiver um id de conta, cadastrar morador secundário para conta
        if(tipo === 'morador' && idConta){
          const contaSaved = await Conta.findOne({_id: idConta})

          let idsMoradores = contaOld.idsMoradores
          idsMoradores.push(usuarioSaved._id);
          
          const conta = {
            idsMoradores
          }
          
          await Conta.updateOne({_id: idConta}, conta)
        } 

        res.status(201).json({message: 'Usuário inserido com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function getUsuarios(req, res) {
  try {
    const usuario = await Usuario.find()

    res.status(200).json(usuario)
  } catch (error) {
      res.status(500).json({error: error})
  }
}

async function getUsuarioById(req, res) {
  const id = req.params.id
    try {
        const usuario = await Usuario.findOne({_id: id})

        if(!usuario){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function updateUsuario(req, res) {
  const id = req.params.id

  const {
    nome,
    email,
    telefone,
    rua,
    numero,
    bairro,
    cep,
    cidade,
    estado,
    uf,
    nomeUsuario,
    senha,
    foto,
    tipo,
  } = req.body

    const usuario = {
      nome,
      email,
      telefone,
      rua,
      numero,
      bairro,
      cep,
      cidade,
      estado,
      uf,
      nomeUsuario,
      senha,
      foto,
      tipo,
    }
    
    try {
        const updatedUsuario = await Usuario.updateOne({_id: id}, usuario)

        if(updatedUsuario.matchedCount === 0){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function deleteUsuario(req, res) {
  const id = req.params.id

  const usuario = await Usuario.findOne({_id: id})

  if(!usuario){
    res.status(422).json({message: 'Usuário não encontrado'})
    return
  }

  try {
    await Usuario.deleteOne({_id: id})

    res.status(200).json({message: 'Usuário removido!'})
  } catch (error) {
    res.status(500).json({error: error})
  }
}

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
};