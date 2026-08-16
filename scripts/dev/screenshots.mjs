/**
 * Dev-only screenshot capture script (not part of the shipped app or CI).
 * Captures every core screen at a given viewport width for Figma-parity
 * auditing. Run against the dev server with:
 *   node scripts/dev/screenshots.mjs <width> <outDir>
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const width = Number(process.argv[2] ?? 390);
const outDir = resolve(process.argv[3] ?? 'screenshots');
mkdirSync(outDir, { recursive: true });

const BASE = 'http://localhost:5173';
const shots = [
  { name: 'home-returning', url: '/home' },
  { name: 'landing', url: '/' },
  { name: 'food-profile-edit', url: '/food-profile/edit' },
  { name: 'food-profile-view', url: '/food-profile' },
  { name: 'explore-q1', url: '/explore' },
  { name: 'explore-result', url: '/explore/result' },
  { name: 'discover', url: '/discover' },
  { name: 'mogu', url: '/mogu' },
  { name: 'my', url: '/my' },
  { name: 'story', url: '/story' },
  { name: 'route', url: '/route' },
  { name: 'spot', url: '/spot/okutama-wasabi-field' },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 844 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.evaluate(() => {
  localStorage.setItem('tmm:locale', 'ja');
  localStorage.setItem(
    'tmm:foodProfile:v1',
    JSON.stringify({
      dietary: [],
      dietaryOther: '',
      hasNoRestrictions: true,
      savedAt: '2026-08-16T00:00:00.000Z',
      version: 1,
    }),
  );
  sessionStorage.setItem(
    'tmm:exploration:v1',
    JSON.stringify({
      tastes: ['refreshing'],
      experiences: ['eat', 'meet'],
      baseArea: 'okutama',
      travelTime: 'within-60',
      interests: ['nature', 'tradition'],
      duration: 'half-day',
    }),
  );
});
await page.reload({ waitUntil: 'networkidle' });

for (const s of shots) {
  try {
    await page.goto(`${BASE}${s.url}`, { waitUntil: 'networkidle' });
    // give any lazy route + images a beat
    await page.waitForTimeout(600);
    const file = join(outDir, `${s.name}-${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`OK ${file}`);
  } catch (err) {
    console.error(`FAIL ${s.name}: ${String(err).slice(0, 160)}`);
  }
}

await browser.close();
console.log('done');
