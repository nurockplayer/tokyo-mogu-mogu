import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
});

test('shows the language selector only in My', async ({ page }) => {
  for (const path of [
    '/food-profile',
    '/home',
    '/explore',
    '/explore/result',
    '/story/wasabi-okutama',
    '/route',
    '/spot/okutama-tourism-office',
    '/mogu',
    '/my-route',
  ]) {
    await page.goto(path);
    await expect(page.locator('.locale-control:visible')).toHaveCount(0);
  }

  await page.goto('/my');

  const my = page.locator('[data-screen="my"][data-screen-active="true"]');
  const language = my.getByRole('combobox', { name: '表示言語' });

  await expect(language).toHaveCount(1);
  await expect(language.locator('option')).toHaveText(['日本語', 'English', '繁體中文']);
});

test('changes locale immediately and restores it after reload', async ({ page }) => {
  await page.goto('/my');

  const my = page.locator('[data-screen="my"][data-screen-active="true"]');
  const language = my.getByRole('combobox', { name: '表示言語' });

  await language.selectOption('en');
  await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', 'en');
  await expect(my.getByRole('combobox', { name: 'Language' })).toHaveValue('en');
  await expect(my.locator('.ghead')).toHaveText('My');

  await my.getByRole('combobox', { name: 'Language' }).selectOption('zh-TW');
  await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', 'zh-TW');
  await expect(my.getByRole('combobox', { name: '顯示語言' })).toHaveValue('zh-TW');
  await expect(my.locator('.ghead')).toHaveText('我的');

  await page.reload();

  await expect(page).toHaveURL(/\/my$/);
  await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', 'zh-TW');
  await expect(my.getByRole('combobox', { name: '顯示語言' })).toHaveValue('zh-TW');

  await my.getByRole('combobox', { name: '顯示語言' }).selectOption('ja');
  await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', 'ja');
  await expect(my.getByRole('combobox', { name: '表示言語' })).toHaveValue('ja');
  await expect(my.locator('.ghead')).toHaveText('マイページ');
});

test('keeps My within the 375px viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/my');

  const my = page.locator('[data-screen="my"][data-screen-active="true"]');
  await expect(my).toBeVisible();

  expect(await my.evaluate((screen) => screen.scrollWidth <= screen.clientWidth)).toBe(true);
  expect(await page.locator('.reference-phone').evaluate(
    (phone) => phone.scrollWidth <= phone.clientWidth,
  )).toBe(true);
});
