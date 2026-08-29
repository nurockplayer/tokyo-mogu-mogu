import { describe, expect, it } from 'vitest';
import { DATA_VERIFICATION_EVIDENCE_MANIFEST } from '../data/data-verification-evidence-manifest';
import { places } from '../data';
import type { MobilePlace } from '../data/model';
import {
  CURRENT_PRODUCT_FACTUAL_INVENTORY,
  type CurrentProductFactualEntity,
} from './current-product-factual-inventory';
import type { LedgerClaim } from './data-verification-ledger';
import { buildRepositoryLedgerClaims } from './data-verification-ledger';
import {
  DATA_REVIEW_STATUS_LABELS_JA,
  buildHumanDataReviewBoard,
  createDataReviewShareSummaryJa,
  dataReviewStatusLabelJa,
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
    issues: ['#333'],
    ...rest,
  };
}

const exampleSpot: readonly CurrentProductFactualEntity[] = [
  { id: 'example-place', type: 'Spot' },
];

const syntheticMobilePlace: MobilePlace = {
  id: 'synthetic-mobile',
  nameJa: '合成モバイル店舗',
  nameEn: 'Synthetic mobile venue',
  locationKind: 'mobile',
  foodCultureIds: [],
  type: 'food-truck',
  source: {
    name: 'Synthetic operator',
    url: 'https://example.com/synthetic-mobile',
    sourceType: 'business',
    retrievedAt: '2026-08-29',
    verificationStatus: 'needs_confirmation',
  },
  mobileVenue: {
    noFixedStorefront: true,
    primaryOperatingAreaJa: '合成エリア',
    primaryOperatingAreaEn: 'Synthetic area',
    primaryOperatingAreaZhTw: '合成區域',
    operatingPattern: 'mainly-weekends',
    scheduleVariability: ['published-schedule', 'weather', 'sell-out'],
    scheduleDirectorySource: {
      name: 'Synthetic schedule directory',
      url: 'https://example.com/synthetic-mobile/schedule',
      sourceType: 'business',
      retrievedAt: '2026-08-29',
      verificationStatus: 'needs_confirmation',
    },
    datedScheduleSource: {
      name: 'Synthetic dated schedule',
      url: 'https://example.com/synthetic-mobile/schedule/2026-08',
      sourceType: 'business',
      retrievedAt: '2026-08-29',
      verificationStatus: 'needs_confirmation',
    },
  },
  origin: 'source',
};

