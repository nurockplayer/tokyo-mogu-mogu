import { expect, test, type Locator } from '@playwright/test';

const WHITE = 'rgb(255, 255, 255)';
const DARK_ORANGE_FOREGROUND = 'rgb(58, 58, 48)';

async function expectForeground(locator: Locator, color: string) {
  await expect.soft(locator).toHaveCSS('color', color, { timeout: 1_500 });
}

function expectCloseTo(actual: number, expected: number, tolerance = 1) {
  expect(actual).toBeGreaterThanOrEqual(expected - tolerance);
  expect(actual).toBeLessThanOrEqual(expected + tolerance);
}

async function expectFigmaModalInputAppearance(input: Locator, field: Locator) {
  await expect(input).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(input).toHaveCSS('border-top-color', 'rgba(0, 0, 0, 0)');
  await expect(input).toHaveCSS('outline-style', 'none');
  await expect(field).toHaveCSS('background-color', 'rgb(239, 239, 240)');
  await expect(field).toHaveCSS('outline-style', 'none');
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test('uses the live-Figma foreground on filled CTAs without recoloring orange route markers', async ({ page }) => {
  await page.goto('/food-profile');
  const profile = page.locator('[data-screen="food-profile"][data-screen-active="true"]');

  await expectForeground(profile.getByRole('button', { name: 'はじめる！' }), WHITE);
  await expectForeground(profile.getByRole('button', { name: '登録なし、自分で見てみる' }), 'rgb(94, 114, 57)');

  await profile.getByRole('button', { name: 'はじめる！' }).click();
  const nicknameDialog = profile.getByRole('dialog', { name: '私は...' });
  await expect(nicknameDialog).toBeVisible();
  await expectForeground(nicknameDialog.getByRole('button', { name: '送信' }), WHITE);

  await page.goto('/home');
  await expectForeground(page.locator('.letsgo'), WHITE);

  await page.goto('/explore');
  const next = page.locator('.wiz-nav .next');
  await expectForeground(next, WHITE);
  await page.locator('.exp-card').first().click();
  await next.click();
  await expectForeground(page.locator('.wiz-nav .prev'), WHITE);

  await page.goto('/explore/result');
  await expectForeground(page.getByRole('button', { name: 'もう一度食旅を見つけよう' }), WHITE);

  await page.goto('/story/wasabi-okutama');
  await expectForeground(
    page.getByRole('button', { name: 'この食文化の観光ルートを作成する' }),
    WHITE,
  );

  await page.goto('/route?candidateId=demo-okutama-wasabi');
  await expectForeground(page.locator('.day-toggle button.on'), WHITE);
  await expectForeground(page.getByRole('button', { name: /ルートを\s*再生成する/ }), WHITE);
  await expectForeground(page.getByRole('button', { name: 'マイルートに保存' }), WHITE);
  await expectForeground(page.getByRole('button', { name: 'マイルートを見る' }), WHITE);
  await expectForeground(page.locator('.tl-row .num:not(.start)').first(), DARK_ORANGE_FOREGROUND);
});

test('keeps autofocus typing-ready without splitting the Figma modal fields', async ({ page }) => {
  await page.goto('/food-profile');
  const profile = page.locator('[data-screen="food-profile"][data-screen-active="true"]');

  await profile.getByRole('button', { name: 'はじめる！' }).click();
  const nicknameInput = profile.getByRole('textbox', { name: 'ニックネームを入力' });
  const nicknameField = profile.locator('.profile-name-sentence');
  await expect(nicknameInput).toBeVisible();
  await expect(nicknameInput).toBeFocused();
  await expectFigmaModalInputAppearance(nicknameInput, nicknameField);

  await nicknameInput.click();
  await expect(nicknameInput).toBeFocused();
  await expectFigmaModalInputAppearance(nicknameInput, nicknameField);
  await nicknameInput.fill('ナ');
  await expect(nicknameInput).toHaveValue('ナ');
  await page.keyboard.press('Tab');
  const nicknameSend = profile.getByRole('dialog', { name: '私は...' }).getByRole('button', { name: '送信' });
  await expect(nicknameSend).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(nicknameInput).toBeFocused();
  await expectFigmaModalInputAppearance(nicknameInput, nicknameField);

  await nicknameInput.fill('');
  await nicknameSend.click();
  await expect(nicknameInput).toBeFocused();
  await expectFigmaModalInputAppearance(nicknameInput, nicknameField);

  await nicknameInput.fill('ナナミ');
  await profile.getByRole('dialog', { name: '私は...' }).getByRole('button', { name: '送信' }).click();
  const otherButton = profile.getByRole('button', { name: /その他/ });
  await expect(otherButton).toBeVisible({ timeout: 2_000 });
  await otherButton.click();

  const ingredientDialog = profile.getByRole('dialog', { name: '食材を入力してください' });
  const ingredientInput = ingredientDialog.getByRole('textbox', { name: '食材を入力してください' });
  const ingredientField = ingredientDialog.locator('.profile-other-field');
  await expect(ingredientInput).toBeVisible();
  await expect(ingredientInput).toBeFocused();
  await expectFigmaModalInputAppearance(ingredientInput, ingredientField);
  await expectForeground(ingredientDialog.getByRole('button', { name: '確定' }), WHITE);

  await ingredientInput.click();
  await expect(ingredientInput).toBeFocused();
  await expectFigmaModalInputAppearance(ingredientInput, ingredientField);

  await ingredientDialog.getByRole('button', { name: '確定' }).click();
  await expect(ingredientInput).toBeFocused();
  await expectFigmaModalInputAppearance(ingredientInput, ingredientField);
});

test('matches the shared Figma geometry for discovery cards, departure input, and result progress', async ({ page }) => {
  await page.goto('/explore');
  const explore = page.locator('[data-screen="explore"][data-screen-active="true"]');
  const cards = explore.locator('.exp-card');
  await expect(cards).toHaveCount(6);

  const cardGeometry = await cards.evaluateAll((nodes) => nodes.map((node) => {
    const card = node.getBoundingClientRect();
    const band = node.querySelector<HTMLElement>('.band')!.getBoundingClientRect();
    const image = node.querySelector<HTMLImageElement>('img')!.getBoundingClientRect();
    const title = node.querySelector('b')!.getBoundingClientRect();
    return {
      label: node.querySelector('b')?.textContent,
      card: { top: card.top, bottom: card.bottom, width: card.width, height: card.height },
      band: { bottom: band.bottom, height: band.height },
      image: { height: image.height },
      title: { top: title.top },
    };
  }));

  await expect(explore.locator('.exp-grid')).toHaveCSS('width', '279px');
  for (const geometry of cardGeometry) {
    expectCloseTo(geometry.card.width, 133.5);
    expectCloseTo(geometry.card.height, 168);
    expectCloseTo(geometry.band.bottom, geometry.card.bottom, 3);
    expect(geometry.image.height).toBeGreaterThan(100);
    expectCloseTo(geometry.title.top - geometry.card.top, 16);
  }
  for (const label of ['買う', '産地を訪ねる']) {
    const geometry = cardGeometry.find((card) => card.label === label);
    expect(geometry).toBeDefined();
    expectCloseTo(geometry!.card.height, 168);
    expectCloseTo(geometry!.band.bottom, geometry!.card.bottom, 3);
  }

  await cards.first().click();
  await explore.getByRole('button', { name: /次へ/ }).click();
  const departure = explore.locator('.searchbar');
  await expect(departure).toBeVisible();
  const departureBox = await departure.boundingBox();
  expect(departureBox).not.toBeNull();
  expectCloseTo(departureBox!.x, 16);
  expectCloseTo(departureBox!.width, 343);
  expectCloseTo(departureBox!.height, 52);

  await page.goto('/explore/result');
  const resultProgress = page.locator('[data-screen="result"][data-screen-active="true"] .result-progress');
  const plateware = resultProgress.locator('.plateware');
  await expect(plateware).toHaveCount(1);
  const plate = plateware.locator('.plate');
  const fork = plateware.locator('.fork');
  const [plateBox, forkBox] = await Promise.all([plate.boundingBox(), fork.boundingBox()]);
  expect(plateBox).not.toBeNull();
  expect(forkBox).not.toBeNull();
  expect(forkBox!.x).toBeGreaterThan(plateBox!.x);
  expect(forkBox!.x + forkBox!.width).toBeLessThan(plateBox!.x + plateBox!.width);
});
