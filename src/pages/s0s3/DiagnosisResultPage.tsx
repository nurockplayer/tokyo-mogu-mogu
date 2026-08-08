/**
 * S3 Diagnosis Result page (Issue #43).
 *
 * Deterministically reveals 東京わさび (from the `wasabi-okutama` FoodCulture
 * record) with match-reason tags derived from the S2 answers and the
 * dietary-consideration state. The primary CTA routes to the S4 story
 * (`/story/wasabi-okutama`, owned by Issue #44) and the secondary CTA lets the
 * user edit their answers. The dietary disclaimer states that details must be
 * confirmed with the venue — recommendation-only, never a safety guarantee.
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getFoodCultureById } from '../../data';
import { useI18n } from '../../i18n';
import { EmptyState, Card, Tag, type TagTone } from '../../ui';
import {
  deriveMatchTags,
  hasDietaryConsideration,
  type MatchTagKey,
} from '../../lib/diagnosis';
import { loadDiagnosisAnswers } from './session';
import { type LocaleKey } from '../../i18n/resources';
import { foodCultureKey } from '../../i18n/data-content';
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

export function DiagnosisResultPage() {
  const { t } = useI18n();

  const wasabi = getFoodCultureById('wasabi-okutama');

  const { tags, dietary } = useMemo(() => {
    const answers = loadDiagnosisAnswers();
    return {
      tags: answers ? deriveMatchTags(answers) : [],
      dietary: answers ? hasDietaryConsideration(answers) : false,
    };
  }, []);

  const dietaryKnown = dietary ? t('s3DietaryKnown') : t('s3DietaryUnknown');
  const dietaryTone: TagTone = dietary ? 'warning' : 'info';

  return (
    <div className="tmm-page">
      <section className="tmm-result__summary">
        <h1 className="tmm-result__summary-title">{t('s3Title')}</h1>
        <p className="tmm-result__summary-desc">{t('s3Subtitle')}</p>
      </section>

      {wasabi ? (
        <>
          <Card feature>
            <div className="tmm-result-card__title">{t(foodCultureKey('wasabi-okutama', 'name') ?? 'dataWasabiName')}</div>
            <p className="tmm-result-card__desc">{t(foodCultureKey('wasabi-okutama', 'description') ?? 'dataWasabiDescription')}</p>

            <div className="tmm-result__tags">
              {tags.length > 0
                ? tags.map((key) => (
                    <Tag key={key} tone={TAG_COPY[key].tone}>
                      {t(TAG_COPY[key].labelKey)}
                    </Tag>
                  ))
                : null}
            </div>

            <div className="tmm-result__section">
              <h2 className="tmm-result__section-title">{t('s3DietaryTitle')}</h2>
              <Tag tone={dietaryTone}>{dietaryKnown}</Tag>
            </div>

            <p className="tmm-result__disclaimer">{t('s3Disclaimer')}</p>
          </Card>

          <div className="tmm-result__actions">
            <Link to="/story/wasabi-okutama" className="tmm-btn tmm-btn--primary tmm-btn--block">
              {t('s3PrimaryCta')}
            </Link>
            <Link
              to="/diagnosis"
              className="tmm-btn tmm-btn--secondary tmm-btn--block"
            >
              {t('s3EditCta')}
            </Link>
          </div>
        </>
      ) : (
        <EmptyFallback />
      )}
    </div>
  );
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
        <Link to="/diagnosis" className="tmm-btn tmm-btn--secondary tmm-btn--sm">
          {t('back')}
        </Link>
      }
    />
  );
}
