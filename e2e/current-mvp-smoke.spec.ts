import { expect, test, type BrowserContext, type Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build, createServer, preview } from 'vite';
import { checkJourneyAdmission, resolveJourneyVisitorSource } from '../src/data/journey-admission';
import { selectRouteStop } from '../src/data/journey-record';
import { JOURNEY_RECORDS } from '../src/data/journey-records';
import { MUNICIPALITIES, type MunicipalityGroup } from '../src/data/municipalities';
import type { JourneyPresentation } from '../src/features/netlify-parity/content';
import { spotPhraseStaffNotice, strings } from '../src/i18n/resources';

const demoTest = test.extend({
  baseURL: `http://127.0.0.1:${Number(process.env.PLAYWRIGHT_PORT ?? '4173') + 1}`,
});

function stubRemoteFonts(context: BrowserContext) {
  return context.route(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//, (route) => route.abort());
}

async function blockRemoteFonts(page: Page) {
  // Playwright routing disables the HTTP cache for every request in the context.
  const session = await page.context().newCDPSession(page);
  await session.send('Network.setBlockedURLs', {
    urls: ['https://fonts.googleapis.com/*', 'https://fonts.gstatic.com/*'],
  });
}

const publicationDate = new Date('2026-11-27T13:00:00Z');
const publication = JOURNEY_RECORDS.map((record) => ({
  record,
  ...checkJourneyAdmission(record, publicationDate),
}));
const admitted = publication.find(({ admitted }) => admitted);
const missingArrival = publication.find(({ admitted, record, variants }) =>
  !admitted && variants.some(({ id, failures }) =>
    failures.includes('sourced arrival point') && !record.variants[id]?.arrival),
);
const retrievalDate = /\d{4}-\d{2}-\d{2}(?: \/ \d{4}-\d{2}-\d{2})* \(JST\)/;

const activeScreen = (page: Page, screen: string) =>
  page.locator(`[data-screen="${screen}"][data-screen-active="true"]`);

test('S3-6 shares the selected itinerary with a clean browser at 375px', async ({ page, browser }, testInfo) => {
  const { record, offeredVariants } = publication.find(({ offeredVariants }) => offeredVariants.length > 1) ?? admitted!;
  const variantId = offeredVariants.at(-1)!.id;
  const variantLabel = variantId === 'half-day' ? '半日' : '一日';
  const routePath = `/route?candidateId=${record.journey.id}`;
  await page.clock.setFixedTime(publicationDate);
  await page.addInitScript(({ profile, savedRouteId }) => {
    localStorage.setItem('tmm:nickname:v1', 'private-traveller');
    localStorage.setItem('tmm:foodProfile:v1', JSON.stringify(profile));
    localStorage.setItem('tmm:savedRoutes', JSON.stringify([{ routeId: savedRouteId, savedAt: profile.savedAt }]));
    Object.defineProperty(navigator, 'share', {
      value: async (payload: ShareData) => sessionStorage.setItem('captured-share', JSON.stringify(payload)),
    });
  }, {
    profile: {
      ...persistedFoodProfile,
      dietary: ['allergy'],
      dietarySelections: { allergy: ['egg'] },
      hasNoRestrictions: false,
    },
    savedRouteId: record.journey.routeId,
  });
  await page.goto(`${routePath}&from=my`);
  const senderRoute = activeScreen(page, 'route');
  const stops = (route: ReturnType<typeof activeScreen>) => route.locator('[data-spot-id]').evaluateAll(
    (elements) => elements.map((element) => element.getAttribute('data-spot-id')),
  );
  const selectedVariant = senderRoute.getByRole('button', { name: variantLabel, exact: true });
  await selectedVariant.click();
  await expect(selectedVariant).toHaveAttribute('aria-pressed', 'true');
  const sharedStops = await stops(senderRoute);
  expect(sharedStops.length).toBeGreaterThan(0);
  await senderRoute.getByRole('button', { name: 'ルートをシェア' }).click();
  const payload = await page.evaluate(() => JSON.parse(sessionStorage.getItem('captured-share')!) as ShareData);
  const expected = new URL(`${routePath}&variant=${variantId}`, page.url()).href;
  expect(payload.url).toBe(expected);

  const clean = await browser.newContext({ viewport: { width: 375, height: 812 }, locale: 'ja-JP' });
  try {
    expect(await clean.storageState()).toEqual({ cookies: [], origins: [] });
    const recipient = await clean.newPage();
    await recipient.clock.setFixedTime(publicationDate);
    await recipient.goto(payload.url!);
    const recipientRoute = activeScreen(recipient, 'route');
    await expect(recipientRoute.getByRole('button', { name: variantLabel, exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(recipientRoute.locator('.ghead > span')).toHaveText(await senderRoute.locator('.ghead > span').innerText());
    expect(await stops(recipientRoute)).toEqual(sharedStops);
    await expectNoHorizontalOverflow(recipient);
    await recipient.locator('.route-info').scrollIntoViewIfNeeded();
    await recipient.screenshot({ path: testInfo.outputPath('s3-6-shared-itinerary-ja.png'), animations: 'disabled' });
    const unavailableVariant = new URL(expected);
    unavailableVariant.searchParams.set('variant', 'unavailable-variant');
    await recipient.goto(unavailableVariant.href);
    await expect(activeScreen(recipient, 'journey-unavailable')).toBeVisible();
  } finally {
    await clean.close();
  }
});

test('S3-7 copies the selectable link after native share cancellation or failure at 375px', async ({ page, context }, testInfo) => {
  const { record, defaultVariant } = admitted!;
  const errors = ['AbortError', 'NotAllowedError'];
  await page.clock.setFixedTime(publicationDate);
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.addInitScript((names) => {
    Object.defineProperty(navigator, 'share', {
      value: async () => { throw new DOMException('Share did not complete', names.shift()); },
    });
  }, errors);
  const routePath = `/route?candidateId=${record.journey.id}`;
  await page.goto(routePath);
  const route = activeScreen(page, 'route');
  const dialog = route.getByRole('dialog', { name: 'ルートのリンクをコピー' });
  const link = dialog.getByRole('textbox', { name: 'ルートのリンクをコピー' });
  const expected = new URL(`${routePath}&variant=${defaultVariant!.id}`, page.url()).href;
  for (const error of errors) {
    await route.getByRole('button', { name: 'ルートをシェア' }).click();
    await expect(link).toHaveValue(expected);
    await expect(link).toBeFocused();
    expect(await link.evaluate((field: HTMLTextAreaElement) =>
      field.value.slice(field.selectionStart, field.selectionEnd))).toBe(expected);
    await page.evaluate(() => navigator.clipboard.writeText(''));
    await link.press('ControlOrMeta+c');
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(expected);
    await expectNoHorizontalOverflow(page);
    if (error === 'AbortError') {
      await page.screenshot({ path: testInfo.outputPath('s3-7-share-recovery-ja.png'), animations: 'disabled' });
    }
    await dialog.getByRole('button', { name: '閉じる' }).click();
    await expect(dialog).toBeHidden();
  }
});

const representativeJourneys = new Map<MunicipalityGroup, (typeof publication)[number]>();
const sampledCultures = new Set<string>();
for (const sample of publication) {
  if (!sample.admitted) continue;
  const { municipalityId, journey } = sample.record;
  const group = MUNICIPALITIES.find(({ id }) => id === municipalityId)!.group;
  if (representativeJourneys.has(group) || sampledCultures.has(journey.foodCultureId)) continue;
  representativeJourneys.set(group, sample);
  sampledCultures.add(journey.foodCultureId);
}

for (const [locale, viewRoute, unavailable, backToMogu] of [
  ['ja', 'この食旅のルートを見る', 'この食旅は現在ご覧いただけません', 'モグモグるに戻る'],
  ['en', 'View this route', 'This food journey is currently unavailable', 'Back to MOGU'],
  ['zh-TW', '查看這趟美食之旅的路線', '目前無法瀏覽這趟美食之旅', '返回 MOGU'],
] as const) {
  test(`#442 walks the admitted journey in ${locale}`, async ({ page, context }, testInfo) => {
    const walkthroughDate = locale === 'ja' ? new Date() : publicationDate;
    const stageC = /^b\d{2}-/;
    const sample = locale === 'ja' ? JOURNEY_RECORDS
      .filter(({ journey }) => stageC.test(journey.id))
      .map((record) => ({ record, ...checkJourneyAdmission(record, walkthroughDate) }))
      .find(({ admitted }) => admitted) : admitted;
    expect(sample, 'The walkthrough must have an admitted journey').toBeDefined();
    const { record, defaultVariant } = sample!;
    const { id: admittedId, storyId } = record.journey;
    const primarySpotId = defaultVariant!.primarySpotId!;
    const variant = record.variants[defaultVariant!.id]!;
    const arrival = variant.arrival!;
    const visitorSource = resolveJourneyVisitorSource(record, primarySpotId, walkthroughDate)!;
    const officialDestination = visitorSource.url;
    await page.clock.setFixedTime(walkthroughDate);
    await page.addInitScript((value) => localStorage.setItem('tmm:locale', value), locale);
    const active = (screen: string) => page.locator(`[data-screen="${screen}"][data-screen-active="true"]`);
    const screenshot = async (name: string) => {
      if (locale === 'ja') await page.screenshot({ path: testInfo.outputPath(`${name}.png`), animations: 'disabled' });
    };

    await page.goto('/mogu');
    const mogu = active('mogu');
    const card = mogu.locator(`[data-journey-id="${admittedId}"]`);
    await expect(card).toBeVisible();
    await expect(card).toContainText(retrievalDate);
    await screenshot('mogu-ja');
    await card.click();

    const story = active('story');
    await expect(page).toHaveURL(`/story/${storyId}`);
    await expect(story.locator('.page-card').first()).toContainText(retrievalDate);
    await screenshot('story-ja');
    await story.getByRole('button', { name: viewRoute }).click();
    await expect(story.locator('[data-route-loading][data-loading="true"]')).toHaveCount(0);

    const route = active('route');
    await expect(page).toHaveURL(`/route?candidateId=${admittedId}`);
    await expect(route.locator('.route-info')).toContainText(arrival.name[locale]);
    await expect(route.locator('.route-info')).toContainText(record.sources[arrival.sourceId].retrievedAt!);
    await expect(route.locator('.route-stats')).toContainText(variant.stats[locale].time);
    await expect(route.locator('.regen')).toHaveCount(0);
    await route.locator('.route-info').scrollIntoViewIfNeeded();
    await screenshot('route-ja');
    await route.locator(`[data-spot-id="${primarySpotId}"]`).click();

    const spot = active('spot');
    const guide = spot.locator('.guide-box');
    const handoff = guide.getByRole('link');
    await expect(page).toHaveURL(`/spot/${primarySpotId}?candidateId=${admittedId}`);
    await expect(spot.locator('.info-sec')).toContainText(retrievalDate);
    await expect(guide).toContainText(visitorSource.retrievedAt);
    await expect(handoff).toHaveAttribute('href', officialDestination);
    await expect(handoff).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(spot).not.toContainText(/予約が完了|アレルギーでも安心|booking confirmed|allergy.safe|預約成功|過敏者可安心/i);
    await expectNoHorizontalOverflow(page);
    await guide.scrollIntoViewIfNeeded();
    await screenshot('spot-ja');
    await context.route(officialDestination, (request) => request.fulfill({ body: 'Official visitor information' }));
    const popupPromise = page.waitForEvent('popup');
    await handoff.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(officialDestination);
    await popup.close();

    if (locale === 'ja') {
      const output = execFileSync('pnpm', ['data:journey-admission'], { encoding: 'utf8' });
      const passing = [...output.matchAll(/^(\S+) admitted(?: — .*)?$/gm)].map(([, id]) => id);
      const exclusions = [...output.matchAll(/^\S+ excluded — (.+)$/gm)].map(([line]) => line);
      expect(passing.find((id) => stageC.test(id))).toBe(admittedId);
      expect(exclusions).toHaveLength(JOURNEY_RECORDS.length - passing.length);
      const origin = new URL(page.url()).origin;
      const report = [
        '# S1 journey admission report',
        '',
        'Record decisions come from `pnpm data:journey-admission`. The Japanese `#442 walks the admitted journey` smoke generates this report after the 375px preview walkthrough. Start the built preview at the origin below to reopen the URLs.',
        '',
        `Sample: \`${admittedId}\`, the first admitted Stage C record in catalog order.`,
        '',
        `- [MOGU](${origin}/mogu) · [capture](evidence/s1/s1-5-mogu-ja.png)`,
        `- [Story](${origin}/story/${storyId}) · [capture](evidence/s1/s1-5-story-ja.png)`,
        `- [Route](${origin}/route?candidateId=${admittedId}) · [arrival and duration](evidence/s1/s1-5-route-ja.png)`,
        `- [Primary Spot](${page.url()}) · [official handoff](evidence/s1/s1-5-spot-ja.png)`,
        `- [Official destination](${officialDestination}) · retrieved ${visitorSource.retrievedAt} JST. Smoke verifies the exact popup URL with a stubbed response.`,
        '- [Excluded invalid primary action](evidence/s1/s1-4-invalid-primary-action-ja.png) · separate test build.',
        '',
        `## Admitted IDs (${passing.length})`,
        '',
        passing.map((id) => `\`${id}\``).join(', '),
        '',
        `## Exclusions (${exclusions.length})`,
        '',
        ...exclusions.map((line) => `- ${line}`),
        '',
      ].join('\n');
      await writeFile(testInfo.outputPath('journey-admission-report.md'), report);
    }
  });

  test(`S2-6 follows representative admitted trips in ${locale}`, async ({ page, context }, testInfo) => {
    await stubRemoteFonts(context);
    expect([...representativeJourneys.keys()].sort()).toEqual(
      [...new Set(MUNICIPALITIES.map(({ group }) => group))].sort(),
    );
    await page.clock.setFixedTime(publicationDate);
    await page.addInitScript((value) => localStorage.setItem('tmm:locale', value), locale);
    for (const [group, { record, defaultVariant }] of representativeJourneys) {
      await test.step(`${group} / ${record.journey.foodCultureId}`, async () => {
        const { id, storyId } = record.journey;
        const arrival = record.variants[defaultVariant!.id]!.arrival!;
        const spotId = defaultVariant!.primarySpotId!;
        const source = resolveJourneyVisitorSource(record, spotId, publicationDate)!;
        await page.goto('/mogu');
        await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', locale);
        await activeScreen(page, 'mogu').locator(`[data-journey-id="${id}"]`).click();
        await expect(page).toHaveURL(`/story/${storyId}`);
        await activeScreen(page, 'story').getByRole('button', { name: viewRoute }).click();
        const route = activeScreen(page, 'route');
        await expect(page).toHaveURL(`/route?candidateId=${id}`);
        const routeInfo = route.locator('.route-info');
        await expect(routeInfo).toContainText(arrival.name[locale]);
        await routeInfo.scrollIntoViewIfNeeded();
        await page.screenshot({ path: testInfo.outputPath(`s2-arrival-${group}-${locale}.png`) });
        await route.locator(`[data-spot-id="${spotId}"]`).click();
        await expect(page).toHaveURL(`/spot/${spotId}?candidateId=${id}`);
        const link = activeScreen(page, 'spot').locator('.guide-box').getByRole('link');
        await expect(link).toHaveAttribute('href', source.url);
        await link.scrollIntoViewIfNeeded();
        await page.screenshot({ path: testInfo.outputPath(`s2-official-${group}-${locale}.png`) });
        await context.route(source.url.split('#')[0], (request) => request.fulfill({ body: 'Official visitor information' }));
        const popupPromise = page.waitForEvent('popup');
        await link.click();
        const popup = await popupPromise;
        await expect(popup).toHaveURL(source.url);
        await popup.close();
      });
    }
  });

  test(`S1-2 / S1b-3 hides a journey without a sourced arrival point in ${locale}`, async ({ page }, testInfo) => {
    if (!missingArrival) throw new Error('Admission must exclude a record with no structured or sourced arrival point');
    const { id, storyId, routeId, routeVariants } = missingArrival.record.journey;
    const { spotId } = routeVariants[0].steps[0];
    await page.clock.setFixedTime(publicationDate);
    await page.addInitScript((value) => localStorage.setItem('tmm:locale', value), locale);
    await page.goto('/mogu');
    const mogu = page.locator('[data-screen="mogu"][data-screen-active="true"]');
    await expect(mogu).toBeVisible();
    await expect(mogu.locator(`[data-journey-id="${id}"]`)).toHaveCount(0);

    const unavailableScreen = page.locator('[data-screen="journey-unavailable"][data-screen-active="true"]');
    for (const path of [`/story/${storyId}`, `/route?routeId=${routeId}`, `/spot/${spotId}?candidateId=${id}`]) {
      await page.goto(path);
      await expect(unavailableScreen.getByRole('heading', { name: unavailable })).toBeVisible();
      await expect(unavailableScreen.locator('header').getByRole('button')).toBeVisible();
      await expect(unavailableScreen.getByRole('navigation')).toBeVisible();
      await expect(unavailableScreen.getByRole('link', { name: backToMogu })).toHaveAttribute('href', '/mogu');
      if (locale === 'ja' && path === `/story/${storyId}`) {
        await page.screenshot({ path: testInfo.outputPath('s1-2-unavailable-story-ja.png'), animations: 'disabled' });
      }
    }
    await expectNoHorizontalOverflow(page);
    const textFits = await unavailableScreen.locator('h1, p').evaluateAll((elements) =>
      elements.every((element) => element.scrollWidth <= element.clientWidth),
    );
    expect(textFits).toBe(true);
    if (locale === 'zh-TW') {
      await page.screenshot({ path: testInfo.outputPath('s1b-3-unavailable-spot-zh-TW.png'), animations: 'disabled' });
    }
    await page.getByRole('link', { name: backToMogu }).click();
    await expect(page).toHaveURL('/mogu');
  });
}

test('S1-4 makes an admitted Route unavailable when its primary action is invalid', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  const { record, defaultVariant } = admitted!;
  const { id } = record.journey;
  const sourceId = `${id}-invalid-visitor-action`;
  const fixture = {
    ...record,
    spots: Object.fromEntries(Object.entries(record.spots).map(([spotId, spot]) => [
      spotId, { ...spot, visitorSourceId: sourceId },
    ])),
    sources: {
      ...record.sources,
      [sourceId]: {
        ...resolveJourneyVisitorSource(record, defaultVariant!.primarySpotId!, publicationDate)!,
        url: 'about:blank',
      },
    },
  };
  const decision = checkJourneyAdmission(fixture, publicationDate);
  expect(decision.admitted).toBe(false);
  expect(decision.storyFailures).toEqual([]);
  expect(decision.variants.find(({ id }) => id === defaultVariant!.id)?.failures)
    .toEqual(['official destination for primary Spot']);

  await page.clock.setFixedTime(publicationDate);
  const path = `/route?candidateId=${id}`;
  await page.goto(path);
  await expect(activeScreen(page, 'route')).toBeVisible();

  const outDir = await mkdtemp(join(tmpdir(), 'tmm-s1-invalid-action-'));
  try {
    await build({
      logLevel: 'warn',
      build: { outDir },
      plugins: [{
        name: 's1-test-invalid-visitor-action',
        transform(source, moduleId) {
          if (moduleId.endsWith('/src/data/journey-records/index.ts')) {
            return `${source}\nJOURNEY_RECORDS[JOURNEY_RECORDS.findIndex(({ journey }) => journey.id === ${JSON.stringify(id)})] = ${JSON.stringify(fixture)};`;
          }
        },
      }],
    });
    const server = await preview({ build: { outDir }, preview: { host: '127.0.0.1', port: 0 } });
    try {
      await page.goto(new URL(path, server.resolvedUrls.local[0]).href);
      await expect(activeScreen(page, 'journey-unavailable').getByRole('heading'))
        .toHaveText(strings.ja.journeyUnavailableTitle);
      await expect(activeScreen(page, 'route')).toHaveCount(0);
      await expectNoHorizontalOverflow(page);
      await page.screenshot({ path: testInfo.outputPath('s1-4-invalid-primary-action-ja.png'), animations: 'disabled' });
    } finally {
      await server.close();
    }
  } finally {
    await rm(outDir, { recursive: true });
  }
});

function journeyDeepLinks(journey: JourneyPresentation, record?: (typeof JOURNEY_RECORDS)[number]) {
  const spots = new Set(journey.routeVariants.flatMap(({ steps }) =>
    steps.flatMap(({ spotId }) => [spotId, selectRouteStop(record, spotId) ?? spotId])));
  return [
    `/story/${journey.storyId}`,
    `/route?routeId=${journey.routeId}`,
    `/route?candidateId=${journey.id}`,
    ...[...spots].map((id) => `/spot/${id}?candidateId=${journey.id}`),
  ];
}

test('S2-7 reconciles MOGU and published links with the admission command', async ({ page, context }, testInfo) => {
  test.setTimeout(180_000);
  await stubRemoteFonts(context);
  const now = new Date();
  const report = execFileSync('pnpm', ['data:journey-admission'], { encoding: 'utf8' });
  const statuses = new Map(Array.from(report.matchAll(/^(\S+) (admitted|excluded)(?: — .*)?$/gm),
    ([, id, status]) => [id, status]));
  expect([...statuses.keys()].sort()).toEqual(JOURNEY_RECORDS.map(({ journey }) => journey.id).sort());
  const admittedIds = [...statuses].filter(([, status]) => status === 'admitted').map(([id]) => id);
  await page.clock.setFixedTime(now);
  await page.goto('/mogu', { waitUntil: 'domcontentloaded' });
  const cards = activeScreen(page, 'mogu').locator('[data-journey-id]');
  await expect(cards).toHaveCount(admittedIds.length, { timeout: 15_000 });
  expect(await cards.evaluateAll((items) =>
    items.map((card) => card.getAttribute('data-journey-id')).sort())).toEqual(admittedIds.sort());
  await page.screenshot({ path: testInfo.outputPath('s2-admission-browse-ja.png') });
  await page.route('**/*', (route) =>
    ['image', 'font'].includes(route.request().resourceType()) ? route.abort() : route.fallback());
  let capturedExclusion = false;
  for (const record of JOURNEY_RECORDS) {
    const { journey } = record;
    if (statuses.get(journey.id) === 'admitted') {
      // Exercise the actual browser router without reloading the bundle for each admitted record.
      await page.evaluate((path) => {
        window.history.pushState(null, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, `/story/${journey.storyId}`);
      await expect(activeScreen(page, 'story').getByRole('heading', { level: 1 }),
        journey.id).toHaveText(journey.copy.ja.title);
    } else {
      for (const path of journeyDeepLinks(journey, record)) {
        await page.goto(path, { waitUntil: 'domcontentloaded' });
        await expect(activeScreen(page, 'journey-unavailable').getByRole('heading'), path)
          .toHaveText(strings.ja.journeyUnavailableTitle);
        if (!capturedExclusion) {
          await page.screenshot({ path: testInfo.outputPath('s2-admission-excluded-ja.png') });
          capturedExclusion = true;
        }
      }
    }
  }
  console.log(`S2-7 checked ${admittedIds.length} admitted Stories and ${statuses.size - admittedIds.length} excluded journeys.`);
});

test('S2-7 demo fixture deep links show Journey Unavailable', async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  await blockRemoteFonts(page);
  const loader = await createServer({
    configFile: false,
    server: { middlewareMode: true, watch: null, ws: false },
  });
  let demoJourneys: JourneyPresentation[];
  try {
    ({ demoJourneys } = await loader.ssrLoadModule('/src/features/netlify-parity/factual-presentation.ts'));
  } finally {
    await loader.close();
  }
  const unavailable = activeScreen(page, 'journey-unavailable');
  await page.goto('/mogu');
  const browse = activeScreen(page, 'mogu');
  await expect(browse).toBeVisible();
  for (const demo of demoJourneys) {
    await expect(browse.locator(`[data-journey-id="${demo.id}"]`)).toHaveCount(0);
  }

  const paths = ['/story', '/route', ...demoJourneys.flatMap((demo) => journeyDeepLinks(demo))];
  for (const locale of ['ja', 'en', 'zh-TW'] as const) {
    await page.evaluate((value) => localStorage.setItem('tmm:locale', value), locale);
    for (const path of paths) {
      await page.goto(path, { waitUntil: 'commit' });
      await expect(unavailable.getByRole('heading'), `${locale} ${path}`)
        .toHaveText(strings[locale].journeyUnavailableTitle);
      await expect(unavailable.getByRole('link', { name: strings[locale].journeyUnavailableBack }))
        .toHaveAttribute('href', '/mogu');
      const demo = demoJourneys.find(({ storyId }) => path === `/story/${storyId}`);
      if (demo) {
        await expectNoHorizontalOverflow(page);
        await page.screenshot({
          path: testInfo.outputPath(`s2-unavailable-${demo.id}-${locale}.png`),
          animations: 'disabled',
        });
      }
    }
    await page.goto('/spot/okutama-tourism-office');
    await expect(unavailable.getByRole('heading')).toHaveText(strings[locale].journeyUnavailableTitle);
    await unavailable.getByRole('link', { name: strings[locale].journeyUnavailableBack }).click();
    await expect(activeScreen(page, 'mogu')).toBeVisible();
  }
  console.log(`S2-7 checked ${paths.length - 2} demo deep links and both bare Story/Route paths in ja, en, and zh-TW.`);
});

test('S2-10 adding a data record alone adds a MOGU card', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  const original = admitted!.record;
  const id = 's2-data-only-test-journey';
  const title = 'S2 data-only test journey';
  const fixture = {
    ...original,
    journey: {
      ...original.journey,
      id, storyId: id, routeId: id,
      copy: { ...original.journey.copy, ja: { ...original.journey.copy.ja, title } },
    },
  };
  await page.clock.setFixedTime(publicationDate);
  const card = activeScreen(page, 'mogu').locator(`[data-journey-id="${id}"]`);
  await page.goto('/mogu');
  await expect(activeScreen(page, 'mogu').locator('[data-journey-id]').first()).toBeVisible();
  await expect(card).toHaveCount(0);

  const outDir = await mkdtemp(join(tmpdir(), 'tmm-s2-data-'));
  try {
    await build({
      logLevel: 'warn',
      build: { outDir },
      plugins: [{
        name: 's2-test-journey-record',
        transform(source, moduleId) {
          if (moduleId.endsWith('/src/data/journey-records/index.ts')) {
            return `${source}\nJOURNEY_RECORDS.push(${JSON.stringify(fixture)});`;
          }
        },
      }],
    });
    const server = await preview({ build: { outDir }, preview: { host: '127.0.0.1', port: 0 } });
    try {
      await page.goto(new URL('/mogu', server.resolvedUrls.local[0]).href);
      await expect(card).toContainText(title);
      await card.scrollIntoViewIfNeeded();
      await page.screenshot({ path: testInfo.outputPath('s2-data-only-browse-ja.png') });
    } finally {
      await server.close();
    }
  } finally {
    await rm(outDir, { recursive: true });
  }
});

test('#442 gives an expired optional Spot guidance and a way back', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-12-21T15:00:00Z'));
  const journeyId = 'b01-hachioji-takao-soba';
  await page.goto(`/spot/${journeyId}-takahashiya?candidateId=${journeyId}`);
  const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
  const guide = spot.locator('.guide-box');
  await expect(guide).toContainText('現在利用できる公式の訪問案内リンクはありません');
  await expect(guide.getByRole('link')).toHaveCount(0);
  await expect(guide.getByRole('button')).toHaveCount(0);
  await spot.getByRole('button', { name: '戻る' }).click();
  await expect(page).toHaveURL(`/route?candidateId=${journeyId}`);
  await expect(page.locator('[data-screen="route"][data-screen-active="true"]')).toBeVisible();
});

demoTest('opens canonical Spot information safely with the keyboard', async ({ page, context }) => {
  test.setTimeout(90_000);
  await stubRemoteFonts(context);
  const destinations = [
    ['okutama-tourism-office', 'https://www.okutama.gr.jp/site/'],
    ['wasabi-kitchen', 'https://tokyowasabi.com/category/information/'],
    ['wasabi-experience', 'https://tokyowasabi.com/wasabi-experience/#booking-form'],
    ['hikawa-valley', 'https://www.town.okutama.tokyo.jp/1/kankosangyoka/kankojoho/3/436.html'],
    ['sawai-ozawa-shuzo', 'https://www.sawanoi-sake.com/service/kengaku/'],
  ];
  for (const [id, url] of destinations) {
    // Fulfil the external request locally: no operator traffic or booking action.
    await context.route(url.split('#')[0], (route) => route.fulfill({ contentType: 'text/html', body: '<title>Official destination test</title>' }));
    await page.goto(`/spot/${id}`);
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    const link = spot.locator('.guide-box a.book');
    await expect(link).toHaveAttribute('href', url);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await link.focus();
    await expect(link).toBeFocused();
    const popupPromise = page.waitForEvent('popup');
    await page.keyboard.press('Enter');
    const popup = await popupPromise;
    await expect(popup).toHaveURL(url);
    await popup.waitForLoadState();
    expect(await popup.evaluate(() => window.opener)).toBeNull();
    await popup.close();
    await expect(page).toHaveURL(new RegExp(`/spot/${id}$`));
  }
});

demoTest('keeps an unavailable official destination local with honest feedback in every locale', async ({ page, context }) => {
  await stubRemoteFonts(context);
  let unavailableSourceInjected = false;
  // Exercise a missing/unsupported source in the internal bundle without a
  // test-only runtime route or a guessed URL in canonical Product data.
  await page.route('**/assets/*.js', async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    const source = 'https://www.okutama.gr.jp/site/';
    unavailableSourceInjected ||= body.includes(source);
    await route.fulfill({ response, body: body.replaceAll(source, 'unsupported:') });
  });
  for (const [locale, feedback] of [
    ['ja', 'このスポットの公式最新情報リンクは現在用意されていません。'],
    ['en', 'An official current-information link is not available for this spot yet.'],
    ['zh-TW', '目前尚未提供此景點的官方最新資訊連結。'],
  ]) {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate((value) => localStorage.setItem('tmm:locale', value), locale);
    await page.goto('/spot/okutama-tourism-office', { waitUntil: 'domcontentloaded' });
    expect(unavailableSourceInjected).toBe(true);
    const guide = page.locator('[data-screen="spot"][data-screen-active="true"] .guide-box');
    await expect(guide.getByRole('link')).toHaveCount(0);
    const action = guide.getByRole('button');
    await action.focus();
    await expect(action).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('status')).toHaveText(feedback);
    await expect(page).toHaveURL(/\/spot\/okutama-tourism-office$/);
    expect(page.context().pages()).toHaveLength(1);
    await expectNoHorizontalOverflow(page);
  }
});

