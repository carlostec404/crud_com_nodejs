const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

// iniciando o App
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

consign().include('routes').include('ultils').into(app)


// iniciando o DB


// iniciando a rota 





app.listen(3001)

console.log('servidor rodando')