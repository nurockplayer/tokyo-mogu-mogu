/**
 * Phase 1 contract gates (Issue #217 → Issue #224) — 375px.
 *
 * Covers the contract checks the single ja golden path cannot:
 *   - en / zh-TW complete the same guided conversation to the Result with the
 *     96% match presentation and no horizontal overflow
 *   - the latest-Figma presentation-only options stay visible, but the Result
 *     remains the fixed deterministic 奥多摩 × 東京わさび (no Ome/Sawai leak)
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
  save: string;
  forkRecommend: string;
  send: string;
  noAllergy: string;
  noOther: string;
  next: string;
  eat: string;
  departure: string;
  travel: string;
  duration: string;
  taste: string;
  theme: string;
  done: string;
  reveal: string;
  matchLabel: string;
  matchNote: string;
  resultGreeting: string;
}

const JOURNEY: Record<Locale, Journey> = {
  en: {
    cta: 'Start your food journey',
    intro: 'Welcome to MOGU MOGU!',
    start: "Let's start!",
    nicknameTitle: 'First, what should we call you?',
    nickname: 'Nana',
    nicknameConfirm: 'That’s me!',
    save: 'Save & continue',
    forkRecommend: 'Recommend a journey for me!',
    send: 'Send',
    noAllergy: 'No allergies',
    noOther: 'None of these',
    next: 'Next',
    eat: 'Eat',
    departure: 'Tokyo',
    travel: 'Within 60 minutes',
    duration: 'Half day (day trip)',
    taste: 'Light & fresh',
    theme: 'Nature',
    done: 'See my result',
    reveal: 'We found a food-culture journey that fits you this time!',
    matchLabel: 'Match',
    matchNote: 'demo prototype display',
    resultGreeting: 'Hi, Nana! I found a food-culture journey that suits you.',
  },
  'zh-TW': {
    cta: '開始你的飲食之旅',
    intro: '歡迎來到 MOGU MOGU！',
    start: '開始！',
    nicknameTitle: '首先，該怎麼稱呼你呢？',
    nickname: '奈奈美',
    nicknameConfirm: '就用這個！',
    save: '儲存並繼續',
    forkRecommend: '推薦適合我的旅程！',
    send: '送出',
    noAllergy: '沒有過敏',
    noOther: '都沒有',
    next: '下一步',
    eat: '吃',
    departure: '東京都',
    travel: '1小時以內',
    duration: '半日（當天來回）',
    taste: '清爽',
    theme: '自然',
    done: '查看結果',
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

/**
 * Complete the guided conversation (latest-Figma flow: intro → nickname →
 * presentation-only dietary interview → summary → fork) in the given locale and
 * reach the Result.
 */
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

  // Latest-Figma presentation-only dietary interview (Issue #224): pick the
  // "none" escape in each of the four questions, then send.
  await page.getByRole('button', { name: j.noAllergy }).click();
  await page.getByRole('button', { name: j.send }).click();
  await page.getByRole('button', { name: j.noOther }).click();
  await page.getByRole('button', { name: j.send }).click();
  await page.getByRole('button', { name: j.noOther }).click();
  await page.getByRole('button', { name: j.send }).click();
  await page.getByRole('button', { name: j.noOther }).click();
  await page.getByRole('button', { name: j.send }).click();
  await page.getByRole('button', { name: j.save }).click();
  await page.getByRole('button', { name: j.forkRecommend }).click();
  await page.waitForURL('**/explore');

  // Exploration conversation (latest-Figma order).
  await page.getByRole('button', { name: j.eat }).click();
  await page.getByRole('button', { name: j.next }).click();
  await page.getByRole('button', { name: j.departure }).click();
  await page.getByRole('button', { name: j.next }).click();
  await page.getByRole('button', { name: j.travel }).click();
  await page.getByRole('button', { name: j.next }).click();
  await page.getByRole('button', { name: j.duration }).click();
  await page.getByRole('button', { name: j.next }).click();
  await page.getByRole('button', { name: j.taste }).click();
  await page.getByRole('button', { name: j.theme }).click();
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
      const match = page.locator('.tmm-result-card--hero .tmm-result-match');
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

