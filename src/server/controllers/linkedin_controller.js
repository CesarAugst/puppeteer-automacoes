/*importacoes*/
const {consulta_simple, consulta_batch} = require("../../modules/linkedin");

class LinkedinController {
    async simple(req, res){
        const dados = await consulta_simple();

        res.status(200).json({
            status: 'success',
            dados
        })
    }

    async batch(req, res){
        //pega lista de url atraves da consulta http
        const { url_list } = req.body;

        //consulta os dados passando a url
        const dados = await consulta_batch({url_list});

        res.status(200).json({
            status: 'success',
            dados
        })
    }
}

module.exports = LinkedinController;