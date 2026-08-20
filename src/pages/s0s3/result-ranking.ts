import type { CandidateEvaluation, RecommendationDecision } from '../../lib/recommendation';

export const RESULT_RANKING_LIMIT = 3;

/**
 * Builds the visible Result ranking without exposing internal scores.
 *
 * A MOGU reopen supplies its recorded evaluation as `preferred`; it remains
 * first and the remaining cards come from the original deterministic ranking.
 * This preserves history identity while avoiding a fresh recommendation.
 */
export function buildResultRanking(
  decision: RecommendationDecision,
  preferred: CandidateEvaluation | undefined = decision.selected,
): readonly CandidateEvaluation[] {
  if (!preferred) return [];

  const seen = new Set<string>();
  return [preferred, ...decision.ranked]
    .filter((evaluation) => {
      if (!evaluation.eligible || seen.has(evaluation.candidate.id)) return false;
      seen.add(evaluation.candidate.id);
      return true;
    })
    .slice(0, RESULT_RANKING_LIMIT);
}
