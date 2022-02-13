const config = require('./config.json');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Balance = require('./models/Balance');
const currencyToNumber = require('./utils/CurrencyToNumber');

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_DB}?retryWrites=true&w=majority`);

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://wwws.linxo.com/auth.page#Login');

	// Filling and submitting fields in login form
	await page.waitForSelector('input[name=username]');

	await page.$eval('input[name=username]', (el, user) => el.value = user, config.LINXO_USER);
	await page.$eval('input[name=password]', (el, password) => el.value = password, config.LINXO_PASSWORD);

	await page.click('button[type=submit]');

	// Waiting for balance to load
	await page.waitForSelector('.GD3OLCIDI2C');

	const currentBalance = await page.$eval('.GD3OLCIDI2C', el => el.innerText);
  
	// Creating a new balance document
	const balance = new Balance({
		balance: currencyToNumber(currentBalance),
		date: new Date()
	});
  
	// Then saving it in the collection
	balance.save()
		.then(() => {
			mongoose.disconnect();
		});

	// await page.screenshot({ path: 'linxoDashboard.png' })

	await browser.close();
})();
