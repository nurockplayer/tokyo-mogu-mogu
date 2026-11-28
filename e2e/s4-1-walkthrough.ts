import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { checkJourneyAdmission, resolveJourneyVisitorSource } from '../src/data/journey-admission';
import { selectRouteStop } from '../src/data/journey-record';
import { JOURNEY_RECORDS } from '../src/data/journey-records';
import { MUNICIPALITIES } from '../src/data/municipalities';
import { strings } from '../src/i18n/resources';

const locales = ['ja', 'en', 'zh-TW'] as const;
const profileAnswers = {
  ja: ['はじめる！', 'アレルギーはありません', '特になし', '特になし', '特になし'],
  en: ['Start!', 'No food allergies', 'None', 'None', 'None'],
  'zh-TW': ['開始！', '沒有食物過敏', '沒有', '沒有', '沒有'],
};
const screen = (page: Page, name: string) =>
  page.locator(`[data-screen="${name}"][data-screen-active="true"]`);

function admittedTrips() {
  const now = new Date();
  const output = execFileSync('pnpm', ['--silent', 'data:journey-admission', '--json'], { encoding: 'utf8' });
  const decisions: { id: string; admitted: boolean }[] = JSON.parse(output);
  const admittedIds = new Set(decisions.filter(({ admitted }) => admitted).map(({ id }) => id));
  const candidates = JOURNEY_RECORDS.filter(({ journey }) => admittedIds.has(journey.id)).map((record) => {
    const { defaultVariant } = checkJourneyAdmission(record, now);
    const route = record.journey.routeVariants.find(({ id }) => id === defaultVariant!.id)!;
    return {
      record,
      primarySpotId: defaultVariant!.primarySpotId!,
      arrival: record.variants[route.id]!.arrival!,
      minutes: route.durationMinutes,
      optionalSpotId: route.steps.map(({ spotId }) => selectRouteStop(record, spotId)).find((spotId) =>
        spotId && !resolveJourneyVisitorSource(record, spotId, now)),
    };
  });
  const areas = new Set<string>();
  const cultures = new Set<string>();
  const trips = locales.map((locale) => {
    const trip = candidates.find(({ record, minutes }) =>
      minutes <= 480 && !areas.has(record.municipalityId) && !cultures.has(record.journey.foodCultureId));
    if (!trip) throw new Error(`No representative admitted trip for ${locale}`);
    areas.add(trip.record.municipalityId);
    cultures.add(trip.record.journey.foodCultureId);
    return trip;
  });
  const optional = candidates.find(({ optionalSpotId }) => optionalSpotId);
  if (!optional) throw new Error('Admission output has no optional route Spot without an available official link');
  return { now, trips, optional };
}

async function tabTo(page: Page, target: Locator) {
  await expect(target).toBeVisible();
  for (let tabs = 0; tabs < 80; tabs++) {
    if (await target.evaluate((element) => element === document.activeElement)) break;
    await page.keyboard.press('Tab');
  }
  await expect(target).toBeFocused();
  expect(await target.evaluate((element) => {
    const ring = (node: Element) => {
      const { outlineStyle, outlineWidth } = getComputedStyle(node);
      return outlineStyle !== 'none' && parseFloat(outlineWidth) > 0;
    };
    return element.matches(':focus-visible') &&
      (ring(element) || (element.matches('input') && ring(element.parentElement!)));
  }), 'keyboard focus has a visible outline').toBe(true);
}

async function activate(page: Page, target: Locator) {
  await tabTo(page, target);
  await page.keyboard.press('Enter');
}

async function choose(page: Page, field: Locator, value: string) {
  await tabTo(page, field);
  const index = await field.evaluate((element, option) =>
    Array.from((element as HTMLSelectElement).options).findIndex(({ value }) => value === option), value);
  expect(index, `select offers ${value}`).toBeGreaterThan(0);
  await page.keyboard.press('Home');
  for (let step = 0; step < index; step++) await page.keyboard.press('ArrowDown');
  await expect(field).toHaveValue(value);
}

