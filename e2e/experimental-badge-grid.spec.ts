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
  await page.getByRole('button', { name: '地元グルメ入門' }).click();
  await expect(page.getByRole('dialog', { name: '地元グルメ入門' })).toBeVisible();

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

test('filters fixture badges and presents local-only badge details', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/_preview/badge-grid');

  const preview = page.locator(
    '[data-screen="badge-grid-preview"][data-screen-active="true"]',
  );

  await preview.getByRole('button', { name: '食べる' }).click();
  await expect(preview.getByRole('button', { name: '食べる' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(preview.locator('.badge-grid-preview__card')).toHaveCount(3);

  await preview.getByRole('button', { name: '地元グルメ入門' }).click();
  const earnedDialog = page.getByRole('dialog', { name: '地元グルメ入門' });
  await expect(earnedDialog).toContainText('獲得済み');
  await expect(earnedDialog).toContainText('実験用プレビュー');
  await earnedDialog.getByRole('button', { name: '閉じる' }).click();
  await expect(earnedDialog).toHaveCount(0);

  await preview.getByRole('button', { name: 'その他' }).click();
  await preview.getByRole('button', { name: '発酵食品ラバー（未獲得）' }).click();
  const lockedDialog = page.getByRole('dialog', { name: '発酵食品ラバー' });
  await expect(lockedDialog).toContainText('実験用の解除条件');
  await lockedDialog.getByRole('button', { name: '閉じる' }).click();

  await preview.getByRole('button', { name: 'バッジの進みかた' }).click();
  const progressDialog = page.getByRole('dialog', { name: 'バッジの進みかた' });
  await expect(progressDialog).toContainText('12 / 24');
  await expect(progressDialog).toContainText('実験用プレビュー');
});
