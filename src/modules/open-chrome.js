/*CONSTANTES DE VALOR*/
const options = {
    userDataDir: `./data_dir`,
    headless: false,
}; //config do puppeteer

/*Importacoes*/
const { Cluster } = require('puppeteer-cluster');
const vanillaPuppeteer = require('puppeteer');
const { addExtra } = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth'); //permitiu rastrear sites com cloud flare protection habilitado

//fucnao com auto-execucao
(async () => {
//    await vanillaPuppeteer.createBrowserFetcher().download(vanillaPuppeteer.PUPPETEER_REVISIONS.chromium)
    //instancia o puppeteer
    const puppeteer = addExtra(vanillaPuppeteer);
    puppeteer.use(Stealth());
    //instancia o navegador
    const cluster = await Cluster.launch({
        puppeteer,
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 30,
        puppeteerOptions: options
    });

    //o que fazer com cada url na fila
    await cluster.task(async ({ page, data }) => {

    });

})();
