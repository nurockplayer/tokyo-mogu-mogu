import { describe, expect, it } from 'vitest';
import {
  compileLedgerClaims,
  renderDataVerificationLedger,
  type LedgerClaimInput,
} from './data-verification-ledger';

function claim(overrides: Partial<LedgerClaimInput> = {}): LedgerClaimInput {
  return {
    entityType: 'Place',
    entityId: 'place-1',
    entityName: 'Place 1',
    claimId: 'address',
    claimLabel: 'Address',
    canonicalValue: '1 Canonical Street',
    displayedValue: '2 Presentation Street',
    canonicalOrigin: 'source',
    presentationOrigin: 'editorial',
    verification: 'needs_confirmation',
    appSurface: 'Spot',
    canonicalSourceFile: 'src/data/places.ts',
    presentationSourceFile: 'src/presentation/spots.ts',
    timeSensitive: true,
    ...overrides,
  };
}

describe('data verification ledger claim compilation (#333)', () => {
  it('reports canonical and presentation drift under a stable semantic claim ID', () => {
    const [compiled] = compileLedgerClaims([claim()]);

    expect(compiled).toMatchObject({
      entityId: 'place-1',
      claimId: 'address',
      canonicalValue: '1 Canonical Street',
      displayedValue: '2 Presentation Street',
      mismatch: true,
    });
  });

  it('normalizes only line endings and whitespace when comparing values', () => {
    const [compiled] = compileLedgerClaims([claim({
      canonicalValue: '東京都西多摩郡\r\n奥多摩町  氷川210',
      displayedValue: '東京都西多摩郡\n奥多摩町 氷川210',
    })]);

    expect(compiled.mismatch).toBe(false);
    expect(compiled.canonicalValue).toBe('東京都西多摩郡\r\n奥多摩町  氷川210');
    expect(compiled.displayedValue).toBe('東京都西多摩郡\n奥多摩町 氷川210');
  });

  it('renders byte-identical Markdown with explicit stable status, entity, and claim ordering', () => {
    const alpha = claim({
      entityId: 'a-place',
      entityName: 'A Place',
      claimId: 'phone',
      claimLabel: 'Phone',
      canonicalValue: undefined,
      displayedValue: undefined,
      verification: 'unknown',
    });
    const beta = claim({
      entityId: 'b-place',
      entityName: 'B Place',
      claimId: 'address',
      claimLabel: 'Address',
      canonicalValue: 'B',
      displayedValue: 'B',
      verification: 'verified',
    });

    const first = renderDataVerificationLedger([beta, alpha]);
    const second = renderDataVerificationLedger([alpha, beta]);

    expect(first).toBe(second);
    expect(first.indexOf('a-place')).toBeLessThan(first.indexOf('b-place'));
    expect(first).toContain('| unknown | 1 |');
    expect(first).toContain('| verified | 1 |');
    expect(first).toContain('- `a-place` — `phone`');
  });

  it('renders provenance, freshness, confirmation, and the reserved evidence slot independently', () => {
    const output = renderDataVerificationLedger([claim({
      primarySourceName: 'Official source',
      primarySourceUrl: 'https://example.com/current',
      retrievedAt: '2026-08-26',
      sourceUpdatedAt: '2026-08-25',
      confirmedAt: '2026-08-24',
      timeSensitiveCaveat: 'Recheck before visiting.',
      relevantIssue: '#333',
      nextAction: 'Review drift.',
    })]);

    expect(output).toContain('Checked / retrieved date');
    expect(output).toContain('Source updated date');
    expect(output).toContain('Confirmed date');
    expect(output).toContain('[Official source](https://example.com/current)');
    expect(output).toContain('2026-08-26');
    expect(output).toContain('2026-08-25');
    expect(output).toContain('2026-08-24');
    expect(output).toContain('Recheck before visiting.');
    expect(output).toContain('| Evidence |');
  });

  it('explains the generated/report-only boundary and check commands in the artifact', () => {
    const output = renderDataVerificationLedger([claim()]);

    expect(output).toContain('`unknown` rows are report-only');
    expect(output).toContain('does not reconcile either value');
    expect(output).toContain('`pnpm data:ledger`');
    expect(output).toContain('`pnpm data:ledger:check`');
    expect(output).toContain('#334');
  });
});
