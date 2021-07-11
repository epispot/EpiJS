const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${__dirname}/test.html`);
  
  let errors = 0
  
  page.on('error', err=> {
    console.log('error happen at the page: ', err);
    errors += 1
  });
  page.on('pageerror', pageerr=> {
    console.log('pageerror occurred: ', pageerr);
    errors += 1
  });

  if (errors > 1) {
    Promise.reject(new Error('More than one error occurred. See log for details.'));
  }

  await browser.close();
})();