const persistedFoodProfile = {
  dietary: [],
  dietaryOther: '',
  hasNoRestrictions: true,
  savedAt: '2026-08-24T00:00:00.000Z',
  version: 1,
};

test('#443 opens the Spot phrase card offline at 375px in each locale', async ({ page, context }, testInfo) => {
  test.setTimeout(60_000);
  const { record, defaultVariant } = admitted!;
  const spotId = defaultVariant!.primarySpotId;
  const path = `/spot/${spotId}?candidateId=${record.journey.id}`;
  await page.clock.setFixedTime(publicationDate);
  await page.goto('/');
  const profile = await reachProfilePreferences(page, 'phrase');
  await profile.getByRole('button', { name: '自分で旅を探す' }).click();
  await activeScreen(page, 'mogu').locator(`[data-journey-id="${record.journey.id}"]`).click();
  await activeScreen(page, 'story').getByRole('button', { name: 'この食旅のルートを見る' }).click();
  await activeScreen(page, 'route').locator(`[data-spot-id="${spotId}"]`).click();
  await expect(page).toHaveURL(path);

  for (const [locale, wheat, myLabel, languageMenu, language] of [
    ['ja', '小麦', '', '', ''],
    ['en', 'Wheat', 'マイ', '言語設定', 'English'],
    ['zh-TW', '小麥', 'My', 'Language', '繁體中文'],
  ] as const) {
    if (language) {
      await activeScreen(page, 'spot').getByRole('button', { name: myLabel, exact: true }).click();
      await activeScreen(page, 'my').getByRole('button', { name: languageMenu }).click();
      await page.getByRole('dialog').getByRole('button', { name: language }).click();
      await page.goBack();
      await expect(page).toHaveURL(path);
    }
    const card = page.locator('[data-screen="spot"][data-screen-active="true"] .spot-phrase');
    await context.setOffline(true);
    await card.getByText(strings[locale].spotPhraseOpen, { exact: true }).click();
    const traveller = card.locator('p').first();
    const staff = card.locator('[lang="ja"]');
    await expect(traveller).toContainText(wheat);
    await expect(traveller).toContainText(strings[locale].spotPhraseCustomNotice);
    await expect(staff).toContainText('小麦');
    await expect(staff).toContainText('ごま');
    await expect(staff).toContainText('Sumac');
    await expect(staff).toContainText(spotPhraseStaffNotice);
    await expectNoHorizontalOverflow(page);
    if (locale !== 'en') {
      await card.scrollIntoViewIfNeeded();
      await page.screenshot({ path: testInfo.outputPath(`spot-phrase-${locale}.png`), animations: 'disabled' });
    }
    await context.setOffline(false);
  }
  await page.reload();
  const reloadedPhrase = activeScreen(page, 'spot').locator('.spot-phrase');
  await reloadedPhrase.getByText(strings['zh-TW'].spotPhraseOpen, { exact: true }).click();
  await expect(reloadedPhrase.locator('[lang="ja"]')).not.toContainText('小麦');
});

