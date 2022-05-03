const express = require('express');

const contasController = require('../controllers/conta.controller');

const contasRouter = express.Router();

contasRouter.use((req, res, next) => {
  console.log('ip address:', req.ip);
  res.set('Access-Control-Allow-Origin', '*');
  next();
});
contasRouter.post('/', contasController.createConta);
contasRouter.get('/', contasController.getContas);
contasRouter.get('/:id', contasController.getContaById);
contasRouter.patch('/ativar/:id', contasController.ativarConta);
contasRouter.patch('/desativar/:id', contasController.desativarConta);

module.exports = contasRouter;