/**
 * Food Profile sequential interview regression gate (375px, ja).
 *
 * One user activation must advance at most one interview turn — the same
 * stale/double-activation protection the Exploration uses (#230). Two
 * activations ~80ms apart on the same `送信` button must NOT skip a question
 * (Q1 → Q3). Interaction/state assertions only — no brittle full-page
 * snapshots.
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
  await page.getByRole('button', { name: 'これでお願いします！' }).click();
}

test.describe('Food Profile sequential interview (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('1. Rapid/double activation on 送信 advances at most one turn (no Q1→Q3 skip)', async ({
    page,
  }) => {
    await reachFirstInterviewQuestion(page);
    await expect(page.getByText('食物アレルギーはありますか')).toBeVisible();

    // Two synchronous activations on the same 送信 button (as a fast double
    // tap would dispatch) must commit one answer and advance exactly one turn.
    await page.evaluate(() => {
      const send = Array.from(document.querySelectorAll('button')).find(
        (el) => el.textContent?.trim() === '送信',
      ) as HTMLButtonElement | undefined;
      if (!send) throw new Error('send button not found');
      send.click();
      send.click();
    });

    // Exactly one step advanced: Q2 (diet) is the current turn, Q3 (religious)
    // must not appear — a double-advance would have skipped straight to Q3.
    await expect(page.getByText('普段の食事で、当てはまるものはありますか？').first()).toBeVisible();
    await expect(page.getByText('宗教上の理由などで')).toHaveCount(0);

    // One user-answer bubble joined the transcript (nickname + Q1 reply = 2);
    // a Q1 → Q3 skip would have produced 3.
    await expect(page.locator('.fp-convo__msg--user')).toHaveCount(2);
  });
});
