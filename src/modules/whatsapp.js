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
    await page.goto(`https://wa.me/${CONST.NOM_EXISTS_NUMBER}`);
    //tita print
    await page.screenshot({path: './assets/example.png'})
    //clica no botao de de iniicar conversa
    await page.click(`#action-button`)
    //aguarda um tmepo antes de fechar o navegador
    // await delay(2000);
    //fecha navegador
    // await browser.close();

})();