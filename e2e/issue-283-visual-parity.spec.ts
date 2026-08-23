import { expect, test, type Locator } from '@playwright/test';

const WHITE = 'rgb(255, 255, 255)';
const DARK_ORANGE_FOREGROUND = 'rgb(58, 58, 48)';

async function expectForeground(locator: Locator, color: string) {
  await expect.soft(locator).toHaveCSS('color', color, { timeout: 1_500 });
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

test('opens nickname and custom-ingredient modals unfocused, then refocuses invalid fields', async ({ page }) => {
  await page.goto('/food-profile');
  const profile = page.locator('[data-screen="food-profile"][data-screen-active="true"]');

  await profile.getByRole('button', { name: 'はじめる！' }).click();
  const nicknameInput = profile.getByRole('textbox', { name: 'ニックネームを入力' });
  await expect(nicknameInput).toBeVisible();
  await expect(nicknameInput).not.toBeFocused();

  await nicknameInput.click();
  await expect(nicknameInput).toBeFocused();
  await page.keyboard.press('Tab');
  const nicknameSend = profile.getByRole('dialog', { name: '私は...' }).getByRole('button', { name: '送信' });
  await expect(nicknameSend).toBeFocused();
  await expect(nicknameSend).toHaveCSS('outline-width', '3px');

  await nicknameSend.click();
  await expect(nicknameInput).toBeFocused();

  await nicknameInput.fill('ナナミ');
  await profile.getByRole('dialog', { name: '私は...' }).getByRole('button', { name: '送信' }).click();
  const otherButton = profile.getByRole('button', { name: /その他/ });
  await expect(otherButton).toBeVisible({ timeout: 2_000 });
  await otherButton.click();

  const ingredientDialog = profile.getByRole('dialog', { name: '食材を入力してください' });
  const ingredientInput = ingredientDialog.getByRole('textbox', { name: '食材を入力してください' });
  await expect(ingredientInput).toBeVisible();
  await expect(ingredientInput).not.toBeFocused();
  await expectForeground(ingredientDialog.getByRole('button', { name: '確定' }), WHITE);

  await ingredientDialog.getByRole('button', { name: '確定' }).click();
  await expect(ingredientInput).toBeFocused();
});
