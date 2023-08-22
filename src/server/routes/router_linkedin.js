/*importacoes*/
const express = require("express");
//rotas
const router_linkedin = express.Router();
//controllers
const LinkedinController = require("../controllers/linkedin_controller");
const linkedinController = new LinkedinController();

//cricao das rotas
router_linkedin.get("/:metodo_busca", linkedinController.index)

//exporta as rotas
module.exports = router_linkedin;