const Usuario = require('../models/usuario.model');
const Conta = require('../models/conta.model');
const EndCoords = require('coordenadas-do-cep');

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
    senha,
    foto,
    tipo,
  } = req.body

    const usuario = {
      nome,
      email,
      telefone,
      senha,
      foto,
      tipo,
    }

    try {

        const usuarioExistente = await Usuario.findOne({email: email})

        if(usuarioExistente){
            res.status(200).json({message: 'Usuário já possui cadastro', cadastrado: false})
            return
        }

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

          const coords = await EndCoords.getByEndereco(conta.uf, conta.cidade, conta.rua, conta.numero);

          conta.lat = coords.lat;
          conta.lon = coords.lon;
  
          const createdConta = await Conta.create(conta)

          const usuario = {
            idConta: createdConta.id,
          }

          await Usuario.updateOne({_id: usuarioSaved.id}, usuario)
        }
        
        // Se for um morador e tiver um id de conta, cadastrar morador secundário para conta
        if(tipo === 'morador' && idConta){
          const contaSaved = await Conta.findOne({_id: idConta})

          let idsMoradores = contaSaved.idsMoradores
          idsMoradores.push(usuarioSaved._id);
          
          const conta = {
            idsMoradores
          }
          
          await Conta.updateOne({_id: idConta}, conta)

          const usuario = {
            idConta
          }

          await Usuario.updateOne({_id: usuarioSaved.id}, usuario)
        } 

        res.status(201).json({message: 'Usuário inserido com sucesso', cadastrado: true})
    } catch (error) {
        console.log(error.message);
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

async function autenticaUsuario(req, res) {
  const {
    email,
    nomeUsuario,
    senha,
  } = req.body

    try {
      const usuario = await Usuario.findOne({email: email})

      if(!usuario){
        res.status(422).json({isAutenticated: false, message: 'Usuário ou senha inválidos'})
        return
      }

      const retorno = {
        _id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
      }

      if(usuario.senha === senha){
        if(usuario.idConta){
          const contaSaved = await Conta.findOne({_id: usuario.idConta});

          retorno.idConta = contaSaved._id;
          retorno.isAutenticated = true;
          retorno.isContaAtiva = contaSaved.isAtiva;
          retorno.message = 'Usuário autenticado';
          retorno.lat = contaSaved.lat;
          retorno.lon = contaSaved.lon;

          res.status(200).json(retorno)
        }else{
          retorno.isAutenticated = true;
          retorno.isContaAtiva = null;
          res.status(200).json(retorno)
        }
      }else{
        res.status(422).json({isAutenticated: false, message: 'Usuário ou senha inválidos'})
        return
      } 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: error})
    }
}

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  autenticaUsuario,
};