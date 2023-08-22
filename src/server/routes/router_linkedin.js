/*importacoes*/
const express = require("express");
const router_linkedin = express.Router();

//cricao das rotas
router_linkedin.get("/:metodo_busca", (req, res) => {
    res.send(`Projeto Linkedin usando ${req.params.metodo_busca}`)
})

//exporta as rotas
module.exports = router_linkedin;