import { describe, expect, it } from 'vitest';
import {
  confirmationDate,
  deriveVerificationStatus,
  isConfirmationOlderThan,
  isSourceDocumentStale,
  listUnverifiedFields,
  recordVerificationStatus,
  sourceConflictLabel,
  sourceDateLabel,
} from './verification';
import type { DataSource, VerificationStatus } from '../data/model';
import type { SpotDetail } from '../data';
import { foodCultures, places, getSpotDetail, modelRoutes } from '../data';

const TODAY = '2026-08-11';
function source(overrides: Partial<DataSource>): DataSource {
  return { name: 'okutama', ...overrides };
}

describe('verification status derivation (#129)', () => {
  it('derives needs_confirmation for a source with no explicit status', () => {
    expect(
      deriveVerificationStatus(
        source({ sourceType: 'official_web', retrievedAt: '2026-08-08' }),
        'source',
      ),
    ).toBe('needs_confirmation');
  });

  it('keeps an explicit verified status only with stakeholder confirmation', () => {
    expect(
      deriveVerificationStatus(
        source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }),
        'source',
      ),
    ).toBe('verified');
  });

  it('official_web + recent retrieval alone never becomes verified', () => {
    // A recently-retrieved official source is still needs_confirmation until a
    // stakeholder confirms it (Issue #129). Retrieval is not confirmation.
    expect(
      deriveVerificationStatus(
        source({ sourceType: 'official_web', retrievedAt: TODAY }),
        'source',
      ),
    ).toBe('needs_confirmation');
    expect(
      deriveVerificationStatus(
        source({
          sourceType: 'official_web',
          retrievedAt: TODAY,
          lastVerified: TODAY,
          sourceUpdatedAt: TODAY,
        }),
        'source',
      ),
    ).toBe('needs_confirmation');
  });

  it('downgrades an explicit verified status to needs_confirmation without confirmedAt', () => {
    // A mislabeled record claiming verified without any stakeholder
    // confirmation must degrade — never verified on retrieval alone.
    expect(
      deriveVerificationStatus(
        source({ verificationStatus: 'verified', retrievedAt: TODAY }),
        'source',
      ),
    ).toBe('needs_confirmation');
  });

  it('never lets a demo-origin record be verified, even with an explicit status', () => {
    // A mislabeled demo record (explicit status would say verified) must still
    // degrade to demo — demo fixtures can never appear as verified facts.
    expect(
      deriveVerificationStatus(
        source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }),
        'demo',
      ),
    ).toBe('demo');
  });

  it('never lets a demo sourceType be verified', () => {
    expect(
      deriveVerificationStatus(source({ sourceType: 'demo' }), 'editorial'),
    ).toBe('demo');
  });

  it('derives stale when the source document moved after the observation', () => {
    const s = source({
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      sourceUpdatedAt: '2026-08-10',
    });
    expect(deriveVerificationStatus(s, 'source')).toBe('stale');
  });

  it('derives stale via explicit status when the dates disagree', () => {
    // Explicit status wins over the date-based heuristic.
    const s = source({
      sourceType: 'official_web',
      retrievedAt: '2026-08-08',
      sourceUpdatedAt: '2026-08-10',
      verificationStatus: 'needs_confirmation',
    });
    expect(deriveVerificationStatus(s, 'source')).toBe('needs_confirmation');
  });

  it('freshness beats an explicit verified status once the source moved (#129)', () => {
    // A previously verified source whose document was updated after the
    // confirmation is no longer current — it derives stale, not verified.
    const s = source({
      verificationStatus: 'verified',
      confirmedAt: '2026-08-01',
      sourceUpdatedAt: '2026-08-09',
    });
    expect(deriveVerificationStatus(s, 'source')).toBe('stale');
  });

  it('keeps verified when confirmation matches the source update (#129)', () => {
    const s = source({
      verificationStatus: 'verified',
      confirmedAt: '2026-08-09',
      sourceUpdatedAt: '2026-08-09',
    });
    expect(deriveVerificationStatus(s, 'source')).toBe('verified');
  });

  it('derives a closed union only', () => {
    const statuses = new Set<VerificationStatus>([
      'verified',
      'needs_confirmation',
      'stale',
      'conflict',
      'demo',
    ]);
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        expect(statuses.has(deriveVerificationStatus(s, fc.origin))).toBe(true);
      }
    }
    for (const p of places) {
      expect(statuses.has(deriveVerificationStatus(p.source, p.origin))).toBe(true);
    }
  });
});

