const express = require('express');

const solicitacaoController = require('../controllers/solicitacao.controller');

const solicitacaoRouter = express.Router();

solicitacaoRouter.use((req, res, next) => {
  console.log('ip address:', req.ip);
  res.set('Access-Control-Allow-Origin', '*');
  next();
});
solicitacaoRouter.post('/', solicitacaoController.createSolicitacao);

module.exports = solicitacaoRouter;