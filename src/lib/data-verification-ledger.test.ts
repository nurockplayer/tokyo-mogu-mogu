import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { DataVerificationEvidence } from '../data/data-verification-evidence-manifest';
import { PLACES } from '../data/seed-places';
import {
  buildLedgerClaims,
  buildRepositoryLedgerClaims,
  renderDataVerificationLedger,
  type LedgerClaimInput,
} from './data-verification-ledger';
import { generateRepositoryDataVerificationLedger } from './data-verification-ledger-generator';

const sourceMetadata = {
  name: 'Example official source',
  url: 'https://example.com/source',
  license: 'CC BY 4.0',
  retrievedAt: '2026-08-20',
  sourceUpdatedAt: '2026-08-19',
};

function claim(overrides: Partial<LedgerClaimInput> = {}): LedgerClaimInput {
  return {
    claimId: 'place:example:name',
    entityType: 'Place',
    entityId: 'example',
    entityName: 'Example Place',
    fieldId: 'name',
    fieldLabel: 'Name',
    comparisonExpected: true,
    canonical: {
      value: 'Canonical name',
      origin: 'source',
      verification: 'needs_confirmation',
      source: sourceMetadata,
      sourceFile: 'src/data/example.ts',
    },
    presentation: {
      value: 'Displayed name',
      surface: 'Spot',
      sourceFile: 'src/features/example.ts',
    },
    timeSensitive: false,
    issues: ['#333'],
    note: 'Example note.',
    ...overrides,
  };
}

