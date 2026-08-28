import { DATA_VERIFICATION_EVIDENCE_MANIFEST } from '../data/data-verification-evidence-manifest';
import { validateDataVerificationEvidenceManifest } from './data-verification-evidence';
import {
  buildRepositoryLedgerClaims,
  renderDataVerificationLedger,
} from './data-verification-ledger';

/** Generate and validate the committed Ledger in a Node repository process. */
export function generateRepositoryDataVerificationLedger(): string {
  const claims = buildRepositoryLedgerClaims();
  validateDataVerificationEvidenceManifest(DATA_VERIFICATION_EVIDENCE_MANIFEST, claims);
  return renderDataVerificationLedger(
    claims,
    DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence,
    DATA_VERIFICATION_EVIDENCE_MANIFEST.omissions,
  );
}
