//importacoes
const express = require("express");
const { CONSTS } = require('../../env.js');

/*CONSTANTES DE VALOR*/
const CONST = CONSTS();

//criacao do servidor
const app = express();

/*ROTAS*/
app.get("/", (req, res) => {
    res.send("Projeto de automação Puppeteer!")
})
app.get("/linkedin/:metodo_busca", (req, res) => {
    res.send(`Projeto Linkedin usando ${req.params.metodo_busca}`)
})

//expoe o servico na porta indicada
app.listen(CONST.HTTP_PORT, () => console.log(`App executando e disponível na porta ${CONST.HTTP_PORT}`));