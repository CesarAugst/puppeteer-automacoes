//importacoes
const express = require("express");
const { CONSTS } = require('../../env');

/*CONSTANTES DE VALOR*/
const CONST = CONSTS();

//criacao do servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded());

const router_root = require("./routes/router_root");
const router_linkedin = require("./routes/router_linkedin");

/*ROTAS*/
app.use(`/linkedin`, router_linkedin);
app.use(`/`, router_root);


//expoe o servico na porta indicada
app.listen(CONST.HTTP_PORT, () => console.log(`App executando e disponível na porta ${CONST.HTTP_PORT}`));