import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const baseURL = process.env.ISSUE_330_PREVIEW_URL ?? 'http://127.0.0.1:4196';
const output = path.resolve('docs/data-evidence/route-aggregates');
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  for (const locale of ['ja', 'en', 'zh-TW']) {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
    await context.addInitScript((value) => localStorage.setItem('tmm:locale', value), locale);
    const page = await context.newPage();
    for (const [name, candidateId, fullDay, count] of [
      ['wasabi-half-day', 'demo-okutama-wasabi', false, 7],
      ['wasabi-full-day', 'demo-okutama-wasabi', true, 6],
      ['yamame-half-day', 'demo-okutama-yamame', false, 4],
    ]) {
      await page.goto(`${baseURL}/route?candidateId=${candidateId}`, { waitUntil: 'networkidle' });
      const screen = page.locator('[data-screen="route"][data-screen-active="true"]');
      if (fullDay) await screen.locator('.day-toggle button').nth(1).click();
      await expect(screen.locator('[data-spot-id]')).toHaveCount(count);
      await page.evaluate(() => document.fonts.ready);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(375);
      for (const [position, target] of [['access', '.route-info'], ['summary', '.route-stats']]) {
        await screen.locator(target).scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(output, `${name}-${locale}-${position}-375.webp`), type: 'webp', quality: 88 });
      }
    }
    await page.goto(`${baseURL}/explore/result?candidateId=demo-okutama-wasabi`, { waitUntil: 'networkidle' });
    const result = page.locator('[data-screen="result"][data-screen-active="true"]');
    await expect(result).toBeVisible();
    for (const name of ['wasabi', 'yamame']) {
      await result.locator(`[data-journey-id="demo-okutama-${name}"] .acc`).scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(output, `result-${name}-${locale}-375.webp`), type: 'webp', quality: 88 });
    }
    await context.close();
  }
} finally {
  await browser.close();
}
