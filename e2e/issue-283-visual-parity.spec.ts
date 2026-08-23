import { expect, test, type Locator } from '@playwright/test';

const WHITE = 'rgb(255, 255, 255)';
const DARK_ORANGE_FOREGROUND = 'rgb(58, 58, 48)';
// Hopp live frame 4:2101 is 390px wide. Runtime is verified at 375px.
const FIGMA_TO_RUNTIME = 375 / 390;
// Live Figma Frame 256 (23:3206), rows 23:3203–23:3205.
const FIGMA_CARD = {
  gridLeft: 54,
  gridWidth: 279,
  gap: 12,
  width: 133.407958984375,
  height: 167.8358612060547,
  footer: { left: 1.7213973999023438, top: 127.3830795288086, width: 129.96517944335938, height: 38.73134231567383 },
} as const;
// Live selected card group 23:3188; selected Rectangle 6 (4:2318), copy (4:2333),
// and green footer Rectangle 7 (4:2326). Unlike the normal card groups, its bounds differ.
const FIGMA_SELECTED_CARD = {
  width: 133.432861328125,
  height: 166.49986267089844,
  copy: { left: 4.432861328125, top: 17.33599853515625, width: 125, height: 53, subtitleOffset: 38 },
  footer: { left: 1.432861328125, top: 126.33599853515625, width: 130, height: 39 },
} as const;
// Normal copy Frame 4:2372 (the same bounds as 4:2339, 4:2383, 8:2392, and 23:3880).
const FIGMA_NORMAL_COPY = {
  left: 4.3034868240356445,
  top: 18.074621200561523,
  width: 124.80099487304688,
  height: 52.50248718261719,
  subtitleOffset: 38,
} as const;
// Live Figma illustration nodes. `make` x is derived from its centered 106.726px
// rotated node 4:2349: (133.407958984375 - 106.72636413574219) / 2.
const FIGMA_ILLUSTRATIONS = {
  eat: { nodeId: '4:2313', left: -1.2752069234848022, top: 50.11709213256836, width: 132.54725646972656, height: 132.54725646972656 },
  make: { nodeId: '4:2349', left: 13.340797424316406, top: 61.970149993896484, width: 106.72636413574219, height: 106.72636413574219 },
  buy: { nodeId: '4:2375', left: 9.467669934034348, top: 61.970136895775795, width: 114.4726333618164, height: 114.4726333618164 },
  meet: { nodeId: '8:2417', left: 29, top: 84.83580996096134, width: 76, height: 65 },
  visit: { nodeId: '8:2423', left: 10.572147816419601, top: 66.99999453127384, width: 112, height: 112 },
  learn: { nodeId: '23:3884', left: 26.592041462659836, top: 84.32836367189884, width: 80, height: 68 },
} as const;

async function expectForeground(locator: Locator, color: string) {
  await expect.soft(locator).toHaveCSS('color', color, { timeout: 1_500 });
}

function expectCloseTo(actual: number, expected: number, tolerance = 1) {
  expect(actual).toBeGreaterThanOrEqual(expected - tolerance);
  expect(actual).toBeLessThanOrEqual(expected + tolerance);
}