async function seedPersistedProfile(page: Page): Promise<void> {
  await page.addInitScript((profile) => {
    localStorage.setItem('tmm:nickname:v1', '123');
    localStorage.setItem('tmm:foodProfile:v1', JSON.stringify(profile));
  }, persistedFoodProfile);
}

async function startFromWelcome(page: Page): Promise<void> {
  await page.goto('/');
  const splash = page.locator('[data-screen="splash"][data-screen-active="true"]');
  await expect(splash).toBeVisible();
  await splash.click();
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  await expect
    .poll(() =>
      page.evaluate(() => ({
        documentClientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        phoneClientWidth: document.querySelector<HTMLElement>('.reference-phone')?.clientWidth,
        phoneScrollWidth: document.querySelector<HTMLElement>('.reference-phone')?.scrollWidth,
      })),
    )
    .toEqual({
      documentClientWidth: 375,
      documentScrollWidth: 375,
      phoneClientWidth: 375,
      phoneScrollWidth: 375,
    });
}

async function reachProfilePreferences(page: Page, answers: 'none' | 'egg' | 'phrase' = 'none') {
  const splash = page.locator('[data-screen="splash"][data-screen-active="true"]');
  await expect(splash).toBeVisible();
  await splash.click();

  await expect(page).toHaveURL(/\/food-profile$/);
  const profile = page.locator('[data-screen="food-profile"][data-screen-active="true"]');
  await expect(profile).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await profile.getByRole('button', { name: 'はじめる！' }).click();
  const nicknameDialog = profile.getByRole('dialog', { name: '私は...' });
  const nicknameInput = nicknameDialog.getByRole('textbox', { name: 'ニックネームを入力' });
  await expect(nicknameInput).toBeFocused();
  await nicknameInput.fill('ナナ');
  await nicknameDialog.getByRole('button', { name: '送信', exact: true }).click();

  const noRestrictionChoices = [
    'アレルギーはありません',
    '特になし',
    '特になし',
    '特になし',
  ];
  for (const [questionIndex, choice] of noRestrictionChoices.entries()) {
    const question = profile.locator(`[data-question-index="${questionIndex}"]`);
    await expect(question).toBeVisible();
    if (answers === 'phrase' && questionIndex === 0) {
      await question.getByRole('button', { name: '🌾 小麦', exact: true }).click();
      for (const ingredient of ['sesame', 'Sumac']) {
        await question.getByRole('button', { name: '✏️ その他' }).click();
        const other = question.getByRole('dialog');
        await other.getByRole('textbox').fill(ingredient);
        await other.getByRole('button', { name: '確定' }).click();
      }
    } else {
      const answer = answers === 'egg' && questionIndex === 0 ? '🥚 卵' : choice;
      await question.getByRole('button', { name: answer, exact: true }).click();
    }
    await question.getByRole('button', { name: '送信', exact: true }).click();
    await expect(question).toHaveAttribute('data-frozen', 'true');
  }

  await expect(profile.getByRole('heading', { name: '食旅の希望（任意）' })).toBeVisible();
  return profile;
}

