/* ON WEB SERVER 
const puppeteer = require('puppeteer');

async function getBunnies() {
    const browser = await puppeteer.launch({
        args : [
            '--no-sandbox'
        ]
    });

    const page = await browser.newPage();

    const url = 'https://nh.craigslist.org/search/sss?query=bunnies&hasPic=1';

    await page.goto(url);

    await page.waitFor('.result-row');

    const results = await page.$$eval('.result-row', rows => {
        return rows.map(row => {
            const properties = {};
            const titleElement = row.querySelector('.result-title');
            properties.title = titleElement.innerText;
            properties.url = titleElement.getAttribute('href');
            const priceElement = row.querySelector('.result-price');
            properties.price = priceElement ? priceElement.innerText : '';
            const imageElement = row.querySelector('.swipe [data-index="0"] img');
            properties.imageUrl = imageElement ? imageElement.src : '';
            return properties;
        });
    });

    browser.close();

    return {
        url,
        results
    };
}

exports.getBunnies = async function(req, res) {
    res.status(200).send(await getBunnies());
};
*/

/* ON LOCAL MACHINE */

const puppeteer = require('puppeteer');

async function getBunnies() {
    const browser = await puppeteer.launch({
        // headless: false,
        // defaultViewport: null
    });

    const page = await browser.newPage();

    const url = 'https://nh.craigslist.org/search/sss?query=bunnies&hasPic=1';

    await page.goto(url);

    await page.waitForSelector('.result-row');

    const results = await page.$$eval('.result-row', rows => {
        return rows.map(row => {
            const properties = {};
            const titleElement = row.querySelector('.result-title');
            properties.title = titleElement.innerText;
            properties.url = titleElement.getAttribute('href');
            const priceElement = row.querySelector('.result-price');
            properties.price = priceElement ? priceElement.innerText : '';
            const imageElement = row.querySelector('.swipe [data-index="0"] img');
            properties.imageUrl = imageElement ? imageElement.src : '';
            return properties;
        });
    });

    console.log(results);

    browser.close();
}

getBunnies();