describe('Human Data Review Board projection (#340, #343)', () => {
  it('keeps source retrieval and human confirmation explicit and separate', () => {
    expect(DATA_REVIEW_STATUS_LABELS_JA).toMatchObject({
      verified: '✅ 人による確認済み',
      needs_confirmation: '🟡 人の確認待ち',
      stale: '🟠 情報が古いため再確認',
      unknown: '❓ 根拠未登録・確認が必要',
    });
    expect(dataReviewStatusLabelJa('needs_confirmation', true)).toBe(
      '🟡 出典確認済み・人の確認待ち',
    );
    expect(dataReviewStatusLabelJa('needs_confirmation', false)).toBe(
      '🟡 出典未登録・人の確認待ち',
    );
    expect(dataReviewStatusLabelJa('needs_confirmation')).toBe('🟡 人の確認待ち');

    const board = buildHumanDataReviewBoard({
      claims: [claim({
        claimId: 'place:example-place:information_name:ja',
        fieldId: 'information_name:ja',
        displayedValue: '例の場所',
        verification: 'verified',
        primarySource: 'Example operator',
        primarySourceUrl: 'https://example.com/place',
        retrievedAt: '2026-08-28',
        confirmedAt: '2026-08-29',
      })],
      currentProductEntities: exampleSpot,
      evidenceManifest: { evidence: [], omissions: [] },
    });
    const entity = board.entities[0]!;

    expect(entity).toMatchObject({
      latestRetrievedAt: '2026-08-28',
      latestConfirmedAt: '2026-08-29',
    });
    expect(entity.facts[0]).toMatchObject({
      retrievedAt: '2026-08-28',
      confirmedAt: '2026-08-29',
      sources: [expect.objectContaining({
        retrievedAt: '2026-08-28',
        confirmedAt: '2026-08-29',
      })],
    });
    expect(entity.sources[0]).toMatchObject({
      retrievedAt: '2026-08-28',
      confirmedAt: '2026-08-29',
    });

    const summary = createDataReviewShareSummaryJa(entity, 'https://preview.example/data-review/#example-place');
    expect(summary).toContain('最新出典確認: 2026-08-28');
    expect(summary).toContain('人による確認: 2026-08-29');
    expect(summary).not.toContain('最終確認');
  });

  it('does not call a source-less needs_confirmation fact source-checked', () => {
    const board = buildHumanDataReviewBoard({
      claims: [claim({
        claimId: 'route:example-place:duration_minutes',
        entityType: 'Route',
        fieldId: 'duration_minutes',
        canonicalValue: '200',
        verification: 'needs_confirmation',
      })],
      currentProductEntities: [{ id: 'example-place', type: 'Route' }],
      evidenceManifest: { evidence: [], omissions: [] },
    });
    const fact = board.entities[0]!.facts[0]!;

    expect(fact.sources).toEqual([]);
    expect(fact.sourceChecked).toBe(false);
    expect(board.entities[0]!.reviewContext.uncertainties).toEqual([]);
    expect(board.entities[0]!.reviewContext.decisionItems).toEqual([]);
    expect(dataReviewStatusLabelJa(fact.status, fact.sourceChecked)).toBe(
      '🟡 出典未登録・人の確認待ち',
    );
  });

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
      currentProductEntities: exampleSpot,
      evidenceManifest: { evidence: [], omissions: [] },
    });

    expect(board.entities).toHaveLength(1);
    expect(board.entities[0]).toMatchObject({
      id: 'example-place',
      name: '例の場所',
      headlineStatus: 'needs_confirmation',
      latestRetrievedAt: '2026-08-28',
      needsConfirmationCount: 2,
      unknownCount: 1,
      unresolvedCount: 3,
    });
    expect(board.entities[0]?.facts.map((fact) => [
      fact.label,
      fact.canonicalValue,
      fact.displayedValue,
    ])).toEqual([
      ['施設名', 'Example Place', '例の場所'],
      ['住所', '東京都例町1-2-3', '東京都例町1-2-3'],
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
      currentProductEntities: exampleSpot,
      evidenceManifest: { evidence: [], omissions: [] },
    });

    expect(board.entities[0]?.headlineStatus).toBe('conflict');
    expect(board.statusCounts).toMatchObject({ conflict: 1, needs_confirmation: 2 });
    expect(board.entities[0]?.sources).toEqual([
      expect.objectContaining({ name: 'Example operator', coordinateProvider: false }),
      expect.objectContaining({ name: 'Map provider', coordinateProvider: true }),
    ]);
  });

  it('groups every source-statement side under one parent fact without selecting a winner', () => {
    const claims = [
      claim({
        claimId: 'place:example-place:phone:ja',
        fieldId: 'phone:ja',
        displayedValue: '複数の公式番号があり、利用先は未確認',
        verification: 'conflict',
        primarySource: 'Composite source',
        primarySourceUrl: 'https://example.com/composite',
      }),
      claim({
        claimId: 'place:example-place:phone:source:first-party-a',
        fieldId: 'phone:source:first-party-a',
        canonicalValue: '03-1111-1111',
        primarySource: 'First party A',
        primarySourceUrl: 'https://example.com/a',
        retrievedAt: '2026-08-27',
      }),
      claim({
        claimId: 'place:example-place:phone:source:first-party-b',
        fieldId: 'phone:source:first-party-b',
        canonicalValue: '03-2222-2222',
        primarySource: 'First party B',
        primarySourceUrl: 'https://example.com/b',
        retrievedAt: '2026-08-28',
      }),
    ];

    const board = buildHumanDataReviewBoard({
      claims,
      currentProductEntities: exampleSpot,
      evidenceManifest: { evidence: [], omissions: [] },
    });
    const phone = board.entities[0]?.facts.find((fact) => fact.fieldKey === 'phone');

    expect(board.entities[0]?.facts).toHaveLength(1);
    expect(phone?.claimIds).toEqual([
      'place:example-place:phone:ja',
      'place:example-place:phone:source:first-party-a',
      'place:example-place:phone:source:first-party-b',
    ]);
    expect(phone?.sources).toEqual([
      expect.objectContaining({
        claimId: 'place:example-place:phone:source:first-party-a',
        name: 'First party A',
        url: 'https://example.com/a',
        value: '03-1111-1111',
        relationship: 'source_statement',
        role: 'content',
      }),
      expect.objectContaining({
        claimId: 'place:example-place:phone:source:first-party-b',
        name: 'First party B',
        url: 'https://example.com/b',
        value: '03-2222-2222',
        relationship: 'source_statement',
        role: 'content',
      }),
    ]);
    expect(phone?.sources.some((source) => source.name === 'Composite source')).toBe(false);
    expect(board.entities[0]?.reviewContext.decisionItems).toEqual([
      expect.objectContaining({
        kind: 'conflict',
        label: '電話番号',
        statusLabel: '情報に矛盾あり',
        recommendationLabel: '要判断',
        factFieldKeys: ['phone'],
      }),
    ]);
    expect(phone?.sources.map((source) => source.value)).toEqual([
      '03-1111-1111',
      '03-2222-2222',
    ]);
  });

  it('derives mobile decision context from typed semantics without copying factual values', () => {
    const claims = [
      claim({
        claimId: 'place:synthetic-mobile:venue_model',
        entityId: 'synthetic-mobile',
        entityName: '合成モバイル店舗',
        fieldId: 'venue_model',
        canonicalValue: 'synthetic canonical mobile value',
        displayedValue: '合成された移動営業表示',
        primarySource: 'Synthetic operator',
        primarySourceUrl: 'https://example.com/synthetic-mobile',
      }),
      claim({
        claimId: 'place:synthetic-mobile:schedule_guidance',
        entityId: 'synthetic-mobile',
        entityName: '合成モバイル店舗',
        fieldId: 'schedule_guidance',
        displayedValue: '合成された日程案内',
        timeSensitive: true,
      }),
    ];

    const board = buildHumanDataReviewBoard({
      claims,
      currentProductEntities: [{ id: 'synthetic-mobile', type: 'Spot' }],
      evidenceManifest: { evidence: [], omissions: [] },
      places: [syntheticMobilePlace],
    });
    const context = board.entities[0]?.reviewContext;

    expect(context?.reviewFocus.map((item) => item.id)).toEqual(expect.arrayContaining([
      'mobile-venue-representation',
      'time-sensitive-information',
    ]));
    expect(context?.productImpacts.map((item) => item.id)).toEqual(expect.arrayContaining([
      'no-fixed-location-behavior',
      'current-information-caveat',
    ]));
    expect(context?.affectedSurfaces).toEqual(['Spot']);
    expect(context?.decisionItems.filter((item) => item.kind === 'mobile_behavior')).toEqual([
      expect.objectContaining({
        id: 'mobile:no-fixed-storefront',
        label: '営業形態',
        statusLabel: '固定地点として扱わない',
        recommendationLabel: '表示制約',
        factFieldKeys: ['venue_model'],
        affectedSurfaces: ['Spot'],
      }),
    ]);

    const serializedContext = JSON.stringify(context);
    for (const factualValue of [
      syntheticMobilePlace.id,
      syntheticMobilePlace.nameJa,
      syntheticMobilePlace.mobileVenue.primaryOperatingAreaJa,
      syntheticMobilePlace.source.url!,
      'synthetic canonical mobile value',
      '合成された移動営業表示',
      '合成された日程案内',
    ]) {
      expect(serializedContext).not.toContain(factualValue);
    }
  });

  it('keeps verification-only facts and ordinary unknowns out of the decision queue', () => {
    const board = buildHumanDataReviewBoard({
      claims: [
        claim({
          claimId: 'place:example-place:address:ja',
          fieldId: 'address:ja',
          canonicalValue: '東京都例町1-2-3',
          displayedValue: '東京都例町1-2-3',
          finding: 'match',
          primarySource: 'Example operator',
          primarySourceUrl: 'https://example.com/place',
          retrievedAt: '2026-08-29',
        }),
        claim({
          claimId: 'spot:example-place:hours',
          entityType: 'Spot',
          fieldId: 'hours',
          verification: 'unknown',
        }),
      ],
      currentProductEntities: exampleSpot,
      evidenceManifest: { evidence: [], omissions: [] },
    });
    const entity = board.entities[0]!;

    expect(entity.decisionCount).toBe(0);
    expect(entity.reviewContext.decisionItems).toEqual([]);
    expect(entity.facts).toEqual([
      expect.objectContaining({
        fieldKey: 'address',
        status: 'needs_confirmation',
        finding: 'match',
      }),
    ]);
    expect(entity.unknowns).toEqual([
      expect.objectContaining({ fieldKey: 'hours' }),
    ]);
  });

  it('projects one concrete presentation mismatch with both factual sides and source evidence', () => {
    const board = buildHumanDataReviewBoard({
      claims: [
        claim({
          claimId: 'place:example-place:information_name:ja',
          fieldId: 'information_name:ja',
          canonicalValue: '公式の施設名',
          displayedValue: '現在の施設名',
          finding: 'mismatch',
          appSurface: 'Spot',
          primarySource: 'Example operator',
          primarySourceUrl: 'https://example.com/place',
          retrievedAt: '2026-08-29',
        }),
        claim({
          claimId: 'spot:example-place:official_current_url',
          entityType: 'Spot',
          fieldId: 'official_current_url',
          canonicalValue: 'https://example.com/place',
          finding: 'presentation_missing',
          primarySource: 'Example operator',
          primarySourceUrl: 'https://example.com/place',
          retrievedAt: '2026-08-29',
        }),
      ],
      currentProductEntities: exampleSpot,
      evidenceManifest: { evidence: [], omissions: [] },
    });
    const entity = board.entities[0]!;
    const decision = entity.reviewContext.decisionItems[0];
    const fact = entity.facts.find((item) => item.fieldKey === decision?.factFieldKeys[0]);

    expect(entity.decisionCount).toBe(1);
    expect(decision).toMatchObject({
      kind: 'comparison',
      label: '施設名',
      statusLabel: '表示差異あり',
      recommendationLabel: '変更推奨',
      factFieldKeys: ['name'],
      affectedSurfaces: ['Spot'],
    });
    expect(fact).toMatchObject({
      canonicalValue: '公式の施設名',
      displayedValue: '現在の施設名',
      sources: [expect.objectContaining({
        name: 'Example operator',
        url: 'https://example.com/place',
        retrievedAt: '2026-08-29',
      })],
    });
  });

  it('keeps a time-sensitive mismatch comparison alongside one grouped Product caveat', () => {
    const board = buildHumanDataReviewBoard({
      claims: [
        claim({
          claimId: 'place:example-place:hours:ja',
          fieldId: 'hours:ja',
          canonicalValue: '10:00〜17:00',
          displayedValue: '10時〜17時',
          finding: 'mismatch',
          timeSensitive: true,
          appSurface: 'Spot',
          primarySource: 'Example operator',
          primarySourceUrl: 'https://example.com/place',
        }),
        claim({
          claimId: 'place:example-place:closed_days:ja',
          fieldId: 'closed_days:ja',
          canonicalValue: '不定休',
          displayedValue: '不定休',
          finding: 'match',
          timeSensitive: true,
          appSurface: 'Spot',
        }),
      ],
      currentProductEntities: exampleSpot,
      evidenceManifest: { evidence: [], omissions: [] },
    });

    expect(board.entities[0]?.reviewContext.decisionItems).toEqual([
      expect.objectContaining({
        id: 'current-information:caveat',
        kind: 'current_information',
        statusLabel: '最新情報の案内が必要',
        recommendationLabel: '要注意',
        factFieldKeys: ['hours', 'closed_days'],
        affectedSurfaces: ['Spot'],
      }),
      expect.objectContaining({
        id: 'comparison:hours:mismatch',
        kind: 'comparison',
        recommendationLabel: '変更推奨',
        factFieldKeys: ['hours'],
        affectedSurfaces: ['Spot'],
      }),
    ]);
    const hours = board.entities[0]?.facts.find((fact) => fact.fieldKey === 'hours');
    expect(hours).toMatchObject({
      canonicalValue: '10:00〜17:00',
      displayedValue: '10時〜17時',
    });
  });

  it('keeps every unresolved status distinct and makes the total decomposable', () => {
    const claims = [
      claim({
        claimId: 'place:example-place:name:ja',
        fieldId: 'name:ja',
        displayedValue: '例の場所',
        verification: 'verified',
        confirmedAt: '2026-08-29',
      }),
      claim({
        claimId: 'place:example-place:address:ja',
        fieldId: 'address:ja',
        displayedValue: '東京都例町1-2-3',
        verification: 'needs_confirmation',
      }),
      claim({
        claimId: 'place:example-place:phone:ja',
        fieldId: 'phone:ja',
        displayedValue: '03-0000-0000',
        verification: 'stale',
      }),
      claim({
        claimId: 'place:example-place:hours:ja',
        fieldId: 'hours:ja',
        displayedValue: '公式情報に不一致あり',
        verification: 'conflict',
      }),
      claim({
        claimId: 'spot:example-place:reservation',
        entityType: 'Spot',
        fieldId: 'reservation',
        verification: 'unknown',
      }),
      claim({
        claimId: 'place:example-place:parking:ja',
        fieldId: 'parking:ja',
        displayedValue: '駐車場あり',
        verification: 'demo',
      }),
    ];

    const board = buildHumanDataReviewBoard({
      claims,
      currentProductEntities: exampleSpot,
      evidenceManifest: { evidence: [], omissions: [] },
    });

    expect(board.entities[0]).toMatchObject({
      needsConfirmationCount: 1,
      staleCount: 1,
      conflictCount: 1,
      unknownCount: 1,
      unresolvedCount: 4,
      headlineStatus: 'conflict',
    });
    expect(board.statusCounts).toMatchObject({
      verified: 1,
      needs_confirmation: 1,
      stale: 1,
      conflict: 1,
      unknown: 1,
      demo: 1,
    });
    expect(board.entities[0]?.reviewContext.uncertainties.map((item) => item.status)).toEqual([
      'stale',
      'conflict',
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
      currentProductEntities: exampleSpot,
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

  it('admits current Route and Story entities without #321 child ownership', () => {
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
        issues: ['#333'],
      }),
      claim({
        claimId: 'route:example-route:presentation:result_origin_travel_time:ja',
        entityType: 'Route',
        entityId: 'example-route',
        entityName: '例の食旅',
        fieldId: 'presentation:result_origin_travel_time:ja',
        fieldLabel: 'Result origin travel-time guidance (ja)',
        displayedValue: '東京駅 / 約120分',
        comparedPresentationClaimId:
          'route:example-route:half-day:origin_travel_time_guidance:ja',
        comparedPresentationValue: '東京駅 / 60分',
        finding: 'presentation_mismatch',
        verification: 'demo',
        appSurface: 'Result',
        issues: ['#333'],
      }),
      claim({
        claimId: 'route:example-route:half-day:region_guidance:ja',
        entityType: 'Route',
        entityId: 'example-route',
        entityName: '例の食旅',
        fieldId: 'region_guidance:ja',
        fieldLabel: 'Region guidance (ja)',
        displayedValue: '奥多摩',
        finding: 'canonical_missing',
        verification: 'demo',
        appSurface: 'Route',
        issues: ['#333'],
      }),
      claim({
        claimId: 'story:example-story:story.spot.example-place.product-availability',
        entityType: 'Story',
        entityId: 'example-story',
        entityName: '例のストーリー',
        fieldId: 'story.spot.example-place.product-availability',
        displayedValue: '季節商品を掲載',
        canonicalValue: 'seasonal-product',
        issues: ['#333'],
      }),
      claim({
        claimId: 'place:dormant-place:name:ja',
        entityId: 'dormant-place',
        entityName: '休止中の場所',
        fieldId: 'name:ja',
        displayedValue: '休止中の場所',
        issues: ['#327', '#333'],
      }),
    ];

    const board = buildHumanDataReviewBoard({
      claims,
      currentProductEntities: [
        { id: 'example-route', type: 'Route' },
        { id: 'example-story', type: 'Story' },
      ],
      evidenceManifest: { evidence: [], omissions: [] },
    });

    expect(board.entities.map((entity) => entity.id)).toEqual([
      'example-route',
      'example-story',
    ]);
    expect(board.entities[0]).toMatchObject({
      name: '例の食旅',
      facts: expect.arrayContaining([
        expect.objectContaining({
          fieldKey: 'route:half-day:duration_minutes',
          label: '半日の所要時間（分）',
          canonicalValue: '200',
          displayedValue: '150',
          comparedPresentationValue: undefined,
          finding: 'mismatch',
          status: 'needs_confirmation',
        }),
        expect.objectContaining({
          fieldKey: 'route:presentation:result_origin_travel_time',
          displayedValue: '東京駅 / 約120分',
          comparedPresentationValue: '東京駅 / 60分',
          finding: 'presentation_mismatch',
          status: 'demo',
        }),
        expect.objectContaining({
          fieldKey: 'route:half-day:region_guidance',
          displayedValue: '奥多摩',
          finding: 'canonical_missing',
          status: 'demo',
        }),
      ]),
      reviewContext: {
        findings: expect.arrayContaining([
          expect.objectContaining({
            fieldKey: 'route:presentation:result_origin_travel_time',
            finding: 'presentation_mismatch',
            verification: 'demo',
          }),
          expect.objectContaining({
            fieldKey: 'route:half-day:region_guidance',
            finding: 'canonical_missing',
            verification: 'demo',
          }),
        ]),
        uncertainties: [],
        decisionItems: expect.arrayContaining([
          expect.objectContaining({
            factFieldKeys: ['route:half-day:duration_minutes'],
            kind: 'comparison',
            recommendationLabel: '要判断',
          }),
          expect.objectContaining({
            factFieldKeys: ['route:presentation:result_origin_travel_time'],
            kind: 'comparison',
          }),
          expect.objectContaining({
            factFieldKeys: ['route:half-day:region_guidance'],
            kind: 'comparison',
          }),
        ]),
      },
    });
    expect(board.entities[0]?.facts.find((fact) =>
      fact.fieldKey === 'route:presentation:result_origin_travel_time')?.affectedSurfaces)
      .toEqual(['Result']);
    expect(board.entities[0]?.facts.find((fact) =>
      fact.fieldKey === 'route:half-day:region_guidance')?.affectedSurfaces)
      .toEqual(['Route']);
    const summary = createDataReviewShareSummaryJa(
      board.entities[0]!,
      'https://preview.example/data-review/#example-route',
    );
    expect(summary).not.toContain('presentation_mismatch');
    expect(summary).not.toContain('canonical_missing');
    expect(summary).not.toContain('表示間の不一致');
    expect(summary).not.toContain('正本未登録');
    expect(board.entities[1]).toMatchObject({
      name: '例のストーリー',
      facts: [expect.objectContaining({
        fieldKey: 'story:example-place:product_availability',
        label: '取扱・提供状況（example-place）',
        displayedValue: '季節商品を掲載',
        canonicalValue: 'seasonal-product',
      })],
    });
  });

  it('adds unresolved Home ownership only to Route entity review context', () => {
    const board = buildHumanDataReviewBoard({
      claims: [
        claim({
          claimId: 'route:example-route:half-day:duration_minutes',
          entityType: 'Route',
          entityId: 'example-route',
          entityName: '例の食旅',
          fieldId: 'duration_minutes',
          displayedValue: '150',
          canonicalValue: '200',
          appSurface: 'Route',
        }),
        claim({
          claimId: 'route:example-route:home.factual.duration',
          entityType: 'Route',
          entityId: 'example-route',
          entityName: '例の食旅',
          fieldId: 'home.factual.duration',
          fieldLabel: 'Home journey duration',
          verification: 'unknown',
          origin: 'demo',
          appSurface: 'Home',
        }),
      ],
      currentProductEntities: [{ id: 'example-route', type: 'Route' }],
      evidenceManifest: { evidence: [], omissions: [] },
    });
    const route = board.entities[0]!;

    expect(route.facts.find((fact) => fact.fieldKey === 'route:half-day:duration_minutes')
      ?.affectedSurfaces).toEqual(['Route']);
    expect(route.unknowns).toEqual([
      expect.objectContaining({
        fieldKey: 'route:home.factual.duration',
        label: '確認項目（Home journey duration）',
      }),
    ]);
    expect(route.reviewContext.affectedSurfaces).toEqual(['Home', 'Route']);
  });

  it('projects the complete current Product inventory and preserves reconciled entities', () => {
    const board = buildHumanDataReviewBoard({
      claims: buildRepositoryLedgerClaims(),
      currentProductEntities: CURRENT_PRODUCT_FACTUAL_INVENTORY,
      evidenceManifest: DATA_VERIFICATION_EVIDENCE_MANIFEST,
      places,
    });

    expect(board.entities).toHaveLength(21);
    expect(board.entityTypeCounts).toEqual({ Spot: 15, Story: 3, Route: 3 });
    expect(board.entities.map((entity) => entity.id)).toEqual(expect.arrayContaining([
      'akabeko',
      'baba-oshijutaku',
      'hikawa-valley',
      'mitake-station',
      'mitake-shrine',
      'oku-hikawa-shrine',
      'okutama-kitchen',
      'okutama-station',
      'okutama-tourism-office',
      'port-okutama',
      'sawai-ozawa-shuzo',
      'sawanoien-garden',
      'wasabi-experience',
      'wasabi-kitchen',
      'yamashiroya',
      'ome-sawai-sake-journey',
      'okutama-wasabi-journey',
      'okutama-yamame-journey',
      'sake-ome',
      'wasabi-okutama',
      'yamame-okutama',
    ]));

    const omeStory = board.entities.find((entity) => entity.id === 'sake-ome');
    for (const [fieldKey, sourceUrl] of [
      [
        'story.factual.brewery-tour-reservation',
        'https://www.sawanoi-sake.com/service/kengaku/',
      ],
      [
        'story.spot.sawai-ozawa-shuzo.reservation-requirement',
        'https://www.sawanoi-sake.com/service/kengaku/',
      ],
      [
        'story.spot.sawanoien-garden.operating-calendar-check',
        'https://www.sawanoi-sake.com/service/sawanoien/',
      ],
    ] as const) {
      const fact = omeStory?.facts.find((candidate) =>
        candidate.claimIds.includes(`story:sake-ome:${fieldKey}`));
      expect(fact).toMatchObject({
        status: 'needs_confirmation',
        affectedSurfaces: ['Story'],
      });
      expect(fact?.sources).toEqual([
        expect.objectContaining({
          url: sourceUrl,
          retrievedAt: '2026-08-29',
          confirmedAt: undefined,
        }),
      ]);
    }

    const omeRoute = board.entities.find(
      (entity) => entity.id === 'ome-sawai-sake-journey',
    );
    const moguAccess = omeRoute?.facts.find((fact) =>
      fact.claimIds.includes(
        'route:ome-sawai-sake-journey:mogu.factual.origin-access:ja',
      ));
    expect(moguAccess).toMatchObject({
      fieldKey: 'route:mogu.factual.origin-access',
      status: 'needs_confirmation',
      affectedSurfaces: ['MOGU'],
    });
    expect(moguAccess?.sources).toEqual([
      expect.objectContaining({
        url: 'https://www.sawanoi-sake.com/service/kengaku/',
        retrievedAt: '2026-08-29',
        confirmedAt: undefined,
      }),
    ]);
    expect(omeRoute?.reviewContext.affectedSurfaces).toEqual(['MOGU', 'Story', 'Route']);

    const tourismOffice = board.entities.find((entity) => entity.id === 'okutama-tourism-office');
    expect(tourismOffice).toMatchObject({
      decisionCount: 1,
      unresolvedCount: 16,
      reviewContext: {
        decisionItems: [expect.objectContaining({
          kind: 'comparison',
          label: '施設名',
          recommendationLabel: '変更推奨',
          factFieldKeys: ['name'],
          affectedSurfaces: ['Spot'],
        })],
      },
    });
    expect(tourismOffice?.facts.find((fact) => fact.fieldKey === 'name')).toMatchObject({
      displayedValue: '奥多摩町観光案内所',
      canonicalValue: '奥多摩観光案内所',
      finding: 'mismatch',
    });

    const okutamaWasabiRoute = board.entities.find(
      (entity) => entity.id === 'okutama-wasabi-journey',
    );
    expect(okutamaWasabiRoute?.reviewContext.decisionItems).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: 'comparison:route:half-day:duration_minutes:mismatch',
        recommendationLabel: '要判断',
        factFieldKeys: ['route:half-day:duration_minutes'],
      }),
    ]));

    const portOkutama = board.entities.find((entity) => entity.id === 'port-okutama');
    expect(portOkutama).toMatchObject({
      type: 'Spot',
      headlineStatus: 'needs_confirmation',
      latestRetrievedAt: '2026-08-29',
    });
    expect(portOkutama?.unknownCount).toBeGreaterThan(0);
    expect(portOkutama?.facts).toEqual(expect.arrayContaining([
      expect.objectContaining({ fieldKey: 'hours', status: 'needs_confirmation' }),
      expect.objectContaining({ fieldKey: 'service_availability', status: 'needs_confirmation' }),
      expect.objectContaining({ fieldKey: 'official_current_url', status: 'needs_confirmation' }),
    ]));
    expect(portOkutama?.reviewContext.decisionItems).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: 'current-information:caveat',
        factFieldKeys: [
          'address',
          'phone',
          'hours',
          'closed_days',
          'service_availability',
          'official_current_url',
        ],
        affectedSurfaces: ['Spot', 'Story', 'Route'],
      }),
      expect.objectContaining({
        id: 'comparison:hours:mismatch',
        factFieldKeys: ['hours'],
      }),
      expect.objectContaining({
        id: 'comparison:closed_days:mismatch',
        factFieldKeys: ['closed_days'],
      }),
      expect.objectContaining({
        id: 'comparison:service_availability:mismatch',
        factFieldKeys: ['service_availability'],
        affectedSurfaces: ['Spot', 'Story', 'Route'],
      }),
    ]));
    expect(portOkutama?.sources.map((source) => source.url)).toEqual(expect.arrayContaining([
      'https://www.okutama.ne.jp/',
      'https://www.jreast.co.jp/hachioji/ome-itsukaichi/spot/detail382787.html',
      'https://www.openstreetmap.org/node/6552267871',
    ]));
    expect(portOkutama?.sources).toEqual(expect.arrayContaining([
      expect.objectContaining({ coordinateProvider: true }),
    ]));
    expect(portOkutama?.facts.find((fact) => fact.fieldKey === 'address')?.sources).toEqual([
      expect.objectContaining({
        role: 'address',
        url: 'https://www.jreast.co.jp/hachioji/ome-itsukaichi/spot/detail382787.html',
      }),
    ]);
    expect(portOkutama?.facts.find((fact) => fact.fieldKey === 'coordinates')?.sources).toEqual([
      expect.objectContaining({
        role: 'coordinates',
        url: 'https://www.openstreetmap.org/node/6552267871',
      }),
    ]);
    expect(portOkutama?.facts.find((fact) => fact.fieldKey === 'phone')?.sources).toEqual([
      expect.objectContaining({
        role: 'content',
        url: 'https://www.okutama.ne.jp/',
      }),
    ]);
    expect(portOkutama?.facts.find((fact) => fact.fieldKey === 'service_availability')?.affectedSurfaces)
      .toEqual(['Spot', 'Story', 'Route']);
    expect(portOkutama?.evidence).toHaveLength(3);
    expect(portOkutama?.evidence.map((item) => item.kind)).toEqual(['app', 'app', 'app']);
    expect(portOkutama?.omissions.some((item) => item.sourceUrl === 'https://www.okutama.ne.jp/')).toBe(true);

    const akabeko = board.entities.find((entity) => entity.id === 'akabeko');
    expect(akabeko).toMatchObject({
      type: 'Spot',
      headlineStatus: 'conflict',
      latestRetrievedAt: '2026-08-29',
      conflictCount: 1,
      decisionCount: 6,
    });
    expect(akabeko?.facts).toEqual(expect.arrayContaining([
      expect.objectContaining({
        fieldKey: 'phone',
        status: 'conflict',
        canonicalValue: expect.stringContaining('050-5304-3644'),
        displayedValue: expect.stringContaining('0428-83-2365'),
      }),
      expect.objectContaining({ fieldKey: 'hours', status: 'needs_confirmation' }),
      expect.objectContaining({ fieldKey: 'reservation', status: 'needs_confirmation' }),
      expect.objectContaining({ fieldKey: 'price_availability', status: 'needs_confirmation' }),
    ]));
    expect(akabeko?.sources.map((source) => source.url)).toEqual(expect.arrayContaining([
      'https://akabeko.tokyo/',
      'https://akabeko.tokyo/news',
      'https://arasawaya.co.jp/contact/',
      'https://www.openstreetmap.org/node/4916080538',
    ]));
    expect(akabeko?.sources).toEqual(expect.arrayContaining([
      expect.objectContaining({
        url: 'https://www.openstreetmap.org/node/4916080538',
        coordinateProvider: true,
      }),
    ]));
    const akabekoPhone = akabeko?.facts.find((fact) => fact.fieldKey === 'phone');
    expect(akabekoPhone?.sources.map((source) => source.url)).toEqual([
      'https://akabeko.tokyo/',
      'https://akabeko.tokyo/news',
      'https://arasawaya.co.jp/contact/',
    ]);
    expect(akabekoPhone?.sources.map((source) => source.value)).toEqual([
      '050-5304-3644 / reservation_inquiry / shared_business_group / unresolved',
      '0428-83-2365 / reservation_inquiry / shared_business_group / unresolved',
      '0428-83-2365 / reservation_inquiry / related_business / unresolved',
    ]);
    expect(akabekoPhone?.affectedSurfaces).toEqual(['Spot']);
    expect(akabeko?.facts.find((fact) => fact.fieldKey === 'price_availability')
      ?.affectedSurfaces).toEqual(['Spot', 'Story', 'Route']);

    const wasabiKitchen = board.entities.find((entity) => entity.id === 'wasabi-kitchen');
    expect(wasabiKitchen).toMatchObject({
      type: 'Spot',
      headlineStatus: 'conflict',
      latestRetrievedAt: '2026-08-29',
      decisionCount: 5,
    });
    expect(wasabiKitchen?.facts).toEqual(expect.arrayContaining([
      expect.objectContaining({
        fieldKey: 'venue_model',
        canonicalValue: 'mobile_food_truck / no_permanent_storefront',
        displayedValue: '固定店舗のないキッチンカー',
      }),
      expect.objectContaining({ fieldKey: 'operating_area', status: 'needs_confirmation' }),
      expect.objectContaining({ fieldKey: 'schedule_guidance', status: 'needs_confirmation' }),
      expect.objectContaining({ fieldKey: 'schedule_url', status: 'needs_confirmation' }),
      expect.objectContaining({ fieldKey: 'schedule_conflict', status: 'conflict' }),
      expect.objectContaining({ fieldKey: 'price_availability', status: 'needs_confirmation' }),
      expect.objectContaining({ fieldKey: 'official_current_url', status: 'needs_confirmation' }),
    ]));
    expect(wasabiKitchen?.facts.some((fact) => fact.fieldKey === 'address')).toBe(false);
    expect(wasabiKitchen?.facts.some((fact) => fact.fieldKey === 'coordinates')).toBe(false);
    expect(wasabiKitchen?.sources.map((source) => source.url)).toEqual(expect.arrayContaining([
      'https://tokyowasabi.com/foodtruck/',
      'https://tokyowasabi.com/category/information/',
      'https://tokyowasabi.com/information/2751/260728/',
      'https://tokyowasabi.com/wasabi-don/',
      'https://tokyowasabi.com/hitoshi/2573/fussa-tanabata-challenge/',
    ]));
    expect(wasabiKitchen?.reviewContext.affectedSurfaces).toEqual(['Spot', 'Story', 'Route']);
    expect(wasabiKitchen?.reviewContext.decisionItems).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 'mobile:no-fixed-storefront' }),
      expect.objectContaining({ id: 'conflict:schedule_conflict' }),
      expect.objectContaining({ id: 'current-information:caveat' }),
      expect.objectContaining({ id: 'comparison:schedule_guidance:mismatch' }),
      expect.objectContaining({ id: 'comparison:price_availability:mismatch' }),
    ]));
    expect(wasabiKitchen?.facts.find((fact) => fact.fieldKey === 'venue_model')?.affectedSurfaces)
      .toEqual(['Spot', 'Story', 'Route']);
    expect(wasabiKitchen?.facts.find((fact) => fact.fieldKey === 'schedule_conflict')?.sources.map((source) => source.url))
      .toEqual([
        'https://tokyowasabi.com/information/2751/260728/',
        'https://tokyowasabi.com/hitoshi/2573/fussa-tanabata-challenge/',
      ]);

    const syntheticBoard = buildHumanDataReviewBoard({
      claims: [
        claim({
          claimId: 'place:synthetic-mobile:venue_model',
          entityId: 'synthetic-mobile',
          entityName: '合成モバイル店舗',
          fieldId: 'venue_model',
          canonicalValue: 'irrelevant synthetic value',
        }),
      ],
      currentProductEntities: [{ id: 'synthetic-mobile', type: 'Spot' }],
      evidenceManifest: { evidence: [], omissions: [] },
      places: [syntheticMobilePlace],
    });
    const mobileImpactIds = ['no-fixed-location-behavior'];
    expect(wasabiKitchen?.reviewContext.productImpacts
      .filter((item) => mobileImpactIds.includes(item.id)))
      .toEqual(syntheticBoard.entities[0]?.reviewContext.productImpacts
        .filter((item) => mobileImpactIds.includes(item.id)));
    expect(wasabiKitchen?.reviewContext.productImpacts).toContainEqual(
      expect.objectContaining({ id: 'current-information-caveat' }),
    );

    const boardWithoutEvidence = buildHumanDataReviewBoard({
      claims: buildRepositoryLedgerClaims(),
      currentProductEntities: CURRENT_PRODUCT_FACTUAL_INVENTORY,
      evidenceManifest: { evidence: [], omissions: [] },
      places,
    });
    expect(boardWithoutEvidence.entities.find((entity) => entity.id === 'wasabi-kitchen')?.reviewContext.affectedSurfaces)
      .toEqual(['Spot', 'Story', 'Route']);

    const kitchen = board.entities.find((entity) => entity.id === 'okutama-kitchen');
    expect(kitchen?.facts).toEqual(expect.arrayContaining([
      expect.objectContaining({ fieldKey: 'hours', status: 'needs_confirmation' }),
      expect.objectContaining({ fieldKey: 'price_availability', status: 'needs_confirmation' }),
    ]));
    expect(kitchen?.facts.find((fact) => fact.fieldKey === 'price_availability')
      ?.affectedSurfaces).toEqual(['Spot', 'Story', 'Route']);
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

    const route = board.entities.find((entity) => entity.id === 'okutama-wasabi-journey');
    expect(route?.facts).toEqual(expect.arrayContaining([
      expect.objectContaining({
        fieldKey: 'route:half-day:duration_minutes',
        canonicalValue: '200',
        displayedValue: '150',
        finding: 'mismatch',
        status: 'needs_confirmation',
      }),
    ]));
    expect(route?.facts.find((fact) => fact.fieldKey === 'route:half-day:duration_minutes')
      ?.affectedSurfaces).toEqual(['Route']);
    expect(route?.facts.find((fact) => fact.fieldKey === 'route:presentation:result_origin_travel_time')
      ?.affectedSurfaces).toEqual(['Route', 'Result']);
    expect(route?.reviewContext.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({
        fieldKey: 'route:presentation:result_origin_travel_time',
        finding: 'presentation_mismatch',
        verification: 'demo',
      }),
      expect.objectContaining({
        finding: 'canonical_missing',
        verification: 'demo',
      }),
    ]));
    expect(route?.reviewContext.uncertainties).toEqual([]);
    const routeSummary = createDataReviewShareSummaryJa(
      route!,
      'https://preview.example/data-review/#okutama-wasabi-journey',
    );
    expect(routeSummary).not.toContain('表示間の不一致');
    expect(routeSummary).not.toContain('正本未登録');
    expect(route?.reviewContext.affectedSurfaces).toEqual(['Home', 'Story', 'Route', 'Result']);

    expect(board.entities.find((entity) => entity.id === 'okutama-yamame-journey')).toMatchObject({
      type: 'Route',
      name: '新宿から約90分、奥多摩やまめを味わう旅',
      headlineStatus: 'needs_confirmation',
    });
    expect(board.entities.find((entity) => entity.id === 'wasabi-okutama')).toMatchObject({
      type: 'Story',
      name: '奥多摩わさびのストーリー',
    });
    expect(board.entities.find((entity) => entity.id === 'yamame-okutama')).toMatchObject({
      type: 'Story',
      name: '奥多摩やまめのストーリー',
    });

    for (const entity of board.entities) {
      expect(entity.unresolvedCount).toBe(
        entity.needsConfirmationCount
        + entity.staleCount
        + entity.unknownCount
        + entity.conflictCount,
      );
    }

    const first = JSON.stringify(board);
    const second = JSON.stringify(buildHumanDataReviewBoard({
      claims: buildRepositoryLedgerClaims(),
      currentProductEntities: CURRENT_PRODUCT_FACTUAL_INVENTORY,
      evidenceManifest: DATA_VERIFICATION_EVIDENCE_MANIFEST,
      places,
    }));
    expect(second).toBe(first);

    const reversed = JSON.stringify(buildHumanDataReviewBoard({
      claims: buildRepositoryLedgerClaims().reverse(),
      currentProductEntities: [...CURRENT_PRODUCT_FACTUAL_INVENTORY].reverse(),
      evidenceManifest: {
        evidence: [...DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence].reverse(),
        omissions: [...DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions].reverse(),
      },
      places: [...places].reverse(),
    }));
    expect(reversed).toBe(first);
  });

  it('creates a Japanese share summary without promoting needs_confirmation to verified', () => {
    const board = buildHumanDataReviewBoard({
      claims: buildRepositoryLedgerClaims(),
      currentProductEntities: CURRENT_PRODUCT_FACTUAL_INVENTORY,
      evidenceManifest: DATA_VERIFICATION_EVIDENCE_MANIFEST,
      places,
    });
    const kitchen = board.entities.find((entity) => entity.id === 'okutama-kitchen')!;

    const summary = createDataReviewShareSummaryJa(
      kitchen,
      'https://preview.example/data-review/#okutama-kitchen',
    );

    expect(summary).toContain('🟡 出典確認済み・人の確認待ち');
    expect(summary).toContain('最新出典確認: 2026-08-28');
    expect(summary).toContain('未解決・要対応');
    expect(summary).toContain('https://preview.example/data-review/#okutama-kitchen');
    expect(summary).not.toContain('✅ 人による確認済み');
    expect(summary).not.toContain('Productへの影響');
    expect(summary).not.toContain('固定マップピン');
  });
});
