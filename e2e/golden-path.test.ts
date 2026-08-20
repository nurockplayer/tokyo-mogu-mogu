/**
 * Golden-path browser release gate (Issue #120 → Issue #217 Phase 1).
 *
 * One deterministic walkthrough of the 8/23 Phase 1 guided-conversation core
 * flow, in a real browser at the 375px mobile baseline with Japanese as the
 * blocking locale:
 *
 *   Landing → Food Profile conversation (nickname + dietary) → Exploration
 *   conversation → Result (96% presentation) → Story → Route → Spot → Save
 *
 * Phase 1 (Issue #217) renders setup as a LINE / ChatGPT-style conversation
 * inside the PrototypeShell. Issue #252 keeps setup focused, then exposes the
 * established Home / Discover / MOGU / My navigation on product content.
 * Ome/Sawai must never leak into the demo path. The test also verifies the
 * Phase 1 contracts unit
 * coverage cannot catch:
 *   - the prototype-continuity nickname is used in later MOGU messages and
 *     never becomes an account/profile (localStorage, cleared on demo reset)
 *   - every allowed choice in the guided conversation leads to Okutama ×
 *     東京わさび (deterministic Phase 1 candidate set)
 *   - the Result auto-records a MOGU Recent entry (Phase 2 data preserved,
 *     hidden from the demo UI)
 *   - a page reload restores the durable Food Profile
 *
 * Deterministic by construction: no external booking, realtime transit,
 * geolocation, or network dependence — the recommended result and the model
 * route are fixed editorial fixtures (東京わさび / 奥多摩わさび紀行).
 *
 * Locale strings below are the Japanese bundle (ja default). Assertions are
 * text-based via user-visible labels so the test reads like the product, and
 * fail with the exact step that broke.
 */
import { test, expect, type Page } from '@playwright/test';

/** localStorage keys owned by the app (persistence contracts). */
const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const MOGU_RECENT_KEY = 'tmm:moguRecent:v1';
const SAVED_ROUTES_KEY = 'tmm:savedRoutes';
const NICKNAME_KEY = 'tmm:nickname:v1';

/** A fresh, deterministic pre-condition: no persisted demo state. */
async function resetDemoState(page: Page): Promise<void> {
  await page.evaluate(([fp, recent, saved, nickname]) => {
    localStorage.removeItem(fp);
    localStorage.removeItem(recent);
    localStorage.removeItem(saved);
    localStorage.removeItem(nickname);
    sessionStorage.clear();
  }, [FOOD_PROFILE_KEY, MOGU_RECENT_KEY, SAVED_ROUTES_KEY, NICKNAME_KEY] as const);
}

