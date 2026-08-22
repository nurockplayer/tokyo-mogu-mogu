/**
 * Story regional evidence browser gate for Issue #264.
 *
 * The evidence is intentionally checked at the existing 375px baseline in
 * every supported locale. The test enters Story directly so it verifies the
 * content slice without changing recommendation, tutorial, or persistence
 * semantics.
 */
import { test, expect, type Page } from '@playwright/test';

const LOCALE_KEY = 'tmm:locale';

const CASES = [
  {
    locale: 'ja' as const,
    browserLocale: 'ja-JP',
    cultureId: 'wasabi-okutama',
    candidateId: 'demo-okutama-wasabi',
    value: '1.1%',
    region: '奥多摩',
    sourceLink: '出典を見る',
  },
  {
    locale: 'en' as const,
    browserLocale: 'en-US',
    cultureId: 'sake-ome',
    candidateId: 'demo-ome-sake',
    value: '0.8%',
    region: 'Ome and Mitakesan',
    sourceLink: 'View source',
  },
  {
    locale: 'zh-TW' as const,
    browserLocale: 'zh-TW',
    cultureId: 'sake-ome',
    candidateId: 'demo-ome-sake',
    value: '0.8%',
    region: '青梅・御岳山',
    sourceLink: '查看來源',
  },
] as const;

async function setLocale(page: Page, locale: (typeof CASES)[number]['locale']): Promise<void> {
  await page.goto('/');
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [LOCALE_KEY, locale]);
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
}

for (const scenario of CASES) {
  test.describe(`Issue #264 Story evidence (${scenario.locale}, 375px)`, () => {
    test.use({ locale: scenario.browserLocale });

    test('shows the region-specific source-backed metric without Result changes', async ({ page }) => {
      await setLocale(page, scenario.locale);
      await page.goto(
        `/story/${scenario.cultureId}?candidateId=${scenario.candidateId}`,
      );

      const evidence = page.locator('.s4-evidence');
      await expect(evidence).toBeVisible();
      await expect(evidence).toContainText(scenario.region);
      await expect(evidence).toContainText(scenario.value);
      await expect(evidence.getByRole('link', { name: scenario.sourceLink })).toHaveAttribute(
        'href',
        'https://www.sangyo-rodo.metro.tokyo.lg.jp/documents/d/sangyo-rodo/01_r7kekka',
      );
      await expect(evidence).toContainText('2026');
      await expectNoHorizontalOverflow(page);

      if (scenario.cultureId === 'sake-ome') {
        await expect(evidence).not.toContainText('奥多摩');
      }
    });
  });
}
