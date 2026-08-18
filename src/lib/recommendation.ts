/**
 * Explainable recommendation contract (Issue #123).
 *
 * The durable contract ranks caller-supplied Tokyo Region × FoodCulture /
 * journey candidates. It contains no Okutama or Tokyo Wasabi identifiers; the
 * the current demo/release data supplies production-ready candidates for
 * Okutama × Tokyo Wasabi, Ome/Sawai × sake, and Hachioji × ginger.
 */
import type { FoodProfile } from './food-profile';
import type {
  BaseArea,
  Experience,
  ExplorationAnswers,
  Interest,
  Taste,
  TravelTime,
  TripDuration,
} from './exploration';

export type CandidateAvailability = 'ready' | 'unavailable';

export type TourismDispersionEvidence =
  | { status: 'under-visited' | 'neutral'; sourceRef: string }
  | { status: 'unknown' };

/** Data/config needed to evaluate one reusable Region × FoodCulture candidate. */
export interface RecommendationCandidate {
  id: string;
  regionId: string;
  foodCultureId: string;
  journeyId?: string;
  availability: CandidateAvailability;
  tastes: readonly Taste[];
  experiences: readonly Experience[];
  interests: readonly Interest[];
  durations: readonly TripDuration[];
  /** Known minimum travel-time bucket from each supported starting area. */
  travelTimeByBaseArea: Partial<Record<BaseArea, TravelTime>>;
  /** Evidence is structurally required unless the status is `unknown`. */
  tourismDispersion: TourismDispersionEvidence;
}

export type HardExclusionCode =
  | 'candidate-unavailable'
  | 'travel-time-infeasible'
  | 'duration-infeasible';

export interface HardExclusion {
  code: HardExclusionCode;
  values: readonly string[];
}

export type RankingFactorCode =
  | 'taste-match'
  | 'experience-match'
  | 'interest-match'
  | 'duration-match'
  | 'travel-time-fit'
  | 'tourism-dispersion';

export interface RankingFactor {
  code: RankingFactorCode;
  /** Internal deterministic points, not a user-visible percentage. */
  points: number;
  values: readonly string[];
  evidenceRefs?: readonly string[];
}

export type RecommendationCautionCode =
  | 'dietary-confirmation-required'
  | 'travel-time-unknown';

export interface RecommendationCaution {
  code: RecommendationCautionCode;
  values: readonly string[];
}

export interface RecommendationExplanation {
  /** Bounded positive/objective reasons suitable for localized Result copy. */
  reasons: readonly RankingFactor[];
  /** Bounded limitations; these are never converted into positive reasons. */
  cautions: readonly RecommendationCaution[];
}

export interface CandidateEvaluation {
  candidate: RecommendationCandidate;
  eligible: boolean;
  hardExclusions: readonly HardExclusion[];
  rankingFactors: readonly RankingFactor[];
  /** Additive ordering value only; never a probability or match percentage. */
  score: number;
  explanation: RecommendationExplanation;
}

export interface RecommendationDecision {
  selected?: CandidateEvaluation;
  ranked: readonly CandidateEvaluation[];
  excluded: readonly CandidateEvaluation[];
}

export const MAX_RECOMMENDATION_REASONS = 3;
export const MAX_RECOMMENDATION_CAUTIONS = 2;

// One matched user preference is intentionally worth more than the complete
// tourism-dispersion bonus. The objective can break close ties, but cannot
// overpower a preference match and is never evaluated before hard exclusions.
const PREFERENCE_POINT = 4;
const FEASIBILITY_FIT_POINTS = 3;
export const TOURISM_DISPERSION_BONUS = 1;

const TRAVEL_TIME_ORDER: Record<TravelTime, number> = {
  'within-30': 0,
  'within-60': 1,
  'over-60': 2,
};

function intersection<T extends string>(selected: readonly T[], offered: readonly T[]): T[] {
  const offeredSet = new Set(offered);
  return selected.filter((value) => offeredSet.has(value));
}

function hasDietaryConsiderations(profile: FoodProfile): boolean {
  return profile.dietary.length > 0 || profile.dietaryOther.trim().length > 0;
}