/** Read a persisted value (or null) without leaking JSON shape into the test. */
async function persisted(page: Page, key: string): Promise<unknown | null> {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/** Read a sessionStorage value (or null). */
async function sessionPersisted(page: Page, key: string): Promise<unknown | null> {
  return page.evaluate((k) => sessionStorage.getItem(k), key);
}

/** Number of entries stored under a persistence key, or 0 when unset. */
async function storedCount(page: Page, key: string): Promise<number> {
  const raw = await persisted(page, key);
  if (!raw) return 0;
  try {
    const value = JSON.parse(String(raw));
    return Array.isArray(value) ? value.length : 0;
  } catch {
    return 0;
  }
}

test.describe('golden path (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('first-use guided conversation completes', async ({
    page,
  }) => {
    // ---- precondition: clean state, mobile viewport already set by config ----
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();

    // ---- 1. Landing → start journey (first use routes to Food Profile) ----
    await page.getByRole('heading', { name: '東京のローカルな食文化を体験しよう。' }).waitFor();
    await page.getByRole('link', { name: '食旅をはじめる' }).click();
    await page.waitForURL('**/food-profile');

    // ---- 2. Food Profile conversation — intro → nickname → 4-step interview ----
    await page.getByText('MOGU MOGUへようこそ！').waitFor();
    await page.getByRole('button', { name: 'はじめる！' }).click();
    await page.getByRole('dialog').waitFor();
    await page.getByLabel('ニックネーム').fill('ナナミ');
    await page.getByTestId('fp-modal-submit').click();
    // First-run tutorial keeps the latest-Figma four-question interview while
    // highlighting one safe, deterministic reply at a time.
    await page.getByText('まず、食物アレルギーはありますか？(複数選択)').waitFor();
    for (let step = 0; step < 4; step += 1) {
      await page.locator('[data-tutorial-target="true"]').click();
      await page.locator('[data-tutorial-target="true"]').click();
    }
    // Interview summary with the recommendation-only trust copy.
    await page.getByText('ありがとうございます！🌿 あなたの食のプロフィールを登録しました。').waitFor();
    // Prototype-continuity nickname (Issue #226): localStorage, cleared on demo
    // reset, never an account/profile.
    expect(await persisted(page, NICKNAME_KEY)).toBe('ナナミ');
    expect(await sessionPersisted(page, NICKNAME_KEY)).toBeNull();

    // Save → latest-Figma post-profile fork → recommend.
    await page.getByRole('button', { name: '保存してつぎへ' }).click();
    await page.getByText('では、今回はどんな食旅にしましょう？').waitFor();
    await page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }).click();
    await page.waitForURL('**/explore');
    expect(await persisted(page, FOOD_PROFILE_KEY)).not.toBeNull();

    // ---- 3. Exploration conversation — greeting reuses the nickname ----
    await page.getByText('こんにちは、ナナミさん。あなたに合う東京の食旅を探します。').waitFor();
    // Latest-Figma question order: Experience → Departure → Travel → Duration →
    // Taste + Theme.
    await page.getByRole('button', { name: '食べる' }).click();
    await page.getByRole('button', { name: '東京都' }).click();
    await page.getByRole('button', { name: '1時間以内' }).click();
    await page.getByRole('button', { name: '半日' }).click();
    await page.getByRole('button', { name: 'さっぱりした味' }).click();
    await page.getByRole('button', { name: '自然' }).click();
    await page.getByRole('button', { name: '結果を見る' }).click();
    await page.waitForURL('**/explore/result');

    // ---- 4. Result — nickname greeting + reveal + 96% presentation ----
    await page
      .getByText('こんにちは、ナナミさん。あなたにぴったりの食文化の旅が見つかりました。')
      .waitFor();
    await page.getByRole('heading', { name: 'あなたに合う食の旅を見つけました！' }).waitFor();
    await page
      .locator('.tmm-result-card__title')
      .filter({ hasText: '奥多摩のわさび文化をたどる' })
      .first()
      .waitFor();
    // 96% マッチ度 is Figma presentation only.
    const match = page.locator('.tmm-result-match').first();
    await match.waitFor();
    await expect(match).toContainText('96%');
    await expect(match).toContainText('マッチ度');
    await page.getByText('このマッチ度はデモ用のプロトタイプ表示です').waitFor();
    await page.getByText('このおすすめを「MOGU」の最近の履歴に保存しました。').waitFor();
    expect(await storedCount(page, MOGU_RECENT_KEY)).toBe(1);
    // Ome/Sawai never leaks into the Phase 1 Result.
    await expect(page.locator('body')).not.toContainText('青梅・沢井の日本酒');

    await page.getByRole('link', { name: '東京わさびの物語を読む' }).click();
    await page.waitForURL('**/story/wasabi-okutama*');

    // ---- 5. Story — latest-Figma nearby-spots + MOGUMOGU point (Issue #224) ----
    await page.getByRole('heading', { name: '周辺観光スポット' }).waitFor();
    await page.getByRole('link', { name: '奥多摩観光案内所' }).first().waitFor();
    await page.getByText('MOGUMOGU ポイント！').waitFor();
    await page.getByText('奥多摩わさびは、どんな味？').waitFor();
    // Story → Route.
    await page.getByRole('link', { name: 'この食文化の観光ルートを作成する' }).click();
    await page.waitForURL('**/route*');

    // ---- 6. Route → Spot leg (representative stop) ----
    await page
      .locator('.s5-timeline__pin-link')
      .filter({ hasText: '奥多摩観光案内所' })
      .click();
    await page.waitForURL('**/spot/okutama-tourism-office*');
    await page.getByRole('heading', { name: '奥多摩観光案内所' }).waitFor();

    // ---- 7. Spot save CTA → writes the same itinerary contract ----
    await page.getByRole('button', { name: '➕ 旅程に追加する' }).click();
    await page.getByText('旅程に追加しました').waitFor();
    await page.getByRole('button', { name: '閉じる' }).click();
    expect(await storedCount(page, SAVED_ROUTES_KEY)).toBe(1);

    // ---- 8. Back to Route → Route save reflects the existing save ----
    await page.getByRole('link', { name: /ルートに戻る/ }).click();
    await page.waitForURL('**/route*');
    await page.getByRole('heading', { name: '奥多摩わさび紀行' }).waitFor();
    await page.getByRole('button', { name: '旅程を保存済み ✓' }).click();
    await page.getByText('旅程の保存を解除しました').waitFor();
    expect(await storedCount(page, SAVED_ROUTES_KEY)).toBe(0);
    await page.getByRole('button', { name: '🔖 この旅程を保存する' }).click();
    await page.getByText('旅程を保存しました').waitFor();
    expect(await storedCount(page, SAVED_ROUTES_KEY)).toBe(1);

    // ---- 9. reload → durable Food Profile / MOGU Recent / Saved Route restored;
    //          nickname persists in localStorage (cleared by demo reset) ----
    await page.reload();
    await page.getByRole('heading', { name: '奥多摩わさび紀行' }).waitFor();
    expect(await storedCount(page, MOGU_RECENT_KEY)).toBe(1);
    expect(await storedCount(page, SAVED_ROUTES_KEY)).toBe(1);
    expect(await persisted(page, NICKNAME_KEY)).toBe('ナナミ');
    expect(await sessionPersisted(page, NICKNAME_KEY)).toBeNull();
  });

  test('keeps setup focused and exposes product navigation on Result', async ({
    page,
  }) => {
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();

    // Landing (first-use) — no bottom nav.
    await page.getByRole('heading', { name: '東京のローカルな食文化を体験しよう。' }).waitFor();
    await expect(page.locator('.tmm-nav')).toHaveCount(0);
    // Primary destinations stay out of the first-use landing chrome.
    await expect(page.locator('a[href="/discover"], a[href="/mogu"], a[href="/my"]')).toHaveCount(0);

    // Inside the conversations — still no production nav.
    await page.getByRole('link', { name: '食旅をはじめる' }).click();
    await page.waitForURL('**/food-profile');
    await expect(page.locator('.tmm-nav')).toHaveCount(0);
    await page.getByRole('button', { name: 'はじめる！' }).click();
    await page.getByLabel('ニックネーム').fill('ナナミ');
    await page.getByTestId('fp-modal-submit').click();
    for (let step = 0; step < 4; step += 1) {
      await page.locator('[data-tutorial-target="true"]').click();
      await page.locator('[data-tutorial-target="true"]').click();
    }
    await page.getByRole('button', { name: '保存してつぎへ' }).click();
    await page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }).click();
    await page.waitForURL('**/explore');
    await expect(page.locator('.tmm-nav')).toHaveCount(0);
    await page.getByRole('button', { name: '食べる' }).click();
    await page.getByRole('button', { name: '東京都' }).click();
    await page.getByRole('button', { name: '1時間以内' }).click();
    await page.getByRole('button', { name: '半日' }).click();
    await page.getByRole('button', { name: 'さっぱりした味' }).click();
    await page.getByRole('button', { name: '自然' }).click();
    await page.getByRole('button', { name: '結果を見る' }).click();
    await page.waitForURL('**/explore/result');
    await page.getByRole('heading', { name: 'あなたに合う食の旅を見つけました！' }).waitFor();
    await expect(page.locator('.tmm-nav a')).toHaveCount(4);
    await expect(page.locator('.tmm-nav a[href="/discover"]')).toBeVisible();
    await expect(page.locator('.tmm-nav a[href="/mogu"]')).toBeVisible();
    await expect(page.locator('.tmm-nav a[href="/my"]')).toBeVisible();
  });
});
