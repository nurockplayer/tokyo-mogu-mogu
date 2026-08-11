import { describe, expect, it } from 'vitest';
import {
  confirmationDate,
  deriveVerificationStatus,
  isConfirmationOlderThan,
  isStale,
  listUnverifiedFields,
  recordVerificationStatus,
  sourceConflictLabel,
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

  it('keeps an explicit verified status when no demo signal exists', () => {
    expect(
      deriveVerificationStatus(
        source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }),
        'source',
      ),
    ).toBe('verified');
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

  it('derives stale when the source was updated after its confirmation', () => {
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
  it('is verified only when every source is verified', () => {
    const sources = [
      source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }),
      source({ verificationStatus: 'verified', confirmedAt: '2026-08-08' }),
    ];
    expect(recordVerificationStatus(sources, 'source')).toBe('verified');
  });

  it('downgrades to needs_confirmation when any source is unverified', () => {
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
    const sources = [source({ verificationStatus: 'verified' })];
    expect(recordVerificationStatus(sources, 'demo')).toBe('demo');
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
  it('treats an updated source document as stale vs its confirmation', () => {
    const s = source({ retrievedAt: '2026-08-01', sourceUpdatedAt: '2026-08-09' });
    expect(isStale(s)).toBe(true);
  });

  it('is not stale when the source has not moved since confirmation', () => {
    const s = source({ retrievedAt: '2026-08-08', sourceUpdatedAt: '2026-08-08' });
    expect(isStale(s)).toBe(false);
  });

  it('is not stale for a demo fixture', () => {
    const s = source({ sourceType: 'demo', retrievedAt: '2026-08-01', sourceUpdatedAt: '2026-08-09' });
    expect(isStale(s)).toBe(false);
  });

  it('is not stale when the confirmation date is missing', () => {
    const s = source({ sourceUpdatedAt: '2026-08-09' });
    expect(isStale(s)).toBe(false);
  });

  it('confirmationDate prefers confirmedAt over retrievedAt over lastVerified', () => {
    expect(confirmationDate(source({ confirmedAt: '2026-08-08', retrievedAt: '2026-08-01' }))).toBe(
      '2026-08-08',
    );
    expect(confirmationDate(source({ retrievedAt: '2026-08-01', lastVerified: '2026-08-02' }))).toBe(
      '2026-08-01',
    );
    expect(confirmationDate(source({ lastVerified: '2026-08-02' }))).toBe('2026-08-02');
    expect(confirmationDate(source({}))).toBeUndefined();
  });

  it('flags a confirmation older than the allowed age', () => {
    const s = source({ confirmedAt: '2026-08-01' });
    expect(isConfirmationOlderThan(s, '2026-08-11', 5)).toBe(true);
    expect(isConfirmationOlderThan(s, '2026-08-11', 15)).toBe(false);
  });

  it('flags a missing confirmation as old', () => {
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
  it('lists every record that is not verified across the current seed', () => {
    const spots = modelRoutes
      .flatMap((r) => Object.values(r.variants).flatMap((v) => v.steps.map((s) => s.placeId)))
      .map((id) => getSpotDetail(id))
      .filter((d): d is SpotDetail => d !== undefined);
    const entries = listUnverifiedFields({
      places,
      foodCultures,
      spots,
    });

    // Every seed place is demo-origin and every unverified food culture is
    // needs_confirmation, so the list is non-empty and covers the seed.
    expect(entries.length).toBeGreaterThan(0);

    // Stable machine-readable shape.
    for (const entry of entries) {
      expect(['place', 'foodCulture', 'spot']).toContain(entry.recordType);
      expect(entry.recordId.length).toBeGreaterThan(0);
      expect(entry.field.length).toBeGreaterThan(0);
      expect(entry.source.length).toBeGreaterThan(0);
    }

    // The verified wasabi culture must not appear as needs_confirmation.
    const wasabi = entries.find((e) => e.recordId === 'wasabi-okutama');
    expect(wasabi).toBeUndefined();
  });

  it('returns no entries when every record is verified', () => {
    const verifiedPlace = {
      id: 'p1',
      origin: 'source' as const,
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
});
