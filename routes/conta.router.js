const express = require('express');

const contasController = require('../controllers/conta.controller');

const contasRouter = express.Router();

contasRouter.use((req, res, next) => {
  console.log('ip address:', req.ip);
  next();
});
contasRouter.post('/', contasController.createConta);
// contasRouter.get('/', contasController.getUsuarios);
// contasRouter.get('/:id', contasController.getUsuarioById);
// contasRouter.patch('/:id', contasControllerv.updateUsuario);
// contasRouter.delete('/:id', contasController.deleteUsuario);

module.exports = contasRouter;