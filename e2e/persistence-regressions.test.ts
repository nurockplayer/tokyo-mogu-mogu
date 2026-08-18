/**
 * Focused browser regressions for the preserved Phase 2 persistence surfaces
 * (Issue #221).
 *
 * These checks intentionally live outside the Phase 1 golden path. The 8/23
 * guided prototype hides MOGU / Discover from normal navigation, while the
 * durable Product still preserves both surfaces for direct access and Phase 2+.
 */
import { test, expect, type Page } from '@playwright/test';

const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const MOGU_RECENT_KEY = 'tmm:moguRecent:v1';

const foodProfile = {
  dietary: [],
  dietaryOther: '',
  hasNoRestrictions: true,
  savedAt: '2026-08-16T00:00:00.000Z',
  version: 1,
};

const wasabiRecent = [
  {
    candidateId: 'demo-okutama-wasabi',
    resultId: 'wasabi-okutama',
    titleKey: 'dataWasabiName',
    summary: ['stream-fresh', 'nature-valley', 'half-day'],
    createdAt: '2026-08-16T00:00:00.000Z',
    exploration: {
      tastes: ['refreshing'],
      experiences: ['eat'],
      baseArea: 'okutama',
      travelTime: 'within-60',
      interests: ['nature'],
      duration: 'half-day',
    },
    hasDietaryConsiderations: false,
  },
];

async function seedPreservedProductState(page: Page): Promise<void> {
  await page.goto('/');
  await page.evaluate(
    ({ profileKey, recentKey, profile, recent }) => {
      localStorage.setItem(profileKey, JSON.stringify(profile));
      localStorage.setItem(recentKey, JSON.stringify(recent));
      sessionStorage.clear();
    },
    {
      profileKey: FOOD_PROFILE_KEY,
      recentKey: MOGU_RECENT_KEY,
      profile: foodProfile,
      recent: wasabiRecent,
    },
  );
}

async function rawMoguRecent(page: Page): Promise<string | null> {
  return page.evaluate((key) => localStorage.getItem(key), MOGU_RECENT_KEY);
}

test.describe('preserved Product browser regressions (Issue #221, ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('MOGU reopen preserves candidate/journey identity and caller context', async ({ page }) => {
    await seedPreservedProductState(page);
    const recentBefore = await rawMoguRecent(page);

    // Phase 1 hides MOGU from the demo nav, so this focused regression enters
    // the preserved production surface directly rather than expanding the
    // guided golden path.
    await page.goto('/mogu');
    await page.getByRole('heading', { name: 'MOGU' }).waitFor();
    await page.getByRole('button', { name: 'このおすすめを見る' }).click();

    await page.waitForURL('**/explore/result?*');
    const reopenedResult = new URL(page.url());
    expect(reopenedResult.searchParams.get('from')).toBe('mogu');
    expect(reopenedResult.searchParams.get('resultId')).toBe('wasabi-okutama');
    expect(reopenedResult.searchParams.get('candidateId')).toBe('demo-okutama-wasabi');
    await page
      .locator('.tmm-result-card__title')
      .filter({ hasText: '奥多摩のわさび文化をたどる' })
      .first()
      .waitFor();

    await page.getByRole('link', { name: '東京わさびの物語を読む' }).click();
    await page.waitForURL('**/story/wasabi-okutama?*');
    const storyUrl = new URL(page.url());
    expect(storyUrl.searchParams.get('backTo')).toBe('/mogu');
    expect(storyUrl.searchParams.get('candidateId')).toBe('demo-okutama-wasabi');
    await page.getByText('味わうことが、継承になる').waitFor();

    await page.getByRole('link', { name: 'この文化の食旅ルートを生成する' }).click();
    await page.waitForURL('**/route?*');
    const routeUrl = new URL(page.url());
    expect(routeUrl.searchParams.get('from')).toBe('story');
    expect(routeUrl.searchParams.get('backTo')).toBe('/mogu');
    expect(routeUrl.searchParams.get('candidateId')).toBe('demo-okutama-wasabi');
    await page.getByRole('heading', { name: '奥多摩わさび紀行' }).waitFor();

    // Route Back must restore the same Story identity, whose caller-aware Back
    // target is still MOGU rather than a fresh diagnosis.
    await page.getByRole('link', { name: /物語に戻る/ }).click();
    await page.waitForURL('**/story/wasabi-okutama?*');
    await expect(page.locator('.s4-cta__back')).toHaveAttribute('href', '/mogu');

    // Reopening history is browsing, not a new recommendation event.
    expect(await rawMoguRecent(page)).toBe(recentBefore);
  });

  test('Discover browse-only does not mutate raw MOGU Recent storage', async ({ page }) => {
    await seedPreservedProductState(page);
    const recentBefore = await rawMoguRecent(page);
    expect(recentBefore).not.toBeNull();

    // Discover is also hidden from the Phase 1 journey but remains a preserved
    // browse-only Product surface. Compare the raw bytes, not parsed equality,
    // so any timestamp refresh, reordering, or reserialization is caught.
    await page.goto('/discover');
    await page.getByRole('heading', { name: 'さがす', exact: true }).waitFor();
    await page.getByRole('link', { name: '東京わさび', exact: true }).click();
    await expect(page).toHaveURL(/\/story\/wasabi-okutama/);
    await page.getByText('味わうことが、継承になる').waitFor();
    await expect(page.locator('.s4-cta__back')).toHaveAttribute('href', '/discover');

    expect(await rawMoguRecent(page)).toBe(recentBefore);
  });
});
