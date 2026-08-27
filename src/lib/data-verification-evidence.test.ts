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
      'place:yamashiroya:coordinates',
      'place:yamashiroya:phone:ja',
      'place:yamashiroya:hours:ja',
      'place:yamashiroya:closed_days:ja',
    ]));
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
