import { chromium } from '@playwright/test';
import path from 'node:path';

const baseURL = process.env.ISSUE_348_PREVIEW_URL ?? 'http://127.0.0.1:4384';
const outputDirectory = path.resolve('docs/data-evidence/ome-sake');
const browser = await chromium.launch();

const captures = [
  ['ja', 'mogu', '/mogu', 'mogu-ja-375.webp'],
  ['ja', 'story', '/story/sake-ome?candidateId=demo-ome-sake', 'story-ja-375.webp'],
  ['ja', 'route', '/route?candidateId=demo-ome-sake', 'route-ja-375.webp'],
  ['ja', 'spot', '/spot/sawai-ozawa-shuzo?candidateId=demo-ome-sake', 'spot-ozawa-ja-375.webp'],
  ['en', 'story', '/story/sake-ome?candidateId=demo-ome-sake', 'story-en-375.webp'],
  ['en', 'route', '/route?candidateId=demo-ome-sake', 'route-en-375.webp'],
  ['en', 'spot', '/spot/sawai-ozawa-shuzo?candidateId=demo-ome-sake', 'spot-ozawa-en-375.webp'],
  ['zh-TW', 'story', '/story/sake-ome?candidateId=demo-ome-sake', 'story-zh-TW-375.webp'],
  ['zh-TW', 'route', '/route?candidateId=demo-ome-sake', 'route-zh-TW-375.webp'],
  ['zh-TW', 'spot', '/spot/sawai-ozawa-shuzo?candidateId=demo-ome-sake', 'spot-ozawa-zh-TW-375.webp'],
];

for (const [locale, screen, pathname, filename] of captures) {
  const context = await browser.newContext({
    locale: locale === 'ja' ? 'ja-JP' : locale === 'en' ? 'en-US' : 'zh-TW',
    viewport: { width: 375, height: 812 },
    reducedMotion: 'reduce',
  });
  await context.addInitScript((selectedLocale) => {
    localStorage.setItem('tmm:locale', selectedLocale);
  }, locale);
  const page = await context.newPage();
  await page.goto(`${baseURL}${pathname}`, { waitUntil: 'networkidle' });
  await page.locator(`[data-screen="${screen}"][data-screen-active="true"]`).waitFor();
  if (screen === 'mogu') {
    await page.locator('[data-journey-id="demo-ome-sake"]').scrollIntoViewIfNeeded();
  }
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: path.join(outputDirectory, filename),
    type: 'webp',
    quality: 88,
    fullPage: true,
  });
  await context.close();
}

await browser.close();
