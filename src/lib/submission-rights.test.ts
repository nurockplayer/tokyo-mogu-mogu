import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DATA_VERIFICATION_EVIDENCE_MANIFEST } from '../data/data-verification-evidence-manifest';
import {
  COMPETITION_RULES_AUTHORITY,
  PROJECT_ASSET_RIGHTS_MANIFEST,
  assessProjectAssetRights,
  buildProjectAssetRightsSummary,
  buildSubmissionReadinessChecks,
  sourceSubmissionRightsStatus,
  type ProjectAssetRightsGroup,
} from './submission-rights';

const REPOSITORY_ROOT = resolve(import.meta.dirname, '../..');
const AUDITED_ASSET_DIRECTORIES = [
  'src/assets/fieldwork',
  'src/assets/figma',
  'src/assets/figma-296',
  'src/assets/figma-360',
  'src/assets/netlify-parity',
] as const;

function mediaFiles(directory: string): string[] {
  const absoluteDirectory = resolve(REPOSITORY_ROOT, directory);
  return readdirSync(absoluteDirectory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(?:gif|jpe?g|png|svg|webp)$/i.test(entry.name))
    .map((entry) => {
      const parentPath = entry.parentPath.replace(`${REPOSITORY_ROOT}/`, '');
      return `${parentPath}/${entry.name}`;
    })
    .sort();
}

function syntheticAsset(
  overrides: Partial<ProjectAssetRightsGroup>,
): ProjectAssetRightsGroup {
  return {
    id: 'synthetic-team-asset',
    label: 'Synthetic team asset',
    paths: ['src/assets/synthetic/team-owned.png'],
    origin: 'team_created',
    currentUse: ['current_runtime', 'submission_capture'],
    creatorOrOwner: 'TOKYO MOGU MOGU team',
    permissionBasis: 'Team-created and approved for hackathon submission.',
    attribution: 'Not required',
    allowedScopes: ['project_demo', 'hackathon_submission', 'public_web'],
    aiUse: 'none',
    sourceMaterialRights: 'not_applicable',
    reviewStatus: 'ready',
    note: 'Synthetic fixture.',
    supportingLinks: [],
    ...overrides,
  };
}

