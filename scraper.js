const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const ScrapedData = require('./schema');

// mongoose.connect('mongodb+srv://msoriano:goldtree299@scrapednumbers.pyjdr.mongodb.net/scrapedNumbers?retryWrites=true&w=majority',
// {useNewUrlParser: true, useUnifiedTopology: true}).then(function() {
//     console.log('connected to database!')
// });

async function getPageData(url,page) {
    await page.goto(url)

    const phonum = await page.$eval('.phone_number a', a => a.textContent);
    const country = await page.$eval('.main-content-header h3', h3 => h3.textContent);
    const details = await (await page.$eval('.main-content-text p', p => p.innerText));

    const scrapedData = new ScrapedData({
        Phone_Number: phonum,
        VictimAndCountry: country,
        Details: details
    });
    await scrapedData.save();

    return {
        Phone_Number: phonum,
        VictimAndCountry: country,
        Details: details
    };
};

async function getLinks() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://www.scamcallfighters.com/')

   const links = await page.$$eval('.main-content-body .phone_number a', allAs => allAs.map(a => a.href));

    return links;   
};

async function main() {
    const allLinks = await getLinks();i
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const scrapedData = [];

    for(let link of allLinks){
        const data = await getPageData(link,page).catch((e)=> console.log('error on page'));
        scrapedData.push(data);
    }
    await browser.close();
    console.log(scrapedData)
};
main();