async function completeExploration(page: Page): Promise<void> {
  const explore = page.locator('[data-screen="explore"][data-screen-active="true"]');
  for (let step = 1; step <= 5; step += 1) {
    await expect(explore.getByLabel(`${step} / 5`)).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await explore.getByRole('button', { name: '次へ', exact: true }).click();
  }
}

async function findJourneysFromProfile(page: Page, profile: Awaited<ReturnType<typeof reachProfilePreferences>>) {
  await profile.getByRole('button', { name: '自分に合った旅をおすすめしてもらう！' }).click();
  await expect(page).toHaveURL('/home');
  const home = page.locator('[data-screen="home"][data-screen-active="true"]');
  await home.getByRole('button', { name: /Let's Go!/ }).click();
  await expect(page).toHaveURL('/explore');
  await completeExploration(page);
  await expect(page).toHaveURL('/explore/result');
  return page.locator('[data-screen="result"][data-screen-active="true"]');
}

test('#443 applies two Food Profiles, explains empty results and clears filters', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await blockRemoteFonts(page);
  await page.clock.setFixedTime(publicationDate);
  const screenshot = (name: string) => page.screenshot({ path: testInfo.outputPath(`${name}.png`), animations: 'disabled' });
  const result = page.locator('[data-screen="result"][data-screen-active="true"]');
  const cards = result.locator('[data-journey-id]');
  const firstReason = result.locator('[data-match-reason]').first();
  const ids = () => cards.evaluateAll((items) => items.map((item) => item.getAttribute('data-journey-id')));

  await page.goto('/');
  let profile = await reachProfilePreferences(page);
  await profile.getByLabel('滞在エリア').selectOption({ label: '八王子市' });
  await profile.getByLabel('到着駅・停留所').selectOption({ label: '八王子駅' });
  await profile.getByLabel('現地で使える時間').selectOption({ label: '120分以内' });
  await expectNoHorizontalOverflow(page);
  await profile.getByRole('heading', { name: '食旅の希望（任意）' }).scrollIntoViewIfNeeded();
  await profile.getByLabel('到着駅・停留所').scrollIntoViewIfNeeded();
  await screenshot('food-profile-ja');
  await findJourneysFromProfile(page, profile);
  await expect(firstReason).toContainText('滞在エリア · 八王子市');
  await expect(firstReason).toContainText('到着駅・停留所 · 八王子駅');
  await expect(firstReason).toContainText('現地で使える時間 · 120分以内');
  await firstReason.scrollIntoViewIfNeeded();
  await screenshot('result-profile-one-ja');
  const firstIds = await ids();

  await page.goto('/');
  profile = await reachProfilePreferences(page, 'egg');
  await expect(profile.getByLabel('滞在エリア')).toHaveValue('hachioji');
  await findJourneysFromProfile(page, profile);
  await expect(result.getByText('調理中の混入', { exact: false })).toBeVisible();
  expect(await ids()).toEqual(firstIds);
  await page.reload();
  await expect(result.getByText('調理中の混入', { exact: false })).toHaveCount(0);
  expect(await ids()).toEqual(firstIds);

  await page.goto('/');
  profile = await reachProfilePreferences(page);
  await profile.getByLabel('滞在エリア').selectOption({ label: '福生市' });
  await profile.getByLabel('到着駅・停留所').selectOption('');
  await findJourneysFromProfile(page, profile);
  await expect(firstReason).toContainText('滞在エリア · 福生市');
  await expect(firstReason).toContainText('120分以内');
  const secondIds = await ids();
  expect(secondIds.every((id) => !firstIds.includes(id))).toBe(true);
  await screenshot('result-profile-two-ja');

  await result.getByRole('button', { name: '条件を変更' }).click();
  const explore = page.locator('[data-screen="explore"][data-screen-active="true"]');
  const next = explore.getByRole('button', { name: '次へ', exact: true });
  await next.click();
  await next.click();
  await explore.getByLabel('現地で使える時間').selectOption({ label: '15分以内' });
  await next.click();
  await next.click();
  await next.click();
  await expect(page).toHaveURL('/explore/result');
  await expect(result.getByText('条件に合う食旅が見つかりませんでした。')).toBeVisible();
  await expect(result.locator('.empty')).toContainText('滞在エリア · 福生市');
  await expect(result.locator('.empty')).toContainText('現地で使える時間 · 15分以内');
  await expect(cards).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
  await screenshot('result-empty-ja');
  await result.getByRole('button', { name: '条件をクリア' }).click();
  await expect(firstReason).toContainText('公開中の食旅');
  expect((await ids()).some((id) => firstIds.includes(id))).toBe(true);
});

test('S2-4 changes only venue guidance when dietary answers change', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.clock.setFixedTime(publicationDate);
  const area = admitted!.record.municipalityId;
  const expectedIds = publication.filter(({ admitted, record }) => admitted && record.municipalityId === area)
    .map(({ record }) => record.journey.id);
  const result = activeScreen(page, 'result');
  const ids = () => result.locator('[data-journey-id]')
    .evaluateAll((cards) => cards.map((card) => card.getAttribute('data-journey-id')));
  const normalize = (text: string) => text.replace(/\s+/g, ' ').trim();
  const guidance = result.getByText('調理中の混入', { exact: false });

  await page.goto('/');
  const profile = await reachProfilePreferences(page);
  await profile.getByLabel('滞在エリア').selectOption(area);
  await findJourneysFromProfile(page, profile);
  await expect.poll(ids).toEqual(expectedIds);
  await expect(guidance).toHaveCount(0);
  const baseline = normalize(await result.innerText());
  await page.screenshot({ path: testInfo.outputPath('s2-4-dietary-baseline-ja.png'), animations: 'disabled' });

  await page.goto('/');
  const allergyProfile = await reachProfilePreferences(page, 'egg');
  await expect(allergyProfile.getByLabel('滞在エリア')).toHaveValue(area);
  await findJourneysFromProfile(page, allergyProfile);
  await expect(guidance).toBeVisible();
  await expect.poll(ids).toEqual(expectedIds);
  expect(normalize((await result.innerText()).replace(await guidance.innerText(), ''))).toBe(baseline);
  await guidance.scrollIntoViewIfNeeded();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('s2-4-dietary-guidance-ja.png'), animations: 'disabled' });
});

