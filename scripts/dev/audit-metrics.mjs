/**
 * Dev-only UI metrics extractor (not part of shipped app/CI).
 * For each core screen, dump JSON of key elements' computed styles + geometry
 * so a text-only agent can audit Figma parity without viewing images.
 *   node scripts/dev/audit-metrics.mjs <outJson>
 */
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const outFile = resolve(process.argv[2] ?? 'ui-audit.json');
const BASE = 'http://localhost:5173';
const WIDTH = Number(process.argv[3] ?? 390);

const screens = [
  { name: 'home-returning', url: '/home', sel: 'main' },
  { name: 'landing', url: '/', sel: 'main' },
  { name: 'food-profile-edit', url: '/food-profile/edit', sel: 'main' },
  { name: 'food-profile-view', url: '/food-profile', sel: 'main' },
  { name: 'explore-q1', url: '/explore', sel: 'main' },
  { name: 'explore-result', url: '/explore/result', sel: 'main' },
  { name: 'discover', url: '/discover', sel: 'main' },
  { name: 'mogu', url: '/mogu', sel: 'main' },
  { name: 'my', url: '/my', sel: 'main' },
  { name: 'story', url: '/story', sel: 'main' },
  { name: 'route', url: '/route', sel: 'main' },
  { name: 'spot', url: '/spot/okutama-wasabi-field', sel: 'main' },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: 844 } });
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

const rgb = (c) => c.replace(/\s+/g, '');
const compact = (s) => {
  const o = {};
  for (const [k, v] of Object.entries(s)) {
    if (typeof v === 'string' && v && v !== 'none' && v !== 'auto' && v !== '0px' && v !== 'normal' && v !== 'rgba(0, 0, 0, 0)') {
      if (['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'borderTopWidth', 'borderTopStyle', 'borderBottomWidth', 'borderBottomStyle', 'fontFamily', 'fontWeight', 'fontSize', 'lineHeight', 'letterSpacing', 'borderRadius', 'boxShadow', 'gap', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginTop', 'width', 'height', 'minHeight', 'aspectRatio', 'opacity'].includes(k)) {
        o[k] = k.includes('Color') ? rgb(v) : v;
      }
    }
  }
  return o;
};

const result = {};
for (const s of screens) {
  try {
    await page.goto(`${BASE}${s.url}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const data = await page.evaluate(({ rootSel }) => {
      const rect = (el) => {
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
      };
      const info = (el) => ({ tag: el.tagName, text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 48), rect: rect(el), style: compactStyles(el) });
      const compactStyles = (el) => {
        const s = getComputedStyle(el);
        const out = {};
        for (const k of ['color', 'backgroundColor', 'fontFamily', 'fontWeight', 'fontSize', 'lineHeight', 'letterSpacing', 'borderRadius', 'boxShadow', 'borderTopWidth', 'borderTopStyle', 'borderTopColor', 'borderBottomWidth', 'borderBottomStyle', 'borderBottomColor', 'gap', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'minHeight', 'aspectRatio', 'opacity']) {
          const v = s[k];
          if (v && v !== 'none' && v !== 'auto' && v !== '0px' && v !== 'normal' && v !== 'rgba(0, 0, 0, 0)') {
            out[k] = k.includes('Color') ? v.replace(/\s+/g, '') : v;
          }
        }
        return out;
      };
      const root = document.querySelector(rootSel) || document.body;
      const headings = [...root.querySelectorAll('h1,h2,h3,h4')].map((el) => info(el));
      const btns = [...root.querySelectorAll('button,a[role="button"],.tmm-btn,a.tmm-btn')].map((el) => info(el));
      const chips = [...root.querySelectorAll('.tmm-chip')].map((el) => info(el));
      const cards = [...root.querySelectorAll('.tmm-card,.tmm-result-card,article,[class*="card"]')].filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 60 && r.height > 60;
      }).slice(0, 12).map((el) => info(el));
      const main = root.querySelector('main') || document.body;
      const mainR = main.getBoundingClientRect();
      return {
        headings,
        btns,
        chips,
        cards,
        mainHeight: Math.round(mainR.height),
      };
    }, { rootSel: s.sel });
    result[s.name] = data;
    console.log(`OK ${s.name} (${data.headings.length}h ${data.btns.length}b ${data.chips.length}ch ${data.cards.length}cd)`);
  } catch (err) {
    result[s.name] = { error: String(err).slice(0, 200) };
    console.error(`FAIL ${s.name}: ${String(err).slice(0, 120)}`);
  }
}

writeFileSync(outFile, JSON.stringify(result, null, 2));
await browser.close();
console.log(`written ${outFile}`);
