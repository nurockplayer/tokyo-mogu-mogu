import { chromium } from '@playwright/test';
import path from 'node:path';

const baseURL = process.env.ISSUE_328_PREVIEW_URL ?? 'http://127.0.0.1:4385';
const outputDirectory = path.resolve('docs/data-evidence/wasabi-experience');
const browser = await chromium.launch();

const captures = ['ja', 'en', 'zh-TW'].flatMap((locale) => [
  { locale, screen: 'story', path: '/story/wasabi-okutama?candidateId=demo-okutama-wasabi', filename: `story-app-${locale}-375.webp`, height: 812 },
  { locale, screen: 'route', path: '/route?candidateId=demo-okutama-wasabi', filename: `route-app-${locale}-375.webp`, height: 1600 },
  { locale, screen: 'spot', path: '/spot/wasabi-experience?candidateId=demo-okutama-wasabi', filename: `app-${locale}-375.webp`, height: 2600 },
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
  await page.goto(`${baseURL}${capture.path}`, { waitUntil: 'networkidle' });
  const activeScreen = page.locator(
    `[data-screen="${capture.screen}"][data-screen-active="true"]`,
  );
  await activeScreen.waitFor();
  if (capture.screen === 'route') {
    const fullDayLabel = capture.locale === 'en' ? 'Full day' : '一日';
    await activeScreen.getByRole('button', { name: fullDayLabel, exact: true }).click();
  }
  if (capture.screen === 'story') {
    await activeScreen.locator('[data-spot-id="wasabi-experience"]').scrollIntoViewIfNeeded();
    if (capture.locale === 'en') {
      await activeScreen.locator('.scroll').evaluate((scrollContainer) => {
        scrollContainer.scrollTop += 80;
      });
      await page.waitForTimeout(300);
    }
  }
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
