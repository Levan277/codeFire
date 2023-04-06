const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // your code goes here
  await page.goto('https://example.com/login');
  await page.click('#pki-login-button');
  await page.waitForSelector('#pki-certificate-window');

  await Promise.all([
    page.waitForNavigation(),
    page.click('#select-certificate-button'),
  ]);

  await page.waitForSelector('#pki-login-success');

  const userProfile = await page.$('#user-profile');
if (userProfile !== null) {
  console.log('User logged in successfully!');
} else {
  console.log('Login failed!');
}
  await browser.close();
})();
