import puppeteer from 'puppeteer';
import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const dir   = join(fileURLToPath(new URL('.', import.meta.url)), 'temporary screenshots');

// auto-increment
const existing = readdirSync(dir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] ?? '0'));
const next = (nums.length ? Math.max(...nums) : 0) + 1;
const outPath = join(dir, `screenshot-${next}${label}.png`);

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page    = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
// Wait for page loader to finish and content to reveal (loader fires at 900ms)
await page.waitForFunction(() => {
  const el = document.getElementById('pageContent');
  return el && el.style.opacity === '1';
}, { timeout: 5000 }).catch(() => {});
await new Promise(r => setTimeout(r, 400)); // allow fade transition to settle
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log('Saved:', outPath);
