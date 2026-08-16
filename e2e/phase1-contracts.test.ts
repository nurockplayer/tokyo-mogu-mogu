/**
 * Phase 1 contract gates (Issue #217) — 375px.
 *
 * Covers the contract checks the single ja golden path cannot:
 *   - en / zh-TW complete the same guided conversation to the Result with the
 *     96% match presentation and no horizontal overflow
 *   - the Phase 1 conversation offers no option that could select Ome/Sawai
 *     (rich/sweet taste, make experience, daily-life interest are absent)
 *   - the hidden Phase 2 surfaces stay preserved and reachable by direct URL,
 *     but never appear inside the Phase 1 demo path
 */
import { test, expect, type Page } from '@playwright/test';

const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const MOGU_RECENT_KEY = 'tmm:moguRecent:v1';
const SAVED_ROUTES_KEY = 'tmm:savedRoutes';
const LOCALE_KEY = 'tmm:locale';

type Locale = 'en' | 'zh-TW';

interface Journey {
  cta: string;
  intro: string;
  start: string;
  nicknameTitle: string;
  nickname: string;
  nicknameConfirm: string;
  dietaryAck: string;
  next: string;
  taste: string;
  eat: string;
  okutama: string;
  travel60: string;
  nature: string;
  halfDay: string;
  done: string;
  save: string;
  reveal: string;
  matchLabel: string;
  matchNote: string;
  resultGreeting: string;
}

const JOURNEY: Record<Locale, Journey> = {
  en: {
    cta: 'Start my food culture journey',
    intro: 'Welcome to MOGU MOGU!',
    start: "Let's start!",
    nicknameTitle: 'First, what should we call you?',
    nickname: 'Nana',
    nicknameConfirm: 'That’s me!',
    dietaryAck: 'Got it',
    next: 'Next',
    taste: 'Light & fresh',
    eat: 'Eat',
    okutama: 'Okutama',
    travel60: 'Within 60 minutes',
    nature: 'Nature & scenery',
    halfDay: 'Half day (day trip)',
    done: 'See my result',
    save: 'Save & continue',
    reveal: 'We found a food-culture journey that fits you this time!',
    matchLabel: 'Match',
    matchNote: 'demo prototype display',
    resultGreeting: 'Hi, Nana! I found a food-culture journey that suits you.',
  },
  'zh-TW': {
    cta: '開始我的飲食文化之旅',
    intro: '歡迎來到 MOGU MOGU！',
    start: '開始！',
    nicknameTitle: '首先，該怎麼稱呼你呢？',
    nickname: '奈奈美',
    nicknameConfirm: '就用這個！',
    dietaryAck: '了解',
    next: '下一步',
    taste: '清爽',
    eat: '吃',
    okutama: '奧多摩',
    travel60: '60分鐘內',
    nature: '自然・風景',
    halfDay: '半日（當天來回）',
    done: '查看結果',
    save: '儲存並繼續',
    reveal: '我們找到了這次適合你的飲食文化之旅！',
    matchLabel: '相符度',
    matchNote: '示範用的原型顯示',
    resultGreeting: '你好，奈奈美！我為你找到了適合的飲食文化之旅。',
  },
};

async function resetDemoState(page: Page): Promise<void> {
  await page.evaluate(([fp, recent, saved]) => {
    localStorage.removeItem(fp);
    localStorage.removeItem(recent);
    localStorage.removeItem(saved);
    sessionStorage.clear();
  }, [FOOD_PROFILE_KEY, MOGU_RECENT_KEY, SAVED_ROUTES_KEY] as const);
}

async function assertNoHorizontalOverflow(page: Page): Promise<void> {
  const { scrollWidth, clientWidth } = await page.evaluate(async () => {
    await document.fonts.ready;
    const doc = document.documentElement;
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
  });
  expect(
    scrollWidth,
    `horizontal overflow: scrollWidth ${scrollWidth}px > clientWidth ${clientWidth}px`,
  ).toBeLessThanOrEqual(clientWidth);
}

