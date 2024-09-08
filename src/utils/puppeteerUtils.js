const puppeteer = require('puppeteer');

exports.getPageContent = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const content = await page.evaluate(() => document.body.innerText);
  await browser.close();
  return content;
};