describe('record-level verification aggregate (#129)', () => {
  it('is verified only when every source is stakeholder-confirmed', () => {
    const sources = [
      source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }),
      source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }),
    ];
    expect(recordVerificationStatus(sources, 'source')).toBe('verified');
  });

  it('is not verified when sources are retrieved but never confirmed', () => {
    // Two official sources that were retrieved and cross-referenced are still
    // not stakeholder confirmation (Issue #129).
    const sources = [
      source({ sourceType: 'official_web', retrievedAt: TODAY }),
      source({ sourceType: 'official_web', retrievedAt: TODAY }),
    ];
    expect(recordVerificationStatus(sources, 'source')).toBe('needs_confirmation');
  });

  it('downgrades to needs_confirmation when any source is unconfirmed', () => {
    const sources = [
      source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }),
      source({ sourceType: 'official_web', retrievedAt: '2026-08-08' }),
    ];
    expect(recordVerificationStatus(sources, 'source')).toBe('needs_confirmation');
  });

  it('downgrades to conflict before staleness', () => {
    const sources = [
      source({ verificationStatus: 'conflict' }),
      source({ verificationStatus: 'stale' }),
    ];
    expect(recordVerificationStatus(sources, 'source')).toBe('conflict');
  });

  it('downgrades to demo for a demo-origin record with verified sources', () => {
    const sources = [source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' })];
    expect(recordVerificationStatus(sources, 'demo')).toBe('demo');
  });

  it('a record with no sources is never verified', () => {
    // Absence of evidence is not evidence of verified (#129).
    expect(recordVerificationStatus([], 'source')).toBe('needs_confirmation');
    expect(recordVerificationStatus([], 'editorial')).toBe('needs_confirmation');
    expect(recordVerificationStatus([], 'demo')).toBe('demo');
  });

  it('downgrades to stale when a stale source exists but no conflict', () => {
    const sources = [
      source({ sourceType: 'official_web', retrievedAt: '2026-08-08', sourceUpdatedAt: '2026-08-10' }),
      source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }),
    ];
    expect(recordVerificationStatus(sources, 'source')).toBe('stale');
  });
});

describe('freshness (#129)', () => {
  it('treats an updated source document as stale vs its observation', () => {
    const s = source({ retrievedAt: '2026-08-01', sourceUpdatedAt: '2026-08-09' });
    expect(isSourceDocumentStale(s)).toBe(true);
  });

  it('is not stale when the source has not moved since observation', () => {
    const s = source({ retrievedAt: '2026-08-08', sourceUpdatedAt: '2026-08-08' });
    expect(isSourceDocumentStale(s)).toBe(false);
  });

  it('a demo fixture with a newer source update derives demo, not stale', () => {
    // Demo protection lives in the derivation layer: a demo fixture is never
    // downgraded to stale (or verified), even when the underlying document
    // moved after the observation.
    const s = source({ sourceType: 'demo', retrievedAt: '2026-08-01', sourceUpdatedAt: '2026-08-09' });
    expect(isSourceDocumentStale(s)).toBe(true);
    expect(deriveVerificationStatus(s, 'editorial')).toBe('demo');
  });

  it('is not stale when the observation date is missing', () => {
    const s = source({ sourceUpdatedAt: '2026-08-09' });
    expect(isSourceDocumentStale(s)).toBe(false);
  });

  it('is stale vs the legacy lastVerified when retrievedAt is missing', () => {
    const s = source({ lastVerified: '2026-08-01', sourceUpdatedAt: '2026-08-09' });
    expect(isSourceDocumentStale(s)).toBe(true);
  });
});

