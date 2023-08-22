/*importacoes*/
const consulta_por_url = require("../../modules/linkedin");

class LinkedinController {
    async index(req, res){
        const dados = await consulta_por_url();

        console.log({message: `dados` , dados })

        res.status(200).json({
            status: 'success',
            dados
        })
    }
}

module.exports = LinkedinController;