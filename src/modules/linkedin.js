/*IMPORTACOES*/
const puppeteer = require("puppeteer");
const { Cluster } = require("puppeteer-cluster")

/*FUNCOES UTILITARIAS*/
const { delay } = require('../utils/f_delay.js');
const { CONSTS } = require('../../env.js');

/*CONSTANTES DE VALOR*/
const CONST = CONSTS();

async function consulta_simple(){
    //instancia o navegador
    const browser = await puppeteer.launch({
        userDataDir: CONST.DATA_DIR,
        headless: 'new'
    });
    //abre uma nova aba
    const page = await browser.newPage();
    //navega para a pagina
    await page.goto(CONST.linkedin_url);

    //executa js no contexto da pagina e retorna informacoes
    const img_info = await page.evaluate(() => {
        //busca pela imagem que contem o preview do usuario
        const img = document.querySelector('img.evi-image.ember-view.profile-photo-edit__preview')
        //filtra apenas as informacoes desejadas
        const img_info = {
            src: img.getAttribute('src')
        }
        //retorna as informacoes da imagem
        return (img_info);
    })

    //fecha o navegador
    await browser.close();

    return({
        message: `Informacoes sobre a imagem`,
        img_info
    })
}

async function consulta_batch(){
    //instancia o navegador
    const cluster = await Cluster.launch({
        puppeteerOptions: {
            headless: false,
            userDataDir: CONST.DATA_DIR,
        },
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 2,
    });

    //onde sao armazenadas as respostas
    const array_data = [];

    //o que cada pagina ira executar
    await cluster.task(async ({ page, data: url }) =>{
        //navega para a pagina
        await page.goto(url);

        //executa js no contexto da pagina e retorna informacoes
        const data = await page.evaluate(() => {
            //busca pela imagem que contem o preview do usuario
            const img = document.querySelector('img.evi-image.ember-view.profile-photo-edit__preview')
            //filtra apenas as informacoes desejadas
            const img_info = {
                src: img.getAttribute('src')
            }
            //retorna as informacoes da imagem
            return (img_info);
        })

        //adiciona os dados consultados ao array de dados
        array_data.push({ url, data})
    });

    //paginas em fila
    cluster.queue(`https://www.linkedin.com/in/cesar-august/`);
    cluster.queue(`https://www.linkedin.com/in/cesar-august/`);

    //encerra execucao
    await cluster.idle();
    await cluster.close();

    console.log(array_data)

    //retornas os dados
    return array_data;
};

module.exports = {consulta_simple, consulta_batch};