/** Complete the guided conversation in the given locale and reach the Result. */
async function completeJourney(page: Page, locale: Locale): Promise<void> {
  const j = JOURNEY[locale];
  await page.goto('/');
  await resetDemoState(page);
  await page.evaluate(([key, value]) => localStorage.setItem(key, value), [LOCALE_KEY, locale]);
  await page.reload();

  // Landing → Food Profile conversation.
  await page.getByRole('link', { name: j.cta }).click();
  await page.waitForURL('**/food-profile');
  await page.getByText(j.intro).waitFor();
  await page.getByRole('button', { name: j.start }).click();
  await page.getByText(j.nicknameTitle).waitFor();
  await page.getByLabel(/nickname|暱稱/i).fill(j.nickname);
  await page.getByRole('button', { name: j.nicknameConfirm }).click();
  // Phase 1 first-use: acknowledge the prototype dietary limitation and continue.
  await page.getByRole('button', { name: j.dietaryAck }).click();
  await page.getByRole('button', { name: j.save }).click();
  await page.waitForURL('**/explore');

  // Exploration conversation.
  await page.getByRole('button', { name: j.taste }).click();
  await page.getByRole('button', { name: j.next }).click();
  await page.getByRole('button', { name: j.eat }).click();
  await page.getByRole('button', { name: j.next }).click();
  await page.getByRole('button', { name: j.okutama }).click();
  await page.getByRole('button', { name: j.travel60 }).click();
  await page.getByRole('button', { name: j.next }).click();
  await page.getByRole('button', { name: j.nature }).click();
  await page.getByRole('button', { name: j.next }).click();
  await page.getByRole('button', { name: j.halfDay }).click();
  await page.getByRole('button', { name: j.done }).click();
  await page.waitForURL('**/explore/result');
}

for (const locale of ['en', 'zh-TW'] as const) {
  test.describe(`Phase 1 locale parity (${locale}, 375px)`, () => {
    test.use({ locale: locale === 'en' ? 'en-US' : 'zh-TW' });

    test('guided conversation completes with 96% match and no overflow', async ({ page }) => {
      await completeJourney(page, locale);
      const j = JOURNEY[locale];
      await page.getByText(j.resultGreeting).waitFor();
      await page.getByRole('heading', { name: j.reveal }).waitFor();
      const match = page.locator('.tmm-result-match');
      await match.waitFor();
      await expect(match).toContainText('96%');
      await expect(match).toContainText(j.matchLabel);
      await page.getByText(j.matchNote).waitFor();
      await assertNoHorizontalOverflow(page);
      // No production nav on the Phase 1 Result.
      await expect(page.locator('.tmm-nav')).toHaveCount(0);
    });
  });
}