test('S2-2 / S2-9 filters the admitted catalog and opens a sourced Route without generation', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const catalog = publication.flatMap(({ record, defaultVariant }) => {
    if (!defaultVariant) return [];
    const { journey, municipalityId, alcoholThemed } = record;
    const { durationMinutes } = journey.routeVariants.find(({ id }) => id === defaultVariant.id)!;
    const arrival = record.variants[defaultVariant.id]!.arrival!;
    return [{
      journey, municipalityId, alcoholThemed, durationMinutes,
      station: `${arrival.kind}:${arrival.name.ja}`,
    }];
  });
  const sample = catalog[0];
  const explore = activeScreen(page, 'explore');
  const result = activeScreen(page, 'result');
  const cards = result.locator('[data-journey-id]');
  const next = explore.getByRole('button', { name: '次へ', exact: true });
  const checkResult = async (expected: typeof catalog) => {
    await expect(page).toHaveURL('/explore/result');
    await expect.poll(() => cards.evaluateAll((items) => items.map((item) => item.getAttribute('data-journey-id'))))
      .toEqual(expected.map(({ journey }) => journey.id));
    await expect(result).not.toContainText(
      /マッチ度|一致率|ランキング|おすすめ順位|ベスト|営業中|\d\s*[％%]|\b(?:match score|ranking|best|open now)\b|配對度|匹配度|排名|最佳|營業中/i,
    );
  };

  // A simulated generation timer cannot finish while the app clock is paused.
  await page.clock.install({ time: publicationDate });
  await page.clock.pauseAt(new Date(publicationDate.getTime() + 60_000));
  await page.goto('/explore');
  await completeExploration(page);
  await checkResult(catalog);

  const cases = [
    { name: 'area', step: 0, label: '滞在エリア', value: sample.municipalityId,
      matches: (entry: typeof sample) => entry.municipalityId === sample.municipalityId },
    { name: 'station', step: 1, label: '到着駅・停留所', value: sample.station,
      matches: (entry: typeof sample) => entry.station === sample.station },
    { name: 'time', step: 2, label: '現地で使える時間', value: '',
      matches: (entry: typeof sample, value: string) => entry.durationMinutes <= Number(value) },
    { name: 'interest', step: 3, label: '気になる食文化', value: sample.journey.foodCultureId,
      matches: (entry: typeof sample) => entry.journey.foodCultureId === sample.journey.foodCultureId },
    { name: 'alcohol', step: 4, label: 'お酒がテーマの食旅', value: 'exclude',
      matches: (entry: typeof sample) => !entry.alcoholThemed },
  ];
  for (const { name, step, label, value, matches } of cases) {
    await result.getByRole('button', { name: '条件を変更' }).click();
    for (let current = 0; current < step; current++) await next.click();
    const field = explore.getByLabel(label);
    const selected = value || (await field.locator('option').evaluateAll((options) =>
      options.map((option) => (option as HTMLOptionElement).value))).find((limit) =>
      catalog.some((entry) => matches(entry, limit)) && catalog.some((entry) => !matches(entry, limit)))!;
    const expected = catalog.filter((entry) => matches(entry, selected));
    expect(expected.length, name).toBeGreaterThan(0);
    expect(expected.length, name).toBeLessThan(catalog.length);
    await field.selectOption(selected);
    for (let current = step; current < cases.length; current++) await next.click();
    await checkResult(expected);
    await expectNoHorizontalOverflow(page);
    await page.screenshot({ path: testInfo.outputPath(`s2-2-${name}-ja.png`), animations: 'disabled' });
    if (name !== 'alcohol') await result.getByRole('button', { name: '条件をクリア' }).click();
  }

  const journey = catalog.find(({ alcoholThemed }) => !alcoholThemed)!.journey;
  await cards.first().click();
  await expect(page).toHaveURL(`/story/${journey.storyId}`);
  const story = activeScreen(page, 'story');
  await story.getByRole('button', { name: 'この食旅のルートを見る' }).click();
  await expect(page).toHaveURL(`/route?candidateId=${journey.id}`);
  await expect(story.locator('[data-route-loading][data-loading="true"]')).toHaveCount(0);
  const route = activeScreen(page, 'route');
  await expect(route.locator('.route-info')).toBeVisible();
  await expect(route.locator('.regen')).toHaveCount(0);
  await route.locator('.route-info').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('s2-9-sourced-route-ja.png'), animations: 'disabled' });
});

test('#443 skips Food Profile to browse the admitted catalog', async ({ page }, testInfo) => {
  await page.clock.setFixedTime(publicationDate);
  await startFromWelcome(page);
  const profile = page.locator('[data-screen="food-profile"][data-screen-active="true"]');
  await profile.getByRole('button', { name: '登録なし、自分で見てみる' }).click();
  await expect(page).toHaveURL('/mogu');
  await expect(page.locator('[data-screen="mogu"][data-screen-active="true"] [data-journey-id]').first()).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('skip-profile-mogu-ja.png'), animations: 'disabled' });
});

test('#443 offers a sourced Route alternative and #465 hides a journey with no usable stop', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  await blockRemoteFonts(page);
  const now = new Date('2026-11-28T03:00:00Z');
  const unavailableStops = JOURNEY_RECORDS.flatMap((record) => {
    const { defaultVariant } = checkJourneyAdmission(record, now);
    return (defaultVariant ? record.variants[defaultVariant.id]!.steps : []).flatMap(({ spotId }) => {
      const primary = record.spots[spotId];
      return primary.unavailable ? [{ record, primary, unavailable: primary.unavailable }] : [];
    });
  });
  const withAlternative = unavailableStops.find(({ unavailable }) => unavailable.alternativeSpotId);
  expect(withAlternative, 'An admitted Route with an unavailable primary and an alternative').toBeDefined();
  const { record, primary, unavailable } = withAlternative!;
  const alternativeId = unavailable.alternativeSpotId!;
  const missing = JOURNEY_RECORDS.find(({ journey }) => journey.id === 'b02-ome-konnyaku')!;
  const missingSpotId = missing.journey.routeVariants[0].steps[0].spotId;
  const route = page.locator('[data-screen="route"][data-screen-active="true"]');
  const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
  const unavailableScreen = page.locator('[data-screen="journey-unavailable"][data-screen-active="true"]');

  await page.clock.setFixedTime(now);
  await page.goto('/');
  for (const [locale, alternativeLabel] of [
    ['ja', '代替スポット'],
    ['en', 'Alternative stop'],
    ['zh-TW', '替代景點'],
  ] as const) {
    await page.evaluate((value) => localStorage.setItem('tmm:locale', value), locale);
    const routeUrl = `/route?candidateId=${record.journey.id}`;
    await page.goto(routeUrl);
    const alternative = route.getByRole('button').filter({ hasText: record.spots[alternativeId].presentation.copy[locale].name });
    await expect(alternative).toContainText(alternativeLabel);
    await expect(alternative).toHaveAttribute('data-spot-id', alternativeId);
    await expect(route.locator(`[data-spot-id="${primary.presentation.id}"]`)).toHaveCount(0);
    await expect(route.locator('.tl')).toContainText(unavailable.reason[locale]);
    await expect(route.locator('.tl')).toContainText(retrievalDate);
    await expectNoHorizontalOverflow(page);
    if (locale === 'ja') {
      await page.screenshot({ path: testInfo.outputPath('route-alternative-ja.png'), animations: 'disabled' });
    }
    await alternative.click();
    await expect(page).toHaveURL(`/spot/${alternativeId}?candidateId=${record.journey.id}`);
    await expect(spot).toBeVisible();
    await expect(spot.locator('.guide-box').getByRole('link')).toHaveAttribute(
      'href', resolveJourneyVisitorSource(record, alternativeId, now)!.url,
    );

    const { id: missingId, storyId: missingStoryId } = missing.journey;
    await page.goto('/mogu');
    const mogu = page.locator('[data-screen="mogu"][data-screen-active="true"]');
    await expect(mogu.locator(`[data-journey-id="${record.journey.id}"]`)).toBeVisible();
    await expect(mogu.locator(`[data-journey-id="${missingId}"]`)).toHaveCount(0);
    for (const path of [`/story/${missingStoryId}`, `/route?candidateId=${missingId}`, `/spot/${missingSpotId}?candidateId=${missingId}`]) {
      await page.goto(path, { waitUntil: 'commit' });
      await expect(unavailableScreen).toBeVisible();
    }
  }

  const story = page.locator('[data-screen="story"][data-screen-active="true"]');
  const spotId = primary.presentation.id;
  await page.goto(`/story/${record.journey.storyId}`);
  await story.locator(`[data-spot-id="${spotId}"]`).click();
  await expect(page).toHaveURL(`/spot/${spotId}`);
  await expect(spot).toHaveAttribute('data-spot-id', spotId);
});

test('completes the current Exploration when its sessionStorage write is blocked', async ({
  page,
}) => {
  await page.clock.setFixedTime(publicationDate);
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.addInitScript(() => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (this === window.sessionStorage && key === 'tmm:exploration:v1') {
        throw new Error('blocked exploration session write');
      }
      originalSetItem.call(this, key, value);
    };
  });

  await page.goto('/home');
  const home = page.locator('[data-screen="home"][data-screen-active="true"]');
  await home.getByRole('button', { name: /Let's Go!/ }).click();
  await expect(page).toHaveURL(/\/explore$/);
  await completeExploration(page);

  await expect(page).toHaveURL(/\/explore\/result$/);
  const result = page.locator('[data-screen="result"][data-screen-active="true"]');
  await expect(result.getByRole('button', { name: /この物語を読む:/ }).first()).toBeVisible();
  expect(pageErrors).toEqual([]);
});

