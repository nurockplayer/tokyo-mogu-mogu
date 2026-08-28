import { describe, expect, it } from 'vitest';
import { DATA_VERIFICATION_EVIDENCE_MANIFEST } from '../data/data-verification-evidence-manifest';
import type { LedgerClaim } from './data-verification-ledger';
import { buildRepositoryLedgerClaims } from './data-verification-ledger';
import {
  buildHumanDataReviewBoard,
  createDataReviewShareSummaryJa,
} from './human-data-review-board';

function claim(overrides: Partial<LedgerClaim> & Pick<LedgerClaim, 'claimId' | 'fieldId'>): LedgerClaim {
  const { claimId, fieldId, ...rest } = overrides;
  return {
    claimId,
    entityType: 'Place',
    entityId: 'example-place',
    entityName: 'Example Place',
    fieldId,
    fieldLabel: fieldId,
    origin: 'source',
    verification: 'needs_confirmation',
    finding: 'none',
    timeSensitive: false,
    canonicalSourceFile: 'src/data/seed-places.ts',
    issues: ['#327', '#333'],
    ...rest,
  };
}

describe('Human Data Review Board projection (#340)', () => {
  it('groups localized claims into one human entity without hiding report-only unknowns', () => {
    const claims = [
      claim({
        claimId: 'place:example-place:information_name:ja',
        fieldId: 'information_name:ja',
        canonicalValue: 'Example Place',
        displayedValue: '例の場所',
        primarySource: 'Example operator',
        primarySourceUrl: 'https://example.com/place',
        retrievedAt: '2026-08-28',
      }),
      claim({
        claimId: 'place:example-place:information_name:en',
        fieldId: 'information_name:en',
        displayedValue: 'Example Place',
      }),
      claim({
        claimId: 'place:example-place:address:ja',
        fieldId: 'address:ja',
        canonicalValue: '東京都例町1-2-3',
        displayedValue: '東京都例町1-2-3',
        primarySource: 'Example operator',
        primarySourceUrl: 'https://example.com/place',
        retrievedAt: '2026-08-28',
      }),
      claim({
        claimId: 'spot:example-place:reservation',
        entityType: 'Spot',
        fieldId: 'reservation',
        verification: 'unknown',
        origin: 'editorial',
      }),
    ];

    const board = buildHumanDataReviewBoard({
      claims,
      evidenceManifest: { evidence: [], omissions: [] },
    });

    expect(board.entities).toHaveLength(1);
    expect(board.entities[0]).toMatchObject({
      id: 'example-place',
      name: '例の場所',
      headlineStatus: 'needs_confirmation',
      latestRetrievedAt: '2026-08-28',
      unknownCount: 1,
    });
    expect(board.entities[0]?.facts.map((fact) => [fact.label, fact.value])).toEqual([
      ['施設名', '例の場所'],
      ['住所', '東京都例町1-2-3'],
    ]);
    expect(board.entities[0]?.unknowns).toEqual([
      expect.objectContaining({ fieldKey: 'reservation', label: '予約' }),
    ]);
    expect(board.entities[0]?.sources).toEqual([
      expect.objectContaining({
        name: 'Example operator',
        url: 'https://example.com/place',
        retrievedAt: '2026-08-28',
        coordinateProvider: false,
      }),
    ]);
  });

  it('prioritizes conflict and keeps coordinate provenance separate from venue sources', () => {
    const claims = [
      claim({
        claimId: 'place:example-place:name:ja',
        fieldId: 'name:ja',
        displayedValue: '例の場所',
        primarySource: 'Example operator',
        primarySourceUrl: 'https://example.com/place',
        retrievedAt: '2026-08-28',
      }),
      claim({
        claimId: 'place:example-place:closed_days:ja',
        fieldId: 'closed_days:ja',
        displayedValue: '公式情報に不一致あり',
        verification: 'conflict',
        primarySource: 'Example operator',
        primarySourceUrl: 'https://example.com/place',
        retrievedAt: '2026-08-28',
      }),
      claim({
        claimId: 'place:example-place:coordinates',
        fieldId: 'coordinates',
        canonicalValue: '35.0, 139.0 (approximate)',
        primarySource: 'Map provider',
        primarySourceUrl: 'https://maps.example.com/',
        retrievedAt: '2026-08-27',
      }),
    ];

    const board = buildHumanDataReviewBoard({
      claims,
      evidenceManifest: { evidence: [], omissions: [] },
    });

    expect(board.entities[0]?.headlineStatus).toBe('conflict');
    expect(board.statusCounts).toMatchObject({ conflict: 1, needs_confirmation: 2 });
    expect(board.entities[0]?.sources).toEqual([
      expect.objectContaining({ name: 'Example operator', coordinateProvider: false }),
      expect.objectContaining({ name: 'Map provider', coordinateProvider: true }),
    ]);
  });

  it('maps evidence and omissions by stable claim ID without fabricating source screenshots', () => {
    const nameClaim = claim({
      claimId: 'place:example-place:name:ja',
      fieldId: 'name:ja',
      displayedValue: '例の場所',
    });
    const board = buildHumanDataReviewBoard({
      claims: [nameClaim],
      evidenceManifest: {
        evidence: [{
          evidenceId: 'example-app-ja-375',
          claimIds: [nameClaim.claimId],
          entityId: 'example-place',
          kind: 'app',
          capturedAt: '2026-08-28',
          path: 'docs/data-evidence/example-place/app-ja-375.webp',
          locale: 'ja',
          viewport: { width: 375, height: 812 },
        }],
        omissions: [{
          omissionId: 'example-source-rights',
          claimIds: [nameClaim.claimId],
          entityId: 'example-place',
          kind: 'source',
          sourceUrl: 'https://example.com/place',
          recordedAt: '2026-08-28',
          reason: 'Repository reuse is not permitted.',
        }],
      },
    });

    expect(board.entities[0]?.evidence).toEqual([
      expect.objectContaining({
        evidenceId: 'example-app-ja-375',
        path: 'docs/data-evidence/example-place/app-ja-375.webp',
      }),
    ]);
    expect(board.entities[0]?.omissions).toEqual([
      expect.objectContaining({ omissionId: 'example-source-rights' }),
    ]);
    expect(board.entities[0]?.evidence.some((item) => item.kind === 'source')).toBe(false);
  });

  it('adds Route and Story entities when #321 child ownership reaches non-place claims', () => {
    const claims = [
      claim({
        claimId: 'route:example-route:half-day:duration_minutes',
        entityType: 'Route',
        entityId: 'example-route',
        entityName: '例の食旅',
        fieldId: 'duration_minutes',
        displayedValue: '150',
        canonicalValue: '200',
        finding: 'mismatch',
        issues: ['#330', '#333'],
      }),
      claim({
        claimId: 'story:example-story:story.spot.example-place.product-availability',
        entityType: 'Story',
        entityId: 'example-story',
        entityName: '例のストーリー',
        fieldId: 'story.spot.example-place.product-availability',
        displayedValue: '季節商品を掲載',
        canonicalValue: 'seasonal-product',
        issues: ['#327', '#333'],
      }),
    ];

    const board = buildHumanDataReviewBoard({
      claims,
      evidenceManifest: { evidence: [], omissions: [] },
    });

    expect(board.entities.map((entity) => entity.id)).toEqual([
      'example-route',
      'example-story',
    ]);
    expect(board.entities[0]).toMatchObject({
      name: '例の食旅',
      facts: [expect.objectContaining({
        fieldKey: 'route:half-day:duration_minutes',
        label: '半日の所要時間（分）',
        value: '150',
        finding: 'mismatch',
      })],
    });
    expect(board.entities[1]).toMatchObject({
      name: '例のストーリー',
      facts: [expect.objectContaining({
        fieldKey: 'story:example-place:product_availability',
        label: '取扱・提供状況（example-place）',
        value: '季節商品を掲載',
      })],
    });
  });

  it('projects the three reconciled entities and preserves #325 unknowns from repository authority', () => {
    const board = buildHumanDataReviewBoard({
      claims: buildRepositoryLedgerClaims(),
      evidenceManifest: DATA_VERIFICATION_EVIDENCE_MANIFEST,
    });

    expect(board.entities.map((entity) => entity.id)).toEqual(expect.arrayContaining([
      'okutama-kitchen',
      'okutama-tourism-office',
      'yamashiroya',
      'okutama-wasabi-journey',
      'wasabi-okutama',
      'yamame-okutama',
    ]));

    const kitchen = board.entities.find((entity) => entity.id === 'okutama-kitchen');
    expect(kitchen?.facts).toEqual(expect.arrayContaining([
      expect.objectContaining({ fieldKey: 'hours', status: 'needs_confirmation' }),
      expect.objectContaining({ fieldKey: 'price_availability', status: 'needs_confirmation' }),
    ]));
    expect(kitchen?.unknowns.map((field) => field.fieldKey)).toEqual([
      'reservation',
      'booking_destination',
      'multilingual_support',
      'dietary_allergy',
      'accessibility',
    ]);
    expect(kitchen?.sources.map((source) => source.url)).toEqual(expect.arrayContaining([
      'https://www.okutamanodaidokoro.com/',
      'https://www.okutamanodaidokoro.com/menu.html',
    ]));
    expect(kitchen?.sources).toEqual(expect.arrayContaining([
      expect.objectContaining({ coordinateProvider: true }),
    ]));
    expect(kitchen?.evidence.some((item) => item.kind === 'app')).toBe(true);
    expect(kitchen?.omissions.some((item) => item.sourceUrl.includes('google.com/maps'))).toBe(true);

    const first = JSON.stringify(board);
    const second = JSON.stringify(buildHumanDataReviewBoard({
      claims: buildRepositoryLedgerClaims(),
      evidenceManifest: DATA_VERIFICATION_EVIDENCE_MANIFEST,
    }));
    expect(second).toBe(first);
  });

  it('creates a Japanese share summary without promoting needs_confirmation to verified', () => {
    const board = buildHumanDataReviewBoard({
      claims: buildRepositoryLedgerClaims(),
      evidenceManifest: DATA_VERIFICATION_EVIDENCE_MANIFEST,
    });
    const kitchen = board.entities.find((entity) => entity.id === 'okutama-kitchen')!;

    const summary = createDataReviewShareSummaryJa(
      kitchen,
      'https://preview.example/data-review/#okutama-kitchen',
    );

    expect(summary).toContain('🟡 出典あり・要確認');
    expect(summary).toContain('最終確認: 2026-08-28');
    expect(summary).toContain('未確認');
    expect(summary).toContain('https://preview.example/data-review/#okutama-kitchen');
    expect(summary).not.toContain('✅ 確認済み');
  });
});
