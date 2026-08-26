import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  buildLedgerClaims,
  buildRepositoryLedgerClaims,
  generateRepositoryDataVerificationLedger,
  renderDataVerificationLedger,
  type LedgerClaimInput,
} from './data-verification-ledger';

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
});

describe('repository data verification ledger (#333)', () => {
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
    const name = claims.find((row) => row.claimId === 'place:okutama-tourism-office:name:ja');
    const address = claims.find((row) => row.claimId === 'place:okutama-tourism-office:address:ja');
    const phone = claims.find((row) => row.claimId === 'place:okutama-tourism-office:phone:ja');

    expect(name).toMatchObject({
      canonicalValue: '奥多摩観光案内所',
      displayedValue: '奥多摩町観光案内所',
      verification: 'needs_confirmation',
      finding: 'mismatch',
      origin: 'source',
      retrievedAt: '2026-08-26',
    });
    expect(name?.primarySource).toContain('一般社団法人奥多摩観光協会');
    expect(name?.primarySourceUrl).toBe('https://www.okutama.gr.jp/site/');
    expect(name?.confirmedAt).toBeUndefined();

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
        (row) => row.claimId === 'story:wasabi-okutama:story.spot.yamashiroya.business-age',
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
