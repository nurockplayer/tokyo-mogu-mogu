/**
 * Ome/Sawai sake semantic-isolation browser gate (Issue #163 / #177).
 *
 * Japanese is the blocking 375px path:
 *   Result → Story → Support → Route → Spot → Saved reopen → MOGU reopen.
 *
 * The test deliberately selects the secondary sake candidate through the real
 * recommendation flow, then asserts both positive Ome/Sawai content and
 * negative cross-slice semantics. Focused en / zh-TW Story+Support smokes guard
 * the same shared boundary without duplicating the whole journey.
 */
import { test, expect, type Page } from '@playwright/test';

/** localStorage keys owned by the app (persistence contracts). */
const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const MOGU_RECENT_KEY = 'tmm:moguRecent:v1';
const SAVED_ROUTES_KEY = 'tmm:savedRoutes';
const LOCALE_KEY = 'tmm:locale';
const OKUTAMA_VISIT_HOST = 'okutokanko.jp';

/** A fresh, deterministic pre-condition: no persisted journey state. */
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

async function expectNoOkutamaDestination(page: Page): Promise<void> {
  await expect(page.locator(`a[href*="${OKUTAMA_VISIT_HOST}"]`)).toHaveCount(0);
}

async function openSakeStoryInLocale(
  page: Page,
  locale: 'en' | 'zh-TW',
): Promise<void> {
  await page.goto('/');
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [LOCALE_KEY, locale]);
  await page.goto('/story/sake-ome?candidateId=demo-ome-sake');
  await page.waitForURL(/\/story\/sake-ome/);
}

