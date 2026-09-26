import { describe, expect, it } from 'vitest';
import type {
  DataVerificationEvidenceManifest,
  DataVerificationEvidence,
  DataVerificationAppEvidence,
} from '../data/data-verification-evidence-manifest';
import { DATA_VERIFICATION_EVIDENCE_MANIFEST } from '../data/data-verification-evidence-manifest';
import { validateDataVerificationEvidenceManifest } from './data-verification-evidence';
import { buildRepositoryLedgerClaims } from './data-verification-ledger';

const claims = [
  { claimId: 'place:example:address:ja', entityId: 'example' },
  { claimId: 'place:example:phone:ja', entityId: 'example' },
] as const;

const appEvidence: DataVerificationEvidence = {
  evidenceId: 'example-app-ja-375',
  claimIds: ['place:example:address:ja', 'place:example:phone:ja'],
  entityId: 'example',
  kind: 'app',
  capturedAt: '2026-08-27',
  path: 'docs/data-evidence/example/app-ja-375.webp',
  locale: 'ja',
  viewport: { width: 375, height: 812 },
  appCommit: 'e79899dd600cbd6c56e287207f8223970e62a528',
};

const manifest = (
  evidence: readonly DataVerificationEvidence[],
): DataVerificationEvidenceManifest => ({ evidence, omissions: [] });

const validationOptions = {
  repositoryRoot: '/repo',
  fileExists: (path: string) => path === '/repo/docs/data-evidence/example/app-ja-375.webp',
};

