/**
 * Phase 1 contract gates (Issue #217) — 375px.
 *
 * Covers the contract checks the single ja golden path cannot:
 *   - en / zh-TW complete the same guided conversation to the Result with the
 *     96% match presentation and no horizontal overflow
 *   - the Phase 1 conversation keeps the full Figma option set while distinct
 *     answers can route to the enabled source-backed journeys
 *   - direct-link surfaces stay preserved and reachable without changing the
 *     Okutama golden path
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
  nickname: string;
  interviewSend: string;
  forkRecommend: string;
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
    cta: 'Start a food journey',
    intro: 'Welcome to MOGU MOGU!',
    start: "Let's start!",
    nickname: 'Nana',
    interviewSend: 'Send',
    forkRecommend: 'Recommend a journey for me!',
    taste: 'Refreshing',
    eat: 'Eat',
    okutama: 'Tokyo',
    travel60: 'Within 1 hour',
    nature: 'Nature',
    halfDay: 'Half day',
    done: 'See my result',
    save: 'Save & continue',
    reveal: 'We found a food journey that fits you!',
    matchLabel: 'Match',
    matchNote: 'demo prototype display',
    resultGreeting: 'Hi, Nana! I found a food-culture journey that suits you.',
  },
  'zh-TW': {
    cta: '開始飲食之旅',
    intro: '歡迎來到 MOGU MOGU！',
    start: '開始！',
    nickname: '奈奈美',
    interviewSend: '送出',
    forkRecommend: '推薦適合我的旅程！',
    taste: '清爽',
    eat: '吃',
    okutama: '東京都',
    travel60: '1小時內',
    nature: '自然',
    halfDay: '半日',
    done: '查看結果',
    save: '儲存並繼續',
    reveal: '我們找到了適合你的飲食之旅！',
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
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByLabel(/nickname|暱稱/i).fill(j.nickname);
  await page.getByTestId('fp-modal-submit').click();
  // Latest-Figma four-question dietary interview (presentation-only) → summary → fork.
  for (let i = 0; i < 4; i += 1) {
    await page.getByRole('button', { name: j.interviewSend }).click();
  }
  await page.getByRole('button', { name: j.save }).click();
  await page.getByRole('button', { name: j.forkRecommend }).click();
  await page.waitForURL('**/explore');

  // Exploration conversation (latest-Figma order: Experience → Departure →
  // Travel → Duration → Taste + Theme). Selecting a quick reply advances the
  // turn; only the multi-select Taste + Theme stage uses its local confirm.
  await page.getByRole('button', { name: j.eat }).click();
  await page.getByRole('button', { name: j.okutama }).click();
  await page.getByRole('button', { name: j.travel60 }).click();
  await page.getByRole('button', { name: j.halfDay }).click();
  await page.getByRole('button', { name: j.taste }).click();
  await page.getByRole('button', { name: j.nature }).click();
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
      const match = page.locator('.tmm-result-match').first();
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

  test('conversation shows the full Figma option set and routes daily produce answers to Hachioji', async ({
    page,
  }) => {
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();
    await page.getByRole('link', { name: '食旅をはじめる' }).click();
    await page.waitForURL('**/food-profile');
    await page.getByRole('button', { name: 'はじめる！' }).click();
    await page.getByLabel('ニックネーム').fill('ナナミ');
    await page.getByTestId('fp-modal-submit').click();
    // Four-question dietary interview (latest Figma), presentation-only.
    await page.getByRole('button', { name: '🥚 卵' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: '保存してつぎへ' }).click();
    await page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }).click();
    await page.waitForURL('**/explore');

    // Latest-Figma question order: Experience → Departure → Travel → Duration →
    // Taste + Theme.
    // Experience: the full tile set is shown, including make / origin / learn.
    await page.getByRole('button', { name: '作る' }).waitFor();
    await page.getByRole('button', { name: '産地を訪ねる' }).waitFor();
    await page.getByRole('button', { name: '作る' }).click();
    // Departure: Figma controls, every choice selectable (tapping one advances).
    await page.getByRole('button', { name: '東京都' }).waitFor();
    await page.getByRole('button', { name: '周辺' }).waitFor();
    await page.getByRole('button', { name: '東京都' }).click();
    // Travel: every Figma choice selectable.
    await page.getByRole('button', { name: '2時間以内', exact: true }).click();
    // Duration: including "not decided yet".
    await page.getByRole('button', { name: 'まだ決めていない' }).click();
    // Taste + theme: the full chip sets, including daily-life theme.
    await page.getByRole('button', { name: '濃厚な味' }).waitFor();
    await page.getByRole('button', { name: '甘いもの' }).waitFor();
    await page.getByRole('button', { name: 'おまかせ' }).waitFor();
    await page.getByRole('button', { name: '地域の日常' }).waitFor();
    await page.getByRole('button', { name: '濃厚な味' }).click();
    await page.getByRole('button', { name: '地域の日常' }).click();
    await page.getByRole('button', { name: '結果を見る' }).click();
    await page.waitForURL('**/explore/result');
    // A rich + daily-life answer is a real multi-region route, not a Wasabi
    // fallback; the default refreshing + nature path remains the golden path.
    await page
      .locator('.tmm-result-card__title')
      .filter({ hasText: '八王子ショウガと八王子野菜' })
      .first()
      .waitFor();
    await expect(page.locator('body')).not.toContainText('奥多摩のわさび文化をたどる');
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

