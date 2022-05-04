const express = require('express');

const usuariosController = require('../controllers/usuario.controller');

const usuariosRouter = express.Router();

usuariosRouter.use((req, res, next) => {
  console.log('ip address:', req.ip);
  res.set('Access-Control-Allow-Origin', '*');
  next();
});
usuariosRouter.post('/', usuariosController.createUsuario);
usuariosRouter.post('/login', usuariosController.autenticaUsuario);
usuariosRouter.get('/', usuariosController.getUsuarios);
usuariosRouter.get('/:id', usuariosController.getUsuarioById);
usuariosRouter.patch('/:id', usuariosController.updateUsuario);
usuariosRouter.delete('/:id', usuariosController.deleteUsuario);

module.exports = usuariosRouter;