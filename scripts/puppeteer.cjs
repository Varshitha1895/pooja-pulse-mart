const puppeteer = require('puppeteer');
const { exec } = require('child_process');

async function run() {
  const server = exec('npm run dev -- --port 4174');
  // wait for server
  await new Promise(r => setTimeout(r, 4000));

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log("Navigating...");
  await page.goto('http://localhost:4174/product/61b576d4-15e1-4a0a-8971-e3c88f323377?type=wholesale', { waitUntil: 'networkidle0' });

  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
  server.kill();
  process.exit(0);
}

run();