test.describe('Ome/Sawai sake semantic isolation (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('Result → Story → Support → Route → Spot and reopen paths stay inside Ome/Sawai semantics', async ({
    page,
  }) => {
    // ---- precondition: clean state; 375x812 comes from playwright.config.ts ----
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();
    expect(await persisted(page, FOOD_PROFILE_KEY)).toBeNull();
    expect(await persisted(page, MOGU_RECENT_KEY)).toBeNull();
    expect(await persisted(page, SAVED_ROUTES_KEY)).toBeNull();

    // ---- 1. Create a real recommendation that selects demo-ome-sake ----
    // Home remains intentionally Wasabi-led because Okutama × Tokyo Wasabi is
    // the primary 8/23 presentation anchor. Semantic isolation begins once the
    // recommendation has selected the Ome/Sawai candidate.
    await page.getByRole('link', { name: 'わたしの食文化の旅をはじめる' }).click();
    await page.waitForURL('**/food-profile');
    await page.getByRole('button', { name: '制限はありません' }).click();
    await page.getByRole('button', { name: '保存してつぎへ' }).click();
    await page.waitForURL('**/explore');

    // Rich taste is unique to the sake candidate; tradition/eat/half-day keep
    // the selection deterministic without relying on travel-time data.
    await page.getByRole('button', { name: 'コク・濃厚' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '食べる' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('radio', { name: '東京西部・都心（新宿など）' }).click();
    await page.getByRole('radio', { name: '1時間以上OK' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '伝統・歴史' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('radio', { name: '半日（日帰り）' }).click();
    await page.getByRole('button', { name: '結果を見る' }).click();
    await page.waitForURL('**/explore/result');

    // ---- 2. Result — correct secondary candidate, no inherited Wasabi result ----
    await page.getByRole('heading', { name: 'あなたへのおすすめ' }).waitFor();
    await page
      .locator('.tmm-result-card__title')
      .filter({ hasText: '青梅・沢井の日本酒' })
      .waitFor();
    await expect(page.locator('body')).not.toContainText('東京わさび');
    expect(await storedCount(page, MOGU_RECENT_KEY)).toBe(1);
    await page.getByRole('link', { name: '青梅・沢井の日本酒の物語を読む' }).click();
    await page.waitForURL(/\/story\/sake-ome/);

    // ---- 3. Story + shared SupportPanel — the original #177 leakage boundary ----
    await page.getByRole('heading', { name: '青梅・沢井の日本酒' }).waitFor();
    await page.getByText('青梅・沢井の日本酒の物語').waitFor();
    const rendered = page.locator('body');
    await expect(rendered).not.toContainText('わさび');
    await expect(rendered).not.toContainText('奥多摩');
    await expect(rendered).not.toContainText('この土地の水と米');
    await expect(rendered).not.toContainText('土地の米');

    const support = page.locator('.s7-panel');
    await expect(support).toContainText(
      '地域の商品を選んで買うことは、作り手や文化を知る接点になります。',
    );
    await expect(support).not.toContainText('わさび');
    await expect(support).not.toContainText('奥多摩');
    await expectNoOkutamaDestination(page);

    // ---- 4. Route — only Ome/Sawai route/places, save the actual route ----
    await page.getByRole('link', { name: 'モデルルートを見る' }).click();
    await page.waitForURL('**/route*');
    await page.getByRole('heading', { name: '沢井の酒蔵と御嶽の文化財をめぐる旅' }).waitFor();
    await expect(page.locator('body')).not.toContainText('わさび');
    await expect(page.locator('body')).not.toContainText('奥多摩観光案内所');
    await expectNoOkutamaDestination(page);

    await page.getByRole('button', { name: '🔖 この旅程を保存する' }).click();
    await page.getByText('旅程を保存しました').waitFor();
    expect(await storedCount(page, SAVED_ROUTES_KEY)).toBe(1);
    await page.getByRole('button', { name: '閉じる' }).click();

    // ---- 5. Spot — source-backed Ozawa Shuzo, no pilot external action ----
    await page
      .locator('.s5-timeline__pin-link')
      .filter({ hasText: '小澤酒造' })
      .click();
    await page.waitForURL('**/spot/sawai-ozawa-shuzo*');
    await page.getByRole('heading', { name: '小澤酒造（沢井・澤乃井）' }).waitFor();
    await expect(page.locator('body')).not.toContainText('わさび');
    await expect(page.locator('body')).not.toContainText('奥多摩');
    await expectNoOkutamaDestination(page);

    // ---- 6. Saved reopen — route identity remains Ome/Sawai ----
    await page.getByRole('link', { name: 'マイ' }).click();
    await page.waitForURL('**/my');
    await page.getByRole('heading', { name: '保存した旅程' }).waitFor();
    await page.getByText('沢井の酒蔵と御嶽の文化財をめぐる旅').waitFor();
    await page.getByRole('link', { name: 'ルートを見る' }).click();
    await page.waitForURL('**/route*');
    await page.getByRole('heading', { name: '沢井の酒蔵と御嶽の文化財をめぐる旅' }).waitFor();
    await expect(page.locator('body')).not.toContainText('わさび');

    // ---- 7. MOGU reopen — recorded candidate remains the sake candidate ----
    await page.getByRole('link', { name: 'MOGU' }).click();
    await page.waitForURL('**/mogu');
    await page.getByText('青梅・沢井の日本酒').waitFor();
    await page.getByRole('button', { name: 'このおすすめを見る' }).click();
    await page.waitForURL('**/explore/result*');
    await page
      .locator('.tmm-result-card__title')
      .filter({ hasText: '青梅・沢井の日本酒' })
      .waitFor();
    await page.getByRole('link', { name: '青梅・沢井の日本酒の物語を読む' }).click();
    await page.waitForURL(/\/story\/sake-ome/);
    await expect(page.locator('.s7-panel')).not.toContainText('わさび');
    await expectNoOkutamaDestination(page);
  });
});

test.describe('Ome/Sawai support boundary locale smoke (375px)', () => {
  test('en: generic support copy has no Wasabi/Okutama inheritance', async ({ page }) => {
    await openSakeStoryInLocale(page, 'en');
    await page.getByRole('heading', { name: 'Sawai Sake of Ome' }).waitFor();
    const support = page.locator('.s7-panel');
    await expect(support).toContainText('Choosing products from the region');
    await expect(support).not.toContainText(/wasabi/i);
    await expect(support).not.toContainText(/Okutama/i);
    await expect(page.locator('body')).not.toContainText("land's rice");
    await expectNoOkutamaDestination(page);
  });

  test('zh-TW: generic support copy has no 山葵/奧多摩 inheritance', async ({ page }) => {
    await openSakeStoryInLocale(page, 'zh-TW');
    await page.getByRole('heading', { name: '青梅・沢井的日本酒' }).waitFor();
    const support = page.locator('.s7-panel');
    await expect(support).toContainText('購買地區商品，可以成為認識製作者與文化的接點');
    await expect(support).not.toContainText('山葵');
    await expect(support).not.toContainText('奧多摩');
    await expect(support).not.toContainText('奥多摩');
    await expect(page.locator('body')).not.toContainText('土地之米');
    await expectNoOkutamaDestination(page);
  });
});
