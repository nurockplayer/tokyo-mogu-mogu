/**
 * Result page (Issue #78 reframe of S3; Issue #217 Phase 1).
 *
 * Selects and ranks through the reusable #123 recommendation contract. The
 * first card is the selected journey; the next two are real, release-eligible
 * alternatives from the same deterministic decision (Issue #255). Phase 1
 * keeps Okutama × Tokyo Wasabi as the default golden path while the durable
 * Product contract remains geography-independent.
 * The result reflects the durable Food Profile (dietary-consideration state) +
 * the current-trip Exploration answers (match-reason tags). On successful
 * result creation it hands off to the MOGU Recent contract (#94).
 *
 * Internal scores are ordering-only and are never exposed as percentages.
 * Every visible journey routes to its own Story identity. The dietary
 * disclaimer remains recommendation-only, never a safety guarantee.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import {
  DEMO_RECOMMENDATION_CANDIDATE_ID,
  buildJourneyPresentation,
  demoRecommendationMatchTags,
  getFoodCultureById,
  getRouteById,
  places,
} from '../../data';
import { FoodCultureImage } from '../../components/FoodCultureImage';
import { JourneyMeta } from '../../components/JourneyCard';
import { useI18n } from '../../i18n';
import { EmptyState, Tag, type TagTone } from '../../ui';
import { fillTemplate, type MatchTagKey } from '../../lib/exploration';
import {
  foodProfileDietaryState,
  type FoodProfileDietaryState,
} from '../../lib/food-profile';
import {
  recommendCandidates,
  resolveHistoricalRecommendation,
  type CandidateEvaluation,
} from '../../lib/recommendation';
import { beginNewExploration, loadExplorationAnswers } from './exploration-session';
import { loadFoodProfile } from '../../lib/food-profile-storage';
import { loadNickname } from '../../lib/nickname';
import { phase1RecommendableCandidates } from './phase1-exploration';
import { recordMoguRecent } from '../../lib/mogu-recent';
import { completeGuidedTutorial, isGuidedTutorialActive } from './tutorial-session';
import { buildResultRanking } from './result-ranking';
import { type LocaleKey } from '../../i18n/resources';
import { foodCultureKey, routeAreaKey } from '../../i18n/data-content';
import wasabiHero from '../../assets/figma/story-hero.png';
import './onboarding.css';

/** Match-tag key → i18n copy key + tone. */
const TAG_COPY: Record<MatchTagKey, { labelKey: LocaleKey; tone: TagTone }> = {
  'grate-fresh': { labelKey: 's3TagGrateFresh', tone: 'success' },
  'stream-fresh': { labelKey: 's3TagStreamFresh', tone: 'info' },
  'meet-maker': { labelKey: 's3TagMeetMaker', tone: 'info' },
  'buy-gift': { labelKey: 's3TagBuyGift', tone: 'info' },
  'make-craft': { labelKey: 's3TagMakeCraft', tone: 'info' },
  'nature-valley': { labelKey: 's3TagNature', tone: 'info' },
  'tradition-edo': { labelKey: 's3TagTradition', tone: 'info' },
  'daily-life': { labelKey: 's3TagDaily', tone: 'info' },
  'half-day': { labelKey: 's3TagHalfDay', tone: 'info' },
  'full-day': { labelKey: 's3TagFullDay', tone: 'info' },
};

/** Insert the selected FoodCulture name without coupling the shared CTA to demo data. */
function resultStoryCta(template: string, foodCultureName: string): string {
  return template.replace('{name}', foodCultureName);
}

/**
 * Result → Story href. Always forwards the canonical candidate id (#123) so the
 * Story → Route flow keeps resolving the recorded journey; MOGU reopen re-adds
 * the `backTo=/mogu` context so Back returns to history, never a fresh result.
 */
function storyHref(foodCultureId: string, candidateId: string, isReopen: boolean): string {
  const params = new URLSearchParams();
  if (isReopen) params.set('backTo', '/mogu');
  params.set('candidateId', candidateId);
  return `/story/${foodCultureId}?${params.toString()}`;
}

