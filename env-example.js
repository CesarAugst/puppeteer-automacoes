//desc: constantes que sao reutilziadas pela aplicacao
module.exports = {
    CONSTS() {
        return {
            //geral
            DATA_DIR: `[ONDE FICAM SALVOS OS CACHES DAS REQUISICOES COMO: ./data_dir]`,
            HTTP_PORT: `[PORTA QUE EXECUTA A APLICAÇÃO COMO: 3000]`,

            //whatsapp
            EXISTS_NUMBER: `[UM NÚMERO DEE TELEFONE VÁLIDO COM DDD, COMO: XXXXXXXXXXX]`,
            NOM_EXISTS_NUMBER: `[UM NÚMERO DE TELEFONE QUE NÃO É VÁLIDOCOM DDD, COMO: XXXXXXXXXXY]`,

            //linkedin
            linkedin_url: `[UMA URL DE LINKEDIN VALIDA COMO: https://www.linkedin.com/in/cesar-august/]`
        }
    }
}