test.describe('Issue #316 Welcome entry routing', () => {
  test('starts the Food Profile conversation with clean storage', async ({ page }) => {
    await startFromWelcome(page);

    await expect(page).toHaveURL(/\/food-profile$/);
    await expect(
      page.locator('[data-screen="food-profile"][data-screen-active="true"]'),
    ).toBeVisible();
  });

  test('starts the Food Profile conversation with a persisted nickname and a legacy Food Profile', async ({
    page,
  }) => {
    await seedPersistedProfile(page);
    await startFromWelcome(page);

    await expect(page).toHaveURL(/\/food-profile$/);
    await expect(page).not.toHaveURL(/\/home$/);
    await expect(
      page.locator('[data-screen="food-profile"][data-screen-active="true"]'),
    ).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('tmm:nickname:v1')))
      .toBe('123');
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('tmm:foodProfile:v1')))
      .toBeNull();
  });

  test('keeps direct Home navigation directly accessible', async ({ page }) => {
    await seedPersistedProfile(page);
    await page.goto('/home');

    await expect(page).toHaveURL(/\/home$/);
    const home = page.locator('[data-screen="home"][data-screen-active="true"]');
    await expect(home).toBeVisible();
    await expect(home.getByText('123さん')).toBeVisible();
  });
});

test('S3-1 reopens preferences, a journey and a Spot after reload on the Japanese Golden Path', async ({
  page,
}, testInfo) => {
  test.setTimeout(45_000);

  await page.clock.setFixedTime(publicationDate);
  await page.goto('/');
  await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', 'ja');
  const profile = await reachProfilePreferences(page);
  await profile.getByLabel('滞在エリア').selectOption('hachioji');
  const result = await findJourneysFromProfile(page, profile);
  await expectNoHorizontalOverflow(page);

  const firstCard = result.locator('[data-journey-id]').first();
  await expect(firstCard).toBeVisible();
  const journeyId = await firstCard.getAttribute('data-journey-id');
  await firstCard.click();
  await expect(page).toHaveURL(/\/story\/[^/]+$/);

  const story = page.locator('[data-screen="story"][data-screen-active="true"]');
  await expectNoHorizontalOverflow(page);
  await story.getByRole('button', { name: 'この食旅のルートを見る' }).click();

  await expect(page).toHaveURL(`/route?candidateId=${journeyId}`);
  const route = page.locator('[data-screen="route"][data-screen-active="true"]');
  await expectNoHorizontalOverflow(page);
  await route.getByRole('button', { name: 'マイルートに保存' }).click();
  await expect(route.getByRole('button', { name: '保存済み' })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(route.getByRole('button', { name: '保存済み' })).toHaveAttribute('aria-pressed', 'true');

  const firstStop = route.locator('[data-spot-id]').first();
  const spotId = await firstStop.getAttribute('data-spot-id');
  await firstStop.click();
  await expect(page).toHaveURL(`/spot/${spotId}?candidateId=${journeyId}`);
  const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
  await expectNoHorizontalOverflow(page);
  await spot.getByRole('button', { name: 'お気に入りに保存' }).click();
  await expect(spot.getByRole('button', { name: 'お気に入りから削除' })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(spot.getByRole('button', { name: 'お気に入りから削除' })).toHaveAttribute('aria-pressed', 'true');

  const dock = spot.getByRole('navigation', { name: 'Primary' });
  await expect(dock.getByRole('button')).toHaveCount(4);
  for (const destination of ['食旅を見つけ', 'モグモグる', 'お気に入り', 'マイ']) {
    await expect(dock.getByRole('button', { name: destination })).toBeVisible();
  }
  await dock.getByRole('button', { name: 'お気に入り' }).click();

  await expect(page).toHaveURL(/\/my-route$/);
  const favorites = page.locator('[data-screen="favorites"][data-screen-active="true"]');
  const journeySave = favorites.locator(`[data-journey-id="${journeyId}"] .trip-card-open`);
  const spotSave = favorites.locator(`[data-spot-id="${spotId}"] .my-route`);
  await expect(journeySave).toBeVisible();
  await expect(spotSave).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('s3-1-reloaded-saves.png'), animations: 'disabled' });
  await journeySave.click();
  await expect(story).toBeVisible();
  await page.goBack();
  await spotSave.click();
  await expect(page).toHaveURL(`/spot/${spotId}?candidateId=${journeyId}`);
  await expect(spot).toBeVisible();
  await spot.getByRole('button', { name: '戻る' }).click();
  await expect(page).toHaveURL('/my-route');
  await favorites
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: 'マイ' })
    .click();

  await expect(page).toHaveURL(/\/my$/);
  const my = page.locator('[data-screen="my"][data-screen-active="true"]');
  await my
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: 'モグモグる' })
    .click();

  await expect(page).toHaveURL(/\/mogu$/);
  const mogu = page.locator('[data-screen="mogu"][data-screen-active="true"]');
  await mogu
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: '食旅を見つけ' })
    .click();
  await expect(page).toHaveURL(/\/home$/);
  const home = activeScreen(page, 'home');
  await expect(home.getByText('ナナさん')).toBeVisible();
  await home.getByRole('button', { name: /Let's Go!/ }).click();
  await expect(activeScreen(page, 'explore').getByLabel('滞在エリア')).toHaveValue('hachioji');
  await page.screenshot({ path: testInfo.outputPath('s3-1-reloaded-preferences.png'), animations: 'disabled' });
});

test('S3-1 restores all ordinary Food Profile defaults after reload from legacy and current storage', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  const sample = publication.find(({ record, defaultVariant }) =>
    record.municipalityId === 'hachioji' && defaultVariant &&
      record.variants[defaultVariant.id]?.arrival?.name.ja === '八王子駅',
  )!;
  const { record, defaultVariant } = sample;
  const arrival = record.variants[defaultVariant!.id]!.arrival!;
  const defaults = {
    area: 'hachioji', arrival: `${arrival.kind}:${arrival.name.ja}`,
    minutes: 120, cultures: [record.journey.foodCultureId], alcohol: 'exclude',
  };
  const expectDefaults = async (profile: Awaited<ReturnType<typeof reachProfilePreferences>>, minutes: number, alcohol: string) => {
    await expect(profile.getByLabel('滞在エリア')).toHaveValue(defaults.area);
    await expect(profile.getByLabel('到着駅・停留所')).toHaveValue(defaults.arrival);
    await expect(profile.getByLabel('現地で使える時間')).toHaveValue(String(minutes));
    await expect(profile.getByRole('button', { name: `${record.routeName.ja} ×`, exact: true })).toBeVisible();
    await expect(profile.getByLabel('お酒がテーマの食旅')).toHaveValue(alcohol);
  };

  await page.clock.setFixedTime(publicationDate);
  await page.goto('/');
  await page.evaluate((legacyProfile) => localStorage.setItem('tmm:foodProfile:v1', JSON.stringify(legacyProfile)), {
    ...persistedFoodProfile, ...defaults, dietary: ['allergy', 'religious'], dietaryOther: 'test-only', hasNoRestrictions: false,
  });
  await page.reload();
  const imported = await reachProfilePreferences(page);
  await expectDefaults(imported, 120, 'exclude');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('tmm:discoveryPreferences:v1')!))).toEqual(defaults);
  expect(await page.evaluate(() => localStorage.getItem('tmm:foodProfile:v1'))).toBeNull();
  await imported.getByLabel('お酒がテーマの食旅').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('s3-1-legacy-profile.png'), animations: 'disabled' });

  await imported.getByLabel('現地で使える時間').selectOption('90');
  await imported.getByLabel('お酒がテーマの食旅').selectOption('include');
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('tmm:discoveryPreferences:v1')!));
  expect(stored).toEqual({ ...defaults, minutes: 90, alcohol: 'include' });
  await page.goto('/');
  await page.reload();
  await expectDefaults(await reachProfilePreferences(page), 90, 'include');
});

async function saveAdmittedRouteAndSpot(page: Page) {
  const { record, defaultVariant } = admitted!;
  await page.clock.setFixedTime(publicationDate);
  await page.goto(`/route?candidateId=${record.journey.id}`);
  const route = activeScreen(page, 'route');
  await route.getByRole('button', { name: 'マイルートに保存' }).click();
  await route.locator(`[data-spot-id="${defaultVariant!.primarySpotId}"]`).click();
  await activeScreen(page, 'spot').getByRole('button', { name: 'お気に入りに保存' }).click();
}

test('S3-2 removes journey and Spot saves independently', async ({ page }, testInfo) => {
  await saveAdmittedRouteAndSpot(page);
  await page.goto('/my-route');
  const favorites = activeScreen(page, 'favorites');
  const journey = favorites.locator(`[data-journey-id="${admitted!.record.journey.id}"]`);
  const spot = favorites.locator(`[data-spot-id="${admitted!.defaultVariant!.primarySpotId}"]`);
  await journey.getByRole('button', { name: '食旅の保存を解除' }).click();
  await page.reload();
  await expect(journey).toHaveCount(0);
  await expect(spot.locator('.my-route')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('s3-2-spot-kept.png'), animations: 'disabled' });

  await page.goto(`/route?candidateId=${admitted!.record.journey.id}`);
  const route = activeScreen(page, 'route');
  await route.getByRole('button', { name: 'マイルートに保存' }).click();
  await route.getByRole('button', { name: 'マイルートを見る' }).click();
  await spot.getByRole('button', { name: 'スポットの保存を解除' }).click();
  await page.reload();
  await expect(spot).toHaveCount(0);
  await expect(journey.locator('.trip-card-open')).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('s3-2-journey-kept.png'), animations: 'disabled' });
});