async function expectLayoutAndMotion(active: Locator) {
  const state = await active.evaluate((element) => {
    const phone = element.closest('.reference-phone')!;
    const longest = (values: string) => Math.max(...values.split(',').map((value) =>
      parseFloat(value) * (value.trim().endsWith('ms') ? 1 : 1000)));
    const moving = [element, ...element.querySelectorAll('*')].filter((node) =>
      [null, '::before', '::after'].some((pseudo) => {
        const style = getComputedStyle(node, pseudo);
        return longest(style.animationDuration) > 0.01 || longest(style.transitionDuration) > 0.01 ||
          style.scrollBehavior === 'smooth';
      }));
    return {
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      phoneOverflow: phone.scrollWidth - phone.clientWidth,
      screenOverflow: element.scrollWidth - element.clientWidth,
      moving: moving.map(({ tagName, className }) => [tagName, String(className)]),
    };
  });
  expect(state).toEqual({ documentOverflow: 0, phoneOverflow: 0, screenOverflow: 0, moving: [] });
}

test.describe('S4-1 built candidate', () => {
  let admission: ReturnType<typeof admittedTrips>;

  test.beforeAll(() => { admission = admittedTrips(); });

  for (const [index, locale] of locales.entries()) {
    for (const width of [375, 1440]) {
      test(`${locale} ${width}px keyboard walkthrough`, async ({ page, context }, info) => {
        test.setTimeout(90_000);
        const { now, trips } = admission;
        const { record, primarySpotId, arrival, minutes } = trips[index];
        const { journey, municipalityId } = record;
        const municipality = MUNICIPALITIES.find(({ id }) => id === municipalityId)!;
        const source = resolveJourneyVisitorSource(record, primarySpotId, now)!;
        const deadline = [15, 30, 60, 90, 120, 180, 240, 480].find((limit) => limit >= minutes)!;
        const copy = strings[locale];
        const [begin, ...answers] = profileAnswers[locale];
        const prefix = `s4-1-${locale}-${width}`;
        const failures = [];

        await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.clock.setFixedTime(now);
        await page.addInitScript((value) => localStorage.setItem('tmm:locale', value), locale);
        await context.route(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//, (route) => route.abort());
        await context.route(source.url.split('#')[0], (route) => route.fulfill({ body: 'Official visitor information' }));

        async function capture(name: string, active: Locator, subject: Locator) {
          await expect(active).toBeVisible();
          await expectLayoutAndMotion(active);
          const { violations } = await new AxeBuilder({ page }).analyze();
          failures.push(...violations.filter(({ impact }) => impact === 'serious' || impact === 'critical')
            .map(({ id, impact, nodes }) => ({ name, id, impact, targets: nodes.map(({ target }) => target) })));
          await subject.scrollIntoViewIfNeeded();
          await page.screenshot({ path: info.outputPath(`${prefix}-${name}.png`), fullPage: true });
        }

        await page.goto('/food-profile');
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', locale);
        const profile = screen(page, 'food-profile');
        await activate(page, profile.getByRole('button', { name: begin, exact: true }));
        const dialog = profile.getByRole('dialog');
        await tabTo(page, dialog.getByRole('textbox'));
        await page.keyboard.type('S4');
        await activate(page, dialog.getByRole('button', { name: copy.fpNicknameModalSubmit, exact: true }));
        for (const [questionIndex, name] of answers.entries()) {
          const question = profile.locator(`[data-question-index="${questionIndex}"]`);
          await activate(page, question.getByRole('button', { name, exact: true }));
          await activate(page, question.getByRole('button', { name: copy.fpIvSend, exact: true }));
        }

        const fields = profile.getByRole('combobox');
        await choose(page, fields.nth(0), municipalityId);
        await choose(page, fields.nth(2), String(deadline));
        await capture('profile', profile, fields.nth(2));
        await activate(page, profile.locator('.choice-card .btn.orange'));
        await activate(page, screen(page, 'home').getByRole('button', { name: /Let's Go!/ }));
        const explore = screen(page, 'explore');
        for (let step = 0; step < 5; step++) {
          await expect(explore.locator(`[data-exploration-step="${step}"]`)).toBeVisible();
          await activate(page, explore.locator('#wiz-next'));
        }

        await expect(page).toHaveURL('/explore/result');
        const result = screen(page, 'result');
        const card = result.locator(`[data-journey-id="${journey.id}"]`);
        const reason = card.locator('[data-match-reason]');
        await expect(reason).toContainText(municipality.names[locale]);
        await expect(reason).toContainText(String(deadline));
        await capture('result', result, reason);
        await activate(page, card);

        await expect(page).toHaveURL(`/story/${journey.storyId}`);
        const story = screen(page, 'story');
        const viewRouteName = { ja: 'この食旅のルートを見る', en: 'View this route', 'zh-TW': '查看這趟美食之旅的路線' };
        const viewRoute = story.getByRole('button', { name: viewRouteName[locale] });
        await capture('story', story, story.locator('.page-card').first());
        await activate(page, viewRoute);

        await expect(page).toHaveURL(`/route?candidateId=${journey.id}`);
        const route = screen(page, 'route');
        const routeInfo = route.locator('.route-info');
        await expect(routeInfo).toContainText(arrival.name[locale]);
        await capture('route', route, routeInfo);
        await activate(page, route.locator(`[data-spot-id="${primarySpotId}"]`));

        await expect(page).toHaveURL(`/spot/${primarySpotId}?candidateId=${journey.id}`);
        const spot = screen(page, 'spot');
        const handoff = spot.locator('.guide-box').getByRole('link');
        await expect(handoff).toHaveAttribute('href', source.url);
        await expect(handoff).toHaveAttribute('rel', 'noopener noreferrer');
        await capture('spot', spot, handoff);
        const popupPromise = page.waitForEvent('popup');
        await activate(page, handoff);
        const popup = await popupPromise;
        await expect(popup).toHaveURL(source.url);
        await popup.close();

        await writeFile(info.outputPath(`${prefix}.json`), JSON.stringify({
          locale, width, journeyId: journey.id, municipality: municipalityId, foodCulture: journey.foodCultureId,
          deadline, arrival: arrival.name[locale], spotId: primarySpotId, officialUrl: source.url, failures,
        }, null, 2));
        expect(failures, 'serious or critical axe violations across the walkthrough').toEqual([]);
      });
    }
  }

  test('recovers from blocked route and Spot saves, wrong IDs and missing optional action', async ({ page }, info) => {
    const { now, trips: [{ record, primarySpotId }], optional } = admission;
    const { id } = record.journey;
    const capture = (name: string) => page.screenshot({ path: info.outputPath(`s4-1-${name}.png`), fullPage: true });
    await page.clock.setFixedTime(now);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => {
      const setItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (this: Storage, key, value) {
        if (this === localStorage) throw new DOMException('Local writes blocked', 'SecurityError');
        setItem.call(this, key, value);
      };
    });
    await page.goto(`/route?candidateId=${id}`);
    const route = screen(page, 'route');
    const toast = page.getByRole('status');
    const saveRoute = route.getByRole('button', { name: 'マイルートに保存' });
    await saveRoute.click();
    await expect(toast).toHaveText('保存できませんでした。');
    await expect(saveRoute).toHaveAttribute('aria-pressed', 'false');
    await capture('blocked-save');
    await route.locator(`[data-spot-id="${primarySpotId}"]`).click();
    const spot = screen(page, 'spot');
    const saveSpot = spot.getByRole('button', { name: 'お気に入りに保存' });
    await saveSpot.click();
    await expect(toast).toHaveText('保存できませんでした。');
    await expect(saveSpot).toHaveAttribute('aria-pressed', 'false');
    await page.reload();
    await expect(saveSpot).toHaveAttribute('aria-pressed', 'false');
    await expect(spot.locator('.guide-box').getByRole('link')).toBeVisible();

    for (const [name, url] of [
      ['wrong-journey', '/route?candidateId=s4-1-nonexistent-journey'],
      ['wrong-spot', `/spot/s4-1-nonexistent-spot?candidateId=${id}`],
    ]) {
      await page.goto(url);
      const unavailable = screen(page, 'journey-unavailable');
      await expect(unavailable.getByRole('heading')).toHaveText(strings.ja.journeyUnavailableTitle);
      await capture(name);
      await unavailable.getByRole('link', { name: strings.ja.journeyUnavailableBack }).click();
      await expect(page).toHaveURL('/mogu');
    }

    const optionalRoute = `/route?candidateId=${optional.record.journey.id}`;
    await page.goto(optionalRoute);
    await route.locator(`[data-spot-id="${optional.optionalSpotId}"]`).click();
    await expect(page).toHaveURL(`/spot/${optional.optionalSpotId}?candidateId=${optional.record.journey.id}`);
    const guide = spot.locator('.guide-box');
    await expect(guide).toContainText('現在利用できる公式の訪問案内リンクはありません');
    await expect(guide.getByRole('link')).toHaveCount(0);
    await expect(guide.getByRole('button')).toHaveCount(0);
    await guide.scrollIntoViewIfNeeded();
    await capture('missing-action');
    await spot.getByRole('button', { name: '戻る' }).click();
    await expect(page).toHaveURL(optionalRoute);
  });
});