export function ResultPage() {
  const { t } = useI18n();
  const [searchParams] = useSearchParams();

  // MOGU recent cards reopen this page with `?from=mogu` (Issue #94). A reopen
  // restores the stored Exploration answers (already done by MoguPage before
  // navigation) and is NOT a new recommendation: it must not re-record Recent,
  // and its Story CTA must carry the MOGU back context so back returns to MOGU.
  const isReopen = searchParams.get('from') === 'mogu';
  const reopenCandidateId = searchParams.get('candidateId');
  const legacyReopenResultId = searchParams.get('resultId');

  const answers = useMemo(() => loadExplorationAnswers(), []);
  const profile = useMemo(() => loadFoodProfile(), []);
  const recommendableCandidateSet = useMemo(() => phase1RecommendableCandidates(), []);
  const availableJourneyCount = recommendableCandidateSet.filter(
    (candidate) => candidate.availability === 'ready' && candidate.journeyId,
  ).length;
  // Phase 1 reads the enabled recommendation candidates through the Slice
  // Manifest. The default answers still rank the Wasabi candidate first, while
  // distinct answers can select another source-backed journey.
  const decision = useMemo(
    () =>
      profile && answers
        ? recommendCandidates(profile, answers, recommendableCandidateSet)
        : null,
    [answers, profile, recommendableCandidateSet],
  );
  // MOGU is recommendation history, not a request to re-rank. New entries use
  // candidateId; legacy v1 entries fall back to the food-culture resultId. If
  // that historical candidate is no longer eligible/present, fail safely
  // instead of silently showing a different recommendation.
  const recommendationEvaluation = isReopen
    ? decision
      ? resolveHistoricalRecommendation(decision, reopenCandidateId, legacyReopenResultId)
      : undefined
    : decision?.selected;
  const recommendation = recommendationEvaluation?.candidate;
  const recommendedFoodCulture = recommendation
    ? getFoodCultureById(recommendation.foodCultureId)
    : undefined;
  const recommendedTitleKey = recommendation
    ? foodCultureKey(recommendation.foodCultureId, 'name')
    : undefined;
  const rankedResults = useMemo(
    () =>
      decision && recommendationEvaluation
        ? buildResultRanking(decision, recommendationEvaluation)
        : [],
    [decision, recommendationEvaluation],
  );
  const primaryTags = useMemo(
    () =>
      recommendationEvaluation
        ? demoRecommendationMatchTags(
            recommendationEvaluation.candidate.id,
            recommendationEvaluation.explanation.reasons,
          )
        : [],
    [recommendationEvaluation],
  );

  useEffect(() => {
    if (!isReopen && recommendationEvaluation && isGuidedTutorialActive()) {
      completeGuidedTutorial();
    }
  }, [isReopen, recommendationEvaluation]);
  // Preserve all three durable meanings: recorded restrictions, explicit
  // no-restrictions input, and guided/skipped input that was not evaluated.
  const dietaryState = useMemo<FoodProfileDietaryState>(() => {
    return profile === null ? 'not-evaluated' : foodProfileDietaryState(profile);
  }, [profile]);
  const hasDietaryConsiderations = dietaryState === 'restrictions-recorded';

  // First-time flow must set up the Food Profile before Exploration. A direct
  // visit with no durable profile redirects to setup instead of recommending.
  if (!profile) {
    return <Navigate to="/food-profile" replace />;
  }

  // A Result is only valid after the current-trip Exploration is complete.
  // Direct/stale URLs must not present a recommendation without that context.
  if (!answers) {
    return <Navigate to="/explore" replace />;
  }

  // Local prototype-continuity nickname is reused in the closing MOGU message
  // (Issue #217 / #226); it is never an account/profile.
  const nickname = loadNickname();
  const greeting = nickname
    ? fillTemplate(t('s3GreetingName'), { name: nickname })
    : t('s3Greeting');

  return (
    <div className="tmm-page tmm-result">
      <section className="tmm-result__summary">
        <div className="fp-convo__msg fp-convo__msg--assistant tmm-result__greeting">
          <span className="fp-convo__avatar" aria-hidden="true">
            🌿
          </span>
          <div className="fp-convo__bubble">
            <p className="fp-convo__body">{greeting}</p>
          </div>
        </div>
        <h1 className="tmm-result__summary-title">{t('s3RevealTitle')}</h1>
        <p className="tmm-result__summary-desc">
          {fillTemplate(t('s3ResultCount'), { count: String(availableJourneyCount) })}
        </p>
      </section>

      {recommendedFoodCulture && recommendation && recommendedTitleKey && rankedResults.length > 0 ? (
        <>
          <section className="tmm-result-ranking" aria-labelledby="tmm-result-ranking-title">
            <h2 id="tmm-result-ranking-title" className="tmm-result-ranking__title">
              {t('s3RankingTitle')}
            </h2>
            <ol className="tmm-result-ranking__list">
              {rankedResults.map((evaluation, index) => (
                <li className="tmm-result-ranking__item" key={evaluation.candidate.id}>
                  <ResultJourneyCard
                    evaluation={evaluation}
                    rank={index + 1}
                    primary={index === 0}
                    dietaryState={dietaryState}
                    isReopen={isReopen}
                  />
                </li>
              ))}
            </ol>
          </section>

          <div className="tmm-result__actions">
            <Link
              to="/explore"
              className="tmm-btn tmm-btn--secondary tmm-btn--block"
              onClick={beginNewExploration}
            >
              {t('s3EditCta')}
            </Link>
          </div>

          {!isReopen ? (
            <ResultRecorder
              answers={answers}
              tags={primaryTags}
              hasDietaryConsiderations={hasDietaryConsiderations}
              candidateId={recommendation.id}
              resultId={recommendation.foodCultureId}
              titleKey={recommendedTitleKey}
            />
          ) : null}
        </>
      ) : (
        <EmptyFallback />
      )}
    </div>
  );
}

