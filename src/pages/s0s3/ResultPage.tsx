/**
 * Result page (Issue #78 reframe of S3; Issue #217 Phase 1).
 *
 * Selects through the reusable #123 recommendation contract. Phase 1 keeps the
 * Okutama × Tokyo Wasabi journey as the default golden path while allowing the
 * enabled source-backed Ome/Sawai and Hachioji journeys to be selected from
 * distinct current-trip answers. The durable Product contract remains
 * geography-independent; the Slice Manifest gates production exposure.
 * The result reflects the durable Food Profile (dietary-consideration state) +
 * the current-trip Exploration answers (match-reason tags). On successful
 * result creation it hands off to the MOGU Recent contract (#94).
 *
 * The `96%` match is Figma prototype presentation only — it is not a real
 * recommendation-accuracy metric and no scoring infrastructure backs it.
 * The primary CTA routes to the S4 story (/story/<foodCultureId>) and the
 * secondary CTA lets the user re-run the current Exploration. The dietary
 * disclaimer states that details must be confirmed with the venue —
 * recommendation-only, never a safety guarantee.
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
import { recommendCandidates, resolveHistoricalRecommendation } from '../../lib/recommendation';
import { loadExplorationAnswers } from './exploration-session';
import { loadFoodProfile } from '../../lib/food-profile-storage';
import { loadNickname } from '../../lib/nickname';
import { phase1RecommendableCandidates } from './phase1-exploration';
import { recordMoguRecent } from '../../lib/mogu-recent';
import { type LocaleKey } from '../../i18n/resources';
import { foodCultureKey, routeAreaKey } from '../../i18n/data-content';
import resultHeroWasabi from '../../assets/figma/result-hero-wasabi.png';
import resultCardYamame from '../../assets/figma/result-card-yamame.png';
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
  const { locale, t } = useI18n();
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
  const recommendedDescriptionKey = recommendation
    ? foodCultureKey(recommendation.foodCultureId, 'description')
    : undefined;
  const recommendedRoute = recommendation?.journeyId
    ? getRouteById(recommendation.journeyId)
    : undefined;
  const journeyPresentation =
    recommendation && recommendedFoodCulture && recommendedRoute
      ? buildJourneyPresentation(recommendation, recommendedFoodCulture, recommendedRoute, places)
      : undefined;
  const recommendedAreaKey = recommendation?.journeyId
    ? routeAreaKey(recommendation.journeyId)
    : undefined;
  const isGoldenPath = recommendation?.id === DEMO_RECOMMENDATION_CANDIDATE_ID;
  const tags = useMemo(
    () =>
      recommendationEvaluation
        ? demoRecommendationMatchTags(
            recommendationEvaluation.candidate.id,
            recommendationEvaluation.explanation.reasons,
          )
        : [],
    [recommendationEvaluation],
  );
  const hasUnknownTravelTime =
    recommendationEvaluation?.explanation.cautions.some(
      (caution) => caution.code === 'travel-time-unknown',
    ) ?? false;

  // Dietary-consideration state comes from the durable Food Profile, which the
  // returning flow preserves; missing profile → "no restrictions".
  const dietary = useMemo(() => {
    return profile !== null && (profile.dietary.length > 0 || profile.dietaryOther.trim().length > 0);
  }, [profile]);

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

      {recommendedFoodCulture && recommendation && recommendedTitleKey && recommendedDescriptionKey ? (
        <>
          <div className="tmm-result-card tmm-result-card--hero">
            <div className="tmm-result-card__media">
              {isGoldenPath ? (
                <img src={resultHeroWasabi} alt="" className="tmm-result-card__img" />
              ) : (
                <FoodCultureImage
                  image={recommendedFoodCulture.image}
                  name={t(recommendedTitleKey)}
                  nameJa={recommendedFoodCulture.nameJa}
                  category={recommendedFoodCulture.category}
                  alt={t(recommendedTitleKey)}
                />
              )}
              {isGoldenPath ? (
                <div className="tmm-result-match">
                  <span className="tmm-result-match__percent">{t('s3MatchPercent')}</span>
                  <span className="tmm-result-match__label">{t('s3MatchLabel')}</span>
                </div>
              ) : null}
            </div>
            <div className="tmm-result-card__body">
              <span className="tmm-result-card__region">
                {recommendedAreaKey
                  ? t(recommendedAreaKey)
                  : recommendedRoute
                    ? locale === 'ja'
                      ? recommendedRoute.areaJa
                      : recommendedRoute.areaEn
                    : t(recommendedTitleKey)}
              </span>
              <div className="tmm-result-card__title">
                {isGoldenPath ? t('s3CardTitlePrimary') : t(recommendedTitleKey)}
              </div>
              <p className="tmm-result-card__desc">{t(recommendedDescriptionKey)}</p>

              {isGoldenPath ? (
                <p className="tmm-result-match__note" role="note">
                  {t('s3MatchNote')}
                </p>
              ) : null}

              <div className="tmm-result__tags">
                {tags.length > 0
                  ? tags.map((key) => (
                      <Tag key={key} tone={TAG_COPY[key].tone}>
                        {t(TAG_COPY[key].labelKey)}
                      </Tag>
                    ))
                  : null}
              </div>

              {journeyPresentation ? <JourneyMeta presentation={journeyPresentation} compact /> : null}

              <div className="tmm-result__section">
                <h2 className="tmm-result__section-title">{t('s3DietaryTitle')}</h2>
                <Tag tone={dietary ? 'warning' : 'info'}>
                  {dietary ? t('s3DietaryKnown') : t('s3DietaryUnknown')}
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
            </div>
          </div>

          {isGoldenPath ? (
            /* Secondary fixture candidate (Figma `23:3380` 91% card, Issue #226).
               Presentation-only: Okutama yamame, no CTA, no ranking/scoring. */
            <div className="tmm-result-card" aria-label={t('s3CardTitleSecondary')}>
              <div className="tmm-result-card__media" aria-hidden="true">
                <img src={resultCardYamame} alt="" className="tmm-result-card__img" />
                <div className="tmm-result-match">
                  <span className="tmm-result-match__percent">{t('s3MatchPercentSecondary')}</span>
                  <span className="tmm-result-match__label">{t('s3MatchLabel')}</span>
                </div>
              </div>
              <div className="tmm-result-card__body">
                <span className="tmm-result-card__region">{t('s3CardRegion')}</span>
                <div className="tmm-result-card__title">{t('s3CardTitleSecondary')}</div>
                <div className="tmm-result__tags">
                  <Tag tone="info">{t('s3TagNature')}</Tag>
                  <Tag tone="info">{t('s3TagTradition')}</Tag>
                  <Tag tone="info">{t('s3TagHalfDay')}</Tag>
                </div>
              </div>
            </div>
          ) : null}

          <div className="tmm-result__actions">
            <Link
              to={storyHref(recommendation.foodCultureId, recommendation.id, isReopen)}
              className="tmm-btn tmm-btn--primary tmm-btn--block"
            >
              {resultStoryCta(t('s3PrimaryCta'), t(recommendedTitleKey))}
            </Link>
            <Link to="/explore" className="tmm-btn tmm-btn--secondary tmm-btn--block">
              {t('s3EditCta')}
            </Link>
          </div>

          {!isReopen ? (
            <ResultRecorder
              answers={answers}
              tags={tags}
              hasDietaryConsiderations={dietary}
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
        <Link to="/explore" className="tmm-btn tmm-btn--secondary tmm-btn--sm">
          {t('back')}
        </Link>
      }
    />
  );
}
