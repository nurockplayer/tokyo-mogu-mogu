/**
 * Issue #268 lifecycle regression gate (ja, 375px).
 *
 * Food Profile is durable dietary data. Diagnosis is a separate repeatable
 * per-trip function. Starting diagnosis again must clear only the current-trip
 * answers and must never send a returning user through dietary onboarding.
 */
import { expect, test, type Page } from '@playwright/test';

const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const EXPLORATION_KEY = 'tmm:exploration:v1';
const TUTORIAL_KEY = 'tmm:tutorial:v1';

const foodProfile = {
  dietary: ['allergy'],
  dietaryOther: 'そば',
  hasNoRestrictions: false,
  savedAt: '2026-08-22T00:00:00.000Z',
  version: 1,
} as const;

const completedExploration = {
  tastes: ['refreshing'],
  experiences: ['eat'],
  baseArea: 'okutama',
  travelTime: 'within-60',
  interests: ['nature'],
  duration: 'half-day',
} as const;

const emptyExploration = {
  tastes: [],
  experiences: [],
  baseArea: null,
  travelTime: null,
  interests: [],
  duration: null,
} as const;

async function seedReturningUser(page: Page): Promise<void> {
  await page.goto('/');
  await page.evaluate(([profileKey, profile, tutorialKey]) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem(profileKey, JSON.stringify(profile));
    sessionStorage.setItem(tutorialKey, 'complete');
  }, [FOOD_PROFILE_KEY, foodProfile, TUTORIAL_KEY] as const);
}

test.describe('Food Profile → repeatable diagnosis lifecycle (#268)', () => {
  test.use({ locale: 'ja-JP' });

  test('diagnosis opens as a standalone function, not a dietary chat continuation', async ({
    page,
  }) => {
    await seedReturningUser(page);
    await page.goto('/explore');

    await expect(page.getByTestId('diagnosis-session')).toBeVisible();
    await expect(page.getByRole('heading', { name: '今回は、どんな食体験をしてみたいですか？' })).toBeVisible();
    await expect(page.locator('.fp-chat, .fp-convo__msg')).toHaveCount(0);
    await expect(page.getByText('まず、食物アレルギーはありますか？')).toHaveCount(0);
  });

  test('try again clears only diagnosis answers and preserves the durable Food Profile', async ({
    page,
  }) => {
    await seedReturningUser(page);
    await page.evaluate(([key, answers]) => {
      sessionStorage.setItem(key, JSON.stringify(answers));
    }, [EXPLORATION_KEY, completedExploration] as const);
    await page.goto('/explore/result');

    await page.getByRole('link', { name: '今回の探索をもう一度' }).click();
    await page.waitForURL('**/explore');

    const state = await page.evaluate(([profileKey, explorationKey]) => ({
      profile: JSON.parse(localStorage.getItem(profileKey) ?? 'null'),
      exploration: JSON.parse(sessionStorage.getItem(explorationKey) ?? 'null'),
    }), [FOOD_PROFILE_KEY, EXPLORATION_KEY] as const);

    expect(state.profile).toEqual(foodProfile);
    // `beginNewExploration` removes the payload synchronously. The newly
    // mounted diagnosis may then persist its empty derived state in an effect;
    // both observable timings represent the same reset contract.
    expect(
      state.exploration === null ||
        JSON.stringify(state.exploration) === JSON.stringify(emptyExploration),
    ).toBe(true);
    await expect(page).toHaveURL(/\/explore$/);
    await expect(page.getByTestId('diagnosis-session')).toBeVisible();
    await expect(page.getByRole('button', { name: '食べる' })).toHaveAttribute('aria-pressed', 'false');
  });
});
