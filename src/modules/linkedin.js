/*IMPORTACOES*/
const vanillaPuppeteer = require('puppeteer');
const { addExtra } = require('puppeteer-extra');
const { Cluster } = require("puppeteer-cluster");
const Stealth = require('puppeteer-extra-plugin-stealth');//permitou rastrear sites com cloud flare protection habilitado
const randomUseragent = require('random-useragent');

/*FUNCOES UTILITARIAS*/
const { delay } = require('../utils/f_delay.js');
const { CONSTS } = require('../../env.js');

/*CONSTANTES DE VALOR*/
const proxy = 'zproxy.lum-superproxy.io:22225';
const username = 'lum-customer-hl_492cf951-zone-brasil';
const password = 'q2k0zn2fabn4';
const CONST = CONSTS();
const options = {
    headless: false,
    userDataDir: CONST.DATA_DIR,
    args: [
        `--proxy-server=${proxy}`,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--no-zygote',
        '--no-first-run',
        '--window-size=1920x1080',
        '--window-position=0,0',
        '--ignore-certificate-errors',
        '--ignore-certificate-errors-skip-list',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--hide-scrollbars',
        '--disable-notifications',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-component-extensions-with-background-pages',
        '--disable-extensions',
        '--disable-features=TranslateUI,BlinkGenPropertyTrees',
        '--disable-ipc-flooding-protection',
        '--disable-renderer-backgrounding',
        '--enable-features=NetworkService,NetworkServiceInProcess',
        '--force-color-profile=srgb',
        '--metrics-recording-only',
        '--mute-audio',
    ]
};
async function consulta_simple(){
    //instancia o navegador
    const browser = await vanillaPuppeteer.launch({
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

async function consulta_batch({url_list}){
    const puppeteer = addExtra(vanillaPuppeteer);
    puppeteer.use(Stealth());
    //instancia o navegador
    const cluster = await Cluster.launch({
        puppeteer,
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 15,
        puppeteerOptions: options
    });

    //onde sao armazenadas as respostas
    const array_data = [];

    //o que cada pagina ira executar
    await cluster.task(async ({ page, data: url }) =>{

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
        });
        // randomizando view port pra evitar ser bloqueado
        await page.setViewport({
            width: 1920 + Math.floor(Math.random() * 100),
            height: 3000 + Math.floor(Math.random() * 100),
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false,
        });
        // randomizando user agent pra evitar ser bloqueado
        const UA = randomUseragent.getRandom(function (ua) {
            return (ua.deviceType === '') && parseFloat(ua.browserVersion) >= 20;
        });
        await page.setUserAgent(UA);

        // Authenticate our proxy with username and password defined above
        await page.authenticate({ username, password });

        //navega para a pagina
        await page.goto(url);


        //executa js no contexto da pagina e retorna informacoes
        const data = await page.evaluate(() => {
            //informacoes obtidas na pagina
            const url_info = {};

            //inicia tentativa de obtencao de dados
            try{

                //busca pela imagem que contem o preview do usuario
                const img = document.querySelectorAll('img.evi-image.ember-view')
                //filtra apenas as informacoes desejadas
                url_info.src = img[1].getAttribute('src')
            }catch (e){
                url_info.error = 'Não foi possível obter a imagem'
            }

            //retorna as informacoes da imagem
            return (url_info);
        })

        //adiciona os dados consultados ao array de dados
        array_data.push({ url, data})
    });

    //percorre a lista de url
    url_list.forEach((url, index_url) => {
        //adiciona a url a fila
        cluster.queue(url)
    })

    //encerra execucao
    await cluster.idle();
    await cluster.close();

    //retornas os dados
    return array_data;
};

module.exports = {consulta_simple, consulta_batch};