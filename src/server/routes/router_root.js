/*importacoes*/
const express = require("express");
const router_root = express.Router();

//cricao das rotas
router_root.get("/", (req, res) => {
    res.send("Projeto de automação Puppeteer!")
})

//exporta as rotas
module.exports = router_root;