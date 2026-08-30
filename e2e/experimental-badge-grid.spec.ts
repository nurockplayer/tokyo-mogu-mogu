import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test('keeps the badge grid prototype isolated from the current binder', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/_preview/badge-grid');

  const preview = page.locator(
    '[data-screen="badge-grid-preview"][data-screen-active="true"]',
  );
  await expect(preview.getByRole('heading', { name: '食のバッジ' })).toBeVisible();
  await expect(preview.getByRole('heading', { name: '集めたバッジ' })).toBeVisible();
  await expect(preview.getByText('12')).toBeVisible();
  await expect(preview.getByText('/ 24')).toBeVisible();
  await expect(preview.getByText('次のバッジまであと 2 個！', { exact: true })).toHaveCount(2);
  await expect(preview.locator('.badge-grid-preview__card')).toHaveCount(9);
  await expect(preview.locator('.badge-grid-preview__card--locked')).toHaveCount(3);
  await expect(preview.locator('img[src*="badge-earned"]')).toHaveCount(2);
  await expect(preview.locator('img[src*="badge-yamame"]')).toHaveCount(2);
  await expect(preview.locator('img[src*="badge-edo-tokyo-vegetables"]')).toHaveCount(2);

  const dock = preview.getByRole('navigation', { name: 'Primary' });
  await expect(dock.getByRole('button', { name: 'マイ' })).toHaveAttribute(
    'aria-current',
    'page',
  );

  await page.goto('/badges');
  const binder = page.locator('[data-screen="badges"][data-screen-active="true"]');
  await expect(binder.locator('.issue-296-binder')).toBeVisible();
  await expect(binder.locator('.badge-grid-preview__grid')).toHaveCount(0);
});

test('has no horizontal overflow at 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto('/_preview/badge-grid');

  const widths = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    phone: document.querySelector<HTMLElement>('.reference-phone')?.scrollWidth,
    screen: document.querySelector<HTMLElement>(
      '[data-screen="badge-grid-preview"][data-screen-active="true"]',
    )?.scrollWidth,
  }));

  expect(widths).toEqual({ viewport: 375, document: 375, phone: 375, screen: 375 });
});
