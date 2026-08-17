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

    // Nickname and dietary turns are interactive question-card variants.
    await welcomeCta.click();
    const nicknameBubble = page.locator(
      '.tmm-food-profile > .fp-convo > .fp-convo__msg--assistant .fp-convo__bubble',
    );
    expect(await css(nicknameBubble, 'background-color')).toBe('rgb(177, 207, 122)');

    await page.getByLabel('ニックネーム').fill('ナナミ');
    await page.getByRole('button', { name: 'これでお願いします！' }).click();

    const questionBubble = page.locator(
      '.tmm-food-profile > .fp-convo > .fp-convo__msg--assistant .fp-convo__bubble',
    );
    expect(await css(questionBubble, 'background-color')).toBe('rgb(177, 207, 122)');

    const send = page.getByRole('button', { name: '送信' });
    expect(await css(send, 'background-color')).toBe('rgb(233, 129, 29)');
    expect(await css(send, 'font-weight')).toBe('400');

    // Pick a visible allergen so the completed turn produces an explicit user reply.
    const egg = page.getByRole('button', { name: /卵/ }).first();
    await egg.click();
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
