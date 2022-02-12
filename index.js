require('dotenv').config();
const puppeteer = require('puppeteer');

(async (linxoUser, linxoPassword) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://wwws.linxo.com/auth.page#Login')

  // Filling and submitting fields in login form
  await page.waitForSelector('input[name=username]')

  await page.$eval('input[name=username]', (el, user) => el.value = user, linxoUser)
  await page.$eval('input[name=password]', (el, password) => el.value = password, linxoPassword)

  await page.click('button[type=submit]')

  // Waiting for balance to load
  await page.waitForSelector('.GD3OLCIDI2C')

  const balance = await page.$eval('.GD3OLCIDI2C', el => el.innerText)
  console.log(balance)

  // await page.screenshot({ path: 'linxoDashboard.png' })

  await browser.close()
})(process.env.LINXO_USER, process.env.LINXO_PASSWORD);