describe('confirmation-date semantics (#129)', () => {
  it('confirmationDate returns confirmedAt only — retrieval never counts', () => {
    // retrievedAt / lastVerified are observation timestamps, not stakeholder
    // confirmation (Issue #129).
    expect(confirmationDate(source({ confirmedAt: '2026-08-08', retrievedAt: '2026-08-01' }))).toBe(
      '2026-08-08',
    );
    expect(confirmationDate(source({ retrievedAt: '2026-08-01' }))).toBeUndefined();
    expect(confirmationDate(source({ lastVerified: '2026-08-02' }))).toBeUndefined();
    expect(confirmationDate(source({}))).toBeUndefined();
  });

  it('a source with retrievedAt but no confirmedAt has no confirmation date', () => {
    const s = source({ sourceType: 'official_web', retrievedAt: '2026-08-08' });
    expect(confirmationDate(s)).toBeUndefined();
  });

  it('flags a confirmation older than the allowed age', () => {
    const s = source({ confirmedAt: '2026-08-01' });
    expect(isConfirmationOlderThan(s, '2026-08-11', 5)).toBe(true);
    expect(isConfirmationOlderThan(s, '2026-08-11', 15)).toBe(false);
  });

  it('a missing confirmedAt remains unconfirmed regardless of retrieval recency', () => {
    // A recently-retrieved source with no stakeholder confirmation is treated
    // as never confirmed (Issue #129).
    expect(isConfirmationOlderThan(source({ retrievedAt: TODAY }), TODAY, 90)).toBe(true);
    expect(isConfirmationOlderThan(source({}), TODAY, 90)).toBe(true);
  });
});

describe('conflict representation (#129)', () => {
  it('keeps both evidence and the source of each side', () => {
    const label = sourceConflictLabel({
      status: 'conflict',
      facts: [
        { value: '10:00–17:00', source: 'official_web' },
        { value: '12:00–18:00', source: 'business' },
      ],
    });
    expect(label).toBe('official_web: 10:00–17:00 / business: 12:00–18:00');
  });
});

