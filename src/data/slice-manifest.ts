/**
 * Thin Slice Manifest for Region × FoodCulture content lifecycle (Issue #170).
 *
 * One small registry keyed by the existing demo candidate identity
 * (`RecommendationCandidate.id`) that keeps the lifecycle axes of every
 * Region × FoodCulture slice **explicitly separate**:
 *
 *   - maturity            — how complete the *content* is (research →
 *                           source_backed → playable → verified). This is NOT
 *                           a substitute for record-level verification.
 *   - visibility          — which Product surface may expose the slice
 *                           (`discover: hidden | preview | visible` and
 *                           `recommendationEligible`). Never inferred from
 *                           maturity.
 *   - releaseRole         — the slice's role in the current release/demo
 *                           (`none | secondary | primary`), release metadata
 *                           only, independently changeable.
 *
 * `enabled` is the #171 master release switch: a single `enabled: false`
 * change removes a slice from every production surface regardless of its other
 * flags. Unknown candidate ids fail closed (no exposure) — this registry is
 * the release authority.
 *
 * ## Critical invariants
 *
 * - Slice maturity != record `verificationStatus` != visibility != releaseRole.
 * - The manifest carries **no verification state**: record-level #129
 *   provenance / freshness / `verificationStatus` remains the sole authority.
 *   A `playable` slice's individual records stay `needs_confirmation` /
 *   unverified until the record layer says otherwise.
 * - A `hidden` / `research` slice can never resurface on production surfaces
 *   (fail-closed selectors) even though its canonical Story / Route / Spot data
 *   stays directly reachable.
 * - Changing `releaseRole` alone never reshapes shared domain / IA / routing /
 *   persistence.
 *
 * This is deliberately **not** a plugin framework / loader / CMS / Region Pack:
 * no dynamic discovery, no module API, no #131 adapter integration. Canonical
 * Story / Route / Place content stays in the existing seed records; the
 * manifest only adds lifecycle / visibility metadata. The evolution of #171's
 * release boundary into the Slice Manifest keeps one registry, not two.
 */
import type { RecommendationCandidate } from '../lib/recommendation';
import {
  DEMO_AKIRUNO_PRODUCE_CANDIDATE_ID,
  DEMO_FUSSA_SAKE_CANDIDATE_ID,
  DEMO_HACHIOJI_GINGER_CANDIDATE_ID,
  DEMO_OME_SAKE_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATE_ID,
} from './demo-recommendation';

/** Content maturity of a slice (independent of record-level verification). */
export type SliceMaturity = 'research' | 'source_backed' | 'playable' | 'verified';

/** Discover exposure state (independent of maturity and release role). */
export type SliceVisibility = 'hidden' | 'preview' | 'visible';

/** A slice's role in the current release (release metadata only). */
export type ReleaseRole = 'none' | 'primary' | 'secondary';

/** One slice's lifecycle / exposure policy. */
export interface SliceManifestEntry {
  /** Stable slice identity — the existing `RecommendationCandidate.id`. */
  candidateId: string;
  /**
   * Content maturity. `playable` / `source_backed` never imply record
   * verification; #129 record-level `verificationStatus` stays authoritative.
   */
  maturity: SliceMaturity;
  /**
   * Master release switch (#171): `false` removes the slice from every
   * production surface regardless of its other flags.
   */
  enabled: boolean;
  /** Release role in the current 8/23 release, independent of maturity. */
  releaseRole: ReleaseRole;
  /** Discover exposure: `visible` is the only production-visible state. */
  discover: SliceVisibility;
  /** Whether the slice may be selected by production recommendation. */
  recommendationEligible: boolean;
}

/**
 * The Slice Manifest registry, keyed by demo candidate identity.
 *
 * Team decision (unchanged from the 8/23 release): Okutama × Tokyo Wasabi is
 * the `primary` playable slice; the other source-backed journeys are
 * `secondary` playable slices. All five are production-visible and
 * recommendation-eligible. `playable` records their maturity — it is not a
 * verification claim.
 */
