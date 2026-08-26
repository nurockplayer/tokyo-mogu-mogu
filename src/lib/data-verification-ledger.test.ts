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
    const name = claims.find((row) => row.claimId === 'place:okutama-tourism-office:name');
    const address = claims.find((row) => row.claimId === 'place:okutama-tourism-office:address');

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

  it('keeps the committed ledger byte-for-byte current', () => {
    const committed = readFileSync(
      new URL('../../docs/data-verification-ledger.md', import.meta.url),
      'utf8',
    );

    expect(committed).toBe(generateRepositoryDataVerificationLedger());
  });
});
