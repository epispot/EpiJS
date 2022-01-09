const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  let errors = 0
  let errormsgs = []

  page.on('error', err=> {
    errors += 1
    errormsgs.push(err)
  });
  page.on('pageerror', pageerr=> {
    errors += 1
    errormsgs.push(pageerr)
  });

  
  await page.goto(`file://${__dirname}/test.html`);

  if (errors > 0) {
    throw new Error(`There were ${errors} errors: ${errormsgs.join('\n')}`);
  }

  
  await browser.close();
  
})();