export const SLICE_MANIFEST: readonly SliceManifestEntry[] = [
  {
    candidateId: DEMO_RECOMMENDATION_CANDIDATE_ID,
    maturity: 'playable',
    enabled: true,
    releaseRole: 'primary',
    discover: 'visible',
    recommendationEligible: true,
  },
  {
    candidateId: DEMO_OME_SAKE_CANDIDATE_ID,
    maturity: 'playable',
    enabled: true,
    releaseRole: 'secondary',
    discover: 'visible',
    recommendationEligible: true,
  },
  {
    candidateId: DEMO_HACHIOJI_GINGER_CANDIDATE_ID,
    maturity: 'playable',
    enabled: true,
    releaseRole: 'secondary',
    discover: 'visible',
    recommendationEligible: true,
  },
  {
    candidateId: DEMO_FUSSA_SAKE_CANDIDATE_ID,
    maturity: 'playable',
    enabled: true,
    releaseRole: 'secondary',
    discover: 'visible',
    recommendationEligible: true,
  },
  {
    candidateId: DEMO_AKIRUNO_PRODUCE_CANDIDATE_ID,
    maturity: 'playable',
    enabled: true,
    releaseRole: 'secondary',
    discover: 'visible',
    recommendationEligible: true,
  },
];

function sliceEntryFor(
  candidateId: string,
  manifest: readonly SliceManifestEntry[] = SLICE_MANIFEST,
): SliceManifestEntry | undefined {
  return manifest.find((entry) => entry.candidateId === candidateId);
}

/** The slice's content maturity, or undefined for an unknown/unregistered id. */
export function maturityOf(
  candidateId: string,
  manifest: readonly SliceManifestEntry[] = SLICE_MANIFEST,
): SliceMaturity | undefined {
  return sliceEntryFor(candidateId, manifest)?.maturity;
}

/** The slice's declared Discover visibility, or undefined for an unknown id. */
export function discoverVisibilityOf(
  candidateId: string,
  manifest: readonly SliceManifestEntry[] = SLICE_MANIFEST,
): SliceVisibility | undefined {
  return sliceEntryFor(candidateId, manifest)?.discover;
}

/** The slice's release role, or undefined for an unknown/unregistered id. */
export function releaseRoleOf(
  candidateId: string,
  manifest: readonly SliceManifestEntry[] = SLICE_MANIFEST,
): ReleaseRole | undefined {
  return sliceEntryFor(candidateId, manifest)?.releaseRole;
}

/**
 * Production recommendation exposure: enabled AND recommendation-eligible
 * (fail-closed). The shared engine still applies its own readiness /
 * feasibility rules (`availability === 'ready'`) on top — architecture
 * unchanged (#170).
 */
export function isCandidateRecommendable(
  candidateId: string,
  manifest: readonly SliceManifestEntry[] = SLICE_MANIFEST,
): boolean {
  const entry = sliceEntryFor(candidateId, manifest);
  return entry?.enabled === true && entry.recommendationEligible === true;
}

/**
 * Production Discover exposure: enabled AND `discover === 'visible'` (fail-
 * closed). `preview` / `hidden` slices are never production-visible (#170).
 */
export function isCandidateDiscoverable(
  candidateId: string,
  manifest: readonly SliceManifestEntry[] = SLICE_MANIFEST,
): boolean {
  const entry = sliceEntryFor(candidateId, manifest);
  return entry?.enabled === true && entry.discover === 'visible';
}

/**
 * Result/recommendation candidate selection under the Slice Manifest. The
 * shared engine still applies its own readiness / feasibility rules on top.
 */
export function recommendableCandidates(
  candidates: readonly RecommendationCandidate[],
  manifest: readonly SliceManifestEntry[] = SLICE_MANIFEST,
): RecommendationCandidate[] {
  return candidates.filter((candidate) => isCandidateRecommendable(candidate.id, manifest));
}

/**
 * Discover playable-slice selection under the Slice Manifest. Consumers still
 * apply their own playability checks (ready journey) on the returned list.
 */
export function discoverableCandidates(
  candidates: readonly RecommendationCandidate[],
  manifest: readonly SliceManifestEntry[] = SLICE_MANIFEST,
): RecommendationCandidate[] {
  return candidates.filter((candidate) => isCandidateDiscoverable(candidate.id, manifest));
}

/**
 * Food-culture ids of manifest-managed slices that are NOT exposed on the
 * production Discover surface (disabled, `hidden`, or `preview`). They must not
 * resurface anywhere on Discover — including the editorial "other cultures"
 * section (#171) — because the manifest governs every appearance of a managed
 * slice. Ordinary editorial cultures without a managed candidate are
 * unaffected.
 */
export function hiddenManagedFoodCultureIds(
  candidates: readonly RecommendationCandidate[],
  manifest: readonly SliceManifestEntry[] = SLICE_MANIFEST,
): ReadonlySet<string> {
  return new Set(
    candidates
      .filter((candidate) => !isCandidateDiscoverable(candidate.id, manifest))
      .map((candidate) => candidate.foodCultureId),
  );
}