describe('data verification ledger claim builder (#333)', () => {
  it('keeps verification, source dates, confirmation, and mismatch findings separate', () => {
    const [row] = buildLedgerClaims([claim()]);

    expect(row.claimId).toBe('place:example:name');
    expect(row.verification).toBe('needs_confirmation');
    expect(row.finding).toBe('mismatch');
    expect(row.origin).toBe('source');
    expect(row.primarySourceLicense).toBe('CC BY 4.0');
    expect(row.retrievedAt).toBe('2026-08-20');
    expect(row.sourceUpdatedAt).toBe('2026-08-19');
    expect(row.confirmedAt).toBeUndefined();
  });

  it('represents an absent required fact as report-only unknown without fabricating data', () => {
    const [row] = buildLedgerClaims([
      claim({
        claimId: 'spot:example:parking',
        fieldId: 'parking',
        fieldLabel: 'Parking',
        comparisonExpected: false,
        canonical: undefined,
        presentation: undefined,
        requiredUnknown: {
          origin: 'source',
          surface: 'Spot',
          auditSourceFile: 'src/data/example.ts',
          note: 'No repository-owned source-backed value exists.',
        },
      }),
    ]);

    expect(row.verification).toBe('unknown');
    expect(row.finding).toBe('none');
    expect(row.canonicalValue).toBeUndefined();
    expect(row.displayedValue).toBeUndefined();
  });

  it('reports missing comparison sides without overloading verification status', () => {
    const rows = buildLedgerClaims([
      claim({
        claimId: 'route:display-only:half-day:duration_minutes',
        entityType: 'Route',
        entityId: 'display-only',
        entityName: 'Display-only route',
        fieldId: 'duration_minutes',
        fieldLabel: 'Duration',
        canonical: undefined,
        presentation: {
          value: '150',
          origin: 'demo',
          verification: 'demo',
          surface: 'Route',
          sourceFile: 'src/features/route.ts',
        },
      }),
      claim({
        claimId: 'place:canonical-only:address',
        entityId: 'canonical-only',
        entityName: 'Canonical-only place',
        fieldId: 'address',
        fieldLabel: 'Address',
        presentation: undefined,
      }),
    ]);

    expect(rows[0]).toMatchObject({
      claimId: 'place:canonical-only:address',
      verification: 'needs_confirmation',
      finding: 'presentation_missing',
    });
    expect(rows[1]).toMatchObject({
      claimId: 'route:display-only:half-day:duration_minutes',
      verification: 'demo',
      finding: 'canonical_missing',
    });
  });

  it('never promotes official-web retrieval to verified', () => {
    const [row] = buildLedgerClaims([
      claim({
        canonical: {
          value: 'Canonical name',
          origin: 'source',
          verification: 'needs_confirmation',
          source: {
            ...sourceMetadata,
            sourceType: 'official_web',
          },
          sourceFile: 'src/data/example.ts',
        },
      }),
    ]);

    expect(row.verification).toBe('needs_confirmation');
    expect(row.confirmedAt).toBeUndefined();
  });

  it('renders deterministic bytes from stable claim IDs rather than input order', () => {
    const inputs = [
      claim({ claimId: 'place:z:name', entityId: 'z', entityName: 'Zed' }),
      claim({ claimId: 'place:a:name', entityId: 'a', entityName: 'Alpha' }),
    ];
    const forward = renderDataVerificationLedger(buildLedgerClaims(inputs));
    const reverse = renderDataVerificationLedger(buildLedgerClaims([...inputs].reverse()));

    expect(reverse).toBe(forward);
    expect(forward.indexOf('`place:a:name`')).toBeLessThan(forward.indexOf('`place:z:name`'));
    expect(forward).not.toMatch(/Generated at|生成日時|2026-08-27/);
  });

  it('renders compact many-to-many evidence links and leaves missing evidence absent', () => {
    const claims = buildLedgerClaims([
      claim({ claimId: 'place:example:address:ja', fieldId: 'address:ja' }),
      claim({ claimId: 'place:example:phone:ja', fieldId: 'phone:ja' }),
      claim({ claimId: 'place:example:hours:ja', fieldId: 'hours:ja' }),
    ]);
    const evidence: readonly DataVerificationEvidence[] = [
      {
        evidenceId: 'example-app-ja-375',
        claimIds: ['place:example:address:ja', 'place:example:phone:ja'],
        entityId: 'example',
        kind: 'app',
        capturedAt: '2026-08-27',
        path: 'docs/data-evidence/example/app-ja-375.webp',
        locale: 'ja',
        viewport: { width: 375, height: 812 },
      },
      {
        evidenceId: 'example-official-source',
        claimIds: ['place:example:address:ja'],
        entityId: 'example',
        kind: 'source',
        capturedAt: '2026-08-27',
        path: 'docs/data-evidence/example/2026-08-27-official.webp',
        sourceUrl: 'https://example.com/source',
      },
    ];

    const rendered = renderDataVerificationLedger(claims, evidence);
    const addressRow = rendered.split('\n').find((line) =>
      line.startsWith('| `place:example:address:ja` | Place /'),
    );
    const phoneRow = rendered.split('\n').find((line) =>
      line.startsWith('| `place:example:phone:ja` | Place /'),
    );
    const hoursRow = rendered.split('\n').find((line) =>
      line.startsWith('| `place:example:hours:ja` | Place /'),
    );

    expect(addressRow).toContain('[app · ja · 375px](data-evidence/example/app-ja-375.webp)');
    expect(addressRow).toContain('[source](data-evidence/example/2026-08-27-official.webp)');
    expect(phoneRow).toContain('[app · ja · 375px](data-evidence/example/app-ja-375.webp)');
    expect(phoneRow).not.toContain('[source]');
    expect(hoursRow).toContain('| — | Example note. |');
  });
});

