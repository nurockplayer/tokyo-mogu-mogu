/**
 * Latest-KiKi-Figma visual contract gate for the Phase 1 conversation.
 *
 * This is intentionally a small computed-style test rather than a screenshot
 * snapshot: it locks only the high-confidence visual roles that were verified
 * from live Figma and leaves near-duplicate palette/token cleanup out of the
 * 8/23 presentation critical path.
 */
import { test, expect, type Locator, type Page } from '@playwright/test';

const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const MOGU_RECENT_KEY = 'tmm:moguRecent:v1';
const SAVED_ROUTES_KEY = 'tmm:savedRoutes';
const NICKNAME_KEY = 'tmm:nickname:v1';
const LOCALE_KEY = 'tmm:locale';
const TUTORIAL_KEY = 'tmm:tutorial:v1';

async function resetDemoState(page: Page): Promise<void> {
  await page.evaluate(([fp, recent, saved, nickname]) => {
    localStorage.removeItem(fp);
    localStorage.removeItem(recent);
    localStorage.removeItem(saved);
    localStorage.removeItem(nickname);
    sessionStorage.clear();
  }, [FOOD_PROFILE_KEY, MOGU_RECENT_KEY, SAVED_ROUTES_KEY, NICKNAME_KEY] as const);
}

async function css(locator: Locator, property: string): Promise<string> {
  return locator.evaluate((element, prop) => getComputedStyle(element).getPropertyValue(prop), property);
}

test.describe('latest KiKi Figma conversation visuals (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('bot/question/user roles and signature actions use the verified Figma values', async ({
    page,
  }) => {
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();
    await page.getByRole('link', { name: '食旅をはじめる' }).click();
    await page.waitForURL('**/food-profile');

    // Talk welcome: darker bot sage, 12px bubble padding, signature hard-shadow CTA.
    const welcomeBubble = page.locator(
      '.tmm-food-profile > .fp-convo > .fp-convo__msg--assistant .fp-convo__bubble',
    );
    await expect(welcomeBubble).toBeVisible();
    expect(await css(welcomeBubble, 'background-color')).toBe('rgb(157, 188, 100)');
    expect(await css(welcomeBubble, 'padding-top')).toBe('12px');
    expect(await css(welcomeBubble, 'padding-right')).toBe('12px');
    expect(await css(welcomeBubble, 'border-top-left-radius')).toBe('0px');
    expect(await css(welcomeBubble, 'border-top-right-radius')).toBe('10px');

    const welcomeCta = page.getByRole('button', { name: 'はじめる！' });
    expect(await css(welcomeCta, 'background-color')).toBe('rgb(102, 122, 71)');
    const welcomeShadow = await css(welcomeCta, 'box-shadow');
    expect(welcomeShadow).toContain('rgb(58, 85, 9)');
    expect(welcomeShadow).toContain('0px 4px');

    // Nickname opens the current Figma overlay composition.
    await welcomeCta.click();
    const nicknameModal = page.getByRole('dialog');
    await expect(nicknameModal).toBeVisible();
    expect(await css(page.locator('.fp-modal__backdrop'), 'background-color')).toBe(
      'rgba(136, 136, 136, 0.69)',
    );
    expect(await css(nicknameModal, 'width')).toBe('307px');
    expect(await css(nicknameModal, 'border-radius')).toBe('8px');
    expect(await css(nicknameModal.locator('.fp-modal__input'), 'height')).toBe('46px');
    expect(await css(nicknameModal.locator('.fp-modal__submit'), 'height')).toBe('54px');
    await expect(page.getByLabel('ニックネーム')).toBeFocused();

    await page.getByLabel('ニックネーム').fill('ナナミ');
    await page.getByTestId('fp-modal-submit').click();

    const questionBubble = page.locator(
      '.tmm-food-profile > .fp-convo > .fp-convo__msg--assistant .fp-convo__bubble',
    );
    expect(await css(questionBubble, 'background-color')).toBe('rgb(177, 207, 122)');

    const send = page.getByRole('button', { name: '送信' });
    expect(await css(send, 'background-color')).toBe('rgb(233, 129, 29)');
    expect(await css(send, 'font-weight')).toBe('400');

    // The first-run tutorial highlights the deterministic no-restrictions reply.
    await page.locator('[data-tutorial-target="true"]').click();
    await send.click();

    const completedBot = page.locator('.fp-chat .fp-convo__msg--assistant .fp-convo__bubble').last();
    expect(await css(completedBot, 'background-color')).toBe('rgb(157, 188, 100)');

    const userBubble = page.locator('.fp-chat .fp-convo__msg--user .fp-convo__bubble').last();
    await expect(userBubble).toBeVisible();
    expect(await css(userBubble, 'background-color')).toBe('rgb(255, 255, 255)');
    expect(await css(userBubble, 'color')).toBe('rgb(34, 34, 34)');
    expect(await css(userBubble, 'font-weight')).toBe('400');
    expect(await css(userBubble, 'padding-top')).toBe('12px');
  });
});

