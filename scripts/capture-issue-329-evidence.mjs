import { chromium } from '@playwright/test';
import path from 'node:path';

const baseURL = process.env.ISSUE_329_PREVIEW_URL ?? 'http://127.0.0.1:4386';
const outputDirectory = path.resolve('docs/data-evidence/hikawa-location-safety');
const browser = await chromium.launch();

const captures = ['ja', 'en', 'zh-TW'].flatMap((locale) => [
  { locale, spotId: 'hikawa-valley', filename: `hikawa-valley-app-${locale}-375.webp`, height: 2300 },
  { locale, spotId: 'oku-hikawa-shrine', filename: `oku-hikawa-shrine-app-${locale}-375.webp`, height: 1800 },
  { locale, spotId: undefined, candidateId: 'demo-okutama-wasabi', filename: `route-wasabi-${locale}-375.webp`, height: 2400 },
  { locale, spotId: undefined, candidateId: 'demo-okutama-yamame', filename: `route-yamame-${locale}-375.webp`, height: 2200 },
]);

for (const capture of captures) {
  const context = await browser.newContext({
    locale: capture.locale === 'ja' ? 'ja-JP' : capture.locale === 'en' ? 'en-US' : 'zh-TW',
    viewport: { width: 375, height: capture.height },
    reducedMotion: 'reduce',
  });
  await context.addInitScript((selectedLocale) => {
    localStorage.setItem('tmm:locale', selectedLocale);
  }, capture.locale);
  const page = await context.newPage();
  const pathName = capture.spotId ? `/spot/${capture.spotId}` : '/route';
  await page.goto(`${baseURL}${pathName}?candidateId=${capture.candidateId ?? 'demo-okutama-wasabi'}`, {
    waitUntil: 'networkidle',
  });
  const screen = page.locator(
    capture.spotId
      ? '[data-screen="spot"][data-screen-active="true"]'
      : '[data-screen="route"][data-screen-active="true"]',
  );
  await screen.waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: path.join(outputDirectory, capture.filename),
    type: 'webp',
    quality: 88,
    fullPage: true,
  });
  await context.close();
}

await browser.close();
