import { expect, test, type Locator, type Page } from '@playwright/test';

const FOOD_PROFILE_KEY = 'tmm:foodProfile:v1';
const MOGU_RECENT_KEY = 'tmm:moguRecent:v1';
const NICKNAME_KEY = 'tmm:nickname:v1';
const SAVED_ROUTES_KEY = 'tmm:savedRoutes';
const TUTORIAL_KEY = 'tmm:tutorial:v1';

async function resetDemoState(page: Page): Promise<void> {
  await page.evaluate(([profile, recent, nickname, saved]) => {
    localStorage.removeItem(profile);
    localStorage.removeItem(recent);
    localStorage.removeItem(nickname);
    localStorage.removeItem(saved);
    sessionStorage.clear();
  }, [FOOD_PROFILE_KEY, MOGU_RECENT_KEY, NICKNAME_KEY, SAVED_ROUTES_KEY] as const);
}

async function expectOneTutorialTarget(scope: Locator | Page): Promise<Locator> {
  const choices = scope.locator('[data-tutorial-choice="true"]');
  const target = scope.locator('[data-tutorial-target="true"]');
  await expect(choices).not.toHaveCount(0);
  await expect(
    scope.locator('[data-tutorial-choice="true"]:not(:disabled):not([aria-disabled="true"])'),
  ).toHaveCount(1);
  await expect(target).toHaveCount(1);
  await expect(target).toBeEnabled();
  return target;
}

/** Fixed demo reset chrome must not cover the currently actionable chat turn. */
async function expectResetClearOfActiveConversation(page: Page): Promise<void> {
  await expect.poll(async () => page.evaluate(() => {
    const reset = document.querySelector<HTMLElement>('.demo-reset');
    const activeTurn = document.querySelector<HTMLElement>('.fp-convo__active .fp-convo__msg');
    if (!reset || !activeTurn) return true;
    const resetBox = reset.getBoundingClientRect();
    const turnBox = activeTurn.getBoundingClientRect();
    return resetBox.left < turnBox.right
      && resetBox.right > turnBox.left
      && resetBox.top < turnBox.bottom
      && resetBox.bottom > turnBox.top;
  }), 'the fixed demo reset must not cover the active conversation turn').toBe(false);
}

test.describe('guided tutorial (#257, ja, 375px)', () => {
  test('exposes one actionable highlighted choice per beat, then restores free exploration', async ({
    page,
  }) => {
    test.setTimeout(60_000);
    await page.goto('/');
    await resetDemoState(page);
    await page.reload();

    const landingTarget = await expectOneTutorialTarget(page);
    await landingTarget.click();
    await page.waitForURL('**/food-profile');
    await expect(page.getByTestId('tutorial-guide')).toBeVisible();

    const introTarget = await expectOneTutorialTarget(page.locator('.fp-convo').last());
    await expect(introTarget).toHaveText('はじめる！');
    await introTarget.click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByLabel('ニックネーム').fill('ナナミ');
    const nicknameTarget = await expectOneTutorialTarget(page.getByRole('dialog'));
    await nicknameTarget.click();

    for (let step = 0; step < 4; step += 1) {
      const interview = page.getByTestId(`fp-interview-step-${step}`);
      const noneTarget = await expectOneTutorialTarget(interview);
      await noneTarget.click();

      const sendTarget = await expectOneTutorialTarget(interview);
      await expect(sendTarget).toHaveText('送信');
      await sendTarget.click();
    }

    const summaryTarget = await expectOneTutorialTarget(page.locator('.fp-convo').last());
    await expect(summaryTarget).toHaveText('保存してつぎへ');
    await summaryTarget.click();

    const forkTarget = await expectOneTutorialTarget(page.locator('.fp-convo').last());
    await expect(forkTarget).toHaveText('自分に合った旅をおすすめしてもらう！');
    await forkTarget.click();
    await page.waitForURL('**/explore');
    await expectResetClearOfActiveConversation(page);

    const targetLabels = ['食べる', '東京都', '1時間以内', '半日', 'さっぱりした味', '自然', '結果を見る'];
    for (const [index, label] of targetLabels.entries()) {
      const activeTurn = page.locator('.fp-convo__active');
      const target = await expectOneTutorialTarget(activeTurn);
      await expect(target).toContainText(label);
      if (index === 0) {
        await target.focus();
        await page.keyboard.press('Enter');
      } else if (index === 1) {
        await target.focus();
        await page.keyboard.press('Space');
      } else {
        await target.click();
      }
    }
    await page.waitForURL('**/explore/result');

    await expect
      .poll(() => page.evaluate((key) => sessionStorage.getItem(key), TUTORIAL_KEY))
      .toBe('complete');

    await page.goto('/explore');
    await expect(page.getByTestId('tutorial-guide')).toHaveCount(0);
    await expect(page.locator('.tmm-wizard__tile:enabled')).toHaveCount(6);

    const reset = page.getByRole('button', { name: 'デモデータをリセット' });
    await reset.click();
    await reset.click();
    await page.goto('/food-profile');
    await expect(page.getByTestId('tutorial-guide')).toBeVisible();
    await expectOneTutorialTarget(page.locator('.fp-convo').last());
  });
});