function ResultJourneyCard({
  evaluation,
  rank,
  primary,
  dietaryState,
  isReopen,
}: {
  evaluation: CandidateEvaluation;
  rank: number;
  primary: boolean;
  dietaryState: FoodProfileDietaryState;
  isReopen: boolean;
}) {
  const { locale, t } = useI18n();
  const candidate = evaluation.candidate;
  const foodCulture = getFoodCultureById(candidate.foodCultureId);
  const titleKey = foodCultureKey(candidate.foodCultureId, 'name');
  const descriptionKey = foodCultureKey(candidate.foodCultureId, 'description');
  const route = candidate.journeyId ? getRouteById(candidate.journeyId) : undefined;
  const areaKey = candidate.journeyId ? routeAreaKey(candidate.journeyId) : undefined;

  if (!foodCulture || !titleKey || !descriptionKey || !route) return null;

  const presentation = buildJourneyPresentation(candidate, foodCulture, route, places);
  const tags = demoRecommendationMatchTags(candidate.id, evaluation.explanation.reasons);
  const isGoldenPath = candidate.id === DEMO_RECOMMENDATION_CANDIDATE_ID;
  const hasUnknownTravelTime = evaluation.explanation.cautions.some(
    (caution) => caution.code === 'travel-time-unknown',
  );
  const title = isGoldenPath ? t('s3CardTitlePrimary') : t(titleKey);
  const storyAction = (
    <Link
      to={storyHref(candidate.foodCultureId, candidate.id, isReopen)}
      className={`tmm-result-card__action tmm-btn ${primary ? 'tmm-result-card__action--primary tmm-btn--primary' : 'tmm-btn--secondary'} tmm-btn--block`}
    >
      {resultStoryCta(t('s3PrimaryCta'), t(titleKey))}
    </Link>
  );

  return (
    <article
      className={`tmm-result-card ${primary ? 'tmm-result-card--hero' : ''}`.trim()}
      aria-label={`${fillTemplate(t('s3RankLabel'), { rank: String(rank) })}: ${title}`}
    >
      <div className="tmm-result-card__media">
        {isGoldenPath ? (
          <img src={wasabiHero} alt="" className="tmm-result-card__img" />
        ) : (
          <FoodCultureImage
            image={foodCulture.image}
            name={t(titleKey)}
            nameJa={foodCulture.nameJa}
            category={foodCulture.category}
            alt={t(titleKey)}
          />
        )}
      </div>
      <div className="tmm-result-card__body">
        <div className="tmm-result-card__eyebrow">
          <span className="tmm-result-card__rank">
            {fillTemplate(t('s3RankLabel'), { rank: String(rank) })}
          </span>
          <span className="tmm-result-card__region">
            {areaKey ? t(areaKey) : locale === 'ja' ? route.areaJa : route.areaEn}
          </span>
        </div>
        <h3 className="tmm-result-card__title">{title}</h3>
        {primary ? storyAction : null}
        <p className="tmm-result-card__desc">{t(descriptionKey)}</p>

        {tags.length > 0 ? (
          <div className="tmm-result__tags">
            {tags.map((key) => (
              <Tag key={key} tone={TAG_COPY[key].tone}>
                {t(TAG_COPY[key].labelKey)}
              </Tag>
            ))}
          </div>
        ) : null}

        {presentation ? <JourneyMeta presentation={presentation} compact /> : null}

        {primary ? (
          <>
            <div className="tmm-result__section">
              <h3 className="tmm-result__section-title">{t('s3DietaryTitle')}</h3>
              <Tag tone={dietaryState === 'restrictions-recorded' ? 'warning' : 'info'}>
                {dietaryState === 'restrictions-recorded'
                  ? t('s3DietaryKnown')
                  : dietaryState === 'no-restrictions'
                    ? t('s3DietaryUnknown')
                    : t('fpNotEvaluated')}
              </Tag>
            </div>
            {hasUnknownTravelTime ? (
              <p className="tmm-result__disclaimer" role="note">
                {t('s3TravelTimeUnknown')}
              </p>
            ) : null}
            <p className="tmm-result__disclaimer" role="note">
              {t('s3Disclaimer')}
            </p>
          </>
        ) : null}

        {primary ? null : storyAction}
      </div>
    </article>
  );
}

