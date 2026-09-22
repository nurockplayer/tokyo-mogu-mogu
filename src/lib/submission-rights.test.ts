import { describe, expect, it } from 'vitest';
import { discoverSubmissionAssets } from '../../scripts/submission-inventory';
import {
  DISCOVERED_SUBMISSION_ASSET_PATHS,
  SUBMISSION_ASSET_RIGHTS_INPUTS,
  type SubmissionAssetRightsInput,
} from '../data/submission-rights';
import {
  assessSubmissionAssetRights,
  buildSubmissionAssetRightsInventory,
  summarizeSubmissionAssetRights,
} from './submission-rights';

function input(overrides: Partial<SubmissionAssetRightsInput> = {}): SubmissionAssetRightsInput {
  return {
    path: 'src/assets/example.png',
    origin: 'team_created',
    intendedScopes: ['project_demo', 'hackathon_submission', 'public_web'],
    allowedScopes: [],
    attributionStatus: 'unknown',
    creatorOrOwner: null,
    permissionBasis: null,
    attributionRequirement: null,
    aiMaterialDeclaration: 'not_declared',
    sourceUrl: null,
    reviewedAt: '2026-09-22',
    note: 'test',
    ...overrides,
  };
}

describe('submission asset rights', () => {
  it('covers each discovered asset path once with an exact stable inventory entry', () => {
    const paths = SUBMISSION_ASSET_RIGHTS_INPUTS.map((asset) => asset.path);
    expect(paths).toEqual(DISCOVERED_SUBMISSION_ASSET_PATHS);
    expect([...paths].sort()).toEqual(discoverSubmissionAssets());
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain('src/assets/netlify-parity/home_hero.jpg');
    expect(paths).toContain('src/assets/fieldwork/okutama/office-960.webp');
    expect(paths).toContain('src/assets/figma/story-hero.png');
  });

  it('keeps fieldwork and Figma assets unapproved until owner, permission, and AI declarations exist', () => {
    for (const path of [
      'src/assets/fieldwork/okutama/office-960.webp',
      'src/assets/figma/story-hero.png',
      'src/assets/figma-296/nav-discover.svg',
    ]) {
      const asset = assessSubmissionAssetRights(
        SUBMISSION_ASSET_RIGHTS_INPUTS.find((candidate) => candidate.path === path)!,
      );
      expect(asset.status).toBe('needs_confirmation');
      expect(asset.allowedForSubmission).toBe(false);
    }
  });

  it('fails closed for the Netlify reference bundle', () => {
    const asset = assessSubmissionAssetRights(
      SUBMISSION_ASSET_RIGHTS_INPUTS.find((candidate) =>
        candidate.path === 'src/assets/netlify-parity/home_hero.jpg')!,
    );
    expect(asset.status).toBe('blocked');
    expect(asset.allowedForSubmission).toBe(false);
    expect(asset.allowedForPublicDemo).toBe(false);
  });

  it('blocks AI/composited material when source-material rights are unknown', () => {
    expect(assessSubmissionAssetRights(input({
      creatorOrOwner: 'Team',
      permissionBasis: 'Team-created asset record',
      aiMaterialDeclaration: 'source_rights_unknown',
    })).status).toBe('blocked');
  });

  it('can clear a documented team-owned asset without changing factual verification', () => {
    const asset = assessSubmissionAssetRights(input({
      creatorOrOwner: 'TOKYO MOGU MOGU team',
      permissionBasis: 'Written team authorization for hackathon submission and public presentation',
      aiMaterialDeclaration: 'declared_no_ai',
      allowedScopes: ['hackathon_submission', 'public_web'],
      sourceUrl: 'https://example.com/written-team-authorization',
      attributionStatus: 'not_required',
    }));
    expect(asset.status).toBe('ready');
    expect(asset.allowedForSubmission).toBe(true);
    expect(asset.allowedForPublicDemo).toBe(true);
  });

  it('does not mistake intended scope for a grant or missing attribution for clearance', () => {
    const documented = input({
      creatorOrOwner: 'Team', permissionBasis: 'Project demo only',
      sourceUrl: 'https://example.com/grant', allowedScopes: ['project_demo'],
      attributionStatus: 'not_required', aiMaterialDeclaration: 'declared_no_ai',
    });
    expect(assessSubmissionAssetRights(documented).allowedForSubmission).toBe(false);
    expect(assessSubmissionAssetRights({ ...documented, attributionStatus: 'missing' }).status).toBe('blocked');
    expect(assessSubmissionAssetRights({ ...documented, allowedScopes: [] }).status).toBe('needs_confirmation');
  });

  it('is deterministic and makes the public-demo queue explicit', () => {
    const inventory = buildSubmissionAssetRightsInventory([
      input({ path: 'src/assets/b.png' }),
      input({ path: 'src/assets/a.png', blockReason: 'No permission record.' }),
    ]);
    expect(inventory.map((asset) => asset.path)).toEqual(['src/assets/a.png', 'src/assets/b.png']);
    const summary = summarizeSubmissionAssetRights(inventory);
    expect(summary.statusCounts).toEqual({ ready: 0, needs_confirmation: 1, blocked: 1 });
    expect(summary.publicDemoBlockedPaths).toEqual(['src/assets/a.png', 'src/assets/b.png']);
  });
});
