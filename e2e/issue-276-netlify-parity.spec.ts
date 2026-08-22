import { mkdir } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';

const EVIDENCE_DIR = 'docs/evidence/issue-276';
const CAPTURE_EVIDENCE = process.env.ISSUE_276_EVIDENCE === '1';

async function capture(page: Page, name: string): Promise<void> {
  if (!CAPTURE_EVIDENCE) return;
  await mkdir(EVIDENCE_DIR, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(450);
  await page.screenshot({ path: `${EVIDENCE_DIR}/${name}.png`, animations: 'allow' });
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  await expect
    .poll(() =>
      page.evaluate(() => ({
        documentClientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        phoneClientWidth: document.querySelector<HTMLElement>('.reference-phone')?.clientWidth ?? 0,
        phoneScrollWidth: document.querySelector<HTMLElement>('.reference-phone')?.scrollWidth ?? 0,
      })),
    )
    .toEqual({
      documentClientWidth: 375,
      documentScrollWidth: 375,
      phoneClientWidth: 375,
      phoneScrollWidth: 375,
    });
}

test.use({
  viewport: { width: 375, height: 812 },
  locale: 'ja-JP',
  trace: 'on',
  video: 'on',
});

test.describe('Issue #276 authoritative Netlify choreography', () => {
  test('replays every timed Food Profile state and Result → Story → Route → Spot', async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();

    const splash = page.locator('[data-screen="splash"]');
    await expect(splash).toHaveAttribute('data-screen-active', 'true');
    await capture(page, '01-splash-ja-375');
    await splash.click();

    await expect(page.getByText(/MOGU MOGUへようこそ/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'はじめる！' })).toBeVisible();
    await capture(page, '02-profile-welcome-ja-375');
    await page.getByRole('button', { name: 'はじめる！' }).click();

    await expect(page.getByText('はい！はじめましょう！')).toBeVisible();
    await expect(page.locator('[data-chat-typing]')).toHaveCount(0);
    await expect(page.getByPlaceholder('ニックネームを入力')).toHaveCount(0);
    await page.waitForTimeout(300);
    await expect(page.getByPlaceholder('ニックネームを入力')).toHaveCount(0);
    await expect(page.getByPlaceholder('ニックネームを入力')).toBeVisible({ timeout: 450 });
    await expect(page.getByPlaceholder('ニックネームを入力')).toBeFocused();

    await page.getByPlaceholder('ニックネームを入力').fill('ナナ');
    await page.getByRole('button', { name: '送信' }).click();
    await expect(page.getByText('私はナナです😊')).toBeVisible();
    await expect(page.getByText(/ナナさん、/)).toHaveCount(0);
    await page.waitForTimeout(300);
    await expect(page.getByText(/ナナさん、/)).toHaveCount(0);
    await expect(page.getByText(/ナナさん、/)).toBeVisible({ timeout: 450 });
    await expect(page.locator('[data-question-index="0"]')).toHaveCount(0);
    await page.waitForTimeout(250);
    await expect(page.locator('[data-question-index="0"]')).toHaveCount(0);
    await expect(page.locator('[data-question-index="0"]')).toBeVisible({ timeout: 400 });
    await capture(page, '03-profile-allergy-ja-375');

    const profilePath = [
      { index: 0, options: ['🥚 卵', '🥜 ナッツ'] },
      { index: 1, options: ['特になし'] },
      { index: 2, options: ['🐖 豚肉', '☪️ ハラール対応が必要'] },
      { index: 3, options: ['🐟 生もの'] },
    ] as const;

    for (const [pathIndex, question] of profilePath.entries()) {
      const bubble = page.locator(`[data-question-index="${question.index}"]`);
      await expect(bubble).toBeVisible();
      for (const option of question.options) {
        await bubble.getByRole('button', { name: option, exact: true }).click();
        await expect(bubble.getByRole('button', { name: option, exact: true })).toHaveClass(/sel/);
      }
      await bubble.getByRole('button', { name: '送信', exact: true }).click();
      await expect(bubble).toHaveAttribute('data-frozen', 'true');
      if (pathIndex < profilePath.length - 1) {
        const next = page.locator(`[data-question-index="${question.index + 1}"]`);
        await page.waitForTimeout(300);
        await expect(next).toHaveCount(0);
        await expect(next).toBeVisible({ timeout: 450 });
      }
    }

    await page.waitForTimeout(300);
    await expect(page.getByText('あなたのFood Profile：')).toHaveCount(0);
    await expect(page.getByText('あなたのFood Profile：')).toBeVisible({ timeout: 450 });
    await expect(
      page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }),
    ).toHaveCount(0);
    await page.waitForTimeout(450);
    await expect(
      page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }),
    ).toBeVisible({ timeout: 500 });
    await expect(page.getByText(/MOGU MOGUへようこそ/)).toBeVisible();
    await capture(page, '04-profile-complete-ja-375');

    await page
      .getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' })
      .click();
    await expect(page).toHaveURL(/\/home$/);
    await expect(page.locator('[data-screen="home"]')).toHaveAttribute(
      'data-screen-active',
      'true',
    );
    await capture(page, '05-home-ja-375');
    await page.getByRole('button', { name: /Let's Go!/ }).click();

    await expect(page).toHaveURL(/\/explore$/);
    await expect(page.locator('[data-exploration-step="0"]')).toBeVisible();
    await page.getByRole('button', { name: /^食べる/ }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await expect(page.locator('[data-exploration-step="1"]')).toBeVisible();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '時間は気にしない' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '半日' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    await page.getByRole('button', { name: '辛いもの', exact: true }).click();
    await page.getByRole('button', { name: '濃厚な味', exact: true }).click();
    await page.getByRole('button', { name: '伝統', exact: true }).click();
    await page.getByRole('button', { name: '自然', exact: true }).click();
    await capture(page, '06-exploration-ja-375');
    await page.getByRole('button', { name: '次へ' }).click();

    await expect(page).toHaveURL(/\/explore\/result$/);
    await expect(page.getByText('96%')).toBeVisible();
    await expect(page.getByText('91%')).toBeVisible();
    await capture(page, '07-result-ja-375');
    await page
      .locator('[data-screen="result"][data-screen-active="true"] [data-journey-id="demo-okutama-wasabi"]')
      .click();

    await expect(page).toHaveURL(/\/story\/wasabi-okutama/);
    await expect(page.getByRole('heading', { name: '水がつなぐ、江戸から続く辛味' })).toBeVisible();
    await capture(page, '08-story-ja-375');
    await page.getByRole('button', { name: 'この食文化の観光ルートを作成する' }).click();
    await expect(page.locator('[data-route-loading]')).toBeVisible();
    await page.waitForTimeout(1_500);
    await expect(page).toHaveURL(/\/story\/wasabi-okutama/);
    await expect(page.locator('[data-route-loading]')).toBeVisible();
    await expect(page).toHaveURL(/\/route/, { timeout: 1_200 });

    await expect(page.locator('[data-screen="route"]')).toHaveAttribute(
      'data-screen-active',
      'true',
    );
    await capture(page, '09-route-ja-375');
    await page
      .locator('[data-screen="route"][data-screen-active="true"] [data-spot-id="okutama-tourism-office"]')
      .click();
    await expect(page).toHaveURL(/\/spot\/okutama-tourism-office/);
    await expect(page.getByRole('heading', { name: '奥多摩観光案内所' })).toBeVisible();
    await capture(page, '10-spot-ja-375');
    await expectNoHorizontalOverflow(page);
  });

  test('keeps ja/en/zh-TW primary actions and navigation usable at 375px', async ({ page }) => {
    await page.goto('/home');

    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      await page.locator('.locale-control select').selectOption(locale);
      await expectNoHorizontalOverflow(page);

      for (const path of ['/home', '/explore/result', '/story/wasabi-okutama', '/route', '/spot/okutama-tourism-office']) {
        await page.goto(path);
        await expectNoHorizontalOverflow(page);
        const activeScreen = page.locator('.reference-screen[data-screen-active="true"]');
        await expect(activeScreen).toBeVisible();
        const primaryAction = activeScreen.locator('button:visible, a:visible').last();
        await expect(primaryAction).toBeVisible();
        const box = await primaryAction.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(375);
      }
    }
  });
});