describe('machine-readable needs_confirmation list (#129)', () => {
  it('emits concrete field identifiers, not only category buckets', () => {
    const spots = modelRoutes
      .flatMap((r) => Object.values(r.variants).flatMap((v) => v.steps.map((s) => s.placeId)))
      .map((id) => getSpotDetail(id))
      .filter((d): d is SpotDetail => d !== undefined);
    const entries = listUnverifiedFields({ places, foodCultures, spots });

    const fields = new Set(entries.map((e) => e.field));
    // Concrete review fields appear (hours, reservation, accessibility, ...),
    // and no category-bucket-only entries exist for spots/places.
    for (const concrete of [
      'hours',
      'closedDays',
      'price',
      'reservation',
      'bookingDestination',
      'multilingualSupport',
      'dietaryAllergy',
      'accessibility',
      'storyWording',
      'makerWording',
      'photoReusePermission',
      'coordinates',
    ]) {
      expect(fields, `expected ${concrete}`).toContain(concrete);
    }
    // Coarse buckets must not be emitted for places/spots.
    expect(fields).not.toContain('practical');
    expect(fields).not.toContain('basic');
  });

  it('spot entries name the exact practical field to confirm', () => {
    const spots = modelRoutes
      .flatMap((r) => Object.values(r.variants).flatMap((v) => v.steps.map((s) => s.placeId)))
      .map((id) => getSpotDetail(id))
      .filter((d): d is SpotDetail => d !== undefined);
    const entries = listUnverifiedFields({ places, foodCultures, spots });

    const sobaFieldEntries = entries.filter((e) => e.recordId === 'okutama-soba-shop');
    const sobaFields = sobaFieldEntries.map((e) => e.field);
    // The soba shop has no practical data today — the concrete hours/price/
    // reservation/accessibility fields must all be listed.
    expect(sobaFields).toContain('hours');
    expect(sobaFields).toContain('closedDays');
    expect(sobaFields).toContain('price');
    expect(sobaFields).toContain('reservation');
    expect(sobaFields).toContain('bookingDestination');
    expect(sobaFields).toContain('accessibility');
  });

  it('lists every record that is not verified across the current seed', () => {
    const spots = modelRoutes
      .flatMap((r) => Object.values(r.variants).flatMap((v) => v.steps.map((s) => s.placeId)))
      .map((id) => getSpotDetail(id))
      .filter((d): d is SpotDetail => d !== undefined);
    const entries = listUnverifiedFields({ places, foodCultures, spots });

    // Every seed record is unverified today (all needs_confirmation / demo), so
    // the list is non-empty and covers the seed.
    expect(entries.length).toBeGreaterThan(0);

    // Stable machine-readable shape.
    for (const entry of entries) {
      expect(['place', 'foodCulture', 'spot']).toContain(entry.recordType);
      expect(entry.recordId.length).toBeGreaterThan(0);
      expect(entry.field.length).toBeGreaterThan(0);
      expect(entry.status).toBeDefined();
      expect(['needs_confirmation', 'stale', 'conflict', 'demo', 'verified']).toContain(entry.status);
      expect(entry.source.length).toBeGreaterThan(0);
    }
  });

  it('keeps needs_confirmation / stale / conflict / demo distinguishable per entry (#129)', () => {
    const conflictSrc = source({ verificationStatus: 'conflict' });
    const staleSrc = source({
      sourceType: 'official_web',
      retrievedAt: '2026-08-01',
      sourceUpdatedAt: '2026-08-09',
    });
    const confirmSrc = source({
      verificationStatus: 'verified',
      confirmedAt: '2026-08-08',
      sourceUpdatedAt: '2026-08-08',
    });
    const entries = listUnverifiedFields({
      places: [
        { id: 'p-conflict', origin: 'source', address: 'A', latitude: 1, longitude: 1, source: conflictSrc },
        { id: 'p-stale', origin: 'source', address: 'B', latitude: 1, longitude: 1, source: staleSrc },
        { id: 'p-needs', origin: 'source', address: 'C', latitude: 1, longitude: 1, source: source({ sourceType: 'official_web', retrievedAt: TODAY }) },
        { id: 'p-demo', origin: 'demo', address: 'D', latitude: 1, longitude: 1, source: source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }) },
        { id: 'p-verified', origin: 'source', address: 'E', latitude: 1, longitude: 1, source: confirmSrc },
      ],
      foodCultures: [],
      spots: [],
    });

    expect(entries.find((e) => e.recordId === 'p-conflict')!.status).toBe('conflict');
    expect(entries.find((e) => e.recordId === 'p-stale')!.status).toBe('stale');
    expect(entries.find((e) => e.recordId === 'p-needs')!.status).toBe('needs_confirmation');
    expect(entries.find((e) => e.recordId === 'p-demo')!.status).toBe('demo');
    // Verified records are excluded entirely.
    expect(entries.find((e) => e.recordId === 'p-verified')).toBeUndefined();
  });

  it('queues populated but unverified practical fields for review (#129)', () => {
    // A spot whose source is unverified but already carries hours/price must
    // queue those exact fields — the app currently displays them.
    const entries = listUnverifiedFields({
      places: [],
      foodCultures: [],
      spots: [
        {
          placeId: 's1',
          origin: 'editorial',
          practical: {
            hoursJa: '10:00–17:00',
            hoursEn: '10:00–17:00',
            priceJa: '¥500',
            priceEn: '500 JPY',
            reservationAvailable: true,
          },
          tags: {},
          source: source({ sourceType: 'official_web', retrievedAt: TODAY }),
        },
      ],
    });

    const fields = entries.filter((e) => e.recordId === 's1').map((e) => e.field);
    expect(fields).toContain('hours');
    expect(fields).toContain('closedDays');
    expect(fields).toContain('price');
    expect(fields).toContain('reservation');
    expect(fields).toContain('bookingDestination');
    expect(fields).toContain('multilingualSupport');
    expect(fields).toContain('dietaryAllergy');
    expect(fields).toContain('accessibility');
    expect(entries.every((e) => e.status === 'needs_confirmation')).toBe(true);
  });

  it('queues affirmative spot tag claims for an unverified spot (#129)', () => {
    // Positively populated tags are user-visible claims from an unverified
    // source; they must still be queued for stakeholder confirmation, exactly
    // like negative / absent values. No value is invented — the claim field
    // itself is queued.
    const entries = listUnverifiedFields({
      places: [],
      foodCultures: [],
      spots: [
        {
          placeId: 's-tags',
          origin: 'editorial',
          practical: undefined,
          tags: {
            language: ['ja', 'en'],
            vegetarian: true,
            allergyNotice: true,
            accessibility: true,
          },
          source: source({ sourceType: 'official_web', retrievedAt: TODAY }),
        },
      ],
    });

    const fields = entries.filter((e) => e.recordId === 's-tags').map((e) => e.field);
    expect(fields).toContain('multilingualSupport');
    expect(fields).toContain('dietaryAllergy');
    expect(fields).toContain('accessibility');
    // The populated practical fields are still queued alongside.
    expect(fields).toContain('hours');
    expect(fields).toContain('reservation');
  });

  it('queues address + coordinates for every unverified place (#129)', () => {
    // A demo unverified place (approximate coords) queues both fields.
    const demoPlace = {
      id: 'p-demo2',
      origin: 'demo' as const,
      address: 'Okutama',
      latitude: 35.8,
      longitude: 139.1,
      source: source({ verificationStatus: 'needs_confirmation' }),
    };
    // A non-demo unverified place queues both fields too.
    const sourcePlace = {
      id: 'p-source2',
      origin: 'source' as const,
      address: 'Ome',
      latitude: 35.78,
      longitude: 139.27,
      source: source({ sourceType: 'official_web', retrievedAt: TODAY }),
    };
    const verifiedPlace = {
      id: 'p-verified2',
      origin: 'source' as const,
      address: 'Hinode',
      latitude: 35.74,
      longitude: 139.27,
      source: source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }),
    };
    const entries = listUnverifiedFields({
      places: [demoPlace, sourcePlace, verifiedPlace],
      foodCultures: [],
      spots: [],
    });

    const demoFields = entries.filter((e) => e.recordId === 'p-demo2').map((e) => e.field);
    expect(demoFields).toContain('address');
    expect(demoFields).toContain('coordinates');

    const sourceFields = entries.filter((e) => e.recordId === 'p-source2').map((e) => e.field);
    expect(sourceFields).toContain('address');
    expect(sourceFields).toContain('coordinates');

    // Verified places still produce no review entries.
    expect(entries.find((e) => e.recordId === 'p-verified2')).toBeUndefined();
  });

  it('does not duplicate record+field entries across route variants (#129)', () => {
    const spots = modelRoutes
      .flatMap((r) => Object.values(r.variants).flatMap((v) => v.steps.map((s) => s.placeId)))
      .map((id) => getSpotDetail(id))
      .filter((d): d is SpotDetail => d !== undefined);
    const entries = listUnverifiedFields({ places, foodCultures, spots });

    const keys = new Set<string>();
    for (const e of entries) {
      const key = `${e.recordType}:${e.recordId}:${e.field}`;
      expect(keys.has(key), `duplicate ${key}`).toBe(false);
      keys.add(key);
    }
  });

  it('queues the wasabi culture (needs_confirmation) but never as verified', () => {
    const spots = modelRoutes
      .flatMap((r) => Object.values(r.variants).flatMap((v) => v.steps.map((s) => s.placeId)))
      .map((id) => getSpotDetail(id))
      .filter((d): d is SpotDetail => d !== undefined);
    const entries = listUnverifiedFields({ places, foodCultures, spots });
    const wasabi = entries.filter((e) => e.recordId === 'wasabi-okutama');
    // wasabi has two official sources, neither stakeholder-confirmed.
    expect(wasabi.length).toBeGreaterThan(0);
    expect(wasabi[0].status).toBe('needs_confirmation');
    expect(wasabi[0].field).toBe('facts');
  });

  it('returns no entries when every record is verified', () => {
    const verifiedPlace = {
      id: 'p1',
      origin: 'source' as const,
      address: 'Tokyo',
      latitude: 35.8,
      longitude: 139.1,
      source: source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }),
    };
    const verifiedFc = {
      id: 'f1',
      origin: 'source' as const,
      sources: [source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' })],
    };
    const entries = listUnverifiedFields({
      places: [verifiedPlace],
      foodCultures: [verifiedFc],
      spots: [],
    });
    expect(entries).toEqual([]);
  });

  it('never lists a record as needs_confirmation when it is actually verified', () => {
    const confirmed = source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' });
    const entries = listUnverifiedFields({
      places: [
        { id: 'p1', origin: 'source', address: 'X', latitude: 1, longitude: 1, source: confirmed },
      ],
      foodCultures: [],
      spots: [],
    });
    expect(entries).toEqual([]);
  });
});