describe('submission rights projection (#370)', () => {
  it('records the two official 2026 authorities and current recheck nuance', () => {
    expect(COMPETITION_RULES_AUTHORITY.checkedAt).toBe('2026-08-30');
    expect(COMPETITION_RULES_AUTHORITY.sources).toEqual([
      expect.objectContaining({ url: 'https://odhackathon.metro.tokyo.lg.jp/recruitment/' }),
      expect.objectContaining({ url: 'https://odh-tokyo2026.code4japan.org/' }),
    ]);
    expect(COMPETITION_RULES_AUTHORITY.versionNote).toContain('参加者ガイドブック');
    expect(COMPETITION_RULES_AUTHORITY.versionNote).toContain('⑦');
  });

  it('keeps public official/business URLs non-Open-Data while recognizing licensed Open Data', () => {
    expect(sourceSubmissionRightsStatus({
      sourceType: 'open_data',
      license: 'CC BY 4.0',
    })).toBe('ready');
    expect(sourceSubmissionRightsStatus({
      sourceType: 'open_data',
      license: 'ODbL 1.0',
    })).toBe('ready');
    expect(sourceSubmissionRightsStatus({
      sourceType: 'official_web',
      url: 'https://example.metro.tokyo.lg.jp/public-page',
    })).toBe('needs_confirmation');
    expect(sourceSubmissionRightsStatus({
      sourceType: 'business',
      url: 'https://maps.google.com/example',
    })).toBe('needs_confirmation');
  });

  it('covers every audited repository asset and every current Board evidence capture', () => {
    const manifestPaths = new Set(PROJECT_ASSET_RIGHTS_MANIFEST.flatMap((item) => item.paths));
    const auditedPaths = AUDITED_ASSET_DIRECTORIES.flatMap(mediaFiles).sort();

    expect([...manifestPaths].filter((path) => path.startsWith('src/assets/netlify-parity/')))
      .toHaveLength(44);
    expect(auditedPaths.filter((path) => !manifestPaths.has(path))).toEqual([]);
    expect(DATA_VERIFICATION_EVIDENCE_MANIFEST.evidence.every(
      (evidence) => manifestPaths.has(evidence.path),
    )).toBe(true);
  });

  it('keeps current unresolved repository groups visible and deterministic', () => {
    const summary = buildProjectAssetRightsSummary(PROJECT_ASSET_RIGHTS_MANIFEST);
    const netlify = PROJECT_ASSET_RIGHTS_MANIFEST.find((item) => item.id === 'netlify-parity');
    const fieldwork = PROJECT_ASSET_RIGHTS_MANIFEST.find((item) => item.id === 'fieldwork-okutama');
    const figma = PROJECT_ASSET_RIGHTS_MANIFEST.find((item) => item.id === 'figma-core');

    expect(netlify).toMatchObject({ reviewStatus: 'blocked', aiUse: 'unknown' });
    expect(netlify?.paths).toHaveLength(44);
    expect(netlify?.allowedScopes).toEqual([]);
    expect(fieldwork).toMatchObject({
      reviewStatus: 'needs_confirmation',
      allowedScopes: ['project_demo'],
      aiUse: 'none',
    });
    expect(figma).toMatchObject({
      reviewStatus: 'needs_confirmation',
      sourceMaterialRights: 'unknown',
    });
    expect(summary).toEqual(buildProjectAssetRightsSummary([...PROJECT_ASSET_RIGHTS_MANIFEST].reverse()));
    expect(summary.fileCounts.blocked).toBeGreaterThanOrEqual(44);
    expect(summary.submissionReady).toBe(false);
  });

  it('keeps provider/capture compliance deterministic and separate from source classification', () => {
    const sources = [
      {
        name: 'Google Maps provider point',
        sourceType: 'business' as const,
        license: 'Google Maps terms apply; not open data.',
        rightsStatus: 'needs_confirmation' as const,
        coordinateProvider: true,
        evidenceState: 'omitted' as const,
      },
      {
        name: 'Tokyo Open Data',
        sourceType: 'open_data' as const,
        license: 'CC BY 4.0',
        rightsStatus: 'ready' as const,
        coordinateProvider: false,
        evidenceState: 'not_recorded' as const,
      },
    ];

    const checks = buildSubmissionReadinessChecks(sources);
    expect(checks.find((check) => check.id === 'representative-open-data')).toMatchObject({
      status: 'ready',
    });
    expect(checks.find((check) => check.id === 'source-classification')?.summary)
      .toContain('Open Dataとは別種別');
    expect(checks.find((check) => check.id === 'map-providers')).toMatchObject({
      status: 'ready',
    });
    expect(buildSubmissionReadinessChecks([...sources].reverse())).toEqual(checks);
  });

  it('allows documented team-owned media without changing factual verification semantics', () => {
    expect(assessProjectAssetRights(syntheticAsset({}))).toBe('ready');
  });

  it('fails closed for AI/composited media with unknown source-material rights', () => {
    expect(assessProjectAssetRights(syntheticAsset({
      aiUse: 'composited',
      sourceMaterialRights: 'unknown',
      reviewStatus: 'ready',
    }))).toBe('blocked');
    expect(assessProjectAssetRights(syntheticAsset({
      aiUse: 'generated',
      sourceMaterialRights: 'unknown',
      reviewStatus: 'needs_confirmation',
    }))).toBe('blocked');
  });

  it('contains rights metadata only, not a duplicate venue factual truth table', () => {
    for (const item of PROJECT_ASSET_RIGHTS_MANIFEST) {
      expect(item).not.toHaveProperty('address');
      expect(item).not.toHaveProperty('hours');
      expect(item).not.toHaveProperty('phone');
      expect(item).not.toHaveProperty('coordinates');
      expect(item).not.toHaveProperty('verificationStatus');
    }
  });
});
