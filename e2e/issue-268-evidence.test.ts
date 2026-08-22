/**
 * Reproducible 375px screenshot capture for Issues #268 / #270.
 *
 * Run explicitly with `ISSUE_268_EVIDENCE=1` or `ISSUE_270_EVIDENCE=1`; the
 * normal release suite skips this artifact-only walkthrough.
 */
import { expect, test, type Page } from '@playwright/test';

const EVIDENCE_ISSUE = process.env.ISSUE_270_EVIDENCE === '1' ? '270' : '268';
const EVIDENCE_DIR = `docs/evidence/issue-${EVIDENCE_ISSUE}`;
const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const EXPLORATION_KEY = 'tmm:exploration:v1';
const LOCALE_KEY = 'tmm:locale';
const TUTORIAL_KEY = 'tmm:tutorial:v1';

async function capture(page: Page, name: string, scrollToTop = true): Promise<void> {
  await expect(page.locator('body')).toBeVisible();
  await page.evaluate(async (top) => {
    await document.fonts.ready;
    if (top) window.scrollTo({ top: 0, behavior: 'auto' });
  }, scrollToTop);
  await page.screenshot({ path: `${EVIDENCE_DIR}/${name}.png` });
}

async function completeDiagnosis(page: Page): Promise<void> {
  for (const label of ['食べる', '東京都', '1時間以内', '半日']) {
    await page.getByRole('button', { name: label }).click();
    const next = page.getByRole('button', { name: '次へ' });
    if (await next.isVisible()) await next.click();
  }
  await page.getByRole('button', { name: 'さっぱりした味' }).click();
  await page.getByRole('button', { name: '自然' }).click();
  const guidedDone = page.getByRole('button', { name: '結果を見る' });
  if (await guidedDone.isVisible()) await guidedDone.click();
  else await page.getByRole('button', { name: '次へ' }).click();
  await page.waitForURL('**/explore/result');
}

test.describe(`Issue #${EVIDENCE_ISSUE} screenshot evidence`, () => {
  test.skip(
    process.env.ISSUE_268_EVIDENCE !== '1' && process.env.ISSUE_270_EVIDENCE !== '1',
    'artifact capture only',
  );
  test.use({ locale: 'ja-JP', viewport: { width: 375, height: 812 } });

  test('captures the lifecycle and downstream identity surfaces', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
    await page.getByRole('heading', { name: '東京のローカルな食文化を体験しよう。' }).waitFor();
    await capture(page, '01-landing-ja-375');

    await page.getByRole('link', { name: '食旅をはじめる' }).click();
    await page.getByRole('button', { name: 'はじめる！' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await capture(page, '02-nickname-ja-375');

    await page.getByLabel('ニックネーム').fill('ナナミ');
    await page.getByTestId('fp-modal-submit').click();
    await capture(page, '03-dietary-ja-375', false);
    for (let step = 0; step < 4; step += 1) {
      await page.locator('[data-tutorial-target="true"]').click();
      await page.locator('[data-tutorial-target="true"]').click();
    }
    await capture(page, '04-food-profile-summary-ja-375', false);

    await page.getByRole('button', { name: '保存してつぎへ' }).click();
    await page.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }).click();
    await page.waitForURL('**/explore');
    await page.getByTestId('diagnosis-session').waitFor();
    await capture(page, '05-diagnosis-entry-ja-375');

    await completeDiagnosis(page);
    await page.getByRole('heading', { name: 'あなたに合う食の旅を見つけました！' }).waitFor();
    await capture(page, '06-result-ja-375');
    await page.getByRole('link', { name: 'もう一度食旅を見つける' }).click();
    await page.waitForURL('**/explore');
    await capture(page, '07-repeat-diagnosis-ja-375');
    await completeDiagnosis(page);

    await page.getByRole('link', { name: '東京わさびの物語を読む' }).click();
    await page.waitForURL('**/story/wasabi-okutama*');
    await page.getByRole('heading', { name: '東京わさび' }).waitFor();
    await capture(page, '08-story-ja-375');
    await page.getByRole('link', { name: 'この食文化の観光ルートを作成する' }).click();
    await page.waitForURL('**/route*');
    await page.getByRole('heading', { name: '奥多摩わさび紀行' }).waitFor();
    await capture(page, '09-route-ja-375');
    await page
      .locator('.s5-timeline__pin-link')
      .filter({ hasText: '奥多摩観光案内所' })
      .click();
    await page.waitForURL('**/spot/okutama-tourism-office*');
    await page.getByRole('heading', { name: '奥多摩観光案内所' }).waitFor();
    await capture(page, '10-spot-ja-375');

    for (const locale of ['en', 'zh-TW'] as const) {
      await page.evaluate(([localeKey, localeValue, explorationKey, tutorialKey]) => {
        localStorage.setItem(localeKey, localeValue);
        sessionStorage.removeItem(explorationKey);
        sessionStorage.setItem(tutorialKey, 'complete');
      }, [LOCALE_KEY, locale, EXPLORATION_KEY, TUTORIAL_KEY] as const);
      await page.goto('/explore');
      await expect(page.getByTestId('diagnosis-session')).toBeVisible();
      await capture(page, locale === 'en' ? '11-diagnosis-en-375' : '12-diagnosis-zh-TW-375');
    }

    await page.evaluate((localeKey) => localStorage.setItem(localeKey, 'ja'), LOCALE_KEY);
    await page.goto('/food-profile/edit');
    await page.getByRole('heading', { name: 'フードプロフィールを編集' }).waitFor();
    await capture(page, '13-food-profile-edit-ja-375');

    expect(await page.evaluate((key) => localStorage.getItem(key), FOOD_PROFILE_KEY)).not.toBeNull();
  });
});