describe('repository data verification ledger (#333)', () => {
  it('serializes available parking honestly when the optional space count is absent', () => {
    const place = PLACES.find((candidate) => candidate.id === 'yamashiroya');
    const visitor = place?.visitorInformation;
    if (!visitor?.parking) throw new Error('Missing Yamashiroya parking fixture.');

    const originalParking = visitor.parking;
    try {
      visitor.parking = { available: true };

      expect(
        buildRepositoryLedgerClaims().find(
          (claim) => claim.claimId === 'place:yamashiroya:parking:ja',
        ),
      ).toMatchObject({
        canonicalValue: 'あり / 大型車情報なし',
        origin: 'source',
        verification: 'needs_confirmation',
      });
    } finally {
      visitor.parking = originalParking;
    }
  });

  it('consumes #334 evidence links and omissions without changing factual authority', () => {
    const rendered = generateRepositoryDataVerificationLedger();
    const addressRow = rendered.split('\n').find((line) =>
      line.startsWith('| `place:okutama-tourism-office:address:ja` | Place /'),
    );
    const missingEvidenceRow = rendered.split('\n').find((line) =>
      line.startsWith('| `place:akabeko:name:ja` | Place /'),
    );

    expect(addressRow).toContain(
      '[app · ja · 375px](data-evidence/okutama-tourism-office/app-ja-375.webp)',
    );
    expect(addressRow).toContain('| `source` | `needs_confirmation` | `match` |');
    expect(missingEvidenceRow).toContain('| — |');
    expect(rendered).toContain('`okutama-tourism-office-source-rights-restricted`');
    expect(rendered).toContain('[source](https://www.okutama.gr.jp/site/)');
  });

  it('keeps the extracted presentation authority browser-safe and generator-neutral', () => {
    const source = readFileSync(
      new URL('../features/netlify-parity/factual-presentation.ts', import.meta.url),
      'utf8',
    );

    expect(source).not.toMatch(/from ['"]react|node:fs|node:path|process\.|data-verification-ledger/);
    expect(source).toContain("import type { Locale }");
    expect(source).toContain("spotId: 'okutama-tourism-office'");
  });

  it('keeps the merged #332 tourism-office facts and provenance honest', () => {
    const claims = buildRepositoryLedgerClaims();
    const heading = claims.find((row) => row.claimId === 'place:okutama-tourism-office:name:ja');
    const informationName = claims.find(
      (row) => row.claimId === 'place:okutama-tourism-office:information_name:ja',
    );
    const address = claims.find((row) => row.claimId === 'place:okutama-tourism-office:address:ja');
    const phone = claims.find((row) => row.claimId === 'place:okutama-tourism-office:phone:ja');

    expect(heading).toMatchObject({
      canonicalValue: '奥多摩観光案内所',
      displayedValue: '奥多摩観光案内所',
      verification: 'needs_confirmation',
      finding: 'match',
      origin: 'source',
      retrievedAt: '2026-08-26',
    });
    expect(informationName).toMatchObject({
      canonicalValue: '奥多摩観光案内所',
      displayedValue: '奥多摩町観光案内所',
      verification: 'needs_confirmation',
      finding: 'mismatch',
      origin: 'source',
      retrievedAt: '2026-08-26',
    });
    expect(informationName?.primarySource).toContain('一般社団法人奥多摩観光協会');
    expect(informationName?.primarySourceUrl).toBe('https://www.okutama.gr.jp/site/');
    expect(informationName?.confirmedAt).toBeUndefined();

    expect(address).toMatchObject({
      canonicalValue: '東京都西多摩郡奥多摩町氷川210',
      displayedValue: '東京都西多摩郡奥多摩町氷川210',
      verification: 'needs_confirmation',
      finding: 'match',
      retrievedAt: '2026-08-26',
    });
    expect(address?.confirmedAt).toBeUndefined();

    expect(phone).toMatchObject({
      canonicalValue: '0428-83-2152',
      displayedValue: '0428-83-2152',
      verification: 'needs_confirmation',
      finding: 'match',
      retrievedAt: '2026-08-26',
      canonicalSourceFile: 'scripts/ingest-okutama/snapshots/okutama-tourism-directory.json',
    });
    expect(phone?.confirmedAt).toBeUndefined();
  });

  it('traces Yamashiroya Spot, Route, and Story claims to the canonical Place (#323)', () => {
    const claims = buildRepositoryLedgerClaims();
    const expectedSource = '奥多摩わさび本舗 山城屋（公式店舗案内）';

    for (const [claimId, canonicalValue, displayedValue] of [
      ['place:yamashiroya:name:ja', '奥多摩わさび本舗 山城屋', '奥多摩わさび本舗 山城屋'],
      ['place:yamashiroya:address:ja', '東京都西多摩郡奥多摩町氷川717-3', '東京都西多摩郡奥多摩町氷川717-3'],
      ['place:yamashiroya:phone:ja', '0428-83-2368', '0428-83-2368'],
      ['place:yamashiroya:hours:ja', '09:00–17:00', '9:00〜17:00'],
      ['place:yamashiroya:access:ja', 'JR「奥多摩駅」 / 徒歩3分', 'JR「奥多摩駅」より徒歩3分'],
      ['place:yamashiroya:parking:ja', '12台 / 大型車可', 'あり（12台・大型車可）'],
      ['place:yamashiroya:official_current_url:ja', 'https://www.yamasiroya.co.jp/shop.html', 'https://www.yamasiroya.co.jp/shop.html'],
    ] as const) {
      expect(claims.find((claim) => claim.claimId === claimId)).toMatchObject({
        canonicalValue,
        displayedValue,
        origin: 'source',
        verification: 'needs_confirmation',
        primarySource: expectedSource,
        primarySourceUrl: 'https://www.yamasiroya.co.jp/shop.html',
        retrievedAt: '2026-08-28',
        confirmedAt: undefined,
        canonicalSourceFile: 'src/data/seed-places.ts',
        presentationSourceFile: 'src/features/netlify-parity/factual-presentation.ts',
      });
    }

    expect(
      claims.find((claim) => claim.claimId === 'place:yamashiroya:coordinates'),
    ).toMatchObject({
      canonicalValue: '35.80679970833439, 139.0969139801638 (approximate)',
      origin: 'source',
      verification: 'needs_confirmation',
      primarySource: 'Google Maps（山城屋公式店舗案内の埋め込み地図）',
      primarySourceUrl: 'https://www.google.com/maps/search/?api=1&query=35.80679970833439%2C139.0969139801638',
      primarySourceLicense: expect.stringContaining('not open data'),
      retrievedAt: '2026-08-28',
    });

    expect(
      claims.find((claim) => claim.claimId === 'route:okutama-wasabi-journey:full-day:step:yamashiroya:factual:product-availability'),
    ).toMatchObject({
      canonicalValue: 'pickled-wasabi, fresh-wasabi',
      displayedValue: 'わさび漬・生わさび',
      origin: 'source',
      verification: 'needs_confirmation',
      primarySource: expectedSource,
    });
    expect(
      claims.find((claim) => claim.claimId === 'story:wasabi-okutama:story.spot.yamashiroya.product-availability'),
    ).toMatchObject({
      canonicalValue: 'pickled-wasabi, fresh-wasabi',
      displayedValue: '奥多摩わさび本舗 山城屋の直売店。わさび漬・生わさびを扱う',
      origin: 'source',
      verification: 'needs_confirmation',
      primarySource: expectedSource,
    });
    expect(
      claims.some((claim) => claim.claimId === 'story:wasabi-okutama:story.spot.yamashiroya.business-age'),
    ).toBe(false);
    expect(
      claims.some((claim) => claim.claimId === 'story:wasabi-okutama:story.spot.yamashiroya.proprietor-generation'),
    ).toBe(false);
  });

  it('keeps the Jan 4 / Jan 5 Yamashiroya closure discrepancy as a conflict (#323)', () => {
    const claims = buildRepositoryLedgerClaims();
    const conflict = claims.find(
      (claim) => claim.claimId === 'place:yamashiroya:closed_days:ja',
    );

    expect(conflict).toMatchObject({
      canonicalValue: '12月30日～1月4日 | 12月30日～1月5日',
      displayedValue: '年末年始（公式情報の「12月30日～1月4日」／「12月30日～1月5日」が不一致。最新情報を確認）',
      origin: 'source',
      verification: 'conflict',
      finding: 'mismatch',
      retrievedAt: '2026-08-28',
      confirmedAt: undefined,
      timeSensitive: true,
    });
    expect(
      claims.find((claim) => claim.claimId === 'place:yamashiroya:closed_days:source:shop'),
    ).toMatchObject({
      canonicalValue: '12月30日～1月4日',
      verification: 'needs_confirmation',
      primarySourceUrl: 'https://www.yamasiroya.co.jp/shop.html',
    });
    expect(
      claims.find((claim) => claim.claimId === 'place:yamashiroya:closed_days:source:homepage-footer'),
    ).toMatchObject({
      canonicalValue: '12月30日～1月5日',
      verification: 'needs_confirmation',
      primarySourceUrl: 'https://www.yamasiroya.co.jp/',
    });
  });

  it('traces Okutama no Daidokoro Spot, Route, and Story claims to canonical sources (#325)', () => {
    const claims = buildRepositoryLedgerClaims();
    const homeSource = '奥多摩の台所（公式サイト）';
    const menuSource = '奥多摩の台所（公式メニュー）';

    for (const [claimId, canonicalValue, displayedValue] of [
      ['place:okutama-kitchen:name:ja', '手作りお弁当・お惣菜の専門店 奥多摩の台所', '手作りお弁当・お惣菜の専門店 奥多摩の台所'],
      ['place:okutama-kitchen:address:ja', '〒198-0212 東京都西多摩郡奥多摩町氷川199-7', '〒198-0212 東京都西多摩郡奥多摩町氷川199-7'],
      ['place:okutama-kitchen:phone:ja', '0428-83-2401', '0428-83-2401'],
      ['spot:okutama-kitchen:hours', '09:00–18:00 / L.O. 16:00', '9:00〜18:00（L.O. 16:00）'],
      ['spot:okutama-kitchen:access', 'JR青梅線「奥多摩駅」 / 徒歩1分', 'JR青梅線「奥多摩駅」より徒歩1分'],
      ['spot:okutama-kitchen:closed_days', 'thursday', '木曜日'],
      ['spot:okutama-kitchen:parking', 'なし / 近隣有料駐車場あり', '駐車場なし（近隣コインパーキングあり）'],
      ['spot:okutama-kitchen:official_current_url', 'https://www.okutamanodaidokoro.com/', 'https://www.okutamanodaidokoro.com/'],
    ] as const) {
      expect(claims.find((claim) => claim.claimId === claimId)).toMatchObject({
        canonicalValue,
        displayedValue,
        origin: 'source',
        verification: 'needs_confirmation',
        primarySource: homeSource,
        primarySourceUrl: 'https://www.okutamanodaidokoro.com/',
        retrievedAt: '2026-08-28',
        confirmedAt: undefined,
        canonicalSourceFile: 'src/data/seed-places.ts',
        presentationSourceFile: 'src/features/netlify-parity/factual-presentation.ts',
      });
    }

    expect(
      claims.find((claim) => claim.claimId === 'spot:okutama-kitchen:price_availability'),
    ).toMatchObject({
      canonicalValue: 'special-soft-gelato / 500 JPY / flavors: caramelized-caramel, vanilla-milk, strawberry-milk, black-sesame, kyoto-matcha, wasabi',
      displayedValue: expect.stringContaining('特選ソフトジェラート'),
      origin: 'source',
      verification: 'needs_confirmation',
      primarySource: menuSource,
      primarySourceUrl: 'https://www.okutamanodaidokoro.com/menu.html',
      primarySourceLicense: expect.stringContaining('All Rights Reserved'),
      retrievedAt: '2026-08-28',
      confirmedAt: undefined,
    });
    expect(
      claims.find((claim) => claim.claimId === 'place:okutama-kitchen:coordinates'),
    ).toMatchObject({
      canonicalValue: '35.8085659, 139.0971665 (approximate)',
      origin: 'source',
      verification: 'needs_confirmation',
      primarySource: 'Google Maps（奥多摩の台所公式サイトの地図リンク）',
      primarySourceLicense: expect.stringContaining('not field-verified'),
    });

    for (const [claimId, displayedFragment] of [
      ['route:okutama-wasabi-journey:half-day:step:okutama-kitchen:factual:product-availability', '特選ソフトジェラート'],
      ['story:wasabi-okutama:story.spot.okutama-kitchen.product-availability', 'わさび味'],
    ] as const) {
      expect(claims.find((claim) => claim.claimId === claimId)).toMatchObject({
        canonicalValue: expect.stringContaining('special-soft-gelato'),
        displayedValue: expect.stringContaining(displayedFragment),
        origin: 'source',
        verification: 'needs_confirmation',
        primarySource: menuSource,
        primarySourceUrl: 'https://www.okutamanodaidokoro.com/menu.html',
        canonicalSourceFile: 'src/data/seed-places.ts',
        timeSensitive: true,
      });
    }

    expect(
      claims.find(
        (claim) => claim.claimId === 'route:okutama-wasabi-journey:half-day:step:okutama-kitchen:transport_guidance:ja',
      ),
    ).toMatchObject({
      canonicalValue: undefined,
      displayedValue: '徒歩 約 5 分',
      origin: 'demo',
      verification: 'demo',
    });

    for (const supported of [
      'access',
      'hours',
      'closed_days',
      'parking',
      'price_availability',
      'official_current_url',
    ]) {
      expect(
        claims.find((claim) => claim.claimId === `spot:okutama-kitchen:${supported}`),
      ).toMatchObject({ origin: 'source', verification: 'needs_confirmation' });
    }
    for (const unsupported of [
      'reservation',
      'booking_destination',
      'multilingual_support',
      'dietary_allergy',
      'accessibility',
    ]) {
      expect(
        claims.find((claim) => claim.claimId === `spot:okutama-kitchen:${unsupported}`),
      ).toMatchObject({ verification: 'unknown', canonicalValue: undefined, displayedValue: undefined });
    }
  });

  it('inventories factual presentation records in every visible locale', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-wasabi-journey:presentation:result_origin_travel_time:en',
      ),
    ).toMatchObject({
      displayedValue: 'Tokyo Station / About 120 min by train',
      comparedPresentationClaimId:
        'route:okutama-wasabi-journey:half-day:origin_travel_time_guidance:en',
      comparedPresentationValue: 'Tokyo Station / 60 min',
      verification: 'demo',
      finding: 'presentation_mismatch',
    });
    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-wasabi-journey:half-day:step:wasabi-kitchen:note:zh-TW',
      ),
    ).toMatchObject({
      displayedValue: '平日建議前往 AKABEKO',
      verification: 'demo',
      finding: 'canonical_missing',
    });
    expect(
      claims.find(
        (row) => row.claimId === 'spot:okutama-tourism-office:presentation:lead:en',
      ),
    ).toMatchObject({
      displayedValue: 'A stop for checking visitor information',
      verification: 'demo',
    });
    expect(
      claims.find(
        (row) => row.claimId === 'place:okutama-tourism-office:name:en',
      ),
    ).toMatchObject({
      displayedValue: 'Okutama Tourist Information Center',
      verification: 'needs_confirmation',
      finding: 'none',
    });
    expect(
      claims.find(
        (row) => row.claimId === 'place:okutama-tourism-office:information_name:en',
      ),
    ).toMatchObject({
      displayedValue: 'Okutama Town Tourist Information Center',
      verification: 'needs_confirmation',
      finding: 'none',
    });
  });

  it('inventories localized Story-card badges with stable group and reference IDs', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'story:wasabi-okutama:presentation:spot_group:nearby:reference:yamashiroya:badge:en',
      ),
    ).toMatchObject({
      displayedValue: 'Shop',
      verification: 'demo',
      finding: 'none',
      timeSensitive: false,
      appSurface: 'Story',
    });
  });

  it('inventories localized Route region guidance from structured presentation data', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-yamame-journey:half-day:region_guidance:zh-TW',
      ),
    ).toMatchObject({
      canonicalValue: undefined,
      displayedValue: '東京都奧多摩（東京西部）',
      verification: 'demo',
      finding: 'canonical_missing',
      timeSensitive: false,
      appSurface: 'Route',
    });
  });

  it('preserves the visible tourism-office pending-confirmation note', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'spot:okutama-tourism-office:presentation:verification_note:ja',
      ),
    ).toMatchObject({
      displayedValue: '施設名・所在地・電話番号を含む掲載内容は現在確認中です。訪問前に奥多摩観光協会の公式情報をご確認ください。',
      verification: 'needs_confirmation',
      finding: 'none',
      timeSensitive: true,
      appSurface: 'Spot',
    });
  });

  it('preserves every structured tourism-office verification caveat', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'spot:okutama-tourism-office:presentation:information:verification_note:label:en',
      ),
    ).toMatchObject({
      displayedValue: 'Verification status',
      verification: 'needs_confirmation',
      finding: 'none',
      timeSensitive: true,
    });
    expect(
      claims.find(
        (row) => row.claimId === 'spot:okutama-tourism-office:presentation:tag:confirmation-pending:en',
      ),
    ).toMatchObject({
      displayedValue: 'Confirmation pending',
      verification: 'needs_confirmation',
      finding: 'none',
      timeSensitive: true,
    });
    expect(
      claims.find(
        (row) => row.claimId === 'spot:okutama-tourism-office:presentation:guide:body:zh-TW',
      ),
    ).toMatchObject({
      displayedValue: '此刊載內容仍在確認中。造訪前請以奧多摩觀光協會的官方資訊確認最新內容。',
      verification: 'needs_confirmation',
      finding: 'none',
      timeSensitive: true,
    });
  });

  it('preserves fallback Spot verification notices in every locale', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'spot:akabeko:presentation:practical_information:en',
      ),
    ).toMatchObject({
      displayedValue: 'Verification: This listing is reference information and may not be verified. Check the venue’s official information before visiting.',
      verification: 'demo',
      finding: 'none',
      timeSensitive: true,
      appSurface: 'Spot',
    });
    expect(
      claims.find(
        (row) => row.claimId === 'spot:akabeko:presentation:tags:en',
      ),
    ).toMatchObject({
      displayedValue: 'Reference information',
      verification: 'demo',
      finding: 'none',
      timeSensitive: true,
    });
  });

  it('surfaces the approved initial Route comparison findings without correcting them', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-wasabi-journey:half-day:duration_minutes',
      ),
    ).toMatchObject({ canonicalValue: '200', displayedValue: '150', finding: 'mismatch' });
    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-wasabi-journey:half-day:stop_count',
      ),
    ).toMatchObject({ canonicalValue: '4', displayedValue: '7', finding: 'mismatch' });
    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-yamame-journey:half-day:route_identity',
      ),
    ).toMatchObject({
      canonicalValue: undefined,
      displayedValue: 'okutama-yamame-journey',
      verification: 'demo',
      finding: 'canonical_missing',
    });
  });

  it('inventories Result facts and reports cross-surface presentation drift without parsing copy', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-wasabi-journey:presentation:result_origin_travel_time:ja',
      ),
    ).toMatchObject({
      displayedValue: '東京駅 / から電車で　約120分',
      comparedPresentationClaimId:
        'route:okutama-wasabi-journey:half-day:origin_travel_time_guidance:ja',
      comparedPresentationValue: '東京駅 / 60 分',
      verification: 'demo',
      finding: 'presentation_mismatch',
    });
  });

  it('inventories localized Home journey-card facts and queues their source mappings', () => {
    const claims = buildRepositoryLedgerClaims();
    const homeClaims = claims.filter(
      (row) => row.appSurface === 'Home' && row.fieldId.startsWith('presentation:home_card_'),
    );

    expect(homeClaims).toHaveLength(12);
    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-wasabi-journey:presentation:home_card_description:en',
      ),
    ).toMatchObject({
      displayedValue: 'Okutama · Half day / Wasabi Shokudo, Hikawa Valley, and more',
      verification: 'demo',
      finding: 'none',
      timeSensitive: true,
    });
    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-wasabi-journey:home.factual.duration',
      ),
    ).toMatchObject({
      canonicalValue: undefined,
      displayedValue: undefined,
      verification: 'unknown',
      finding: 'none',
      timeSensitive: true,
      appSurface: 'Home',
      auditSourceFile: 'src/data/data-verification-audit-manifest.ts',
    });
  });

  it('keeps visible Route notes as stable time-sensitive presentation claims', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-wasabi-journey:half-day:step:wasabi-kitchen:note:ja',
      ),
    ).toMatchObject({
      canonicalValue: undefined,
      displayedValue: '※平日はあかべこ推奨',
      verification: 'demo',
      finding: 'canonical_missing',
      timeSensitive: true,
      appSurface: 'Route',
    });
  });

  it('inventories visible Route summary labels separately from structural counts', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-yamame-journey:half-day:summary_time:ja',
      ),
    ).toMatchObject({
      displayedValue: '約 4 時間',
      verification: 'demo',
      finding: 'none',
      timeSensitive: true,
    });
    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-yamame-journey:half-day:summary_stop_count:ja',
      ),
    ).toMatchObject({
      displayedValue: '3 スポット',
      verification: 'demo',
      finding: 'none',
      timeSensitive: false,
    });
    expect(
      claims.find(
        (row) => row.claimId === 'route:okutama-yamame-journey:half-day:stop_count',
      ),
    ).toMatchObject({ displayedValue: '4', finding: 'canonical_missing' });
  });

  it('queues operational facts embedded in structured Route guidance without parsing prose', () => {
    const claims = buildRepositoryLedgerClaims();
    const guidance = claims.find(
      (row) => row.claimId === 'route:okutama-wasabi-journey:half-day:step:wasabi-kitchen:guidance:ja',
    );
    const minimumPrice = claims.find(
      (row) => row.claimId === 'route:okutama-wasabi-journey:half-day:step:wasabi-kitchen:factual:minimum-price',
    );

    expect(guidance?.timeSensitive).toBe(true);
    expect(minimumPrice).toMatchObject({
      canonicalValue: undefined,
      displayedValue: undefined,
      verification: 'unknown',
      finding: 'none',
      timeSensitive: true,
      auditSourceFile: 'src/data/data-verification-audit-manifest.ts',
    });
  });

  it('queues Story spot-card assertions as stable metadata-only unknowns', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'story:wasabi-okutama:story.spot.akabeko.menu-availability',
      ),
    ).toMatchObject({
      canonicalValue: undefined,
      displayedValue: undefined,
      verification: 'unknown',
      finding: 'none',
      timeSensitive: true,
      auditSourceFile: 'src/data/data-verification-audit-manifest.ts',
    });
  });

  it('keeps embedded Story facts as stable report-only unknowns', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'story:wasabi-okutama:story.factual.optimal-eating-window',
      ),
    ).toMatchObject({
      canonicalValue: undefined,
      displayedValue: undefined,
      verification: 'unknown',
      finding: 'none',
      auditSourceFile: 'src/data/data-verification-audit-manifest.ts',
    });
  });

  it('queues Story nearest-station guidance as a stable time-sensitive unknown', () => {
    const claims = buildRepositoryLedgerClaims();

    expect(
      claims.find(
        (row) => row.claimId === 'story:wasabi-okutama:presentation:story_location:en',
      ),
    ).toMatchObject({
      displayedValue: 'Okutama, Tokyo (Western Tokyo) / Nearest stations: Okutama and Mitake',
      verification: 'demo',
      finding: 'none',
      timeSensitive: true,
    });
    expect(
      claims.find(
        (row) => row.claimId === 'story:wasabi-okutama:story.factual.nearest-stations',
      ),
    ).toMatchObject({
      canonicalValue: undefined,
      displayedValue: undefined,
      verification: 'unknown',
      finding: 'none',
      timeSensitive: true,
      auditSourceFile: 'src/data/data-verification-audit-manifest.ts',
    });
  });

  it('does not infer claim-level provenance from multi-source array order', () => {
    const claims = buildRepositoryLedgerClaims();
    const claim = claims.find(
      (row) => row.claimId === 'food-culture:wasabi-okutama:description',
    );

    expect(claim?.primarySource).toBeUndefined();
    expect(claim?.retrievedAt).toBeUndefined();
    expect(
      claims.filter((row) => row.claimId.startsWith('food-culture:wasabi-okutama:source:')),
    ).not.toHaveLength(0);
  });

  it('keeps the committed ledger byte-for-byte current', () => {
    const committed = readFileSync(
      new URL('../../docs/data-verification-ledger.md', import.meta.url),
      'utf8',
    );

    expect(committed).toBe(generateRepositoryDataVerificationLedger());
  });
});