describe('data verification evidence manifest (#334)', () => {
  it('accepts missing evidence and valid one-to-many app evidence', () => {
    expect(() =>
      validateDataVerificationEvidenceManifest({ evidence: [], omissions: [] }, claims, validationOptions),
    ).not.toThrow();
    expect(() =>
      validateDataVerificationEvidenceManifest(manifest([appEvidence]), claims, validationOptions),
    ).not.toThrow();
  });

  it('records the reusable tourism-office app baseline and the unsafe source-copy omission', () => {
    const repositoryClaims = buildRepositoryLedgerClaims();
    const app = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.find(
      (item) => item.evidenceId === 'okutama-tourism-office-app-ja-375',
    );
    const sourceOmission = DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.find(
      (item) => item.omissionId === 'okutama-tourism-office-source-rights-restricted',
    );

    expect(app).toMatchObject({
      kind: 'app',
      entityId: 'okutama-tourism-office',
      locale: 'ja',
      viewport: { width: 375 },
      path: 'docs/data-evidence/okutama-tourism-office/app-ja-375.webp',
      capturedAt: '2026-08-27',
    });
    expect(app?.claimIds).toEqual(expect.arrayContaining([
      'place:okutama-tourism-office:address:ja',
      'place:okutama-tourism-office:phone:ja',
    ]));
    expect(sourceOmission).toMatchObject({
      kind: 'source',
      entityId: 'okutama-tourism-office',
      sourceUrl: 'https://www.okutama.gr.jp/site/',
    });
    expect(sourceOmission?.claimIds).toEqual([
      'place:okutama-tourism-office:address:ja',
      'place:okutama-tourism-office:phone:ja',
    ]);
    expect(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.some((item) => item.kind === 'source'),
    ).toBe(false);
    expect(
      repositoryClaims.find(
        (claim) => claim.claimId === 'place:okutama-tourism-office:address:ja',
      ),
    ).toMatchObject({
      retrievedAt: '2026-08-26',
      verification: 'needs_confirmation',
      finding: 'match',
    });
    expect(() =>
      validateDataVerificationEvidenceManifest(
        DATA_VERIFICATION_EVIDENCE_MANIFEST,
        repositoryClaims,
      ),
    ).not.toThrow();
  });

  it('records #329 app evidence in every locale and rights-restricted source omissions', () => {
    const repositoryClaims = buildRepositoryLedgerClaims();
    const valleyApps = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.filter(
      (item): item is DataVerificationAppEvidence => item.entityId === 'hikawa-valley' && item.kind === 'app',
    );
    const shrineApps = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.filter(
      (item): item is DataVerificationAppEvidence => item.entityId === 'oku-hikawa-shrine' && item.kind === 'app',
    );
    const routeApps = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.filter(
      (item): item is DataVerificationAppEvidence => item.evidenceId.startsWith('hikawa-route-') && item.kind === 'app',
    );
    const safetyOmission = DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.find(
      (item) => item.omissionId === 'hikawa-valley-safety-source-rights-restricted',
    );
    const tourismSiteOmission = DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.find(
      (item) => item.omissionId === 'hikawa-valley-tourism-site-rights-restricted',
    );
    const shrineOmission = DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.find(
      (item) => item.omissionId === 'oku-hikawa-shrine-report-source-rights-restricted',
    );

    expect(valleyApps.map((item) => item.locale).sort()).toEqual(['en', 'ja', 'zh-TW']);
    expect(shrineApps.map((item) => item.locale).sort()).toEqual(['en', 'ja', 'zh-TW']);
    expect(valleyApps.every((item) => item.viewport.width === 375)).toBe(true);
    expect(shrineApps.every((item) => item.viewport.width === 375)).toBe(true);
    expect([...valleyApps, ...shrineApps].every((item) => item.capturedAt === '2026-09-12')).toBe(true);
    expect(routeApps).toHaveLength(6);
    expect(routeApps.every((item) => item.viewport.width === 375)).toBe(true);
    expect(routeApps.every((item) => item.capturedAt === '2026-09-12')).toBe(true);
    expect(routeApps.find((item) => item.evidenceId === 'hikawa-route-yamame-ja-375')?.claimIds).toEqual(
      expect.arrayContaining([
        'route:okutama-yamame-journey:half-day:step:hikawa-valley:factual:walk-duration',
        'route:okutama-yamame-journey:half-day:step:hikawa-valley:factual:river-safety',
      ]),
    );
    expect(valleyApps.find((item) => item.locale === 'ja')?.claimIds).toEqual(expect.arrayContaining([
      'spot:hikawa-valley:water_safety',
      'spot:hikawa-valley:current_safety_information_url',
    ]));
    expect(shrineApps.find((item) => item.locale === 'ja')?.claimIds).toEqual(expect.arrayContaining([
      'spot:oku-hikawa-shrine:address',
      'spot:oku-hikawa-shrine:official_current_url',
    ]));
    expect(safetyOmission).toMatchObject({
      sourceUrl: 'https://www.town.okutama.tokyo.jp/1/kankosangyoka/kankojoho/3/436.html',
      recordedAt: '2026-09-12',
    });
    expect(tourismSiteOmission).toMatchObject({
      sourceUrl: 'https://www.okutama.gr.jp/site/',
      recordedAt: '2026-09-12',
      claimIds: ['place:hikawa-valley:name:ja'],
    });
    expect(shrineOmission?.claimIds).toEqual([
      'spot:oku-hikawa-shrine:address',
      'spot:oku-hikawa-shrine:official_current_url',
    ]);
    expect(repositoryClaims.some((claim) => claim.claimId === 'place:hikawa-valley:coordinates')).toBe(false);
    expect(repositoryClaims.some((claim) => claim.claimId === 'place:oku-hikawa-shrine:coordinates')).toBe(false);
  });

  it('records only the inspected #350 Fussa app claims and leaves capture rights unresolved', () => {
    const fussaEvidence = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.filter(
      (item) => item.evidenceId.startsWith('fussa-sake-'),
    );
    const byId = (id: string) => fussaEvidence.find((item) => item.evidenceId === id);
    const routeUpperEn = byId('fussa-sake-route-upper-en-375');
    const routeHalfStatsJa = byId('fussa-sake-route-half-stats-ja-375');
    const ishikawaJa = byId('fussa-sake-fussa-ishikawa-shuzo-practical-ja-375');
    const storyTopEn = byId('fussa-sake-story-top-en-375');
    const storyChaptersEn = byId('fussa-sake-story-chapters-en-375');

    expect(fussaEvidence).toHaveLength(33);
    for (const item of fussaEvidence) {
      expect(item.kind).toBe('app');
      expect(item.capturedAt).toBe('2026-09-26');
      expect(item.path).toMatch(/^docs\/data-evidence\/fussa-sake\/.+\.png$/);
      expect(item).toMatchObject({ viewport: { width: 375, height: 812 } });
      expect(item).not.toHaveProperty('appCommit');
      expect(item.note).toContain('Shinkansen widget');
      expect(item.note).toContain('public reuse permission');
    }
    expect(fussaEvidence.some((item) => item.path.includes('practical-lower'))).toBe(false);
    expect(storyTopEn?.claimIds).not.toContain('story:sake-fussa:presentation:story_title:en');
    expect(storyChaptersEn?.claimIds).toContain('story:sake-fussa:presentation:story_title:en');
    expect(storyChaptersEn?.note).toContain('/story/sake-fussa?candidateId=demo-tokyo-west-fussa-sake');
    expect(routeUpperEn?.claimIds).toContain(
      'route:fussa-sake-journey:half-day:stop:fussa-kurumiru:identity',
    );
    expect(routeUpperEn?.claimIds).not.toContain(
      'route:fussa-sake-journey:half-day:stop:fussa-ishikawa-shuzo:identity',
    );
    expect(routeHalfStatsJa?.claimIds).toContain(
      'route:fussa-sake-journey:half-day:summary_time:ja',
    );
    expect(routeHalfStatsJa?.claimIds).not.toContain(
      'route:fussa-sake-journey:half-day:stop:fussa-tamura-shuzo:identity',
    );
    expect(ishikawaJa?.claimIds).toContain('spot:fussa-ishikawa-shuzo:access');
    expect(ishikawaJa?.claimIds).not.toContain('spot:fussa-ishikawa-shuzo:hours');
  });

  it('omits the below-fold English Hachioji Story heading from its top-frame claims', () => {
    const evidence = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence;
    const english = evidence.find((item) => item.evidenceId === 'hachioji-ginger-story-en-375');
    const japanese = evidence.find((item) => item.evidenceId === 'hachioji-ginger-story-ja-375');
    const traditionalChinese = evidence.find((item) => item.evidenceId === 'hachioji-ginger-story-zh-TW-375');

    expect(english?.claimIds).not.toContain('story:hachioji-ginger:presentation:story_title:en');
    expect(japanese?.claimIds).toContain('story:hachioji-ginger:presentation:story_title:ja');
    expect(traditionalChinese?.claimIds).toContain('story:hachioji-ginger:presentation:story_title:zh-TW');
    expect(english?.note).toContain('English section heading');
  });

  it('records final Japanese Yamashiroya app evidence and the official-site rights omission (#323)', () => {
    const repositoryClaims = buildRepositoryLedgerClaims();
    const app = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.find(
      (item) => item.evidenceId === 'yamashiroya-app-ja-375',
    );
    const routeApp = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.find(
      (item) => item.evidenceId === 'yamashiroya-route-app-ja-375',
    );
    const wasabiStoryApp = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.find(
      (item) => item.evidenceId === 'yamashiroya-story-wasabi-app-ja-375',
    );
    const yamameStoryApp = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.find(
      (item) => item.evidenceId === 'yamashiroya-story-yamame-app-ja-375',
    );
    const sourceOmission = DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.find(
      (item) => item.omissionId === 'yamashiroya-source-rights-restricted',
    );
    const coordinateSourceOmission = DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.find(
      (item) => item.omissionId === 'yamashiroya-coordinate-source-rights-restricted',
    );

    expect(app).toMatchObject({
      kind: 'app',
      entityId: 'yamashiroya',
      locale: 'ja',
      viewport: { width: 375 },
      path: 'docs/data-evidence/yamashiroya/app-ja-375.webp',
      capturedAt: '2026-08-28',
    });
    expect(app?.claimIds).toEqual(expect.arrayContaining([
      'place:yamashiroya:name:ja',
      'place:yamashiroya:address:ja',
      'place:yamashiroya:phone:ja',
      'place:yamashiroya:hours:ja',
      'place:yamashiroya:access:ja',
      'place:yamashiroya:parking:ja',
      'place:yamashiroya:closed_days:ja',
    ]));
    expect(app?.claimIds).not.toContain(
      'spot:yamashiroya:presentation:verification_note:ja',
    );
    expect(routeApp).toMatchObject({
      kind: 'app',
      entityId: 'okutama-wasabi-journey',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      path: 'docs/data-evidence/yamashiroya/route-app-ja-375.webp',
    });
    expect(routeApp?.claimIds).toContain(
      'route:okutama-wasabi-journey:full-day:step:yamashiroya:factual:product-availability',
    );
    expect(wasabiStoryApp).toMatchObject({
      kind: 'app',
      entityId: 'wasabi-okutama',
      locale: 'ja',
      path: 'docs/data-evidence/yamashiroya/story-wasabi-app-ja-375.webp',
    });
    expect(wasabiStoryApp?.claimIds).toContain(
      'story:wasabi-okutama:story.spot.yamashiroya.product-availability',
    );
    expect(yamameStoryApp).toMatchObject({
      kind: 'app',
      entityId: 'yamame-okutama',
      locale: 'ja',
      path: 'docs/data-evidence/yamashiroya/story-yamame-app-ja-375.webp',
    });
    expect(yamameStoryApp?.claimIds).toContain(
      'story:yamame-okutama:story.spot.yamashiroya.product-availability',
    );
    expect(sourceOmission).toMatchObject({
      kind: 'source',
      entityId: 'yamashiroya',
      sourceUrl: 'https://www.yamasiroya.co.jp/shop.html',
      recordedAt: '2026-08-28',
    });
    expect(sourceOmission?.claimIds).toEqual(expect.arrayContaining([
      'place:yamashiroya:address:ja',
      'place:yamashiroya:phone:ja',
      'place:yamashiroya:hours:ja',
      'place:yamashiroya:closed_days:ja',
    ]));
    expect(sourceOmission?.claimIds).not.toContain('place:yamashiroya:coordinates');
    expect(coordinateSourceOmission).toMatchObject({
      kind: 'source',
      entityId: 'yamashiroya',
      sourceUrl: 'https://www.google.com/maps/search/?api=1&query=35.80679970833439%2C139.0969139801638',
      recordedAt: '2026-08-28',
      claimIds: ['place:yamashiroya:coordinates'],
    });
    expect(() =>
      validateDataVerificationEvidenceManifest(
        DATA_VERIFICATION_EVIDENCE_MANIFEST,
        repositoryClaims,
      ),
    ).not.toThrow();
  });

  it('records bounded Okutama no Daidokoro app evidence and source-rights omissions (#325)', () => {
    const repositoryClaims = buildRepositoryLedgerClaims();
    const app = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.find(
      (item) => item.evidenceId === 'okutama-kitchen-app-ja-375',
    );
    const routeApp = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.find(
      (item) => item.evidenceId === 'okutama-kitchen-route-app-ja-375',
    );
    const storyApp = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.find(
      (item) => item.evidenceId === 'okutama-kitchen-story-wasabi-app-ja-375',
    );
    const homeOmission = DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.find(
      (item) => item.omissionId === 'okutama-kitchen-home-source-rights-restricted',
    );
    const menuOmission = DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.find(
      (item) => item.omissionId === 'okutama-kitchen-menu-source-rights-restricted',
    );
    const routeMenuOmission = DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.find(
      (item) => item.omissionId === 'okutama-kitchen-route-menu-source-rights-restricted',
    );
    const storyMenuOmission = DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.find(
      (item) => item.omissionId === 'okutama-kitchen-story-menu-source-rights-restricted',
    );
    const coordinateOmission = DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.find(
      (item) => item.omissionId === 'okutama-kitchen-coordinate-source-rights-restricted',
    );

    expect(app).toMatchObject({
      kind: 'app',
      entityId: 'okutama-kitchen',
      locale: 'ja',
      viewport: { width: 375 },
      path: 'docs/data-evidence/okutama-kitchen/app-ja-375.webp',
      capturedAt: '2026-08-28',
    });
    expect(app?.claimIds).toEqual(expect.arrayContaining([
      'place:okutama-kitchen:name:ja',
      'place:okutama-kitchen:address:ja',
      'place:okutama-kitchen:phone:ja',
        'spot:okutama-kitchen:hours',
        'spot:okutama-kitchen:access',
        'spot:okutama-kitchen:closed_days',
        'spot:okutama-kitchen:parking',
        'spot:okutama-kitchen:price_availability',
    ]));
    expect(routeApp).toMatchObject({
      kind: 'app',
      entityId: 'okutama-wasabi-journey',
      locale: 'ja',
      path: 'docs/data-evidence/okutama-kitchen/route-app-ja-375.webp',
    });
    expect(routeApp?.claimIds).toContain(
      'route:okutama-wasabi-journey:half-day:step:okutama-kitchen:factual:product-availability',
    );
    expect(storyApp).toMatchObject({
      kind: 'app',
      entityId: 'wasabi-okutama',
      locale: 'ja',
      path: 'docs/data-evidence/okutama-kitchen/story-wasabi-app-ja-375.webp',
    });
    expect(storyApp?.claimIds).toContain(
      'story:wasabi-okutama:story.spot.okutama-kitchen.product-availability',
    );
    expect(homeOmission).toMatchObject({
      kind: 'source',
      entityId: 'okutama-kitchen',
      sourceUrl: 'https://www.okutamanodaidokoro.com/',
      recordedAt: '2026-08-28',
    });
    expect(menuOmission).toMatchObject({
      kind: 'source',
      entityId: 'okutama-kitchen',
      sourceUrl: 'https://www.okutamanodaidokoro.com/menu.html',
      recordedAt: '2026-08-28',
    });
    expect(routeMenuOmission).toMatchObject({
      kind: 'source',
      entityId: 'okutama-wasabi-journey',
      sourceUrl: 'https://www.okutamanodaidokoro.com/menu.html',
      claimIds: [
        'route:okutama-wasabi-journey:half-day:step:okutama-kitchen:factual:product-availability',
      ],
    });
    expect(storyMenuOmission).toMatchObject({
      kind: 'source',
      entityId: 'wasabi-okutama',
      sourceUrl: 'https://www.okutamanodaidokoro.com/menu.html',
      claimIds: [
        'story:wasabi-okutama:story.spot.okutama-kitchen.product-availability',
      ],
    });
    expect(coordinateOmission).toMatchObject({
      kind: 'source',
      entityId: 'okutama-kitchen',
      sourceUrl: 'https://www.google.com/maps/search/?api=1&query=35.8085659%2C139.0971665',
      recordedAt: '2026-08-28',
      claimIds: ['place:okutama-kitchen:coordinates'],
    });
    expect(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.some((item) => item.kind === 'source'),
    ).toBe(false);
    expect(() =>
      validateDataVerificationEvidenceManifest(
        DATA_VERIFICATION_EVIDENCE_MANIFEST,
        repositoryClaims,
      ),
    ).not.toThrow();
  });

  it('records bounded PORT OKUTAMA app evidence and source omissions (#327)', () => {
    const repositoryClaims = buildRepositoryLedgerClaims();
    const evidenceById = new Map(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.map((item) => [item.evidenceId, item]),
    );
    const omissionsById = new Map(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.map((item) => [item.omissionId, item]),
    );

    expect(evidenceById.get('port-okutama-app-ja-375')).toMatchObject({
      kind: 'app',
      entityId: 'port-okutama',
      locale: 'ja',
      viewport: { width: 375 },
      path: 'docs/data-evidence/port-okutama/app-ja-375.webp',
      capturedAt: '2026-08-29',
    });
    expect(evidenceById.get('port-okutama-app-ja-375')?.claimIds).toEqual(expect.arrayContaining([
      'place:port-okutama:name:ja',
      'place:port-okutama:address:ja',
      'place:port-okutama:phone:ja',
      'spot:port-okutama:hours',
      'spot:port-okutama:closed_days',
      'spot:port-okutama:service_availability',
      'spot:port-okutama:official_current_url',
    ]));

    for (const [locale, path] of [
      ['en', 'docs/data-evidence/port-okutama/app-en-375.webp'],
      ['zh-TW', 'docs/data-evidence/port-okutama/app-zh-TW-375.webp'],
    ] as const) {
      expect(evidenceById.get(`port-okutama-app-${locale}-375`)).toMatchObject({
        kind: 'app',
        entityId: 'port-okutama',
        locale,
        viewport: { width: 375, height: 1500 },
        path,
        capturedAt: '2026-08-29',
      });
      expect(evidenceById.get(`port-okutama-app-${locale}-375`)?.claimIds).toEqual(
        expect.arrayContaining([
          `place:port-okutama:hours:${locale}`,
          `place:port-okutama:closed_days:${locale}`,
          `place:port-okutama:service_availability:${locale}`,
        ]),
      );
    }

    for (const [evidenceId, claimId, path] of [
      [
        'port-okutama-route-half-day-app-ja-375',
        'route:okutama-wasabi-journey:half-day:step:port-okutama:factual:service-availability',
        'docs/data-evidence/port-okutama/route-half-day-app-ja-375.webp',
      ],
      [
        'port-okutama-route-full-day-app-ja-375',
        'route:okutama-wasabi-journey:full-day:step:port-okutama:factual:coffee-availability',
        'docs/data-evidence/port-okutama/route-full-day-app-ja-375.webp',
      ],
      [
        'port-okutama-story-wasabi-app-ja-375',
        'story:wasabi-okutama:story.spot.port-okutama.service-availability',
        'docs/data-evidence/port-okutama/story-wasabi-app-ja-375.webp',
      ],
    ] as const) {
      expect(evidenceById.get(evidenceId)).toMatchObject({
        kind: 'app',
        locale: 'ja',
        viewport: { width: 375, height: 812 },
        path,
        claimIds: [claimId],
      });
    }

    for (const [surface, locale, path, localizedClaimId] of [
      [
        'route-half-day',
        'en',
        'docs/data-evidence/port-okutama/route-half-day-app-en-375.webp',
        'route:okutama-wasabi-journey:half-day:step:port-okutama:guidance:en',
      ],
      [
        'route-half-day',
        'zh-TW',
        'docs/data-evidence/port-okutama/route-half-day-app-zh-TW-375.webp',
        'route:okutama-wasabi-journey:half-day:step:port-okutama:guidance:zh-TW',
      ],
      [
        'route-full-day',
        'en',
        'docs/data-evidence/port-okutama/route-full-day-app-en-375.webp',
        'route:okutama-wasabi-journey:full-day:step:port-okutama:guidance:en',
      ],
      [
        'route-full-day',
        'zh-TW',
        'docs/data-evidence/port-okutama/route-full-day-app-zh-TW-375.webp',
        'route:okutama-wasabi-journey:full-day:step:port-okutama:guidance:zh-TW',
      ],
      [
        'story-wasabi',
        'en',
        'docs/data-evidence/port-okutama/story-wasabi-app-en-375.webp',
        'story:wasabi-okutama:presentation:spot_group:nearby:reference:port-okutama:badge:en',
      ],
      [
        'story-wasabi',
        'zh-TW',
        'docs/data-evidence/port-okutama/story-wasabi-app-zh-TW-375.webp',
        'story:wasabi-okutama:presentation:spot_group:nearby:reference:port-okutama:badge:zh-TW',
      ],
    ] as const) {
      const evidence = evidenceById.get(`port-okutama-${surface}-app-${locale}-375`);
      expect(evidence).toMatchObject({
        kind: 'app',
        locale,
        viewport: { width: 375, height: 812 },
        path,
        capturedAt: '2026-08-29',
      });
      expect(evidence?.claimIds).toContain(localizedClaimId);
    }

    expect(omissionsById.get('port-okutama-operator-source-reuse-unconfirmed')).toMatchObject({
      kind: 'source',
      entityId: 'port-okutama',
      sourceUrl: 'https://www.okutama.ne.jp/',
      recordedAt: '2026-08-29',
    });
    expect(omissionsById.get('port-okutama-address-source-reuse-unconfirmed')).toMatchObject({
      kind: 'source',
      entityId: 'port-okutama',
      sourceUrl: 'https://www.jreast.co.jp/hachioji/ome-itsukaichi/spot/detail382787.html',
      claimIds: ['place:port-okutama:address:ja'],
    });
    expect(omissionsById.get('port-okutama-coordinate-source-not-captured')).toMatchObject({
      kind: 'source',
      entityId: 'port-okutama',
      sourceUrl: 'https://www.openstreetmap.org/node/6552267871',
      claimIds: ['place:port-okutama:coordinates'],
    });
    expect(omissionsById.get('port-okutama-route-source-reuse-unconfirmed')?.claimIds).toEqual([
      'route:okutama-wasabi-journey:half-day:step:port-okutama:factual:service-availability',
      'route:okutama-wasabi-journey:full-day:step:port-okutama:factual:coffee-availability',
    ]);
    expect(omissionsById.get('port-okutama-story-source-reuse-unconfirmed')?.claimIds).toEqual([
      'story:wasabi-okutama:story.spot.port-okutama.service-availability',
    ]);
    expect(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.some((item) => item.kind === 'source'),
    ).toBe(false);
    expect(() =>
      validateDataVerificationEvidenceManifest(
        DATA_VERIFICATION_EVIDENCE_MANIFEST,
        repositoryClaims,
      ),
    ).not.toThrow();
  });

  it('records localized Akabeko app evidence and every source omission (#326)', () => {
    const repositoryClaims = buildRepositoryLedgerClaims();
    const evidenceById = new Map(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.map((item) => [item.evidenceId, item]),
    );
    const omissionsById = new Map(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.map((item) => [item.omissionId, item]),
    );

    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      expect(evidenceById.get(`akabeko-app-${locale}-375`)).toMatchObject({
        kind: 'app',
        entityId: 'akabeko',
        locale,
        viewport: { width: 375, height: 1800 },
        path: `docs/data-evidence/akabeko/app-${locale}-375.webp`,
        capturedAt: '2026-08-29',
      });
      for (const surface of ['route-wasabi', 'route-yamame', 'story-wasabi', 'story-yamame']) {
        expect(evidenceById.get(`akabeko-${surface}-${locale}-375`)).toMatchObject({
          kind: 'app',
          locale,
          viewport: { width: 375, height: 812 },
          path: `docs/data-evidence/akabeko/${surface}-${locale}-375.webp`,
          capturedAt: '2026-08-29',
        });
      }
    }
    expect(evidenceById.get('akabeko-app-ja-375')?.claimIds).toEqual(expect.arrayContaining([
      'place:akabeko:name:ja',
      'place:akabeko:address:ja',
      'place:akabeko:phone:ja',
      'spot:akabeko:hours',
      'spot:akabeko:closed_days',
      'spot:akabeko:reservation',
      'spot:akabeko:price_availability',
      'spot:akabeko:official_current_url',
    ]));
    expect(evidenceById.get('akabeko-route-wasabi-ja-375')?.claimIds).toContain(
      'route:okutama-wasabi-journey:full-day:step:akabeko:factual:last-order-time',
    );
    expect(evidenceById.get('akabeko-route-yamame-ja-375')?.claimIds).toContain(
      'route:okutama-yamame-journey:half-day:step:akabeko:factual:dish-availability',
    );
    expect(evidenceById.get('akabeko-story-wasabi-ja-375')?.claimIds).toContain(
      'story:wasabi-okutama:story.spot.akabeko.menu-availability',
    );
    expect(evidenceById.get('akabeko-story-yamame-ja-375')?.claimIds).toContain(
      'story:yamame-okutama:story.spot.akabeko.dish-availability',
    );

    for (const [omissionId, sourceUrl] of [
      ['akabeko-home-source-rights-restricted', 'https://akabeko.tokyo/'],
      ['akabeko-news-source-rights-restricted', 'https://akabeko.tokyo/news'],
      ['arasawaya-contact-source-rights-restricted', 'https://arasawaya.co.jp/contact/'],
      ['akabeko-coordinate-source-not-captured', 'https://www.openstreetmap.org/node/4916080538'],
    ] as const) {
      expect(omissionsById.get(omissionId)).toMatchObject({
        kind: 'source',
        sourceUrl,
        recordedAt: '2026-08-29',
      });
    }
    expect(
      omissionsById.get('akabeko-news-source-rights-restricted')?.claimIds,
    ).toContain('place:akabeko:phone:source:akabeko-news-shared-contact');
    expect(
      omissionsById.get('arasawaya-contact-source-rights-restricted')?.claimIds,
    ).toContain('place:akabeko:phone:source:arasawaya-reservation-inquiry');
    expect(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.some((item) => item.kind === 'source'),
    ).toBe(false);
    expect(() =>
      validateDataVerificationEvidenceManifest(
        DATA_VERIFICATION_EVIDENCE_MANIFEST,
        repositoryClaims,
      ),
    ).not.toThrow();
  });

  it('records localized Wasabi Shokudo evidence and source-rights omissions (#324)', () => {
    const repositoryClaims = buildRepositoryLedgerClaims();
    const evidenceById = new Map(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.map((item) => [item.evidenceId, item]),
    );
    const omissionsById = new Map(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.map((item) => [item.omissionId, item]),
    );

    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      expect(evidenceById.get(`wasabi-kitchen-app-${locale}-375`)).toMatchObject({
        kind: 'app',
        entityId: 'wasabi-kitchen',
        locale,
        viewport: { width: 375, height: 1372 },
        path: `docs/data-evidence/wasabi-kitchen/app-${locale}-375.webp`,
        capturedAt: '2026-08-29',
      });
      for (const surface of ['route', 'story']) {
        expect(evidenceById.get(`wasabi-kitchen-${surface}-app-${locale}-375`)).toMatchObject({
          kind: 'app',
          locale,
          viewport: { width: 375, height: 812 },
          path: `docs/data-evidence/wasabi-kitchen/${surface}-app-${locale}-375.webp`,
          capturedAt: '2026-08-29',
        });
      }
    }

    expect(evidenceById.get('wasabi-kitchen-app-ja-375')?.claimIds).toEqual(expect.arrayContaining([
      'spot:wasabi-kitchen:venue_model',
      'spot:wasabi-kitchen:operating_area',
      'spot:wasabi-kitchen:schedule_guidance',
      'spot:wasabi-kitchen:schedule_conflict',
      'spot:wasabi-kitchen:price_availability',
    ]));
    for (const [omissionId, sourceUrl] of [
      ['wasabi-kitchen-foodtruck-source-rights-restricted', 'https://tokyowasabi.com/foodtruck/'],
      ['wasabi-kitchen-august-schedule-source-rights-restricted', 'https://tokyowasabi.com/information/2751/260728/'],
      ['wasabi-kitchen-schedule-directory-source-rights-restricted', 'https://tokyowasabi.com/category/information/'],
      ['wasabi-kitchen-wasabi-don-source-rights-restricted', 'https://tokyowasabi.com/wasabi-don/'],
      ['wasabi-kitchen-hitoshi-event-source-rights-restricted', 'https://tokyowasabi.com/hitoshi/2573/fussa-tanabata-challenge/'],
    ] as const) {
      expect(omissionsById.get(omissionId)).toMatchObject({
        kind: 'source',
        entityId: 'wasabi-kitchen',
        sourceUrl,
        recordedAt: '2026-08-29',
      });
    }
    expect(() => validateDataVerificationEvidenceManifest(
      DATA_VERIFICATION_EVIDENCE_MANIFEST,
      repositoryClaims,
    )).not.toThrow();
  });

  it('records bounded Ome sake app evidence and exact source omissions (#348)', () => {
    const repositoryClaims = buildRepositoryLedgerClaims();
    const evidenceById = new Map(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.map((item) => [item.evidenceId, item]),
    );
    const omissionsById = new Map(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.map((item) => [item.omissionId, item]),
    );

    expect(evidenceById.get('ome-sake-mogu-ja-375')).toMatchObject({
      kind: 'app',
      entityId: 'ome-sawai-sake-journey',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      path: 'docs/data-evidence/ome-sake/mogu-ja-375.webp',
      capturedAt: '2026-08-29',
      claimIds: [
        'route:ome-sawai-sake-journey:name:ja',
        'route:ome-sawai-sake-journey:mogu.factual.origin-access:ja',
      ],
    });

    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      expect(evidenceById.get(`ome-sake-story-${locale}-375`)).toMatchObject({
        kind: 'app',
        entityId: 'sake-ome',
        locale,
        viewport: { width: 375, height: 812 },
        path: `docs/data-evidence/ome-sake/story-${locale}-375.webp`,
        capturedAt: '2026-08-29',
        claimIds: [
          'story:sake-ome:story.factual.nearest-station',
          'story:sake-ome:story.factual.tama-river-valley-context',
          `story:sake-ome:presentation:story_intro:${locale}`,
          `story:sake-ome:presentation:story_location:${locale}`,
        ],
      });
      expect(evidenceById.get(`ome-sake-route-${locale}-375`)).toMatchObject({
        kind: 'app',
        entityId: 'ome-sawai-sake-journey',
        locale,
        viewport: { width: 375, height: 812 },
        path: `docs/data-evidence/ome-sake/route-${locale}-375.webp`,
        capturedAt: '2026-08-29',
        claimIds: [
          `route:ome-sawai-sake-journey:half-day:region_guidance:${locale}`,
          `route:ome-sawai-sake-journey:half-day:origin_travel_time_guidance:${locale}`,
          `route:ome-sawai-sake-journey:half-day:operational_caution:${locale}`,
          `route:ome-sawai-sake-journey:half-day:step:sawai-ozawa-shuzo:guidance:${locale}`,
          `route:ome-sawai-sake-journey:half-day:step:sawanoien-garden:transport_guidance:${locale}`,
        ],
      });
      expect(evidenceById.get(`ome-sake-spot-ozawa-${locale}-375`)).toMatchObject({
        kind: 'app',
        entityId: 'sawai-ozawa-shuzo',
        locale,
        viewport: { width: 375, height: 812 },
        path: `docs/data-evidence/ome-sake/spot-ozawa-${locale}-375.webp`,
        capturedAt: '2026-08-29',
        claimIds: [
          `place:sawai-ozawa-shuzo:name:${locale}`,
          `spot:sawai-ozawa-shuzo:presentation:lead:${locale}`,
          `spot:sawai-ozawa-shuzo:presentation:description:${locale}`,
          `spot:sawai-ozawa-shuzo:presentation:tag:sake-brewery:${locale}`,
          `spot:sawai-ozawa-shuzo:presentation:tag:official-source:${locale}`,
          `spot:sawai-ozawa-shuzo:presentation:tag:confirmation-pending:${locale}`,
          `place:sawai-ozawa-shuzo:information_name:${locale}`,
          `place:sawai-ozawa-shuzo:address:${locale}`,
          locale === 'ja'
            ? 'spot:sawai-ozawa-shuzo:access'
            : `place:sawai-ozawa-shuzo:access:${locale}`,
        ],
      });
    }

    expect(omissionsById.get('ome-sake-ozawa-home-source-reuse-unsupported')).toMatchObject({
      kind: 'source',
      entityId: 'sawai-ozawa-shuzo',
      sourceUrl: 'https://www.sawanoi-sake.com/',
      recordedAt: '2026-08-29',
      claimIds: [
        'place:sawai-ozawa-shuzo:name:ja',
        'place:sawai-ozawa-shuzo:address:ja',
        'spot:sawai-ozawa-shuzo:access',
        'spot:sawai-ozawa-shuzo:official_current_url',
      ],
    });
    expect(omissionsById.get('ome-sake-ozawa-tour-source-reuse-unsupported')).toMatchObject({
      kind: 'source',
      entityId: 'sawai-ozawa-shuzo',
      sourceUrl: 'https://www.sawanoi-sake.com/service/kengaku/',
      recordedAt: '2026-08-29',
      claimIds: [
        'spot:sawai-ozawa-shuzo:hours',
        'spot:sawai-ozawa-shuzo:closed_days',
        'spot:sawai-ozawa-shuzo:price_availability',
        'spot:sawai-ozawa-shuzo:reservation',
        'spot:sawai-ozawa-shuzo:story_wording',
      ],
    });
    expect(omissionsById.get('ome-sake-sawanoien-source-reuse-unsupported')).toMatchObject({
      kind: 'source',
      entityId: 'sawanoien-garden',
      sourceUrl: 'https://www.sawanoi-sake.com/service/sawanoien/',
      recordedAt: '2026-08-29',
      claimIds: [
        'spot:sawanoien-garden:hours',
        'spot:sawanoien-garden:closed_days',
        'spot:sawanoien-garden:official_current_url',
        'spot:sawanoien-garden:story_wording',
      ],
    });
    expect(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.some((item) => item.kind === 'source'),
    ).toBe(false);
    expect(() =>
      validateDataVerificationEvidenceManifest(
        DATA_VERIFICATION_EVIDENCE_MANIFEST,
        repositoryClaims,
      ),
    ).not.toThrow();
  });

  it('records localized Wasabi Experience evidence and separate source provenance (#328)', () => {
    const repositoryClaims = buildRepositoryLedgerClaims();
    const evidenceById = new Map(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.map((item) => [item.evidenceId, item]),
    );
    const omissionsById = new Map(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.map((item) => [item.omissionId, item]),
    );

    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      const spotEvidence = evidenceById.get(`wasabi-experience-app-${locale}-375`);
      expect(spotEvidence).toMatchObject({
        kind: 'app',
        entityId: 'wasabi-experience',
        locale,
        viewport: { width: 375, height: 2600 },
        path: `docs/data-evidence/wasabi-experience/app-${locale}-375.webp`,
      });
      expect(spotEvidence?.claimIds).toContain(
        `spot:wasabi-experience:presentation:verification_note:${locale}`,
      );
      const routeEvidence = evidenceById.get(`wasabi-experience-route-app-${locale}-375`);
      expect(routeEvidence).toMatchObject({
        kind: 'app',
        entityId: 'okutama-wasabi-journey',
        locale,
        viewport: { width: 375, height: 1600 },
      });
      expect(routeEvidence?.claimIds).toEqual(expect.arrayContaining([
        'route:okutama-wasabi-journey:full-day:step:wasabi-experience:factual:tour-duration',
        'route:okutama-wasabi-journey:full-day:step:wasabi-experience:factual:daily-group-limit',
        'route:okutama-wasabi-journey:full-day:step:wasabi-experience:factual:tour-availability',
      ]));
      expect(evidenceById.get(`wasabi-experience-story-app-${locale}-375`)).toMatchObject({
        kind: 'app',
        entityId: 'wasabi-okutama',
        locale,
        viewport: { width: 375, height: 812 },
      });
    }

    expect(omissionsById.get('wasabi-experience-source-rights-restricted')).toMatchObject({
      entityId: 'wasabi-experience',
      sourceUrl: 'https://tokyowasabi.com/wasabi-experience/',
    });
    expect(omissionsById.get('wasabi-experience-access-source-rights-restricted')).toMatchObject({
      sourceUrl: 'https://tokyowasabi.com/wasabi-experience-en/',
    });
    expect(omissionsById.get('wasabi-experience-route-en-source-rights-restricted')).toMatchObject({
      entityId: 'okutama-wasabi-journey',
      sourceUrl: 'https://tokyowasabi.com/wasabi-experience-en/',
    });
    expect(omissionsById.get('wasabi-experience-coordinate-source-rights-restricted')).toMatchObject({
      sourceUrl: 'https://www.google.com/maps/search/?api=1&query=35.798697%2C139.177867',
      claimIds: ['place:wasabi-experience:coordinates'],
    });
    expect(() => validateDataVerificationEvidenceManifest(
      DATA_VERIFICATION_EVIDENCE_MANIFEST,
      repositoryClaims,
    )).not.toThrow();
  });

  it.each([
    {
      name: 'orphan claim reference',
      evidence: [{ ...appEvidence, claimIds: ['place:missing:address:ja'] }],
      error: 'unknown claimId',
    },
    {
      name: 'missing local screenshot',
      evidence: [{ ...appEvidence, path: 'docs/data-evidence/example/missing.webp' }],
      error: 'does not exist',
    },
    {
      name: 'path outside the evidence directory',
      evidence: [{ ...appEvidence, path: 'docs/example.webp' }],
      error: 'docs/data-evidence',
    },
    {
      name: 'duplicate evidence ID',
      evidence: [appEvidence, { ...appEvidence }],
      error: 'Duplicate evidenceId',
    },
    {
      name: 'source evidence without its captured URL',
      evidence: [{
        ...appEvidence,
        kind: 'source',
        locale: undefined,
        viewport: undefined,
        appCommit: undefined,
      }],
      error: 'sourceUrl',
    },
    {
      name: 'app evidence without locale and viewport metadata',
      evidence: [{
        ...appEvidence,
        locale: undefined,
        viewport: undefined,
      }],
      error: 'locale and viewport',
    },
    {
      name: 'unknown evidence kind',
      evidence: [{ ...appEvidence, kind: 'video' }],
      error: 'unsupported kind',
    },
  ])('rejects $name', ({ evidence, error }) => {
    expect(() =>
      validateDataVerificationEvidenceManifest(
        manifest(evidence as unknown as readonly DataVerificationEvidence[]),
        claims,
        validationOptions,
      ),
    ).toThrow(error);
  });

  it('records exact Akiruno source-page omissions without asserting reuse rights', () => {
    const omissionsById = new Map(
      DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions.map((item) => [item.omissionId, item]),
    );
    for (const [omissionId, sourceUrl] of [
      ['akiruno-seasonal-municipal-source-not-captured', 'https://www.city.akiruno.tokyo.jp/kanko/0000001109.html'],
      ['akiruno-farmers-municipal-source-not-captured', 'https://www.city.akiruno.tokyo.jp/0000003556.html'],
      ['akiruno-seoto-operator-source-not-captured', 'http://www.seotonoyu.jp/access'],
      ['akiruno-gotokyo-source-not-captured', 'https://www.gotokyo.org/jp/spot/397/index.html'],
    ] as const) {
      expect(omissionsById.get(omissionId)).toMatchObject({
        kind: 'source',
        sourceUrl,
        recordedAt: '2026-09-26',
        reason: expect.stringContaining('reuse permission is not recorded'),
      });
    }
    expect(DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.some((item) =>
      item.kind === 'app' && (item.entityId === 'produce-akiruno' || item.entityId === 'akiruno-seasonal-produce-journey')))
      .toBe(true);
  });

  it('links only the inspected Akiruno 375px app captures and excludes clipped claims', () => {
    const akirunoApps = DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.filter((item) =>
      item.kind === 'app' && item.evidenceId.startsWith('akiruno-produce-'));
    const byId = new Map(akirunoApps.map((item) => [item.evidenceId, item]));

    expect(new Set(akirunoApps.map((item) => item.path)).size).toBe(47);
    expect(akirunoApps).toHaveLength(53);
    for (const item of akirunoApps) {
      expect(item).toMatchObject({ kind: 'app', capturedAt: '2026-09-26', viewport: { width: 375, height: 812 } });
      expect(item).not.toHaveProperty('appCommit');
      expect(item.note).toMatch(/Captured at 2026-09-26T\d{2}:\d{2}:\d{2}\.\d{3}Z from http:\/\/localhost:4388\//);
      expect(item.note).toContain('No appCommit is asserted.');
    }

    expect(byId.get('akiruno-produce-story-top-en-375')?.claimIds).not.toContain(
      'story:produce-akiruno:presentation:story_title:en',
    );
    expect(byId.get('akiruno-produce-route-upper-en-375')?.claimIds).not.toContain(
      'route:akiruno-seasonal-produce-journey:half-day:step:akiruno-seoto-no-yu:guidance:en',
    );
    expect(byId.get('akiruno-produce-route-half-stats-en-375')?.claimIds).not.toContain(
      'route:akiruno-seasonal-produce-journey:half-day:stop:akiruno-farmers-center:identity',
    );
    expect(byId.get('akiruno-produce-route-half-steps-en-en-375')?.claimIds).toEqual(expect.arrayContaining([
      'route:akiruno-seasonal-produce-journey:half-day:stop:akiruno-farmers-center:identity',
      'route:akiruno-seasonal-produce-journey:half-day:stop:akiruno-seoto-no-yu:identity',
    ]));
    expect(byId.get('akiruno-produce-akiruno-farmers-center-practical-en-375')?.claimIds).toContain(
      'spot:akiruno-farmers-center:closed_days',
    );
    expect(byId.get('akiruno-produce-akiruno-seoto-no-yu-practical-en-375')?.claimIds).not.toContain(
      'spot:akiruno-seoto-no-yu:hours',
    );
    for (const locale of ['ja', 'zh-TW'] as const) {
      const upperSeoto = byId.get(`akiruno-produce-akiruno-seoto-no-yu-practical-${locale}-375`);
      expect(upperSeoto?.claimIds).not.toContain(
        `spot:akiruno-seoto-no-yu:presentation:verification_note:${locale}`,
      );
      expect(upperSeoto?.note).toContain('clipped verification caveat is excluded');
      expect(byId.get(`akiruno-produce-akiruno-seoto-no-yu-practical-lower-${locale}-375`)?.claimIds)
        .toContain(`spot:akiruno-seoto-no-yu:presentation:verification_note:${locale}`);
    }
    expect(byId.get('akiruno-produce-akiruno-seoto-no-yu-practical-en-375')?.claimIds)
      .toContain('spot:akiruno-seoto-no-yu:presentation:verification_note:en');
  });

  it('rejects an unknown omission kind', () => {
    const invalidManifest = {
      evidence: [],
      omissions: [{
        omissionId: 'example-unknown-omission',
        claimIds: ['place:example:address:ja'],
        entityId: 'example',
        kind: 'video',
        sourceUrl: 'https://example.com/source',
        recordedAt: '2026-08-27',
        reason: 'Unsupported evidence kind.',
      }],
    } as unknown as DataVerificationEvidenceManifest;

    expect(() =>
      validateDataVerificationEvidenceManifest(invalidManifest, claims, validationOptions),
    ).toThrow('unsupported kind');
  });
});
