import {
  SUBMISSION_ASSET_RIGHTS_INPUTS,
  type AiMaterialDeclaration,
  type SubmissionAssetRightsInput,
  type SubmissionAssetScope,
} from '../data/submission-rights';

/** Separate from factual verification: this only describes submission rights evidence. */
export type SubmissionRightsStatus = 'ready' | 'needs_confirmation' | 'blocked';

export interface SubmissionAssetRightsRecord extends SubmissionAssetRightsInput {
  status: SubmissionRightsStatus;
  missing: readonly ('creatorOrOwner' | 'permissionBasis' | 'sourceUrl' | 'allowedScopes' | 'attribution' | 'aiMaterialDeclaration')[];
  allowedForSubmission: boolean;
  allowedForPublicDemo: boolean;
}

export interface SubmissionRightsSummary {
  total: number;
  statusCounts: Readonly<Record<SubmissionRightsStatus, number>>;
  submissionBlockedPaths: readonly string[];
  publicDemoBlockedPaths: readonly string[];
}

function hasScope(input: SubmissionAssetRightsInput, scope: SubmissionAssetScope): boolean {
  return input.allowedScopes.includes(scope);
}

function aiRightsAreDocumented(declaration: AiMaterialDeclaration): boolean {
  return declaration === 'not_applicable'
    || declaration === 'declared_no_ai'
    || declaration === 'declared_with_source_rights';
}

export function assessSubmissionAssetRights(
  input: SubmissionAssetRightsInput,
): SubmissionAssetRightsRecord {
  const missing: SubmissionAssetRightsRecord['missing'][number][] = [];
  if (!input.creatorOrOwner?.trim()) missing.push('creatorOrOwner');
  if (!input.permissionBasis?.trim()) missing.push('permissionBasis');
  if (!input.sourceUrl?.trim()) missing.push('sourceUrl');
  if (!input.allowedScopes.length) missing.push('allowedScopes');
  if (input.attributionStatus !== 'not_required'
    && !(input.attributionStatus === 'fulfilled' && input.attributionRequirement?.trim())) {
    missing.push('attribution');
  }
  if (!aiRightsAreDocumented(input.aiMaterialDeclaration)) {
    missing.push('aiMaterialDeclaration');
  }

  const status: SubmissionRightsStatus = input.blockReason
    || input.aiMaterialDeclaration === 'source_rights_unknown'
    || input.attributionStatus === 'missing'
    ? 'blocked'
    : missing.length > 0
      ? 'needs_confirmation'
      : 'ready';
  const allowedForSubmission = status === 'ready' && hasScope(input, 'hackathon_submission');
  const allowedForPublicDemo = status === 'ready' && hasScope(input, 'public_web');

  return { ...input, status, missing, allowedForSubmission, allowedForPublicDemo };
}

export function buildSubmissionAssetRightsInventory(
  inputs: readonly SubmissionAssetRightsInput[] = SUBMISSION_ASSET_RIGHTS_INPUTS,
): readonly SubmissionAssetRightsRecord[] {
  const paths = new Set<string>();
  return [...inputs]
    .sort((left, right) => left.path.localeCompare(right.path))
    .map((input) => {
      if (paths.has(input.path)) {
        throw new Error(`Duplicate submission-asset rights entry: ${input.path}`);
      }
      paths.add(input.path);
      return assessSubmissionAssetRights(input);
    });
}

export function summarizeSubmissionAssetRights(
  inventory: readonly SubmissionAssetRightsRecord[],
): SubmissionRightsSummary {
  const statusCounts: Record<SubmissionRightsStatus, number> = {
    ready: 0,
    needs_confirmation: 0,
    blocked: 0,
  };
  for (const asset of inventory) statusCounts[asset.status] += 1;
  return {
    total: inventory.length,
    statusCounts,
    submissionBlockedPaths: inventory
      .filter((asset) => asset.intendedScopes.includes('hackathon_submission') && !asset.allowedForSubmission)
      .map((asset) => asset.path),
    publicDemoBlockedPaths: inventory
      .filter((asset) => asset.intendedScopes.includes('public_web') && !asset.allowedForPublicDemo)
      .map((asset) => asset.path),
  };
}