test('S3-3 imports an admitted legacy route and marks an excluded save unavailable', async ({ page }, testInfo) => {
  const journey = admitted!.record.journey;
  const withdrawn = missingArrival!.record.journey;
  await page.clock.setFixedTime(publicationDate);
  await page.goto('/my-route');
  await page.evaluate((entries) => localStorage.setItem('tmm:savedRoutes', JSON.stringify(entries)),
    [journey, withdrawn].map(({ routeId }) => ({ routeId, savedAt: publicationDate.toISOString() })));
  await page.reload();
  const favorites = activeScreen(page, 'favorites');
  const imported = favorites.locator(`[data-journey-id="${journey.id}"]`);
  const unavailable = favorites.locator(`[data-journey-id="${withdrawn.routeId}"]`);
  await expect(imported.locator('.trip-card-open')).toBeVisible();
  await expect(unavailable).toContainText('現在ご覧いただけません');
  await unavailable.getByText('現在ご覧いただけません').click();
  await expect(page).toHaveURL('/my-route');
  await expect(unavailable.getByRole('button')).toHaveCount(1);
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('s3-3-legacy-and-unavailable.png'), animations: 'disabled' });

  await imported.locator('.trip-card-open').click();
  await expect(page).toHaveURL(`/story/${journey.storyId}`);
  await activeScreen(page, 'story').getByRole('button', { name: 'この食旅のルートを見る' }).click();
  await expect(activeScreen(page, 'route').getByRole('button', { name: '保存済み' })).toBeDisabled();
  await page.goto('/my-route');
  await unavailable.getByRole('button', { name: '食旅の保存を解除' }).click();
  await page.reload();
  await expect(unavailable).toHaveCount(0);
  await expect(imported.locator('.trip-card-open')).toBeVisible();
});

test('S3-4 keeps browsing available and reports blocked save and reset', async ({ page }, testInfo) => {
  const { record, defaultVariant } = admitted!;
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('tmm:nickname:v1', 'リセット確認'));
  await page.clock.setFixedTime(publicationDate);
  await page.addInitScript(() => {
    for (const method of ['setItem', 'removeItem'] as const) {
      const original = Storage.prototype[method];
      Storage.prototype[method] = function (this: Storage, key: string, value?: string) {
        if (this === localStorage) throw new DOMException('Local writes blocked', 'SecurityError');
        original.call(this, key, value!);
      };
    }
  });
  await page.goto('/mogu');
  const mogu = activeScreen(page, 'mogu');
  await mogu.locator(`[data-journey-id="${record.journey.id}"]`).click();
  await activeScreen(page, 'story').getByRole('button', { name: 'この食旅のルートを見る' }).click();
  const route = activeScreen(page, 'route');
  const saveRoute = route.getByRole('button', { name: 'マイルートに保存' });
  await saveRoute.click();
  const status = page.locator('.reference-toast');
  await expect(status).toHaveText('保存できませんでした。');
  await expect(saveRoute).toHaveAttribute('aria-pressed', 'false');
  await page.screenshot({ path: testInfo.outputPath('s3-4-save-blocked.png'), animations: 'disabled' });

  await route.locator(`[data-spot-id="${defaultVariant!.primarySpotId}"]`).click();
  const spot = activeScreen(page, 'spot');
  const saveSpot = spot.getByRole('button', { name: 'お気に入りに保存' });
  await saveSpot.click();
  await expect(status).toHaveText('保存できませんでした。');
  await expect(saveSpot).toHaveAttribute('aria-pressed', 'false');
  await spot.getByRole('button', { name: 'マイ', exact: true }).click();
  const my = activeScreen(page, 'my');
  page.once('dialog', (dialog) => dialog.accept());
  await my.getByRole('button', { name: 'このブラウザのデータをリセット' }).click();
  await expect(status).toHaveText('このブラウザのデータをリセットできませんでした。');
  await expect(my.getByText('リセット確認')).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('s3-4-reset-blocked.png'), animations: 'disabled' });
  await my.getByRole('button', { name: 'モグモグる' }).click();
  await expect(mogu.locator(`[data-journey-id="${record.journey.id}"]`)).toBeVisible();
  await page.goto('/my-route');
  await expect(activeScreen(page, 'favorites').getByText('お気に入りはまだありません。')).toBeVisible();
});

test('S3-5 resets local data and reloads to defaults', async ({ page }, testInfo) => {
  await saveAdmittedRouteAndSpot(page);
  const legacyKeys = ['tmm:savedRoutes', 'tmm:moguRecent:v1', 'tmm:foodProfile:v1'];
  await page.evaluate(({ routeId, legacyKeys, profile }) => {
    localStorage.setItem(legacyKeys[0], JSON.stringify([{ routeId, savedAt: profile.savedAt }]));
    localStorage.setItem(legacyKeys[1], '[]');
    localStorage.setItem(legacyKeys[2], JSON.stringify(profile));
    localStorage.setItem('tmm:nickname:v1', 'Reset sample');
    localStorage.setItem('tmm:discoveryPreferences:v1', JSON.stringify({
      area: 'hachioji', arrival: '', minutes: null, cultures: [], alcohol: '',
    }));
    localStorage.setItem('unrelated-key', 'keep');
  }, { routeId: admitted!.record.journey.routeId, legacyKeys, profile: persistedFoodProfile });
  await page.goto('/my');
  const my = activeScreen(page, 'my');
  await my.getByRole('button', { name: '言語設定' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'English' }).click();
  await page.reload();
  await expect(my.getByText('Reset sample')).toBeVisible();
  page.once('dialog', (dialog) => dialog.accept());
  await my.getByRole('button', { name: 'Reset data in this browser' }).click();
  await expect(page.locator('.reference-app')).toHaveAttribute('data-locale', 'ja');
  await page.reload();
  await expect(my.getByText('ナナミ')).toBeVisible();
  expect(await page.evaluate((keys) => keys.map((key) => localStorage.getItem(key)), legacyKeys)).toEqual([null, null, null]);
  expect(await page.evaluate(() => localStorage.getItem('unrelated-key'))).toBe('keep');
  await my.getByRole('button', { name: 'マイルート' }).click();
  await expect(activeScreen(page, 'favorites').getByText('お気に入りはまだありません。')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('s3-5-empty-after-reset.png'), animations: 'disabled' });
  await page.goto('/explore');
  await expect(activeScreen(page, 'explore').getByLabel('滞在エリア')).toHaveValue('');
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('s3-5-defaults-after-reset.png'), animations: 'disabled' });
});

demoTest('opens the standalone source-backed Yamashiroya Spot (#323)', async ({ page }) => {
  await page.goto('/spot/yamashiroya');
  const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
  await expect(
    spot.getByRole('heading', { name: '奥多摩わさび本舗 山城屋' }),
  ).toBeVisible();
  await expect(spot).toContainText('東京都西多摩郡奥多摩町氷川717-3');
  await expect(spot).toContainText('0428-83-2368');
  await expect(spot).toContainText('9:00〜17:00');
  await expect(spot).toContainText('JR「奥多摩駅」より徒歩3分');
  await expect(spot).toContainText('あり（12台・大型車可）');
  await expect(spot).toContainText('12月30日～1月4日');
  await expect(spot).toContainText('12月30日～1月5日');
  await expect(spot).toContainText('不一致。最新情報を確認');
  await expect(spot).toContainText('掲載内容は現在確認中です');
  await expect(spot).not.toContainText(/創業172年|6代目|参考スポットです/);
  await expectNoHorizontalOverflow(page);
});

demoTest('keeps the source-backed Okutama no Daidokoro facts safe in every locale (#325)', async ({
  page,
}) => {
  const localizedExpectations = [
    {
      locale: 'ja',
      name: '手作りお弁当・お惣菜の専門店 奥多摩の台所',
      hours: '9:00〜18:00（L.O. 16:00）',
      parking: '駐車場なし',
      product: '特選ソフトジェラート',
      pending: '確認中',
    },
    {
      locale: 'en',
      name: 'Okutama no Daidokoro Handmade Bento & Deli',
      hours: '09:00–18:00 (L.O. 16:00)',
      parking: 'No on-site parking',
      product: 'Special soft gelato',
      pending: 'Confirmation pending',
    },
    {
      locale: 'zh-TW',
      name: '手作便當與熟食專門店 奧多摩的廚房',
      hours: '09:00–18:00（最後點餐 16:00）',
      parking: '無店內停車場',
      product: '特選霜淇淋',
      pending: '確認中',
    },
  ] as const;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/spot/okutama-kitchen');

    const app = page.locator('.reference-app');
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(app).toHaveAttribute('data-locale', expected.locale);
    await expect(spot.getByRole('heading', { name: expected.name })).toBeVisible();
    await expect(spot).toContainText(expected.hours);
    await expect(spot).toContainText(expected.parking);
    await expect(spot).toContainText(expected.product);
    await expect(spot).toContainText(expected.pending);
    await expect(spot).not.toContainText(/Netlify|デモ用編集情報|デモ参考情報/);
    await expectNoHorizontalOverflow(page);
  }
});

demoTest('keeps source-backed PORT OKUTAMA facts safe in every locale (#327)', async ({ page }) => {
  const localizedExpectations = [
    {
      locale: 'ja',
      hours: '平日 11:00〜17:00',
      services: '食事・スペシャルティコーヒー',
      closures: '不定休あり',
      pending: '確認中',
    },
    {
      locale: 'en',
      hours: 'Weekdays 11:00–17:00',
      services: 'Food, specialty coffee',
      closures: 'irregular closures may occur',
      pending: 'Confirmation pending',
    },
    {
      locale: 'zh-TW',
      hours: '平日 11:00–17:00',
      services: '餐飲、精品咖啡',
      closures: '可能臨時休業',
      pending: '確認中',
    },
  ] as const;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/spot/port-okutama');

    const app = page.locator('.reference-app');
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(app).toHaveAttribute('data-locale', expected.locale);
    await expect(spot.getByRole('heading', { name: 'PORT OKUTAMA' })).toBeVisible();
    await expect(spot).toContainText(expected.hours);
    await expect(spot).toContainText(expected.services);
    await expect(spot).toContainText(expected.closures);
    await expect(spot).toContainText(expected.pending);
    await expect(spot).toContainText('https://www.okutama.ne.jp/');
    await expect(spot).not.toContainText(/Netlify|デモ用編集情報|デモ参考情報/);
    await expectNoHorizontalOverflow(page);
  }
});

