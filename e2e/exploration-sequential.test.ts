/**
 * Issue #230 regression gate — sequential conversational Exploration (375px, ja).
 *
 * Locks the LINE / ChatGPT-style progression contract: MOGU asks one question,
 * the user selects one quick reply, that reply becomes a single user bubble, and
 * only then does the next question appear. Future questions must stay hidden
 * until their predecessor is answered, and the page-level `次へ` wizard button
 * must never be the normal progression mechanism.
 *
 * Interaction/state assertions only — no brittle full-page snapshots.
 */
import { test, expect, type Page } from '@playwright/test';

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

/** ja: complete the Food Profile conversation and reach the first Exploration step. */
async function reachExploration(page: Page): Promise<void> {
  await page.goto('/');
  await resetDemoState(page);
  await page.reload();
  await page.getByRole('link', { name: '食旅をはじめる' }).click();
  await page.waitForURL('**/food-profile');
  await page.getByRole('button', { name: 'はじめる！' }).click();
  await page.getByLabel('ニックネーム').fill('ナナミ');
  await page.getByTestId('fp-modal-submit').click();
  // Four-question dietary interview (presentation-only fixture).
  for (let i = 0; i < 4; i += 1) {
    await page.getByRole('button', { name: '送信' }).click();
  }
  await page.getByRole('button', { name: '保存してつぎへ' }).click();
  await page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }).click();
  await page.waitForURL('**/explore');
}

const departureQ = 'どこから出発しますか？';
const travelQ = '片道どのくらいまでなら';
const durationQ = 'どのくらいの時間で';
const tasteThemeQ = '味とモチーフ';

/** The six Experience presentation tiles (#230 requires them to be real controls). */
const EXPERIENCE_OPTIONS = ['食べる', '買う', '職人に会う', '作る', '食文化を学ぶ', '産地を訪ねる'];

const userBubbles = (page: Page) => page.locator('.fp-convo__msg--user');

test.describe('sequential Exploration (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('1. Departure is not visible before Experience is answered', async ({ page }) => {
    await reachExploration(page);

    // Only the active Experience turn is present; every later question is hidden.
    await expect(page.getByText('今回は、どんな食体験を')).toBeVisible();
    await expect(page.getByText(departureQ)).toHaveCount(0);
    await expect(page.getByText(travelQ)).toHaveCount(0);
    await expect(page.getByText(durationQ)).toHaveCount(0);
    await expect(page.getByText(tasteThemeQ)).toHaveCount(0);
  });

  test('2. Experience choices are interactive controls, not static text', async ({ page }) => {
    await reachExploration(page);

    for (const label of EXPERIENCE_OPTIONS) {
      const tile = page.getByRole('button', { name: label });
      await expect(tile).toBeVisible();
      await expect(tile).toBeEnabled();
    }
  });

  test('3. One selection creates exactly one user bubble and advances one turn', async ({
    page,
  }) => {
    await reachExploration(page);

    await page.getByRole('button', { name: '食べる' }).click();

    // Exactly one user-answer bubble, and only one step advanced.
    await expect(userBubbles(page)).toHaveCount(1);
    await expect(page.getByText(departureQ).first()).toBeVisible();
    await expect(page.getByText(travelQ)).toHaveCount(0);

    // The newly revealed MOGU turn is scrolled into the viewport.
    await expect
      .poll(async () => {
        const box = await page.getByText(departureQ).first().boundingBox();
        const innerHeight = await page.evaluate(() => window.innerHeight);
        return box !== null && box.y >= 40 && box.y < innerHeight;
      })
      .toBe(true);
  });

  test('4. Future questions stay hidden until their predecessor is answered', async ({
    page,
  }) => {
    await reachExploration(page);

    await page.getByRole('button', { name: '食べる' }).click();
    await expect(page.getByText(departureQ).first()).toBeVisible();
    await expect(page.getByText(travelQ)).toHaveCount(0);
    await expect(page.getByText(durationQ)).toHaveCount(0);

    await page.getByRole('button', { name: '東京都' }).click();
    await expect(page.getByText(travelQ).first()).toBeVisible();
    await expect(page.getByText(durationQ)).toHaveCount(0);

    await page.getByRole('button', { name: '1時間以内' }).click();
    await expect(page.getByText(durationQ).first()).toBeVisible();
    await expect(page.getByText(tasteThemeQ)).toHaveCount(0);

    await page.getByRole('button', { name: '半日' }).click();
    await expect(page.getByText(tasteThemeQ).first()).toBeVisible();
  });

  test('5. The full five-stage Exploration completes without the page-level 次へ', async ({
    page,
  }) => {
    await reachExploration(page);

    // No persistent page-level wizard CTA exists anywhere in the journey.
    const next = page.getByRole('button', { name: '次へ' });
    await expect(next).toHaveCount(0);

    // Experience → Departure → Travel → Duration advance by quick-reply tap.
    await page.getByRole('button', { name: '食べる' }).click();
    await expect(next).toHaveCount(0);
    await page.getByRole('button', { name: '東京都' }).click();
    await expect(next).toHaveCount(0);
    await page.getByRole('button', { name: '1時間以内' }).click();
    await expect(next).toHaveCount(0);
    await page.getByRole('button', { name: '半日' }).click();
    await expect(next).toHaveCount(0);

    // Taste + Theme is the only multi-select stage: its local confirm is
    // disabled until a selection exists, then commits to the Result.
    const confirm = page.getByRole('button', { name: '結果を見る' });
    await expect(confirm).toBeVisible();
    await expect(confirm).toBeDisabled();
    await page.getByRole('button', { name: 'さっぱりした味' }).click();
    await page.getByRole('button', { name: '自然' }).click();
    await expect(confirm).toBeEnabled();
    await confirm.click();

    await page.waitForURL('**/explore/result');
  });

  test('6. Rapid/double activation does not duplicate or skip turns', async ({ page }) => {
    await reachExploration(page);
    await page.getByRole('button', { name: '食べる' }).waitFor();

    // Two synchronous activations on the same Experience tile (as a fast double
    // tap would dispatch) must commit one answer and advance exactly one turn.
    await page.evaluate(() => {
      const tile = Array.from(document.querySelectorAll('.tmm-wizard__tile')).find(
        (el) => el.textContent?.includes('食べる'),
      ) as HTMLButtonElement | undefined;
      if (!tile) throw new Error('experience tile not found');
      tile.click();
      tile.click();
    });

    await expect(userBubbles(page)).toHaveCount(1);
    await expect(page.getByText(departureQ).first()).toBeVisible();
    await expect(page.getByText(travelQ)).toHaveCount(0);
  });

  test('7. Keyboard activation works for every quick reply', async ({ page }) => {
    await reachExploration(page);

    // Enter activates an Experience tile.
    await page.getByRole('button', { name: '食べる' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText(departureQ).first()).toBeVisible();

    // Space activates a Departure quick reply.
    await page.getByRole('button', { name: '東京都' }).focus();
    await page.keyboard.press('Space');
    await expect(page.getByText(travelQ).first()).toBeVisible();

    // Tab reaches the remaining quick replies in the active turn.
    await page.getByRole('button', { name: '1時間以内' }).focus();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: '1時間30分以内' })).toBeFocused();
  });
});
