/**
 * Centralized 8/23 release boundary (Issue #171).
 *
 * One small registry keyed by the existing demo candidate identity
 * (`RecommendationCandidate.id`) that controls whether each Region × FoodCulture
 * slice is exposed on production surfaces. It deliberately does not redesign the
 * recommendation engine or shared IA: it only gates the two production exposure
 * consumers — Result/recommendation candidate selection and Discover playable-
 * slice selection.
 *
 * Default release state (team decision, unchanged from current shipping):
 *   - Okutama × Tokyo Wasabi — enabled, primary,   recommendable, discoverable
 *   - Ome/Sawai × sake       — enabled, secondary, recommendable, discoverable
 *
 * `enabled` is the master switch: a single `enabled: false` change removes a
 * slice from both production surfaces regardless of its other flags.
 * `recommendable` / `discoverable` independently narrow per-surface exposure.
 * Unknown candidate ids fail closed (no exposure) — the registry is the release
 * authority.
 *
 * Canonical data / content / routes / i18n and direct Story / Route / Spot
 * access are untouched: `src/data/journey.ts` keeps resolving from the full
 * candidate list, so a hidden slice remains directly reachable and its focused
 * browser path stays usable while release exposure is off.
 *
 * Deliberately demo-scoped and small. Issue #170's Slice Manifest can later
 * extend this same registry with maturity/visibility metadata instead of
 * introducing a second competing registry.
 */
import type { RecommendationCandidate } from '../lib/recommendation';
import {
  DEMO_OME_SAKE_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATE_ID,
} from './demo-recommendation';

/** A slice's role in the current 8/23 release (primary MVP vs secondary slice). */
export type ReleaseRole = 'primary' | 'secondary';

/** One demo candidate's release exposure policy. */
export interface ReleaseConfigEntry {
  /** Stable demo candidate identity (`RecommendationCandidate.id`). */
  candidateId: string;
  /** Master release switch: false removes the slice from all production exposure. */
  enabled: boolean;
  /** Release role in the current 8/23 release, independent of content maturity. */
  releaseRole: ReleaseRole;
  /** Whether the slice may be selected by production recommendation. */
  recommendable: boolean;
  /** Whether the slice appears on production Discover. */
  discoverable: boolean;
}

/** The 8/23 release registry, keyed by demo candidate identity. */
export const RELEASE_CONFIG: readonly ReleaseConfigEntry[] = [
  {
    candidateId: DEMO_RECOMMENDATION_CANDIDATE_ID,
    enabled: true,
    releaseRole: 'primary',
    recommendable: true,
    discoverable: true,
  },
  {
    candidateId: DEMO_OME_SAKE_CANDIDATE_ID,
    enabled: true,
    releaseRole: 'secondary',
    recommendable: true,
    discoverable: true,
  },
];

function releaseEntryFor(
  candidateId: string,
  config: readonly ReleaseConfigEntry[] = RELEASE_CONFIG,
): ReleaseConfigEntry | undefined {
  return config.find((entry) => entry.candidateId === candidateId);
}

/** The candidate's release role, or undefined for an unknown/unregistered id. */
export function releaseRoleOf(
  candidateId: string,
  config: readonly ReleaseConfigEntry[] = RELEASE_CONFIG,
): ReleaseRole | undefined {
  return releaseEntryFor(candidateId, config)?.releaseRole;
}

/** Production recommendation exposure: enabled AND recommendable (fail-closed). */
export function isCandidateRecommendable(
  candidateId: string,
  config: readonly ReleaseConfigEntry[] = RELEASE_CONFIG,
): boolean {
  const entry = releaseEntryFor(candidateId, config);
  return entry?.enabled === true && entry.recommendable === true;
}

/** Production Discover exposure: enabled AND discoverable (fail-closed). */
export function isCandidateDiscoverable(
  candidateId: string,
  config: readonly ReleaseConfigEntry[] = RELEASE_CONFIG,
): boolean {
  const entry = releaseEntryFor(candidateId, config);
  return entry?.enabled === true && entry.discoverable === true;
}

/**
 * Result/recommendation candidate selection under the release boundary. The
 * shared engine still applies its own readiness / feasibility rules on top.
 */
export function recommendableCandidates(
  candidates: readonly RecommendationCandidate[],
  config: readonly ReleaseConfigEntry[] = RELEASE_CONFIG,
): RecommendationCandidate[] {
  return candidates.filter((candidate) => isCandidateRecommendable(candidate.id, config));
}

/**
 * Discover playable-slice selection under the release boundary. Consumers still
 * apply their own playability checks (ready journey) on the returned list.
 */
export function discoverableCandidates(
  candidates: readonly RecommendationCandidate[],
  config: readonly ReleaseConfigEntry[] = RELEASE_CONFIG,
): RecommendationCandidate[] {
  return candidates.filter((candidate) => isCandidateDiscoverable(candidate.id, config));
}

/**
 * Food-culture ids of release-managed slices that are NOT exposed on the
 * production Discover surface (disabled or `discoverable: false`). They must not
 * resurface anywhere on Discover — including the editorial "other cultures"
 * section (#171) — because the release boundary governs every appearance of a
 * managed slice. Ordinary editorial cultures without a managed candidate are
 * unaffected.
 */
export function hiddenManagedFoodCultureIds(
  candidates: readonly RecommendationCandidate[],
  config: readonly ReleaseConfigEntry[] = RELEASE_CONFIG,
): ReadonlySet<string> {
  return new Set(
    candidates
      .filter((candidate) => !isCandidateDiscoverable(candidate.id, config))
      .map((candidate) => candidate.foodCultureId),
  );
}