/**
 * Hands a successful Result off to the MOGU Recent contract (#94): records the
 * entry once per Result mount. Idempotent for the same candidate identity, so
 * a dev-mode double mount simply refreshes the timestamp.
 */
function ResultRecorder({
  answers,
  tags,
  hasDietaryConsiderations,
  candidateId,
  resultId,
  titleKey,
}: {
  answers: ReturnType<typeof loadExplorationAnswers>;
  tags: MatchTagKey[];
  hasDietaryConsiderations: boolean;
  candidateId: string;
  resultId: string;
  titleKey: LocaleKey;
}) {
  const { t } = useI18n();
  const [recorded, setRecorded] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    if (!answers) return;
    done.current = true;
    recordMoguRecent({
      candidateId,
      resultId,
      titleKey,
      summary: tags,
      exploration: answers,
      hasDietaryConsiderations,
    });
    setRecorded(true);
  }, [answers, candidateId, hasDietaryConsiderations, resultId, tags, titleKey]);

  if (!recorded) return null;
  return <p className="tmm-result__mogu-note">{t('s3MoguNote')}</p>;
}

/** Fallback when the seed record is missing (should not happen with seed data). */
function EmptyFallback() {
  const { t } = useI18n();
  return (
    <EmptyState
      icon="🍽️"
      title={t('s3MissingTitle')}
      description={t('s3Missing')}
      action={
        <Link
          to="/explore"
          className="tmm-btn tmm-btn--secondary tmm-btn--sm"
          onClick={beginNewExploration}
        >
          {t('back')}
        </Link>
      }
    />
  );
}
