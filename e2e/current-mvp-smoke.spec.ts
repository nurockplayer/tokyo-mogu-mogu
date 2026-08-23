import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
});

test('keeps header/footer fixed while only the middle content scrolls', async ({ page }) => {
  const viewport = { width: 375, height: 812 };
  await page.setViewportSize(viewport);

  await page.goto('/explore');
  const explore = page.locator('[data-screen="explore"][data-screen-active="true"]');
  await expect(explore).toBeVisible();
  const exploreHead = explore.locator('.ghead');
  const exploreProgress = explore.locator('.progress');
  const exploreScroll = explore.locator('.wiz-body');

  const exploreBefore = {
    head: await exploreHead.boundingBox(),
    progress: await exploreProgress.boundingBox(),
    scrollMetrics: await exploreScroll.evaluate((element) => ({
      scrollHeight: element.scrollHeight,
      clientHeight: element.clientHeight,
      scrollTop: element.scrollTop,
    })),
  };

  expect(exploreBefore.scrollMetrics.scrollHeight).toBeGreaterThan(
    exploreBefore.scrollMetrics.clientHeight,
  );
  expect(exploreBefore.head).toMatchObject({ y: 0 });
  expect(exploreBefore.progress?.y).toBeGreaterThanOrEqual(viewport.height - 110);

  await exploreScroll.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });

  const exploreAfter = {
    head: await exploreHead.boundingBox(),
    progress: await exploreProgress.boundingBox(),
    scrollTop: await exploreScroll.evaluate((element) => element.scrollTop),
  };

  expect(Math.round(await page.evaluate(() => window.scrollY))).toBe(0);
  expect(exploreAfter.scrollTop).toBeGreaterThan(exploreBefore.scrollMetrics.scrollTop);
  expect(exploreAfter.head?.y).toBeCloseTo(exploreBefore.head?.y ?? 0, 1);
  expect(exploreAfter.progress?.y).toBeCloseTo(exploreBefore.progress?.y ?? 0, 1);

  await page.goto('/explore/result');
  const result = page.locator('[data-screen="result"][data-screen-active="true"]');
  await expect(result).toBeVisible();
  const resultHead = result.locator('.ghead');
  const resultProgress = result.locator('.progress');
  const resultScroll = result.locator('.scroll');

  const resultBefore = {
    head: await resultHead.boundingBox(),
    progress: await resultProgress.boundingBox(),
    scrollMetrics: await resultScroll.evaluate((element) => ({
      scrollHeight: element.scrollHeight,
      clientHeight: element.clientHeight,
      scrollTop: element.scrollTop,
    })),
  };

  expect(resultBefore.scrollMetrics.scrollHeight).toBeGreaterThan(
    resultBefore.scrollMetrics.clientHeight,
  );
  expect(resultBefore.progress?.y).toBeGreaterThanOrEqual(viewport.height - 110);
  expect(resultBefore.progress?.y + (resultBefore.progress?.height ?? 0)).toBeCloseTo(
    viewport.height,
    0,
  );

  await resultScroll.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });

  const resultAfter = {
    head: await resultHead.boundingBox(),
    progress: await resultProgress.boundingBox(),
    scrollTop: await resultScroll.evaluate((element) => element.scrollTop),
  };

  expect(resultAfter.scrollTop).toBeGreaterThan(resultBefore.scrollMetrics.scrollTop);
  expect(Math.round(await page.evaluate(() => window.scrollY))).toBe(0);
  expect(resultAfter.head?.y).toBeCloseTo(resultBefore.head?.y ?? 0, 1);
  expect(resultAfter.progress?.y).toBeCloseTo(resultBefore.progress?.y ?? 0, 1);
});

test('exposes the current Food Profile and exploration search states', async ({ page }) => {
  await page.goto('/food-profile');

  const profile = page.locator('[data-screen="food-profile"][data-screen-active="true"]');
  await expect(profile).toBeVisible();
  await expect(page.locator('.locale-control')).toHaveCount(0);

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

test('matches the My and 食のバッジ navigation at 375px and 390px', async ({ page }) => {
  for (const width of [375, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/my');

    const my = page.locator('[data-screen="my"][data-screen-active="true"]');
    await expect(my.getByRole('heading', { name: 'マイページ' })).toBeVisible();
    await expect(page.locator('.locale-control')).toHaveCount(0);
    const myDock = my.getByRole('navigation', { name: 'Primary' });
    await expect(myDock.getByRole('button', { name: 'マイ' })).toHaveAttribute('aria-current', 'page');
    const dockBounds = await myDock.boundingBox();
    expect((dockBounds?.y ?? 0) + (dockBounds?.height ?? 0)).toBeCloseTo(844, 0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);

    await my.getByRole('button', { name: '食のバッジ' }).click();
    await expect(page).toHaveURL(/\/badges$/);

    const badges = page.locator('[data-screen="badges"][data-screen-active="true"]');
    await expect(badges.getByRole('heading', { name: '食のバッジ' })).toBeVisible();
    await expect(badges.getByText('1/100')).toBeVisible();
    await expect(badges.getByText('2026/08/23 獲得')).toBeVisible();

    await badges.getByRole('button', { name: '次のバッジ' }).click();
    await expect(badges).toHaveAttribute('data-badge-page', '2');
    await expect(badges.getByText('2/100')).toBeVisible();
    await expect(badges.getByText('まだバッジがありません')).toBeVisible();

    await badges.getByRole('button', { name: '前のバッジ' }).click();
    await expect(badges).toHaveAttribute('data-badge-page', '1');
    await badges.getByRole('button', { name: 'マイページに戻る' }).click();
    await expect(page).toHaveURL(/\/my$/);
  }
});

test('uses 言語設定 as the persisted language entry surface', async ({ page }) => {
  await page.goto('/my');
  const my = page.locator('[data-screen="my"][data-screen-active="true"]');

  await my.getByRole('button', { name: '言語設定' }).click();
  const languageDialog = my.getByRole('dialog', { name: '言語を選択' });
  await expect(languageDialog).toBeVisible();
  await languageDialog.getByRole('button', { name: 'English' }).click();

  await expect(my.getByRole('heading', { name: 'My' })).toBeVisible();
  await expect(page.locator('.locale-control')).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('tmm:locale'))).toBe('en');
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
