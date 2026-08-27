import { existsSync } from 'node:fs';
import { isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  DataVerificationEvidenceManifest,
  DataVerificationEvidenceOmission,
} from '../data/data-verification-evidence-manifest';

interface EvidenceClaimReference {
  claimId: string;
  entityId: string;
}

interface EvidenceValidationOptions {
  repositoryRoot?: string;
  fileExists?: (path: string) => boolean;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SUPPORTED_LOCALES = new Set(['ja', 'en', 'zh-TW']);

function validateHttpUrl(value: string, label: string): void {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${label} must be an absolute HTTP(S) URL.`);
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`${label} must be an absolute HTTP(S) URL.`);
  }
}

function validateDate(value: string, label: string): void {
  if (!ISO_DATE.test(value)) throw new Error(`${label} must use YYYY-MM-DD.`);
}

function validateClaimReferences(
  ownerId: string,
  ownerEntityId: string,
  referencedClaimIds: readonly string[],
  claimsById: ReadonlyMap<string, EvidenceClaimReference>,
): void {
  if (referencedClaimIds.length === 0) {
    throw new Error(`${ownerId} must reference at least one claimId.`);
  }
  const seen = new Set<string>();
  for (const claimId of referencedClaimIds) {
    if (seen.has(claimId)) throw new Error(`${ownerId} repeats claimId ${claimId}.`);
    seen.add(claimId);
    const claim = claimsById.get(claimId);
    if (!claim) throw new Error(`${ownerId} references unknown claimId ${claimId}.`);
    if (claim.entityId !== ownerEntityId) {
      throw new Error(`${ownerId} entityId does not match claimId ${claimId}.`);
    }
  }
}

function validateOmission(
  omission: DataVerificationEvidenceOmission,
  claimsById: ReadonlyMap<string, EvidenceClaimReference>,
): void {
  if ((omission as { kind: string }).kind !== 'source') {
    throw new Error(
      `${omission.omissionId} has unsupported kind ${(omission as { kind: string }).kind}.`,
    );
  }
  validateClaimReferences(
    omission.omissionId,
    omission.entityId,
    omission.claimIds,
    claimsById,
  );
  validateDate(omission.recordedAt, `${omission.omissionId} recordedAt`);
  validateHttpUrl(omission.sourceUrl, `${omission.omissionId} sourceUrl`);
  if (!omission.reason.trim()) throw new Error(`${omission.omissionId} must record a reason.`);
}

/** Validate manifest identity, kind metadata, and repository-local screenshot paths. */
export function validateDataVerificationEvidenceManifest(
  manifest: DataVerificationEvidenceManifest,
  claims: readonly EvidenceClaimReference[],
  options: EvidenceValidationOptions = {},
): void {
  const repositoryRoot = resolve(
    options.repositoryRoot ?? fileURLToPath(new URL('../..', import.meta.url)),
  );
  const evidenceRoot = resolve(repositoryRoot, 'docs/data-evidence');
  const fileExists = options.fileExists ?? existsSync;
  const claimsById = new Map(claims.map((claim) => [claim.claimId, claim]));
  const evidenceIds = new Set<string>();

  for (const evidence of manifest.evidence) {
    if (evidenceIds.has(evidence.evidenceId)) {
      throw new Error(`Duplicate evidenceId: ${evidence.evidenceId}`);
    }
    evidenceIds.add(evidence.evidenceId);
    validateClaimReferences(evidence.evidenceId, evidence.entityId, evidence.claimIds, claimsById);
    validateDate(evidence.capturedAt, `${evidence.evidenceId} capturedAt`);

    const absolutePath = resolve(repositoryRoot, evidence.path);
    const pathWithinEvidenceRoot = relative(evidenceRoot, absolutePath);
    if (
      pathWithinEvidenceRoot === ''
      || pathWithinEvidenceRoot.startsWith('..')
      || isAbsolute(pathWithinEvidenceRoot)
    ) {
      throw new Error(`${evidence.evidenceId} path must be inside docs/data-evidence.`);
    }
    if (!/\.(?:png|webp)$/i.test(evidence.path)) {
      throw new Error(`${evidence.evidenceId} path must end in .png or .webp.`);
    }
    if (!fileExists(absolutePath)) {
      throw new Error(`${evidence.evidenceId} screenshot does not exist: ${evidence.path}`);
    }

    if (evidence.kind === 'source') {
      validateHttpUrl(evidence.sourceUrl, `${evidence.evidenceId} sourceUrl`);
    } else if (evidence.kind === 'app') {
      if (
        !SUPPORTED_LOCALES.has(evidence.locale)
        || !evidence.viewport
        || !Number.isInteger(evidence.viewport.width)
        || evidence.viewport.width <= 0
        || (evidence.viewport.height !== undefined
          && (!Number.isInteger(evidence.viewport.height) || evidence.viewport.height <= 0))
      ) {
        throw new Error(`${evidence.evidenceId} app evidence requires locale and viewport metadata.`);
      }
    } else if ((evidence as { kind: string }).kind !== 'fieldwork') {
      throw new Error(
        `${evidence.evidenceId} has unsupported kind ${(evidence as { kind: string }).kind}.`,
      );
    }
  }

  const omissionIds = new Set<string>();
  for (const omission of manifest.omissions) {
    if (omissionIds.has(omission.omissionId)) {
      throw new Error(`Duplicate omissionId: ${omission.omissionId}`);
    }
    omissionIds.add(omission.omissionId);
    validateOmission(omission, claimsById);
  }
}
