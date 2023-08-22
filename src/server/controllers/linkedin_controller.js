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
        const dados = await consulta_batch();

        res.status(200).json({
            status: 'success',
            dados
        })
    }
}

module.exports = LinkedinController;