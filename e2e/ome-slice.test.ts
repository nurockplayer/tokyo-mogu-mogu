/**
 * Ome/Sawai sake slice browser smoke (Issue #163).
 *
 * A focused, deterministic second-slice walkthrough at the 375px mobile
 * baseline with Japanese as the blocking locale:
 *
 *   Discover → Story (青梅・沢井の日本酒) → Route (沢井の酒蔵と御嶽の文化財をめぐる旅)
 *   → Spot (小澤酒造（沢井・澤乃井）)
 *
 * This exercises the source-backed playable slice added in #163 through the
 * same shared contracts the golden path uses: the ready recommendation
 * candidates derive the Discover playable journeys, the story resolves the
 * full sake-ome content entry from `STORY_DATA_KEYS` with its own chrome keys,
 * and the route/spot ids resolve through the canonical seed. No network, no
 * save-CTA assertions — the acceptance criterion is Discover → Story → Route →
 * Spot rendering.
 *
 * Deterministic by construction: fixed editorial route (沢井の酒蔵と御嶽の文化財を
 * めぐる旅), half-day default, and text-based assertions via user-visible labels
 * read from the Japanese bundle in `src/i18n/resources.ts`.
 *
 * Locale strings below are the Japanese bundle (ja default). Helpers mirror
 * `e2e/golden-path.test.ts`; kept local so the golden path stays untouched.
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

test.describe('Ome/Sawai sake slice smoke (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('Discover → Story → Route → Spot renders the source-backed second slice', async ({
    page,
  }) => {
    // ---- precondition: clean state, mobile viewport already set by config ----
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();
    // Deterministic clean precondition: no persisted demo state survives reset.
    expect(await persisted(page, FOOD_PROFILE_KEY)).toBeNull();
    expect(await persisted(page, MOGU_RECENT_KEY)).toBeNull();
    expect(await persisted(page, SAVED_ROUTES_KEY)).toBeNull();

    // ---- 1. Discover — the sake story card is a playable journey ----
    await page.getByRole('link', { name: 'さがす' }).click();
    await page.waitForURL('**/discover');
    await page.getByRole('heading', { name: 'さがす', exact: true }).waitFor();

    // ---- 2. Story — full sake-ome content entry with its own chrome ----
    // dataSakeName: '青梅・沢井の日本酒' (the playable story card link).
    await page.getByRole('link', { name: '青梅・沢井の日本酒', exact: true }).click();
    // The Discover → Story link carries `?backTo=/discover` with a literal `/`,
    // so the glob form (`**/story/sake-ome*`, `*` ≠ `/`) never matches; use the
    // regex form on the pathname (same style as golden-path's story URL check).
    await page.waitForURL(/\/story\/sake-ome/);
    await page.getByRole('heading', { name: '青梅・沢井の日本酒' }).waitFor();
    // dataSakeHeroKicker: '青梅・沢井の日本酒の物語' — the sake story's own
    // chrome, never wasabi's shared s4HeroKicker copy.
    await page.getByText('青梅・沢井の日本酒の物語').waitFor();

    // ---- 3. Route — model route via the story route CTA ----
    // s4CtaLabel: 'モデルルートを見る'. dataSakeRouteName:
    // '沢井の酒蔵と御嶽の文化財をめぐる旅'.
    await page.getByRole('link', { name: 'モデルルートを見る' }).click();
    await page.waitForURL('**/route*');
    await page.getByRole('heading', { name: '沢井の酒蔵と御嶽の文化財をめぐる旅' }).waitFor();

    // ---- 4. Spot — open the first half-day stop via a timeline pin ----
    // Step 1 is 小澤酒造 (dataPlaceOzawaName: '小澤酒造（沢井・澤乃井）').
    await page
      .locator('.s5-timeline__pin-link')
      .filter({ hasText: '小澤酒造' })
      .click();
    await page.waitForURL('**/spot/sawai-ozawa-shuzo*');
    await page.getByRole('heading', { name: '小澤酒造（沢井・澤乃井）' }).waitFor();
  });
});
