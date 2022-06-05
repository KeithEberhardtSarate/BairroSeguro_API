const express = require('express');

const dashboardController = require('../controllers/dashboard.controller');

const dashboardRouter = express.Router();

dashboardRouter.use((req, res, next) => {
  console.log('ip address:', req.ip);
  res.set('Access-Control-Allow-Origin', '*');
  next();
});
dashboardRouter.get('/', dashboardController.getDashboard);

module.exports = dashboardRouter;