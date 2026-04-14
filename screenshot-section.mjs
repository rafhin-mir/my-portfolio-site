import puppeteer from '/tmp/puppeteer-test/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const dir   = join(fileURLToPath(new URL('.', import.meta.url)), 'temporary screenshots');

const existing = readdirSync(dir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] ?? '0'));
const next = (nums.length ? Math.max(...nums) : 0) + 1;
const outPath = join(dir, `screenshot-${next}${label}.png`);

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page    = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await page.screenshot({ path: outPath, fullPage: false }); // viewport only = hero
await browser.close();

console.log('Saved:', outPath);
