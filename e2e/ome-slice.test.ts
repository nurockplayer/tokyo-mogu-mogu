/**
 * Ome/Sawai sake semantic-isolation browser gate (Issue #163 / #177 →
 * Issue #217 Phase 1).
 *
 * Phase 1 (Issue #217) hides the Ome/Sawai secondary slice from the guided
 * demo journey: the Phase 1 conversation only offers wasabi-matching options
 * and the Phase 1 Result only selects the Okutama × Tokyo Wasabi candidate.
 * The sake canonical data, Story / Route / Spot content, and its semantic
 * isolation remain preserved and directly reachable by URL (Phase 2).
 *
 * This gate therefore verifies the preservation boundary:
 *   - the sake content stays semantically isolated (no Wasabi / Okutama copy,
 *     no Okutama external destinations) when opened directly
 *   - focused en / zh-TW Story + Support smokes guard the same shared boundary
 *
 * The "cannot reach sake through the Phase 1 UI" half is covered by the
 * deterministic outcome test (phase1-contracts).
 */
import { test, expect, type Page } from '@playwright/test';

const LOCALE_KEY = 'tmm:locale';
const OKUTAMA_VISIT_HOST = 'okutokanko.jp';

async function expectNoOkutamaDestination(page: Page): Promise<void> {
  await expect(page.locator(`a[href*="${OKUTAMA_VISIT_HOST}"]`)).toHaveCount(0);
}

async function openSakeStoryInLocale(page: Page, locale: 'en' | 'zh-TW'): Promise<void> {
  await page.goto('/');
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [LOCALE_KEY, locale]);
  await page.goto('/story/sake-ome?candidateId=demo-ome-sake');
  await page.waitForURL(/\/story\/sake-ome/);
}

test.describe('Ome/Sawai sake semantic isolation (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('direct Story → Route → Spot stays inside Ome/Sawai semantics', async ({ page }) => {
    await page.goto('/story/sake-ome?candidateId=demo-ome-sake');
    await page.waitForURL(/\/story\/sake-ome/);

    // ---- 1. Story + shared SupportPanel — the original #177 leakage boundary ----
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

    // ---- 2. Route — only Ome/Sawai route/places ----
    await page.getByRole('link', { name: 'この文化の食旅ルートを生成する' }).click();
    await page.waitForURL('**/route*');
    await page.getByRole('heading', { name: '沢井の酒蔵と御嶽の文化財をめぐる旅' }).waitFor();
    await expect(page.locator('body')).not.toContainText('わさび');
    await expect(page.locator('body')).not.toContainText('奥多摩観光案内所');
    await expectNoOkutamaDestination(page);

    // ---- 3. Spot — source-backed Ozawa Shuzo, no pilot external action ----
    await page
      .locator('.s5-timeline__pin-link')
      .filter({ hasText: '小澤酒造' })
      .click();
    await page.waitForURL('**/spot/sawai-ozawa-shuzo*');
    await page.getByRole('heading', { name: '小澤酒造（沢井・澤乃井）' }).waitFor();
    await expect(page.locator('body')).not.toContainText('わさび');
    await expect(page.locator('body')).not.toContainText('奥多摩');
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