demoTest('keeps Akabeko phone divergence and source-backed operations visible in every locale (#326)', async ({ page }) => {
  const localizedExpectations = [
    {
      locale: 'ja',
      name: '炉ばた あかべこ',
      hours: 'ランチ 11:30〜L.O. 13:30',
      reservation: '予約推奨',
      routing: '利用する番号は未確認',
      conflict: '電話情報に不一致',
    },
    {
      locale: 'en',
      name: 'Robata Akabeko',
      hours: 'Lunch 11:30–L.O. 13:30',
      reservation: 'Reservations recommended',
      routing: 'which number to use remains unconfirmed',
      conflict: 'Phone sources conflict',
    },
    {
      locale: 'zh-TW',
      name: '爐端燒 AKABEKO',
      hours: '午餐 11:30–最後點餐 13:30',
      reservation: '建議預約',
      routing: '應使用哪個號碼尚未確認',
      conflict: '電話資訊不一致',
    },
  ] as const;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/spot/akabeko');

    const app = page.locator('.reference-app');
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(app).toHaveAttribute('data-locale', expected.locale);
    await expect(spot.getByRole('heading', { name: expected.name })).toBeVisible();
    await expect(spot).toContainText('050-5304-3644');
    await expect(spot).toContainText('0428-83-2365');
    await expect(spot).toContainText(expected.hours);
    await expect(spot).toContainText(expected.reservation);
    await expect(spot).toContainText(expected.routing);
    await expect(spot).toContainText(expected.conflict);
    await expect(spot).toContainText('https://akabeko.tokyo/');
    await expect(spot).not.toContainText(/Netlify|デモ用編集情報|デモ参考情報/);
    await expectNoHorizontalOverflow(page);
  }
});

demoTest('keeps Wasabi Shokudo mobile and time-sensitive in every locale (#324)', async ({ page }) => {
  const localizedExpectations = [
    { locale: 'ja', name: 'わさび食堂', addressLabel: '住所', foodTruck: '固定店舗のないキッチンカー', operatingArea: 'JR青梅線「奥多摩駅」前を中心', schedule: '最新の公式予定', priceDate: '2026年7月', conflict: '公式ページ間で不一致' },
    { locale: 'en', name: 'Wasabi Shokudo', addressLabel: 'Address', foodTruck: 'Mobile food truck with no permanent storefront', operatingArea: 'Mainly around the front of JR Okutama Station', schedule: 'current official schedule', priceDate: 'July 2026', conflict: 'Official pages conflict' },
    { locale: 'zh-TW', name: '山葵食堂', addressLabel: '地址', foodTruck: '沒有固定店面的行動餐車', operatingArea: '主要在 JR 奧多摩站前一帶出攤', schedule: '最新官方行程', priceDate: '2026 年 7 月', conflict: '官方頁面對' },
  ] as const;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/spot/wasabi-kitchen');

    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(spot.getByRole('heading', { name: expected.name })).toBeVisible();
    await expect(spot).toContainText(expected.foodTruck);
    await expect(spot).toContainText(expected.operatingArea);
    await expect(spot).toContainText(expected.schedule);
    await expect(spot).toContainText(expected.priceDate);
    await expect(spot).toContainText(expected.conflict);
    await expect(spot.getByRole('link', { name: expected.schedule })).toHaveAttribute(
      'href',
      'https://tokyowasabi.com/category/information/',
    );
    await expect(spot.locator('.spot-hero > img')).toHaveAttribute('src', /wasabi_photo/);
    await expect(spot.locator('.info-row .k').filter({ hasText: new RegExp(`^${expected.addressLabel}$`) })).toHaveCount(0);
    await expect(spot).not.toContainText(/土日のみ|Weekends only|僅週末營業|平日はあかべこ|Akabeko is recommended|平日建議前往 AKABEKO|¥900〜|From ¥900|¥900 起/);
    await expectNoHorizontalOverflow(page);

    await page.goto('/food-cultures/wasabi-okutama');
    const foodCulture = page.locator('main');
    await expect(foodCulture).toContainText(expected.operatingArea);
    await expect.poll(() => page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }))).toEqual({ clientWidth: 375, scrollWidth: 375 });
  }
});

demoTest('shows the Ome meeting place and seasonal times for Wasabi Experience (#328)', async ({ page }) => {
  const localizedExpectations = [
    {
      locale: 'ja', name: 'WASABI EXPERIENCE',
      address: '〒198-0147 東京都青梅市御岳1-192-4', seasonal: '5〜9月 8:30／10〜4月 11:00',
      access: '御嶽駅」から徒歩約7分', booking: '公式フォームから予約してください',
      duration: '日本語公式 約2〜2.5時間／英語公式 約2時間', durationCaveat: '記載不一致。予約時に確認',
    },
    {
      locale: 'en', name: 'WASABI EXPERIENCE',
      address: '1-192-4 Mitake, Ome, Tokyo 198-0147', seasonal: 'May–Sep 8:30 / Oct–Apr 11:00',
      access: '7 minutes on foot from Mitake Station', booking: 'Use the official form to book',
      duration: 'Japanese official page: about 2–2.5 hours / English official page: about 2 hours', durationCaveat: 'sources differ; confirm when booking',
    },
    {
      locale: 'zh-TW', name: 'WASABI EXPERIENCE',
      address: '〒198-0147 東京都青梅市御岳 1-192-4', seasonal: '5～9 月 8:30／10～4 月 11:00',
      access: '從 JR 青梅線「御嶽站」步行約 7 分鐘', booking: '請使用官方表單預約',
      duration: '日文官方約 2～2.5 小時／英文官方約 2 小時', durationCaveat: '資訊不一致，預約時請確認',
    },
  ] as const;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);

    await page.goto('/spot/wasabi-experience');
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(spot.getByRole('heading', { name: expected.name })).toBeVisible();
    await expect(spot).toContainText(expected.address);
    await expect(spot).toContainText(expected.access);
    await expect(spot).toContainText(expected.seasonal);
    await expect(spot).toContainText(expected.duration);
    await expect(spot).toContainText(expected.durationCaveat);
    await expect(spot).toContainText(expected.booking);
    await expect(spot.getByRole('link', { name: expected.locale === 'ja' ? '公式予約フォームを開く' : expected.locale === 'en' ? 'Open the official booking form' : '開啟官方預約表單' })).toHaveAttribute(
      'href',
      'https://tokyowasabi.com/wasabi-experience/#booking-form',
    );
    await expectNoHorizontalOverflow(page);
  }
});

demoTest('keeps the tourism-office caveat complete in every locale', async ({ page }) => {
  const localizedExpectations = [
    {
      locale: 'ja',
      reference: '参考情報',
      pending: '施設名・所在地・電話番号を含む掲載内容は現在確認中です',
      official: '訪問前に奥多摩観光協会の公式情報をご確認ください',
      actionTitle: '公式情報',
      action: '公式情報を確認する',
    },
    {
      locale: 'en',
      reference: 'Reference information',
      pending: 'The listed place name, address, and phone number are still being confirmed',
      official: 'Check the Okutama Tourism Association’s official information before visiting',
      actionTitle: 'Official information',
      action: 'Check official information',
    },
    {
      locale: 'zh-TW',
      reference: '參考資訊',
      pending: '刊載的設施名稱、地址與電話號碼仍在確認中',
      official: '造訪前請以奧多摩觀光協會的官方資訊為準',
      actionTitle: '官方資訊',
      action: '查看官方資訊',
    },
  ] as const;
  const unsupportedClaims =
    /ガイドサービス|Guided service|導覽服務|約90分|About 90 minutes|約 90 分鐘|1,500|おみやげ|Souvenirs|伴手禮|Wi-Fi|トイレあり|Restroom|設有洗手間|駐車場|paid car park|付費停車場|混雑時|when it is busy|人潮眾多/;

  for (const expected of localizedExpectations) {
    await page.goto('/');
    await page.evaluate((locale) => {
      localStorage.clear();
      localStorage.setItem('tmm:locale', locale);
    }, expected.locale);
    await page.goto('/spot/okutama-tourism-office');

    const app = page.locator('.reference-app');
    const spot = page.locator('[data-screen="spot"][data-screen-active="true"]');
    await expect(app).toHaveAttribute('data-locale', expected.locale);
    await expect(spot).toContainText(expected.reference);
    await expect(spot).toContainText(expected.pending);
    await expect(spot).toContainText(expected.official);
    await expect(spot.getByRole('heading', { name: expected.actionTitle })).toBeVisible();
    const officialLink = spot.getByRole('link', { name: expected.action });
    await expect(officialLink).toHaveAttribute('href', 'https://www.okutama.gr.jp/site/');
    await expect(officialLink).toHaveAttribute('target', '_blank');
    await expect(officialLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(spot).not.toContainText(unsupportedClaims);
    await expect(spot).not.toContainText(/Netlify|デモ用編集情報|デモ参考情報/);
    await expectNoHorizontalOverflow(page);
    await spot.locator('.fab-back').click();
    await expect(activeScreen(page, 'mogu')).toBeVisible();
  }
});

test('keeps header and footer fixed while only the middle content scrolls', async ({ page }) => {
  const viewport = { width: 375, height: 812 };
  await page.setViewportSize(viewport);

  await page.goto('/explore');
  const explore = page.locator('[data-screen="explore"][data-screen-active="true"]');
  await expect(explore).toBeVisible();
  const exploreHead = explore.locator('.ghead');
  const exploreProgress = explore.locator('.progress');
  expect(await exploreHead.boundingBox()).toMatchObject({ y: 0 });
  expect((await exploreProgress.boundingBox())?.y).toBeGreaterThanOrEqual(viewport.height - 110);
  await expectNoHorizontalOverflow(page);

  await page.clock.setFixedTime(publicationDate);
  await page.goto('/explore/result');
  const result = page.locator('[data-screen="result"][data-screen-active="true"]');
  await expect(result).toBeVisible();
  const resultHead = result.locator('.ghead');
  const resultProgress = result.locator('.progress');
  const resultScroll = result.locator('.scroll');

  const resultBefore = {
    head: await resultHead.boundingBox(),
    progress: await resultProgress.boundingBox(),
    scrollMetrics: await resultScroll.evaluate((element) => ({
      scrollHeight: element.scrollHeight,
      clientHeight: element.clientHeight,
      scrollTop: element.scrollTop,
    })),
  };

  expect(resultBefore.scrollMetrics.scrollHeight).toBeGreaterThan(
    resultBefore.scrollMetrics.clientHeight,
  );
  expect(resultBefore.progress?.y).toBeGreaterThanOrEqual(viewport.height - 110);
  expect(resultBefore.progress?.y + (resultBefore.progress?.height ?? 0)).toBeCloseTo(
    viewport.height,
    0,
  );

  await resultScroll.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });

  const resultAfter = {
    head: await resultHead.boundingBox(),
    progress: await resultProgress.boundingBox(),
    scrollTop: await resultScroll.evaluate((element) => element.scrollTop),
  };

  expect(resultAfter.scrollTop).toBeGreaterThan(resultBefore.scrollMetrics.scrollTop);
  expect(Math.round(await page.evaluate(() => window.scrollY))).toBe(0);
  expect(resultAfter.head?.y).toBeCloseTo(resultBefore.head?.y ?? 0, 1);
  expect(resultAfter.progress?.y).toBeCloseTo(resultBefore.progress?.y ?? 0, 1);
});
