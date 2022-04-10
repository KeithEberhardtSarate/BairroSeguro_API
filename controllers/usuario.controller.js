const Usuario = require('../models/usuario.model');

async function createUsuario(req, res) {
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
        await Usuario.create(usuario)

        res.status(201).json({message: 'Usuario inserido com sucesso'})
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