test.describe('current Figma Food Profile modal behavior (375px)', () => {
  const locales = [
    { value: 'ja', browserLocale: 'ja-JP', start: 'はじめる！', other: '✏️ その他' },
    { value: 'en', browserLocale: 'en-US', start: "Let's start!", other: '✏️ Other' },
    { value: 'zh-TW', browserLocale: 'zh-TW', start: '開始！', other: '✏️ 其他' },
  ] as const;

  for (const locale of locales) {
    test.describe(locale.value, () => {
      test.use({ locale: locale.browserLocale });

      test('opens with focus, cancels without advancing, and submits once', async ({ page }) => {
        await page.goto('/');
        await resetDemoState(page);
        await page.evaluate(([key, value]) => localStorage.setItem(key, value), [LOCALE_KEY, locale.value]);
        await page.goto('/food-profile');

        await page.getByRole('button', { name: locale.start }).click();
        const modal = page.getByRole('dialog');
        const input = page.getByTestId('fp-modal-input');
        const submit = page.getByTestId('fp-modal-submit');
        await expect(modal).toBeVisible();
        await expect(input).toBeFocused();

        // Tab never escapes behind the modal; the two Figma controls cycle.
        await input.press('Tab');
        await expect(submit).toBeFocused();
        await submit.press('Tab');
        await expect(input).toBeFocused();
        await input.fill('draft');
        await page.keyboard.press('Escape');
        await expect(modal).toBeHidden();
        await expect(page.getByTestId('fp-nickname-reopen')).toBeFocused();
        await expect.poll(() => page.evaluate((key) => localStorage.getItem(key), NICKNAME_KEY)).toBeNull();
        await expect(page.getByTestId('fp-interview-step-0')).toHaveCount(0);
        await expect(page.locator('.fp-chat .fp-convo__msg--user')).toHaveCount(1);

        // Reopening starts from the uncommitted value; cancellation did not
        // write nickname storage or advance the transcript.
        await page.getByTestId('fp-nickname-reopen').click();
        await expect(input).toHaveValue('');
        await input.fill('Nana');
        await page.evaluate(() => {
          const button = document.querySelector('[data-testid="fp-modal-submit"]') as HTMLButtonElement | null;
          button?.click();
          button?.click();
        });

        await expect(page.getByTestId('fp-interview-step-0')).toBeVisible();
        await expect(page.getByTestId('fp-interview-step-1')).toHaveCount(0);
        await expect(page.locator('.fp-chat .fp-convo__msg--user')).toHaveCount(2);
        await expect.poll(() => page.evaluate((key) => localStorage.getItem(key), NICKNAME_KEY)).toContain('Nana');
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      });

      test('free-input modal cancels safely and double submit advances one question', async ({ page }) => {
        await page.goto('/');
        await resetDemoState(page);
        await page.evaluate(([localeKey, value, tutorialKey]) => {
          localStorage.setItem(localeKey, value);
          sessionStorage.setItem(tutorialKey, 'complete');
        }, [LOCALE_KEY, locale.value, TUTORIAL_KEY] as const);
        await page.goto('/food-profile');
        await page.getByRole('button', { name: locale.start }).click();
        await page.getByTestId('fp-modal-submit').click();

        const q1 = page.getByTestId('fp-interview-step-0');
        await expect(q1).toBeVisible();
        await page.getByRole('button', { name: locale.other }).click();
        const modal = page.getByRole('dialog');
        const input = page.getByTestId('fp-modal-input');
        await expect(modal).toBeVisible();
        await expect(input).toBeFocused();
        await expect(input).toHaveAttribute('placeholder', locale.value === 'ja' ? 'アレルギー食材' : locale.value === 'en' ? 'Allergy ingredient' : '過敏食材');
        await expect(modal.getByRole('button', { name: locale.value === 'ja' ? '確定' : locale.value === 'en' ? 'Confirm' : '確認' })).toBeVisible();
        await input.fill('temporary ingredient');
        await page.locator('.fp-modal__backdrop').click({ position: { x: 2, y: 2 } });
        await expect(modal).toBeHidden();
        await expect(q1).toBeVisible();
        await expect(page.locator('.fp-chat .fp-convo__msg--user')).toHaveCount(2);

        // Reopen and commit once. The synchronous ref guard handles two
        // activations dispatched against the same live button.
        await page.getByRole('button', { name: locale.other }).click();
        await input.fill('confirmed ingredient');
        await page.evaluate(() => {
          const button = document.querySelector('[data-testid="fp-modal-submit"]') as HTMLButtonElement | null;
          button?.click();
          button?.click();
        });
        await expect(page.getByTestId('fp-interview-step-1')).toBeVisible();
        await expect(page.getByTestId('fp-interview-step-2')).toHaveCount(0);
        await expect(page.locator('.fp-chat .fp-convo__msg--user')).toHaveCount(3);
        await expect(page.locator('.fp-chat .fp-convo__msg--user').last()).toContainText(locale.other);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      });
    });
  }
});
