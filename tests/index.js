const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  let errors = 0
  
  page.on('error', err=> {
    errors += 1
  });
  page.on('pageerror', pageerr=> {
    errors += 1
  });

  
  await page.goto(`file://${__dirname}/test.html`);

  if (errors > 0) {
    throw new Error(`There were ${errors} errors`);
  }

  
  await browser.close();
  
})();