function evaluateCandidate(
  profile: FoodProfile,
  answers: ExplorationAnswers,
  candidate: RecommendationCandidate,
): CandidateEvaluation {
  const hardExclusions: HardExclusion[] = [];

  if (candidate.availability !== 'ready') {
    hardExclusions.push({ code: 'candidate-unavailable', values: [] });
  }

  if (answers.duration !== null && !candidate.durations.includes(answers.duration)) {
    hardExclusions.push({ code: 'duration-infeasible', values: [answers.duration] });
  }

  const knownTravelTime =
    answers.baseArea === null ? undefined : candidate.travelTimeByBaseArea[answers.baseArea];
  if (
    answers.travelTime !== null &&
    knownTravelTime !== undefined &&
    TRAVEL_TIME_ORDER[knownTravelTime] > TRAVEL_TIME_ORDER[answers.travelTime]
  ) {
    hardExclusions.push({
      code: 'travel-time-infeasible',
      values: [knownTravelTime, answers.travelTime],
    });
  }

  if (hardExclusions.length > 0) {
    return {
      candidate,
      eligible: false,
      hardExclusions,
      rankingFactors: [],
      score: 0,
      explanation: { reasons: [], cautions: [] },
    };
  }

  const rankingFactors: RankingFactor[] = [];
  const addPreferenceFactor = <T extends string>(
    code: RankingFactorCode,
    selected: readonly T[],
    offered: readonly T[],
  ) => {
    const matches = intersection(selected, offered);
    if (matches.length > 0) {
      rankingFactors.push({ code, points: matches.length * PREFERENCE_POINT, values: matches });
    }
  };

  addPreferenceFactor('taste-match', answers.tastes, candidate.tastes);
  addPreferenceFactor('experience-match', answers.experiences, candidate.experiences);
  addPreferenceFactor('interest-match', answers.interests, candidate.interests);

  if (answers.duration !== null) {
    rankingFactors.push({
      code: 'duration-match',
      points: FEASIBILITY_FIT_POINTS,
      values: [answers.duration],
    });
  }

  if (answers.travelTime !== null && knownTravelTime !== undefined) {
    rankingFactors.push({
      code: 'travel-time-fit',
      points: FEASIBILITY_FIT_POINTS,
      values: [knownTravelTime],
    });
  }

  if (
    candidate.tourismDispersion.status === 'under-visited' &&
    candidate.tourismDispersion.sourceRef.trim().length > 0
  ) {
    rankingFactors.push({
      code: 'tourism-dispersion',
      points: TOURISM_DISPERSION_BONUS,
      values: [candidate.regionId],
      evidenceRefs: [candidate.tourismDispersion.sourceRef],
    });
  }

  const cautions: RecommendationCaution[] = [];
  if (hasDietaryConsiderations(profile)) {
    cautions.push({
      code: 'dietary-confirmation-required',
      values: [...profile.dietary, ...(profile.dietaryOther.trim() ? ['other'] : [])],
    });
  }
  if (answers.baseArea !== null && answers.travelTime !== null && knownTravelTime === undefined) {
    cautions.push({ code: 'travel-time-unknown', values: [answers.baseArea] });
  }

  return {
    candidate,
    eligible: true,
    hardExclusions: [],
    rankingFactors,
    score: rankingFactors.reduce((sum, factor) => sum + factor.points, 0),
    explanation: {
      reasons: rankingFactors.slice(0, MAX_RECOMMENDATION_REASONS),
      cautions: cautions.slice(0, MAX_RECOMMENDATION_CAUTIONS),
    },
  };
}

/**
 * Filter → rank → select, with a stable candidate-id tie-break.
 *
 * The caller owns candidate generation and production-readiness. The fixed
 * golden-path answers match the wasabi profile most strongly, so passing the
 * configured candidates still yields the deterministic 8/23 result; other
 * answer sets exercise additional journeys without changing this code.
 */
export function recommendCandidates(
  profile: FoodProfile,
  answers: ExplorationAnswers,
  candidates: readonly RecommendationCandidate[],
): RecommendationDecision {
  const evaluations = candidates.map((candidate) => evaluateCandidate(profile, answers, candidate));
  const ranked = evaluations
    .filter((evaluation) => evaluation.eligible)
    .sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      return a.candidate.id < b.candidate.id ? -1 : a.candidate.id > b.candidate.id ? 1 : 0;
    });

  return {
    selected: ranked[0],
    ranked,
    excluded: evaluations.filter((evaluation) => !evaluation.eligible),
  };
}

/**
 * Resolve a historical MOGU result without re-ranking it into another
 * candidate. Legacy entries created before #123 have only a food-culture id.
 */
export function resolveHistoricalRecommendation(
  decision: RecommendationDecision,
  candidateId: string | null,
  legacyFoodCultureId: string | null,
): CandidateEvaluation | undefined {
  if (candidateId) {
    return decision.ranked.find((evaluation) => evaluation.candidate.id === candidateId);
  }
  if (legacyFoodCultureId) {
    return decision.ranked.find(
      (evaluation) => evaluation.candidate.foodCultureId === legacyFoodCultureId,
    );
  }
  return undefined;
}