test.describe('Phase 1 constrained options (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('conversation offers no option that could select Ome/Sawai', async ({ page }) => {
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();
    await page.getByRole('link', { name: 'わたしの食文化の旅をはじめる' }).click();
    await page.waitForURL('**/food-profile');
    await page.getByRole('button', { name: 'はじめる！' }).click();
    await page.getByLabel('ニックネーム').fill('ナナミ');
    await page.getByRole('button', { name: 'これでお願いします！' }).click();
    await page.getByRole('button', { name: '了解しました' }).click();
    await page.getByRole('button', { name: '保存してつぎへ' }).click();
    await page.waitForURL('**/explore');

    // Taste step: wasabi values present; sake-leading values absent.
    await page.getByRole('button', { name: 'さっぱり・爽やか' }).waitFor();
    await expect(page.locator('body')).not.toContainText('コク・濃厚');
    await expect(page.locator('body')).not.toContainText('甘い');
    await page.getByRole('button', { name: 'さっぱり・爽やか' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    // Experience step: wasabi values present; make absent.
    await page.getByRole('button', { name: '食べる' }).waitFor();
    await expect(page.locator('body')).not.toContainText('作る');
    await page.getByRole('button', { name: '食べる' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    // Area + travel.
    await page.getByRole('button', { name: '奥多摩' }).click();
    await page.getByRole('button', { name: '60分以内' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    // Interest step: wasabi values present; daily-life absent.
    await page.getByRole('button', { name: '自然・景色' }).waitFor();
    await expect(page.locator('body')).not.toContainText('地域の日常');
    await page.getByRole('button', { name: '自然・景色' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    // Duration.
    await page.getByRole('button', { name: '半日（日帰り）' }).click();
    await page.getByRole('button', { name: '結果を見る' }).click();
    await page.waitForURL('**/explore/result');
    await page
      .locator('.tmm-result-card__title')
      .filter({ hasText: '東京わさび' })
      .first()
      .waitFor();
  });
});

test.describe('Phase 1 hidden Phase 2 surfaces (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('production pages stay reachable by direct URL with the production shell', async ({
    page,
  }) => {
    await page.goto('/discover');
    await page.getByRole('heading', { name: 'さがす', exact: true }).waitFor();
    await expect(page.locator('.tmm-nav')).toHaveCount(1);

    await page.goto('/mogu');
    await page.getByRole('heading', { name: 'MOGU' }).waitFor();
    await expect(page.locator('.tmm-nav')).toHaveCount(1);

    await page.goto('/my');
    await page.getByRole('heading', { name: 'マイ' }).waitFor();
    await expect(page.locator('.tmm-nav')).toHaveCount(1);
  });
});

/** ja: complete the Food Profile setup (dietary ack only) and reach the first Exploration step. */
async function jaReachExplorationFirstStep(page: Page): Promise<void> {
  await page.goto('/');
  await resetDemoState(page);
  await page.reload();
  await page.getByRole('link', { name: 'わたしの食文化の旅をはじめる' }).click();
  await page.waitForURL('**/food-profile');
  await page.getByRole('button', { name: 'はじめる！' }).click();
  await page.getByLabel('ニックネーム').fill('ナナミ');
  await page.getByRole('button', { name: 'これでお願いします！' }).click();
  await page.getByRole('button', { name: '了解しました' }).click();
  await page.getByRole('button', { name: '保存してつぎへ' }).click();
  await page.waitForURL('**/explore');
}

/** ja: complete Food Profile + first two Exploration steps → departure/travel step. */
async function jaReachDepartureStep(page: Page): Promise<void> {
  await jaReachExplorationFirstStep(page);
  await page.getByRole('button', { name: 'さっぱり・爽やか' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  await page.getByRole('button', { name: '食べる' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  await page.getByRole('button', { name: '奥多摩' }).waitFor();
}

test.describe('Phase 1 believable departure × travel-time choices (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('a central-Tokyo/Shinjuku departure never offers a short travel tolerance', async ({
    page,
  }) => {
    await jaReachDepartureStep(page);

    await page.getByRole('button', { name: '東京西部・都心（新宿など）' }).click();
    // Only the believable long-travel option is selectable for Okutama.
    await page.getByRole('button', { name: '1時間以上OK' }).waitFor();
    await expect(page.getByRole('button', { name: '30分以内' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: '60分以内' })).toHaveCount(0);
  });

  test('an Okutama departure never offers an implausible over-60 travel time', async ({ page }) => {
    await jaReachDepartureStep(page);

    await page.getByRole('button', { name: '奥多摩' }).click();
    await page.getByRole('button', { name: '30分以内' }).waitFor();
    await page.getByRole('button', { name: '60分以内' }).waitFor();
    await expect(page.getByRole('button', { name: '1時間以上OK' })).toHaveCount(0);
  });
});

test.describe('Phase 2 Food Profile edit surface (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('retains the full durable dietary categories with unselected yes/no until answered', async ({
    page,
  }) => {
    await page.goto('/');
    await resetDemoState(page);
    // Seed a durable profile so /food-profile/edit renders the edit surface.
    await page.evaluate(([key, value]) => localStorage.setItem(key, value), [
      FOOD_PROFILE_KEY,
      JSON.stringify({
        dietary: [],
        dietaryOther: '',
        hasNoRestrictions: true,
        savedAt: '2026-08-16T00:00:00.000Z',
        version: 1,
      }),
    ]);
    await page.goto('/food-profile/edit');

    // The full durable category set is retained in the edit surface (Phase 2).
    await page.getByText('まず、食物アレルギーはありますか？').waitFor();
    // Unanswered yes/no starts unselected (no preselected No).
    await expect(page.getByRole('button', { name: 'はい' })).toHaveAttribute('aria-pressed', 'false');
    await expect(page.getByRole('button', { name: 'いいえ' })).toHaveAttribute('aria-pressed', 'false');

    // All four categories remain reachable.
    const categoryQuestions = [
      'まず、食物アレルギーはありますか？',
      'ベジタリアン・ビーガンなどの食事スタイルはありますか？',
      '宗教上の理由などで、避けている食べものはありますか？',
      '苦手な食材や味はありますか？',
    ];
    for (const question of categoryQuestions) {
      await page.getByText(question).waitFor();
      await page.getByRole('button', { name: 'いいえ' }).click();
      await page.getByRole('button', { name: '次へ' }).click();
    }
    // The free-text "other" step remains part of the durable edit surface.
    await page.getByText('その他、避けているもの・気になることがあれば入力してください（任意）。').waitFor();
  });
});
