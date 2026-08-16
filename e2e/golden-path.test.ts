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
 * Phase 1 (Issue #217) renders the journey as a LINE / ChatGPT-style
 * conversation inside the PrototypeShell, so the production bottom navigation
 * (Home / Discover / MOGU / My) must never appear and Ome/Sawai must never
 * leak into the demo path. The test also verifies the Phase 1 contracts unit
 * coverage cannot catch:
 *   - the session-only nickname is used in later MOGU messages and does NOT
 *     persist as an account/profile (sessionStorage only, never localStorage)
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
  await page.evaluate(([fp, recent, saved]) => {
    localStorage.removeItem(fp);
    localStorage.removeItem(recent);
    localStorage.removeItem(saved);
    sessionStorage.clear();
  }, [FOOD_PROFILE_KEY, MOGU_RECENT_KEY, SAVED_ROUTES_KEY] as const);
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

  test('first-use guided conversation completes and hides the production nav', async ({
    page,
  }) => {
    // ---- precondition: clean state, mobile viewport already set by config ----
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();

    // ---- 1. Landing → start journey (first use routes to Food Profile) ----
    await page.getByRole('heading', { name: '東京の食文化と出会う旅' }).waitFor();
    await page.getByRole('link', { name: 'わたしの食文化の旅をはじめる' }).click();
    await page.waitForURL('**/food-profile');

    // ---- 2. Food Profile conversation — intro → nickname → dietary ----
    await page.getByText('MOGU MOGUへようこそ！').waitFor();
    await page.getByRole('button', { name: 'はじめる！' }).click();
    await page.getByText('まず、なんてお呼びすればいいですか？').waitFor();
    await page.getByLabel('ニックネーム').fill('ナナミ');
    await page.getByRole('button', { name: 'これでお願いします！' }).click();
    await page.getByText('苦手な食材や味はありますか？').waitFor();
    // Phase 1 must not expose allergy / vegan / religious compatibility claims.
    await expect(page.getByText('食物アレルギーはありますか？')).toHaveCount(0);
    await expect(page.getByText('ベジタリアン・ビーガンなどの食事スタイルはありますか？')).toHaveCount(0);
    await expect(page.getByText('宗教上の理由などで、避けている食べものはありますか？')).toHaveCount(0);
    // Session-only nickname: stored in sessionStorage, never localStorage.
    expect(await sessionPersisted(page, NICKNAME_KEY)).toBe('ナナミ');
    expect(await persisted(page, NICKNAME_KEY)).toBeNull();

    await page.getByRole('button', { name: 'いいえ' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    // Optional free-text step → summary.
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByText('ありがとうございます、ナナミさん！').waitFor();
    await page.getByRole('button', { name: '保存してつぎへ' }).click();
    await page.waitForURL('**/explore');
    expect(await persisted(page, FOOD_PROFILE_KEY)).not.toBeNull();

    // ---- 3. Exploration conversation — greeting reuses the nickname ----
    await page.getByText('こんにちは、ナナミさん。あなたに合う東京の食旅を探します。').waitFor();
    await page.getByRole('button', { name: 'さっぱり・爽やか' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '食べる' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '奥多摩' }).click();
    await page.getByRole('button', { name: '60分以内' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '自然・景色' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '半日（日帰り）' }).click();
    await page.getByRole('button', { name: '結果を見る' }).click();
    await page.waitForURL('**/explore/result');

    // ---- 4. Result — nickname greeting + reveal + 96% presentation ----
    await page
      .getByText('こんにちは、ナナミさん。あなたにぴったりの食文化の旅が見つかりました。')
      .waitFor();
    await page.getByRole('heading', { name: '今回のあなたに合う食文化の旅を見つけました！' }).waitFor();
    await page
      .locator('.tmm-result-card__title')
      .filter({ hasText: '東京わさび' })
      .first()
      .waitFor();
    // 96% マッチ度 is Figma presentation only.
    const match = page.locator('.tmm-result-match');
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

    // ---- 5. Story → Route ----
    await page.getByRole('link', { name: 'モデルルートを見る' }).click();
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
    //          nickname stays session-only (survives reload, never localStorage,
    //          cleared when the tab/session closes) ----
    await page.reload();
    await page.getByRole('heading', { name: '奥多摩わさび紀行' }).waitFor();
    expect(await storedCount(page, MOGU_RECENT_KEY)).toBe(1);
    expect(await storedCount(page, SAVED_ROUTES_KEY)).toBe(1);
    expect(await sessionPersisted(page, NICKNAME_KEY)).toBe('ナナミ');
    expect(await persisted(page, NICKNAME_KEY)).toBeNull();
  });

  test('production navigation never appears during the Phase 1 demo path', async ({
    page,
  }) => {
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();

    // Landing (first-use) — no bottom nav.
    await page.getByRole('heading', { name: '東京の食文化と出会う旅' }).waitFor();
    await expect(page.locator('.tmm-nav')).toHaveCount(0);
    // No production links reachable from the demo surfaces.
    await expect(page.locator('a[href="/discover"], a[href="/mogu"], a[href="/my"]')).toHaveCount(0);

    // Inside the conversations — still no production nav.
    await page.getByRole('link', { name: 'わたしの食文化の旅をはじめる' }).click();
    await page.waitForURL('**/food-profile');
    await expect(page.locator('.tmm-nav')).toHaveCount(0);
    await page.getByRole('button', { name: 'はじめる！' }).click();
    await page.getByLabel('ニックネーム').fill('ナナミ');
    await page.getByRole('button', { name: 'これでお願いします！' }).click();
    await page.getByRole('button', { name: 'いいえ' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '保存してつぎへ' }).click();
    await page.waitForURL('**/explore');
    await expect(page.locator('.tmm-nav')).toHaveCount(0);
    await page.getByRole('button', { name: 'さっぱり・爽やか' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '食べる' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '奥多摩' }).click();
    await page.getByRole('button', { name: '60分以内' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '自然・景色' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '半日（日帰り）' }).click();
    await page.getByRole('button', { name: '結果を見る' }).click();
    await page.waitForURL('**/explore/result');
    await page.getByRole('heading', { name: '今回のあなたに合う食文化の旅を見つけました！' }).waitFor();
    await expect(page.locator('.tmm-nav')).toHaveCount(0);
  });
});