async function experienceLayoutAt(page: import('@playwright/test').Page, viewportWidth: number) {
  await page.setViewportSize({ width: viewportWidth, height: 812 });
  await page.goto('/explore');
  return page.evaluate(() => {
    const phone = document.querySelector<HTMLElement>('.reference-phone')!.getBoundingClientRect();
    const grid = document.querySelector<HTMLElement>('.exp-grid')!.getBoundingClientRect();
    const card = document.querySelector<HTMLElement>('.exp-card')!.getBoundingClientRect();
    return {
      phoneWidth: phone.width,
      grid: { left: grid.left - phone.left, width: grid.width },
      card: { width: card.width, height: card.height },
    };
  });
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

test('matches Hopp Figma card geometry, departure input, and result progress at 375px', async ({ page }) => {
  await page.goto('/explore');
  const explore = page.locator('[data-screen="explore"][data-screen-active="true"]');
  const cards = explore.locator('.exp-card');
  await expect(cards).toHaveCount(6);

  const cardGeometry = await cards.evaluateAll((nodes) => nodes.map((node) => {
    const card = node.getBoundingClientRect();
    const band = node.querySelector<HTMLElement>('.band')!.getBoundingClientRect();
    const image = node.querySelector<HTMLImageElement>('img')!.getBoundingClientRect();
    const title = node.querySelector('b')!.getBoundingClientRect();
    const subtitle = node.querySelector('p')!.getBoundingClientRect();
    return {
      id: node.getAttribute('data-experience-id'),
      card: { top: card.top, bottom: card.bottom, width: card.width, height: card.height },
      band: { left: band.left - card.left, top: band.top - card.top, width: band.width, height: band.height },
      image: { left: image.left - card.left, top: image.top - card.top, width: image.width, height: image.height },
      title: { left: title.left - card.left, top: title.top - card.top, width: title.width, height: title.height },
      subtitle: { left: subtitle.left - card.left, top: subtitle.top - card.top, width: subtitle.width, height: subtitle.height },
    };
  }));

  const scale = FIGMA_TO_RUNTIME;
  const gridBox = await explore.locator('.exp-grid').boundingBox();
  expect(gridBox).not.toBeNull();
  expectCloseTo(gridBox!.x, FIGMA_CARD.gridLeft * scale, 0.25);
  expectCloseTo(gridBox!.width, FIGMA_CARD.gridWidth * scale, 0.25);
  for (const geometry of cardGeometry) {
    const selected = geometry.id === 'eat';
    const expectedCard = selected ? FIGMA_SELECTED_CARD : FIGMA_CARD;
    const expectedFooter = selected ? FIGMA_SELECTED_CARD.footer : FIGMA_CARD.footer;
    const expectedCopy = selected ? FIGMA_SELECTED_CARD.copy : FIGMA_NORMAL_COPY;
    expectCloseTo(geometry.card.width, expectedCard.width * scale);
    expectCloseTo(geometry.card.height, expectedCard.height * scale);
    expectCloseTo(geometry.band.left, expectedFooter.left * scale);
    expectCloseTo(geometry.band.top, expectedFooter.top * scale);
    expectCloseTo(geometry.band.width, expectedFooter.width * scale);
    expectCloseTo(geometry.band.height, expectedFooter.height * scale);
    expectCloseTo(geometry.title.left, expectedCopy.left * scale);
    expectCloseTo(geometry.title.top, expectedCopy.top * scale);
    expectCloseTo(geometry.title.width, expectedCopy.width * scale);
    expectCloseTo(geometry.subtitle.left, expectedCopy.left * scale);
    expectCloseTo(geometry.subtitle.top, (expectedCopy.top + expectedCopy.subtitleOffset) * scale);
    expectCloseTo(geometry.subtitle.width, expectedCopy.width * scale);
    const illustration = FIGMA_ILLUSTRATIONS[geometry.id as keyof typeof FIGMA_ILLUSTRATIONS];
    expect(illustration).toBeDefined();
    expectCloseTo(geometry.image.left, illustration.left * scale);
    expectCloseTo(geometry.image.top, illustration.top * scale);
    expectCloseTo(geometry.image.width, illustration.width * scale);
    expectCloseTo(geometry.image.height, illustration.height * scale);
  }
  for (const id of ['buy', 'visit']) {
    const geometry = cardGeometry.find((card) => card.id === id);
    expect(geometry).toBeDefined();
    expectCloseTo(geometry!.image.width, FIGMA_ILLUSTRATIONS[id].width * scale);
    expectCloseTo(geometry!.image.height, FIGMA_ILLUSTRATIONS[id].height * scale);
  }
  // Selected treatment: live Figma Rectangle 6 (4:2318) has a #667A48 2px inside stroke.
  const eat = cards.first();
  expect(await eat.evaluate((node) => getComputedStyle(node).boxShadow)).toContain('rgb(102, 122, 72)');

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

test('sizes Figma experience geometry from the phone container at mobile and desktop viewports', async ({ page }) => {
  for (const viewportWidth of [375, 430, 768]) {
    const layout = await experienceLayoutAt(page, viewportWidth);
    const phoneWidth = Math.min(viewportWidth, 430);
    const scale = phoneWidth / 390;

    expectCloseTo(layout.phoneWidth, phoneWidth, 0.01);
    expectCloseTo(layout.grid.left, FIGMA_CARD.gridLeft * scale, 0.25);
    expectCloseTo(layout.grid.width, FIGMA_CARD.gridWidth * scale, 0.25);
    expectCloseTo(layout.card.width, FIGMA_SELECTED_CARD.width * scale, 0.25);
    expectCloseTo(layout.card.height, FIGMA_SELECTED_CARD.height * scale, 0.25);
  }
});

test('keeps translated experience-card titles and subtitles fully visible at 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });

  for (const locale of ['en', 'zh-TW'] as const) {
    await page.goto('/explore');
    await page.locator('.locale-control select').selectOption(locale);
    await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', locale);

    const textBounds = await page.locator('.exp-card').evaluateAll((cards) => cards.flatMap((card) => {
      const cardBox = card.getBoundingClientRect();
      return Array.from(card.querySelectorAll<HTMLElement>('b, p')).map((text) => {
        const box = text.getBoundingClientRect();
        const style = getComputedStyle(text);
        return {
          clientWidth: text.clientWidth,
          scrollWidth: text.scrollWidth,
          visible: style.visibility !== 'hidden' && style.display !== 'none' && Number(style.opacity) > 0,
          contained: box.left >= cardBox.left && box.right <= cardBox.right && box.top >= cardBox.top && box.bottom <= cardBox.bottom,
        };
      });
    }));

    expect(textBounds).toHaveLength(12);
    for (const text of textBounds) {
      expect(text.visible).toBe(true);
      expect(text.scrollWidth).toBeLessThanOrEqual(text.clientWidth);
      expect(text.contained).toBe(true);
    }
  }
});
