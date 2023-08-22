/*IMPORTACOES*/
const puppeteer = require("puppeteer");

/*FUNCOES UTILITARIAS*/
const { delay } = require('../utils/f_delay.js');
const { CONSTS } = require('../../env.js');

/*CONSTANTES DE VALOR*/
const CONST = CONSTS();

(async () => {
    //instancia o navegador
    const browser = await puppeteer.launch({
        userDataDir: CONST.DATA_DIR,
        headless: false,
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

    console.log({message: `Informacoes sobre a imagem`, img_info })

    //fecha o navegador
    await browser.close();

})();