const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');

const usuariosRouter = require('./routes/usuario.router');
const contasRouter = require('./routes/conta.router');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.use(express.json());

app.use('/usuario', usuariosRouter);
app.use('/conta', contasRouter);

const DB_USER = 'Keith'
const DB_PASSWORD = encodeURIComponent('vJ58dGU@88A6R3Y')

mongoose.connect(
    `mongodb+srv://keith:${DB_PASSWORD}@apicluster.lf1jh.mongodb.net/bairroSeguroDatabase?retryWrites=true&w=majority`
)
.then(() => {
    console.log("Conectado ao Mongo DB")
    app.listen(3000)
})
.catch((err) => {
    console.log(err)
})