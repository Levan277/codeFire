const puppeteer = require('puppeteer');
const fs = require('fs');

async function login(username, password) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to login page
  await page.goto('https://sit.login.security.gov.on.ca/oam/server/obrareq.cgi?encquery%3Da1U98WbirEEBE9GFx9TpYb5QsMURDmGWfOGupwaOBPCYNPG02wt1c06Qe7bHpwhWy72ZMrgAL0adZSo6dAvNZkPCXiQrYiKdgZ8pzpIZ5ErgIDox1ujoeXwZarsdZD1wjOSfAc0SxkfFd6Xmovvs1RPVMcxR7I9gr4%2FZVBdUHZuVAsBeuaZSQo5lE2BPtDvXxtLwQAvzFMzsCOORSRlpPVMOESkuzTnsxAvw%2BakIuKZkFjuy6h45qApqWvG0LsPiXawovt2%2BnM9saLvInQolVN9FFDr%2BjQbTdV27mmrWP%2BQ%3D%20agentid%3Dwebgate12c%20ver%3D1%20crmethod%3D2%26cksum%3D12063ea526555a2c9de54bb65a1c066a00440215&ECID-Context=1.005xi3gcGxfFg4G%5EUxaAUs0000lt00049T%3BkXjE');

  // Fill in login form and submit
//   await page.focus('#username');
//   await page.keyboard.type([...username]);
//   await page.focus('#password');
//   if (typeof password === 'string') { // Check if password is defined and is a string
//     await page.keyboard.type([...password]);
//   } else {
//     console.error('Error: password is not defined or is not a string');
//   }


if(username && password){
  await page.waitForSelector("input[name='username']");
await page.type("input[name='username']",username);

await page.waitForSelector("input[name='password']");
await page.type("input[name='password']",password);


await page.waitForSelector("input[type='submit']");
 await page.click("input[type='submit']");

  await page.waitForNavigation();
  const expectedURL = "https://sit.prov.security.gov.on.ca/identity/";

  if(page.url() === expectedURL){
    console.log("Login Successfull");

  }

  await page.goto("https://stage.login.security.gov.on.ca/oamsso/logout.html");
}



  // Wait for login to complete and check for success
//   await page.waitForSelector('#login-success');
//   const success = await page.$eval('#login-success', el => el.innerText);
//   if (success === 'Login Successful') {
//     console.log(`Logged in as ${username}`);
//   } else {
//     console.log(`Login failed for ${username}`);
//   }
  
  // Logout and close browser
//   await page.click('#logout');
//   await browser.close();
}

async function run() {
    process.setMaxListeners(60);

  // Read usernames and passwords from file
  const data = fs.readFileSync('users.txt', 'utf8');
  const users = data.split('\n').map(line => line.split(','));
  
  // Start multiple login threads
  const promises = users.map(user => login(user[0], user[1]));
  await Promise.all(promises);
}

run();