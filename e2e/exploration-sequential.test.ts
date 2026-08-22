/**
 * Issue #230 / #268 regression gate — sequential trip diagnosis (375px, ja).
 *
 * Locks the standalone repeatable diagnosis contract: only one question screen
 * is shown at a time. Guided first use advances from its one highlighted
 * selection; normal/repeat use retains the selected state and advances only
 * from the Figma Next/Back action stack.
 *
 * Interaction/state assertions only — no brittle full-page snapshots.
 */
import { test, expect, type Page } from '@playwright/test';

const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const MOGU_RECENT_KEY = 'tmm:moguRecent:v1';
const SAVED_ROUTES_KEY = 'tmm:savedRoutes';
const NICKNAME_KEY = 'tmm:nickname:v1';
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

/** ja: complete Food Profile onboarding and reach the first diagnosis screen. */
async function reachExploration(page: Page): Promise<void> {
  await page.goto('/');
  await resetDemoState(page);
  await page.reload();
  await page.getByRole('link', { name: '食旅をはじめる' }).click();
  await page.waitForURL('**/food-profile');
  await page.getByRole('button', { name: 'はじめる！' }).click();
  await page.getByLabel('ニックネーム').fill('ナナミ');
  await page.getByTestId('fp-modal-submit').click();
  // Four-question first-run tutorial: choose the highlighted "none" reply,
  // then use the highlighted Send action for each turn.
  for (let i = 0; i < 4; i += 1) {
    await page.locator('[data-tutorial-target="true"]').click();
    await page.locator('[data-tutorial-target="true"]').click();
  }
  await page.getByRole('button', { name: '保存してつぎへ' }).click();
  await page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }).click();
  await page.waitForURL('**/explore');
}

/** Reach unrestricted Exploration after first-run tutorial completion. */
async function reachFreeExploration(page: Page): Promise<void> {
  await page.goto('/');
  await resetDemoState(page);
  await page.evaluate(([profileKey, nicknameKey, tutorialKey]) => {
    localStorage.setItem(
      profileKey,
      JSON.stringify({
        dietary: [],
        dietaryOther: '',
        hasNoRestrictions: true,
        savedAt: '2026-08-20T00:00:00.000Z',
        version: 1,
      }),
    );
    localStorage.setItem(nicknameKey, 'ナナミ');
    sessionStorage.setItem(tutorialKey, 'complete');
  }, [FOOD_PROFILE_KEY, NICKNAME_KEY, TUTORIAL_KEY] as const);
  await page.goto('/explore');
}

const departureQ = 'どこから出発しますか？';
const travelQ = '片道どのくらいまでなら';
const travelAccessibleName = '片道どのくらいまでなら移動できそうですか？';
const durationQ = 'どのくらいの時間で';
const tasteThemeQ = '味とモチーフ';

/** The six Experience presentation tiles (#230 requires them to be real controls). */
const EXPERIENCE_OPTIONS = ['食べる', '買う', '職人に会う', '作る', '食文化を学ぶ', '産地を訪ねる'];

