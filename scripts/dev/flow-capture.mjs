/**
 * Dev-only flow evidence capture (Issue #181). Captures the Figma-parity
 * "wow" moments that direct URL screenshots miss: the Food Profile
 * conversation step 1, the Exploration experience tiles (step 2), and the
 * Result reveal. Run against the dev server:
 *   node scripts/dev/flow-capture.mjs <outDir>
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const outDir = resolve(process.argv[2] ?? 'screenshots');
mkdirSync(outDir, { recursive: true });
const BASE = 'http://localhost:5173';
const PROFILE = JSON.stringify({ dietary: [], dietaryOther: '', hasNoRestrictions: true, savedAt: '2026-08-16T00:00:00.000Z', version: 1 });
const EXPLORATION = JSON.stringify({ tastes: ['refreshing'], experiences: ['eat', 'meet'], baseArea: 'okutama', travelTime: 'within-60', interests: ['nature', 'tradition'], duration: 'half-day' });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') {
    console.log(`CONSOLE[${msg.type()}]:`, msg.text().slice(0, 160));
  }
});
page.on('pageerror', (err) => console.log('PAGEERROR:', String(err).slice(0, 200)));
await page.goto(BASE, { waitUntil: 'networkidle' });

// 1. Food Profile intro (no profile).
await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); localStorage.setItem('tmm:locale', 'ja'); });
await page.goto(`${BASE}/food-profile`, { waitUntil: 'networkidle' });
await page.screenshot({ path: `${outDir}/fp-intro-390.png`, fullPage: true });

// 2. Food Profile conversation step 1.
await page.getByRole('button', { name: 'はじめる！' }).click();
await page.screenshot({ path: `${outDir}/fp-step1-390.png`, fullPage: true });

// 3. Exploration step 2 (experience tiles) — fresh page to avoid any dev-server
// lazy-chunk race from the prior conversation page.
const page2 = await browser.newPage({ viewport: { width: 390, height: 844 } });
page2.on('console', (msg) => {
  if (msg.type() === 'error') console.log(`P2 CONSOLE[error]:`, msg.text().slice(0, 200));
});
page2.on('pageerror', (err) => console.log('P2 PAGEERROR:', String(err).slice(0, 200)));
await page2.goto(BASE, { waitUntil: 'domcontentloaded' });
await page2.evaluate(([profile, exploration]) => {
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem('tmm:locale', 'ja');
  localStorage.setItem('tmm:foodProfile:v1', profile);
  sessionStorage.setItem('tmm:exploration:v1', exploration);
}, [PROFILE, EXPLORATION]);
await page2.goto(`${BASE}/explore`, { waitUntil: 'domcontentloaded' });
console.log('url2:', page2.url());
try {
  await page2.getByRole('button', { name: 'さっぱり・爽やか' }).waitFor({ timeout: 8000 });
} catch {
  const main = await page2.evaluate(() => document.querySelector('main')?.innerHTML.slice(0, 300));
  console.log('P2 MAIN:', main);
  throw new Error('taste chip not found');
}
// The seeded exploration already selects さっぱり; just advance to the
// experience-tile step (step 2).
await page2.getByRole('button', { name: '次へ', exact: true }).click();
await page2.locator('.tmm-wizard__tile').first().waitFor();
await page2.waitForTimeout(300);
await page2.screenshot({ path: `${outDir}/explore-tiles-390.png` });

// 4. Result reveal.
await page2.goto(`${BASE}/explore/result`, { waitUntil: 'domcontentloaded' });
await page2.locator('.tmm-result-card').first().waitFor();
await page2.waitForTimeout(300);
await page2.screenshot({ path: `${outDir}/result-reveal-390.png` });
await page2.close();

await browser.close();
console.log('done');
