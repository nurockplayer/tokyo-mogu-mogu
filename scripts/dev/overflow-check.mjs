/**
 * Dev-only 375px overflow check across the changed screens and all locales.
 * Verifies no horizontal overflow (scrollWidth <= clientWidth) for the
 * screens touched by the Issue #181 parity pass.
 *   node scripts/dev/overflow-check.mjs
 */
import { chromium } from '@playwright/test';

const BASE = 'http://localhost:5173';
const LOCALES = ['ja', 'en', 'zh-TW'];
const LOCALE_MAP = { ja: 'ja-JP', en: 'en-US', 'zh-TW': 'zh-TW' };

const SCREENS = [
  { name: 'home-returning', url: '/', seed: true },
  { name: 'landing-firsttime', url: '/', seed: false },
  { name: 'food-profile-intro', url: '/food-profile', seed: false },
  { name: 'food-profile-edit', url: '/food-profile/edit', seed: true },
  { name: 'explore-q1', url: '/explore', seed: true },
  { name: 'explore-result', url: '/explore/result', seed: true },
  { name: 'discover', url: '/discover', seed: true },
  { name: 'mogu', url: '/mogu', seed: true },
  { name: 'my', url: '/my', seed: true },
  { name: 'story', url: '/story', seed: true },
  { name: 'route', url: '/route', seed: true },
  { name: 'spot', url: '/spot/okutama-wasabi-field', seed: true },
];

const PROFILE = JSON.stringify({
  dietary: [],
  dietaryOther: '',
  hasNoRestrictions: true,
  savedAt: '2026-08-16T00:00:00.000Z',
  version: 1,
});
const EXPLORATION = JSON.stringify({
  tastes: ['refreshing'],
  experiences: ['eat', 'meet'],
  baseArea: 'okutama',
  travelTime: 'within-60',
  interests: ['nature', 'tradition'],
  duration: 'half-day',
});
const RECENT = JSON.stringify([
  {
    candidateId: 'okutama-wasabi',
    resultId: 'wasabi-okutama',
    titleKey: 'dataWasabiName',
    summary: ['grate-fresh', 'nature-valley'],
    exploration: {
      tastes: ['refreshing'],
      experiences: ['eat'],
      baseArea: 'okutama',
      travelTime: 'within-60',
      interests: ['nature'],
      duration: 'half-day',
    },
    hasDietaryConsiderations: false,
    createdAt: '2026-08-16T02:30:00.000Z',
  },
]);
const SAVED = JSON.stringify([{ routeId: 'okutama-wasabi-journey', savedAt: '2026-08-16T00:00:00.000Z' }]);

const browser = await chromium.launch();
let failures = 0;

for (const locale of LOCALES) {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, locale: LOCALE_MAP[locale] });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate(
    ([loc, profile, exploration, recent, saved]) => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('tmm:locale', loc);
      if (profile) localStorage.setItem('tmm:foodProfile:v1', profile);
      if (recent) localStorage.setItem('tmm:moguRecent:v1', recent);
      if (saved) localStorage.setItem('tmm:savedRoutes', saved);
      if (exploration) sessionStorage.setItem('tmm:exploration:v1', exploration);
    },
    [locale, PROFILE, EXPLORATION, RECENT, SAVED],
  );
  await page.reload({ waitUntil: 'networkidle' });

  for (const s of SCREENS) {
    // food-profile-intro needs the profile cleared; landing-firsttime too.
    if (!s.seed) {
      await page.evaluate(() => localStorage.removeItem('tmm:foodProfile:v1'));
    } else if (s.name !== 'food-profile-intro') {
      await page.evaluate((profile) => localStorage.setItem('tmm:foodProfile:v1', profile), PROFILE);
    }
    try {
      await page.goto(`${BASE}${s.url}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      const { scrollWidth, clientWidth } = await page.evaluate(async () => {
        await document.fonts.ready;
        const doc = document.documentElement;
        return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
      });
      const ok = scrollWidth <= clientWidth;
      if (!ok) {
        failures += 1;
        console.log(`OVERFLOW ${locale} ${s.name}: ${scrollWidth} > ${clientWidth}`);
      } else {
        console.log(`ok ${locale} ${s.name}`);
      }
    } catch (err) {
      failures += 1;
      console.log(`FAIL ${locale} ${s.name}: ${String(err).slice(0, 100)}`);
    }
  }
  await page.close();
}

await browser.close();
console.log(failures === 0 ? 'ALL CLEAN' : `FAILURES: ${failures}`);
process.exit(failures === 0 ? 0 : 1);