/** ja: complete the Food Profile setup (interview) and reach the first Exploration step. */
async function jaReachExplorationFirstStep(page: Page): Promise<void> {
  await page.goto('/');
  await resetDemoState(page);
  await page.reload();
  await page.getByRole('link', { name: '食旅をはじめる' }).click();
  await page.waitForURL('**/food-profile');
  await page.getByRole('button', { name: 'はじめる！' }).click();
  await page.getByLabel('ニックネーム').fill('ナナミ');
  await page.getByTestId('fp-modal-submit').click();
  // Four-question dietary interview (latest Figma), presentation-only.
  await page.getByRole('button', { name: '送信' }).click();
  await page.getByRole('button', { name: '送信' }).click();
  await page.getByRole('button', { name: '送信' }).click();
  await page.getByRole('button', { name: '送信' }).click();
  await page.getByRole('button', { name: '保存してつぎへ' }).click();
  await page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }).click();
  await page.waitForURL('**/explore');
}

/** ja: complete Food Profile + the Experience step → departure step. */
async function jaReachDepartureStep(page: Page): Promise<void> {
  await jaReachExplorationFirstStep(page);
  await page.getByRole('button', { name: '食べる' }).click();
  await page.getByRole('button', { name: '東京都' }).waitFor();
}

test.describe('Phase 1 Figma departure × travel-time choices (ja, 375px)', () => {
  test.use({ locale: 'ja-JP' });

  test('departure and travel show the Figma controls and the golden path remains wasabi', async ({
    page,
  }) => {
    await jaReachDepartureStep(page);

    await page.getByRole('button', { name: '東京都' }).waitFor();
    await page.getByRole('button', { name: '周辺' }).waitFor();
    await page.getByRole('button', { name: '東京都' }).click();
    // Travel is its own step with every Figma choice selectable.
    for (const label of ['30分以内', '1時間以内', '1時間30分以内', '2時間以内', '時間は気にしない']) {
      await page.getByRole('button', { name: label, exact: true }).waitFor();
    }
    // A long travel choice is selectable and the golden answers still select wasabi.
    await page.getByRole('button', { name: '2時間以内', exact: true }).click();
    await page.getByRole('button', { name: '半日' }).click();
    await page.getByRole('button', { name: '自然' }).click();
    await page.getByRole('button', { name: '結果を見る' }).click();
    await page.waitForURL('**/explore/result');
    await page
      .locator('.tmm-result-card__title')
      .filter({ hasText: '奥多摩のわさび文化をたどる' })
      .first()
      .waitFor();
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
