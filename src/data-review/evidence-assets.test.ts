import { describe, expect, it } from 'vitest';
import { DATA_VERIFICATION_EVIDENCE_MANIFEST } from '../data/data-verification-evidence-manifest';
import { dataReviewEvidenceAssetUrl } from './evidence-assets';

describe('data review evidence asset map (#340)', () => {
  it('bundles every manifest screenshot by its existing repository path', () => {
    for (const evidence of DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence) {
      expect(dataReviewEvidenceAssetUrl(evidence.path), evidence.evidenceId).toMatch(/^\/|^data:|^http/);
    }
  });
});