test.describe('Phase 1 presentation-only options (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('richer Figma options are visible but the Result stays the fixed Wasabi', async ({
    page,
  }) => {
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();
    await page.getByRole('link', { name: '食旅をはじめる' }).click();
    await page.waitForURL('**/food-profile');
    await page.getByRole('button', { name: 'はじめる！' }).click();
    await page.getByLabel('ニックネーム').fill('ナナミ');
    await page.getByRole('button', { name: 'これでお願いします！' }).click();
    await page.getByRole('button', { name: 'アレルギーはありません' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '特になし' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '特になし' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '特になし' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '保存してつぎへ' }).click();
    await page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }).click();
    await page.waitForURL('**/explore');

    // Latest-Figma richer option sets are present (presentation-only).
    await page.getByRole('button', { name: '食べる' }).waitFor();
    await page.getByRole('button', { name: '作る' }).waitFor();
    await page.getByRole('button', { name: '食べる' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '東京都' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '1時間以内' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '半日（日帰り）' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: 'コク・濃厚' }).waitFor();
    await page.getByRole('button', { name: '甘い' }).waitFor();
    await page.getByRole('button', { name: 'さっぱり・爽やか' }).click();
    await page.getByRole('button', { name: '自然' }).click();
    await page.getByRole('button', { name: '結果を見る' }).click();
    await page.waitForURL('**/explore/result');

    // Determinism preserved: only 東京わさび, never Ome/Sawai.
    await page
      .locator('.tmm-result-card__title')
      .filter({ hasText: '東京わさび' })
      .first()
      .waitFor();
    await expect(page.locator('body')).not.toContainText('青梅・沢井の日本酒');
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

test.describe('Phase 1 presentation-only browse/nav stays in-prototype (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('登録なし browse and 自分で旅を探す never navigate to Phase 2 routes', async ({ page }) => {
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();
    await page.getByRole('link', { name: '食旅をはじめる' }).click();
    await page.waitForURL('**/food-profile');

    // 登録なし、自分で見てみる → presentation note, no Phase 2 navigation.
    await page.getByRole('button', { name: '登録なし、自分で見てみる' }).click();
    await page.getByText('「自分で探す」はデモでは準備中です').waitFor();
    await expect(page).toHaveURL(/\/food-profile$/);

    // Back to the intro, then complete the interview + save → fork.
    await page.getByRole('button', { name: 'おすすめの旅へ戻る' }).click();
    await page.getByRole('button', { name: 'はじめる！' }).click();
    await page.getByLabel('ニックネーム').fill('ナナミ');
    await page.getByRole('button', { name: 'これでお願いします！' }).click();
    await page.getByRole('button', { name: 'アレルギーはありません' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '特になし' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '特になし' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '特になし' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '保存してつぎへ' }).click();

    // 自分で旅を探す → presentation note, no Phase 2 navigation.
    await page.getByRole('button', { name: '自分で旅を探す' }).click();
    await page.getByText('「自分で探す」はデモでは準備中です').waitFor();
    await expect(page).toHaveURL(/\/food-profile$/);

    // Back → recommend → explore.
    await page.getByRole('button', { name: 'おすすめの旅へ戻る' }).click();
    await page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }).click();
    await page.waitForURL('**/explore');
  });

  test('returning-home bottom nav exposes no Phase 2 route links', async ({ page }) => {
    await page.goto('/');
    await resetDemoState(page);
    // Seed a durable profile so the returning-home nav renders.
    await page.evaluate(([key, value]) => localStorage.setItem(key, value), [
      FOOD_PROFILE_KEY,
      JSON.stringify({
        dietary: [],
        dietaryOther: '',
        hasNoRestrictions: false,
        savedAt: '2026-08-16T00:00:00.000Z',
        version: 1,
      }),
    ]);
    await page.reload();
    await page.locator('.phase1-nav').waitFor();
    // Only "食旅を見つけ" is a real link (to the prototype journey); the other
    // nav labels are presentation-only and must not route to Phase 2 surfaces.
    await expect(page.locator('.phase1-nav a')).toHaveCount(1);
    await expect(page.locator('.phase1-nav a')).toHaveAttribute('href', '/explore');
    await expect(
      page.locator('.phase1-nav a[href="/discover"], .phase1-nav a[href="/mogu"], .phase1-nav a[href="/my"]'),
    ).toHaveCount(0);
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
