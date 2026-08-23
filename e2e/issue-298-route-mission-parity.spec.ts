/**
 * Focused current-Product regression for Issue #298 Route card parity.
 *
 * Live KiKi Figma remains the visual authority. This protects Route cards
 * from reintroducing the removed localized Mission UI at the 375px baseline.
 */
import { expect, test } from '@playwright/test';

const locales = [
  {
    locale: 'ja',
    duration: ['半日', '一日'],
    mission: 'ミッション',
    share: 'ルートをシェア',
    save: 'マイルートに保存',
  },
  {
    locale: 'en',
    duration: ['Half day', 'Full day'],
    mission: 'Mission',
    share: 'Share route',
    save: 'Save to My Routes',
  },
  {
    locale: 'zh-TW',
    duration: ['半日', '一日'],
    mission: '任務',
    share: '分享路線',
    save: '儲存到我的行程',
  },
] as const;

test('keeps both canonical Route durations free of localized Mission tags at 375px (#298)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });

  for (const expected of locales) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/route?candidateId=demo-okutama-wasabi');

    const route = page.locator('[data-screen="route"][data-screen-active="true"]');
    await expect(route).toBeVisible();
    await expect(route.getByRole('button', { name: expected.share })).toBeEnabled();
    await expect(route.getByRole('button', { name: expected.save })).toBeEnabled();

    for (const duration of expected.duration) {
      await route.getByRole('button', { name: duration, exact: true }).click();
      await expect(route.locator('[data-spot-id]')).not.toHaveCount(0);
      await expect(route.getByText(expected.mission, { exact: true })).toHaveCount(0);
    }

    await route.locator('[data-spot-id]').first().click();
    await expect(page).toHaveURL(/\/spot\/[^?]+\?candidateId=demo-okutama-wasabi$/);
  }
});
