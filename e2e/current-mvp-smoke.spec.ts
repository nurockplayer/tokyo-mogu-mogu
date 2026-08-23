import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
});

test('exposes the current Food Profile and exploration search states', async ({ page }) => {
  await page.goto('/food-profile');

  const profile = page.locator('[data-screen="food-profile"][data-screen-active="true"]');
  await expect(profile).toBeVisible();
  await expect(page.getByRole('combobox', { name: '言語' })).toBeVisible();

  await page.goto('/explore');

  const exploration = page.locator('[data-screen="explore"][data-screen-active="true"]');
  await expect(exploration).toBeVisible();
  await expect(exploration.getByLabel('1 / 5')).toBeVisible();

  await exploration.getByRole('button', { name: /^食べる/ }).click();
  await exploration.getByRole('button', { name: '次へ', exact: true }).click();
  await expect(exploration.getByLabel('2 / 5')).toBeVisible();

  await exploration.locator('.searchbar').click();
  const departureDialog = exploration.getByRole('dialog', { name: 'エリアを検索' });
  await expect(departureDialog).toBeVisible();
  await expect(departureDialog.locator('li')).toHaveCount(0);

  await departureDialog
    .getByPlaceholder('エリア、場所、駅を入力')
    .fill('東京駅');
  await departureDialog
    .getByRole('button', { name: '東京駅（東京都 千代田区）' })
    .click();

  await expect(departureDialog).toBeHidden();
  await expect(exploration.getByRole('button', { name: '次へ', exact: true })).toBeEnabled();
});

test('walks the current Result to Spot path and Dock destinations', async ({ page }) => {
  await page.goto('/explore/result');

  const result = page.locator('[data-screen="result"][data-screen-active="true"]');
  const resultCards = result.getByRole('button', { name: /この物語を読む:/ });
  await expect(resultCards).toHaveCount(2);
  await resultCards.first().click();

  await expect(page).toHaveURL(/\/story\/wasabi-okutama$/);
  const story = page.locator('[data-screen="story"][data-screen-active="true"]');
  await expect(story.locator('[data-spot-id]')).toHaveCount(8);

  await story
    .getByRole('button', { name: 'この食文化の観光ルートを作成する' })
    .click();
  await expect(
    story.locator('[data-route-loading][data-loading="true"]'),
  ).toBeVisible();

  await expect(page).toHaveURL(/\/route\?candidateId=demo-okutama-wasabi$/, {
    timeout: 3_500,
  });
  const route = page.locator('[data-screen="route"][data-screen-active="true"]');
  await expect(route.getByRole('img', { name: 'ルートマップ' })).toBeVisible();
  await expect(route.locator('[data-spot-id]')).toHaveCount(7);

  await route.getByRole('button', { name: 'マイルートに保存' }).click();
  await expect(route.getByRole('button', { name: '保存済み' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  await route.getByRole('button', { name: /奥多摩観光案内所/ }).click();
  await expect(page).toHaveURL(
    /\/spot\/okutama-tourism-office\?candidateId=demo-okutama-wasabi$/,
  );

  const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
  await expect(spot.getByRole('heading', { name: '奥多摩観光案内所' })).toBeVisible();
  await expect(spot.getByRole('button', { name: '2/5' })).toBeVisible();

  await spot.getByRole('button', { name: 'お気に入りに保存' }).click();
  await expect(spot.getByRole('button', { name: 'お気に入りから削除' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  const spotDock = spot.getByRole('navigation', { name: 'Primary' });
  await expect(spotDock.getByRole('button')).toHaveCount(4);
  await expect(spotDock.getByRole('button', { name: '食旅を見つけ' })).toBeVisible();
  await expect(spotDock.getByRole('button', { name: 'モグモグる' })).toBeVisible();
  await expect(spotDock.getByRole('button', { name: 'お気に入り' })).toBeVisible();
  await expect(spotDock.getByRole('button', { name: 'マイ' })).toBeVisible();

  await spotDock.getByRole('button', { name: 'モグモグる' }).click();
  await expect(page).toHaveURL(/\/mogu$/);

  const mogu = page.locator('[data-screen="mogu"][data-screen-active="true"]');
  await mogu
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: 'お気に入り' })
    .click();
  await expect(page).toHaveURL(/\/my-route$/);

  const favorites = page.locator('[data-screen="favorites"][data-screen-active="true"]');
  await favorites
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: 'マイ' })
    .click();
  await expect(page).toHaveURL(/\/my$/);

  const my = page.locator('[data-screen="my"][data-screen-active="true"]');
  await my
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: '食旅を見つけ' })
    .click();
  await expect(page).toHaveURL(/\/home$/);
  await expect(page.locator('[data-screen="home"][data-screen-active="true"]')).toBeVisible();
});
