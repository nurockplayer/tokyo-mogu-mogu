import { describe, expect, it } from 'vitest';
import type {
  DataVerificationEvidenceManifest,
  DataVerificationEvidence,
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
      claimIds: ['route:ome-sawai-sake-journey:name:ja'],
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