describe('sourceDateLabel (#129)', () => {
  it('labels a verified source date as Last verified using confirmedAt', () => {
    expect(
      sourceDateLabel(
        source({
          verificationStatus: 'verified',
          confirmedAt: '2026-08-08',
          retrievedAt: '2026-07-01',
          lastVerified: '2026-07-01',
        }),
        'source',
      ),
    ).toEqual({ label: 'detailLastVerified', date: '2026-08-08' });
  });

  it('labels a needs_confirmation source date as Retrieved using retrievedAt', () => {
    expect(
      sourceDateLabel(
        source({
          verificationStatus: 'needs_confirmation',
          retrievedAt: '2026-08-08',
          lastVerified: '2026-08-08',
        }),
        'source',
      ),
    ).toEqual({ label: 'detailRetrieved', date: '2026-08-08' });
  });

  it('never presents retrieval as verification even with lastVerified set', () => {
    // lastVerified is a legacy retrieval/check timestamp; it must not be shown
    // as "Last verified" without stakeholder confirmation.
    expect(
      sourceDateLabel(
        source({ lastVerified: '2026-08-08', retrievedAt: '2026-08-08' }),
        'source',
      ),
    ).toEqual({ label: 'detailRetrieved', date: '2026-08-08' });
  });

  it('falls back to lastVerified when retrievedAt is missing', () => {
    expect(
      sourceDateLabel(
        source({ verificationStatus: 'needs_confirmation', lastVerified: '2026-08-08' }),
        'source',
      ),
    ).toEqual({ label: 'detailRetrieved', date: '2026-08-08' });
  });

  it('returns undefined when there is no retrievable date', () => {
    expect(sourceDateLabel(source({}), 'source')).toBeUndefined();
  });

  it('labels a demo-origin source as Retrieved, never Last verified', () => {
    expect(
      sourceDateLabel(
        source({ sourceType: 'demo', retrievedAt: '2026-08-08', lastVerified: '2026-08-08' }),
        'demo',
      ),
    ).toEqual({ label: 'detailRetrieved', date: '2026-08-08' });
  });
});
