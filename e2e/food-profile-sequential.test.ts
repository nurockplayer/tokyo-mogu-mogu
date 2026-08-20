/**
 * Food Profile sequential interview regression gates (375px, ja).
 *
 * One user activation must advance at most one interview turn. The earlier
 * guard only rejected stale closures; a realistic accidental second tap
 * (50–120ms) lands on the *newly rendered* live 送信 button whose fresh closure
 * passes the stale-step guard. These tests reproduce that real failure mode
 * across 50/80/120ms and lock the transition cooldown that rejects it, plus
 * the deliberate Q2 → Q3 progression that must still work after the window.
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

/** ja: complete the intro + nickname and land on the first interview question. */
async function reachFirstInterviewQuestion(page: Page): Promise<void> {
  await page.goto('/');
  await resetDemoState(page);
  await page.reload();
  await page.getByRole('link', { name: '食旅をはじめる' }).click();
  await page.waitForURL('**/food-profile');
  await page.getByRole('button', { name: 'はじめる！' }).click();
  await page.getByLabel('ニックネーム').fill('ナナミ');
  await page.getByTestId('fp-modal-submit').click();
}

async function selectTutorialNone(page: Page): Promise<void> {
  await page.locator('[data-tutorial-target="true"]').click();
}

test.describe('Food Profile sequential interview (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  // Realistic rapid double activation across the reproduced 50–120ms window.
  for (const delay of [50, 80, 120]) {
    test(`rapid double activation (${delay}ms, live button) advances at most one turn (no Q1→Q3 skip)`, async ({
      page,
    }) => {
      await reachFirstInterviewQuestion(page);
      await expect(page.getByText('食物アレルギーはありますか')).toBeVisible();
      await selectTutorialNone(page);
      const repliesBeforeSend = await page.locator('.fp-convo__msg--user').count();

      // Click the live 送信, then ~delay ms later re-query and click the newly
      // rendered live 送信 button. The second tap is dispatched via evaluate so
      // it stays inside the real failure window (Playwright's actionability
      // wait would push it past the transition cooldown).
      await page.getByRole('button', { name: '送信' }).click();
      await page.waitForTimeout(delay);
      await page.evaluate(() => {
        const send = Array.from(document.querySelectorAll('button')).find(
          (el) => el.textContent?.trim() === '送信',
        ) as HTMLButtonElement | undefined;
        if (send) send.click();
      });

      // Q2 (diet) stays the active turn; Q3 (religious) must not appear.
      await expect(page.getByText('普段の食事で、当てはまるものはありますか？').first()).toBeVisible();
      await expect(page.getByText('宗教上の理由などで')).toHaveCount(0);

      // Exactly one user reply was appended; a skip would append a second one.
      await expect(page.locator('.fp-convo__msg--user')).toHaveCount(repliesBeforeSend + 1);
    });
  }

  test('2. After the protection window, deliberate Q2 → Q3 progression still works', async ({
    page,
  }) => {
    await reachFirstInterviewQuestion(page);
    await selectTutorialNone(page);
    await page.getByRole('button', { name: '送信' }).click();
    await expect(page.getByText('普段の食事で、当てはまるものはありますか？').first()).toBeVisible();

    // Wait past the short transition cooldown, then a single deliberate
    // activation must advance Q2 → Q3.
    await page.waitForTimeout(300);
    await selectTutorialNone(page);
    await page.getByRole('button', { name: '送信' }).click();
    await expect(page.getByText('宗教上の理由などで、避けている食べものはありますか？(複数選択)').first()).toBeVisible();
  });
});