test.describe('sequential repeatable diagnosis (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('1. Departure is not visible before Experience is answered', async ({ page }) => {
    await reachExploration(page);

    // Only the active Experience screen is present; every later question is hidden.
    await expect(page.getByTestId('diagnosis-session')).toBeVisible();
    await expect(page.locator('.fp-chat, .fp-convo__msg')).toHaveCount(0);
    await expect(page.getByText('今回は、どんな食体験を')).toBeVisible();
    await expect(page.getByText(departureQ)).toHaveCount(0);
    await expect(page.getByText(travelQ)).toHaveCount(0);
    await expect(page.getByText(durationQ)).toHaveCount(0);
    await expect(page.getByText(tasteThemeQ)).toHaveCount(0);
  });

  test('2. Repeat-mode selection stays visible until Next is pressed', async ({ page }) => {
    await reachFreeExploration(page);

    for (const label of EXPERIENCE_OPTIONS) {
      const tile = page.getByRole('button', { name: label });
      await expect(tile).toBeVisible();
      await expect(tile).toBeEnabled();
    }

    const next = page.getByRole('button', { name: '次へ' });
    await expect(next).toBeVisible();
    await expect(next).toBeDisabled();

    const eat = page.getByRole('button', { name: '食べる' });
    await eat.click();

    await expect(eat).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByText('今回は、どんな食体験を')).toBeVisible();
    await expect(page.getByText(departureQ)).toHaveCount(0);
    await expect(next).toBeEnabled();

    await next.click();
    await expect(page.getByText(departureQ).first()).toBeVisible();
  });

  test('3. Guided selection advances exactly one standalone diagnosis screen', async ({
    page,
  }) => {
    await reachExploration(page);

    await page.getByRole('button', { name: '食べる' }).click();

    // The prior screen is replaced and only one step advances.
    await expect(page.getByText('今回は、どんな食体験を')).toHaveCount(0);
    await expect(page.getByText(departureQ).first()).toBeVisible();
    await expect(page.getByText(travelQ)).toHaveCount(0);

    // The newly revealed diagnosis screen is scrolled into the viewport.
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

  test('5. Repeat-mode keyboard selection waits for keyboard activation of Next', async ({ page }) => {
    await reachFreeExploration(page);

    const eat = page.getByRole('button', { name: '食べる' });
    await eat.focus();
    await page.keyboard.press('Enter');

    await expect(eat).toBeFocused();
    await expect(eat).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByText(departureQ)).toHaveCount(0);

    const next = page.getByRole('button', { name: '次へ' });
    await next.focus();
    await page.keyboard.press('Enter');

    const departureScreen = page.getByRole('region', { name: departureQ });
    await expect(departureScreen).toBeFocused();
    await expect(departureScreen).toHaveAccessibleName(departureQ);

    const tokyo = page.getByRole('button', { name: '東京都' });
    await tokyo.focus();
    await page.keyboard.press('Space');

    await expect(tokyo).toBeFocused();
    await expect(tokyo).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByText(travelQ)).toHaveCount(0);

    await next.focus();
    await page.keyboard.press('Enter');

    const travelScreen = page.getByRole('region', { name: travelAccessibleName });
    await expect(travelScreen).toBeFocused();
    await expect(travelScreen).toHaveAccessibleName(travelAccessibleName);
  });

  test('6. Repeat mode uses Next/Back and preserves selections when moving backward', async ({
    page,
  }) => {
    await reachFreeExploration(page);

    const next = page.getByRole('button', { name: '次へ' });
    const back = page
      .getByTestId('diagnosis-session')
      .getByRole('button', { name: '戻る' });

    await page.getByRole('button', { name: '食べる' }).click();
    await next.click();

    await page.getByRole('button', { name: '東京都' }).click();
    await expect(page.getByText(departureQ).first()).toBeVisible();
    await expect(page.getByRole('button', { name: '東京都' })).toHaveAttribute('aria-pressed', 'true');
    await next.click();

    await back.click();
    await expect(page.getByText(departureQ).first()).toBeVisible();
    await expect(page.getByRole('button', { name: '東京都' })).toHaveAttribute('aria-pressed', 'true');
    await expect(next).toBeEnabled();
    await next.click();

    await page.getByRole('button', { name: '1時間以内' }).click();
    await next.click();

    await page.getByRole('button', { name: '半日' }).click();
    await next.click();

    await expect(next).toBeDisabled();
    await page.getByRole('button', { name: 'さっぱりした味' }).click();
    await page.getByRole('button', { name: '自然' }).click();
    await expect(next).toBeEnabled();
    await next.click();

    await page.waitForURL('**/explore/result');
  });

  test('6. Rapid/double activation does not duplicate or skip turns', async ({ page }) => {
    await reachExploration(page);
    await page.getByRole('button', { name: '食べる' }).waitFor();

    // Two synchronous activations on the same Experience tile (as a fast double
    // tap would dispatch) must commit one answer and advance exactly one screen.
    await page.evaluate(() => {
      const tile = Array.from(document.querySelectorAll('.tmm-wizard__tile')).find(
        (el) => el.textContent?.includes('食べる'),
      ) as HTMLButtonElement | undefined;
      if (!tile) throw new Error('experience tile not found');
      tile.click();
      tile.click();
    });

    await expect(page.getByText('今回は、どんな食体験を')).toHaveCount(0);
    await expect(page.getByText(departureQ).first()).toBeVisible();
    await expect(page.getByText(travelQ)).toHaveCount(0);

    await reachFreeExploration(page);
    await page.getByRole('button', { name: '食べる' }).click();
    await page.evaluate(() => {
      const next = Array.from(document.querySelectorAll('button')).find(
        (button) => button.textContent?.trim() === '次へ',
      );
      if (!(next instanceof HTMLButtonElement)) throw new Error('next button not found');
      next.click();
      next.click();
    });

    await expect(page.getByText(departureQ).first()).toBeVisible();
    await expect(page.getByText(travelQ)).toHaveCount(0);
  });

  test('7. Keyboard activation works for every quick reply', async ({ page }) => {
    // Keyboard traversal of every option is a normal/free-exploration contract;
    // the first-run tutorial intentionally exposes only its current target.
    await reachFreeExploration(page);

    // Enter selects an Experience tile, then Next advances.
    await page.getByRole('button', { name: '食べる' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText(departureQ)).toHaveCount(0);
    await page.getByRole('button', { name: '次へ' }).click();
    await expect(page.getByText(departureQ).first()).toBeVisible();

    // Space selects a Departure quick reply without advancing.
    await page.getByRole('button', { name: '東京都' }).focus();
    await page.keyboard.press('Space');
    await expect(page.getByText(travelQ)).toHaveCount(0);

    // Tab reaches the other choices in the active step.
    await page.getByRole('button', { name: '東京都' }).focus();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: '周辺' })).toBeFocused();
  });
});
