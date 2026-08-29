import { expect, test, type Page } from '@playwright/test';

const persistedFoodProfile = {
  dietary: [],
  dietaryOther: '',
  hasNoRestrictions: true,
  savedAt: '2026-08-30T00:00:00.000Z',
  version: 1,
};

async function openAllergyQuestion(page: Page, locale = 'ja') {
  await page.addInitScript(({ profile, locale }) => {
    localStorage.setItem('tmm:nickname:v1', 'ナナ');
    localStorage.setItem('tmm:foodProfile:v1', JSON.stringify(profile));
    localStorage.setItem('tmm:locale', locale);
  }, { profile: persistedFoodProfile, locale });
  await page.goto('/food-profile/edit');

  const profile = page.locator('[data-screen="food-profile"][data-screen-active="true"]');
  const allergy = profile.locator('[data-question-index="0"]');
  await expect(allergy).toBeVisible();
  return { profile, allergy };
}

async function answerWithNone(page: Page, questionIndex: number, noneIndex: number) {
  const profile = page.locator('[data-screen="food-profile"][data-screen-active="true"]');
  const question = profile.locator(`[data-question-index="${questionIndex}"]`);
  await expect(question).toBeVisible();
  await question.locator('button.chip').nth(noneIndex).click();
  await question.locator('button.send').click();
  await expect(question).toHaveAttribute('data-frozen', 'true');
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))).toEqual({ clientWidth: 375, scrollWidth: 375 });
}

test('close button cancels an accidental Other input without changing the question', async ({ page }) => {
  const { profile, allergy } = await openAllergyQuestion(page);
  const egg = allergy.getByRole('button', { name: /卵/ });
  const other = allergy.getByRole('button', { name: /その他/ });

  await egg.click();
  await other.click();

  const dialog = profile.getByRole('dialog', { name: '食材を入力してください' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: '入力を閉じる' }).click();

  await expect(dialog).toBeHidden();
  await expect(other).toBeFocused();
  await expect(egg).toHaveAttribute('aria-pressed', 'true');
  await expect(allergy.getByRole('button', { name: 'アレルギー食材' })).toHaveCount(0);
});

test('backdrop cancels a temporary draft and keeps selection and scroll state', async ({ page }) => {
  const { profile, allergy } = await openAllergyQuestion(page);
  const egg = allergy.getByRole('button', { name: /卵/ });
  const other = allergy.getByRole('button', { name: /その他/ });
  const chat = profile.locator('.chat-body');

  await egg.click();
  const scrollTop = await chat.evaluate((element) => element.scrollTop);
  await other.click();

  const dialog = profile.getByRole('dialog', { name: '食材を入力してください' });
  await dialog.getByRole('textbox', { name: '食材を入力してください' }).fill('そば');
  await profile.locator('.profile-input-modal').click({ position: { x: 4, y: 4 } });

  await expect(dialog).toBeHidden();
  await expect(other).toBeFocused();
  await expect(egg).toHaveAttribute('aria-pressed', 'true');
  await expect(allergy.getByRole('button', { name: 'そば', exact: true })).toHaveCount(0);
  await expect.poll(() => chat.evaluate((element) => element.scrollTop)).toBe(scrollTop);
});

test('clicking inside keeps the dialog open while Escape cancels it', async ({ page }) => {
  const { profile, allergy } = await openAllergyQuestion(page);
  const other = allergy.getByRole('button', { name: /その他/ });
  await other.click();

  const dialog = profile.getByRole('dialog', { name: '食材を入力してください' });
  await dialog.locator('.profile-other-field').click();
  await expect(dialog).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(other).toBeFocused();
});

test('cancelling an edited draft preserves the previously confirmed custom value', async ({ page }) => {
  const { profile, allergy } = await openAllergyQuestion(page);
  const other = allergy.getByRole('button', { name: /その他/ });
  await other.click();

  let dialog = profile.getByRole('dialog', { name: '食材を入力してください' });
  await dialog.getByRole('textbox', { name: '食材を入力してください' }).fill('そば');
  await dialog.getByRole('button', { name: '確定', exact: true }).click();

  const committed = allergy.getByRole('button', { name: 'そば', exact: true });
  await expect(committed).toHaveAttribute('aria-pressed', 'true');
  await other.click();

  dialog = profile.getByRole('dialog', { name: '食材を入力してください' });
  const draft = dialog.getByRole('textbox', { name: '食材を入力してください' });
  await expect(draft).toHaveValue('そば');
  await draft.fill('くるみ');
  await dialog.getByRole('button', { name: '入力を閉じる' }).click();

  await expect(committed).toHaveAttribute('aria-pressed', 'true');
  await expect(allergy.getByRole('button', { name: 'くるみ', exact: true })).toHaveCount(0);
});

test('shared backdrop dismissal works for the English religion question at 375px', async ({ page }) => {
  const { profile } = await openAllergyQuestion(page, 'en');
  await answerWithNone(page, 0, 6);
  await answerWithNone(page, 1, 3);

  const religion = profile.locator('[data-question-index="2"]');
  const other = religion.getByRole('button', { name: /Other/ });
  await other.click();

  const dialog = profile.getByRole('dialog', { name: 'Enter an ingredient' });
  const close = dialog.getByRole('button', { name: 'Close input' });
  await expect(close).toBeVisible();
  await expect.poll(async () => {
    const box = await close.boundingBox();
    return box ? { width: box.width, height: box.height } : null;
  }).toEqual({ width: 44, height: 44 });
  await dialog.locator('.profile-other-field').click();
  await expect(dialog).toBeVisible();
  await profile.locator('.profile-input-modal').click({ position: { x: 4, y: 4 } });
  await expect(dialog).toBeHidden();
  await expect(other).toBeFocused();
  await expectNoHorizontalOverflow(page);
});

test('shared Escape dismissal works for the Traditional Chinese dislike question at 375px', async ({ page }) => {
  const { profile } = await openAllergyQuestion(page, 'zh-TW');
  await answerWithNone(page, 0, 6);
  await answerWithNone(page, 1, 3);
  await answerWithNone(page, 2, 4);

  const dislike = profile.locator('[data-question-index="3"]');
  const other = dislike.getByRole('button', { name: /其他/ });
  await other.click();

  const dialog = profile.getByRole('dialog', { name: '請輸入食材' });
  await expect(dialog.getByRole('button', { name: '關閉輸入' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(other).toBeFocused();
  await expectNoHorizontalOverflow(page);
});

test('desktop keeps the shared close target reachable inside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const { profile, allergy } = await openAllergyQuestion(page);
  await allergy.getByRole('button', { name: /その他/ }).click();

  const dialog = profile.getByRole('dialog', { name: '食材を入力してください' });
  const close = dialog.getByRole('button', { name: '入力を閉じる' });
  const box = await close.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(1280);
  expect(box!.y + box!.height).toBeLessThanOrEqual(900);
});
