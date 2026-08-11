/**
 * Golden-path browser release gate (Issue #120).
 *
 * One deterministic walkthrough of the 8/23 demo core flow, in a real browser
 * at the 375px mobile baseline with Japanese as the blocking locale:
 *
 *   Home → Food Profile (first use) → Exploration → Result → Story → Route →
 *   Spot → Save → My Saved Routes
 *
 * The test also verifies the lifecycle / persistence boundaries that unit
 * coverage alone cannot catch:
 *   - a Result auto-records a MOGU Recent entry (distinct semantic from Save)
 *   - the Route → Spot leg renders and the Spot save CTA writes the same
 *     itinerary contract the Route save button uses
 *   - a page reload restores Food Profile / MOGU Recent / Saved Route
 *   - a returning Home flow does not re-ask for the Food Profile
 *   - Discover browse-only use never writes MOGU Recent (raw value, not count)
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

  test('first-use flow completes and state survives reload; Discover stays browse-only', async ({
    page,
  }) => {
    // ---- precondition: clean state, mobile viewport already set by config ----
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();

    // ---- 1. Home / Landing → start journey (first use routes to Food Profile) ----
    await page.getByRole('heading', { name: '東京の食文化と出会う旅' }).waitFor();
    await page.getByRole('link', { name: 'わたしの食文化の旅をはじめる' }).click();
    await page.waitForURL('**/food-profile');

    // ---- 2. Food Profile (first use) → save → straight into Exploration ----
    await page.getByRole('heading', { name: 'フードプロフィールをつくる' }).waitFor();
    await page.getByRole('button', { name: '制限はありません' }).click();
    await page.getByRole('button', { name: '保存してつぎへ' }).click();
    await page.waitForURL('**/explore');
    // Returning flow must not re-ask the profile; persisted immediately.
    expect(await persisted(page, FOOD_PROFILE_KEY)).not.toBeNull();

    // ---- 3. Exploration — 5 deterministic answers (one chip per step) ----
    // Step 1/5: taste
    await page.getByRole('button', { name: 'さっぱり・爽やか' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    // Step 2/5: experience (optional multi-select)
    await page.getByRole('button', { name: '食べる' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    // Step 3/5: base area + travel time (single-select radios on this step)
    await page.getByRole('radio', { name: '奥多摩' }).click();
    await page.getByRole('radio', { name: '60分以内' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    // Step 4/5: interests
    await page.getByRole('button', { name: '自然・景色' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    // Step 5/5: duration (single-select radio)
    await page.getByRole('radio', { name: '半日（日帰り）' }).click();
    await page.getByRole('button', { name: '結果を見る' }).click();
    await page.waitForURL('**/explore/result');

    // ---- 4. Result — deterministic 東京わさび + MOGU Recent hand-off ----
    await page.getByRole('heading', { name: 'あなたへのおすすめ' }).waitFor();
    // The result title appears in the feature card; "東京わさび" also matches
    // the Story CTA below it, so scope to the card title for a strict check.
    await page
      .locator('.tmm-result-card__title')
      .filter({ hasText: '東京わさび' })
      .first()
      .waitFor();
    await page.getByText('このおすすめを「MOGU」の最近の履歴に保存しました。').waitFor();
    // Result auto-records a MOGU Recent entry (explicit user Save not involved).
    expect(await storedCount(page, MOGU_RECENT_KEY)).toBe(1);
    await page.getByRole('link', { name: '東京わさびの物語を読む' }).click();
    await page.waitForURL('**/story/wasabi-okutama');

    // ---- 5. Story → Route ----
    await page.getByRole('link', { name: 'モデルルートを見る' }).click();
    await page.waitForURL('**/route*');

    // ---- 6. Route → Spot leg (representative stop) ----
    // Step 1 of the model route is the tourism office; open it via the
    // timeline pin so the Route → Spot link is exercised in a real browser.
    await page
      .locator('.s5-timeline__pin-link')
      .filter({ hasText: '奥多摩観光案内所' })
      .click();
    await page.waitForURL('**/spot/okutama-tourism-office*');
    await page.getByRole('heading', { name: '奥多摩観光案内所' }).waitFor();

    // ---- 7. Spot save CTA → writes the same itinerary contract ----
    await page.getByRole('button', { name: '➕ 旅程に追加する' }).click();
    await page.getByText('旅程に追加しました').waitFor();
    // The toast overlays the lower part of the screen; close it so it does not
    // intercept the Back link below (the spot Back sits above the bottom nav).
    await page.getByRole('button', { name: '閉じる' }).click();
    // The Spot save CTA writes the shared tmm:savedRoutes contract.
    expect(await storedCount(page, SAVED_ROUTES_KEY)).toBe(1);

    // ---- 8. Back to Route → Route save reflects the existing save ----
    await page.getByRole('link', { name: /ルートに戻る/ }).click();
    await page.waitForURL('**/route*');
    await page.getByRole('heading', { name: '奥多摩わさび紀行' }).waitFor();
    // The itinerary is already saved via the Spot CTA, so the Route button
    // shows the saved state. Toggle it off, then back on so the Route-level
    // save button (Issue #120's Route Save semantic) is itself exercised and
    // the Saved Routes state is deterministic for the My step below.
    await page.getByRole('button', { name: '旅程を保存済み ✓' }).click();
    await page.getByText('旅程の保存を解除しました').waitFor();
    expect(await storedCount(page, SAVED_ROUTES_KEY)).toBe(0);
    await page.getByRole('button', { name: '🔖 この旅程を保存する' }).click();
    await page.getByText('旅程を保存しました').waitFor();
    // Explicit user Save writes the Saved Routes contract (distinct semantic).
    expect(await storedCount(page, SAVED_ROUTES_KEY)).toBe(1);
    await page.getByRole('link', { name: 'マイ' }).click();
    await page.waitForURL('**/my');

    // ---- 9. My — saved route visible under 保存した旅程 ----
    await page.getByRole('heading', { name: '保存した旅程' }).waitFor();
    await page.getByText('奥多摩わさび紀行').waitFor();

    // ---- 10. reload → Food Profile / MOGU Recent / Saved Route restored ----
    await page.reload();
    await page.getByRole('heading', { name: '保存した旅程' }).waitFor();
    await page.getByText('奥多摩わさび紀行').waitFor();
    expect(await storedCount(page, MOGU_RECENT_KEY)).toBe(1);
    expect(await storedCount(page, SAVED_ROUTES_KEY)).toBe(1);

    // ---- 11. returning Home flow must not re-ask the Food Profile ----
    await page.getByRole('link', { name: 'ホーム' }).click();
    await page.waitForURL('**/');
    await page.getByRole('link', { name: 'わたしの食文化の旅をはじめる' }).click();
    // Returning user skips /food-profile and goes straight into Exploration.
    await page.waitForURL('**/explore');
    expect(new URL(page.url()).pathname).not.toContain('/food-profile');

    // ---- 12. Discover browse-only must not pollute MOGU Recent ----
    // Snapshot the raw persisted value (not just the array length): recording
    // the same wasabi-okutama result again would REPLACE the entry and leave
    // the count unchanged, so comparing the count alone would miss it.
    await page.getByRole('link', { name: 'さがす' }).click();
    await page.waitForURL('**/discover');
    await page.getByRole('heading', { name: 'さがす', exact: true }).waitFor();
    const recentBefore = await persisted(page, MOGU_RECENT_KEY);
    await page.getByRole('link', { name: '東京わさび', exact: true }).first().click();
    await expect(page).toHaveURL(/\/story\/wasabi-okutama/);
    await page.getByText('味わうことが、継承になる').waitFor();
    await page.goto('/discover');
    // Browse-only must leave the persisted entry byte-for-byte unchanged.
    expect(await persisted(page, MOGU_RECENT_KEY)).toBe(recentBefore);
  });
});
