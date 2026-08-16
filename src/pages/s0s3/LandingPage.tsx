/**
 * S0 Landing / Home (Issue #43, reframed by Issue #78; Issue #181 Figma parity).
 *
 * The Home destination behind the bottom-nav Home item. It is returning-aware:
 *
 *   - First-time user (no Food Profile) → the welcome composition: a
 *     media-forward hero, tagline, one dominant CTA, a 3-step value explanation,
 *     and a short "why now" section. The CTA routes by flow contract (profile
 *     setup, then Exploration).
 *   - Returning user (valid Food Profile) → the Figma `Talk12` Home grammar:
 *     a full-bleed image-led hero with a greeting (no personal-name capture —
 *     prototype-era persistence is not added) and one dominant "continue" CTA,
 *     then a `最近のおすすめ` section rendered from the shared MOGU Recent
 *     contract (system-managed, max 5) using the same media-forward card
 *     vocabulary. MOGU Recent stays distinct from My Saved Routes.
 *
 * Home is the start-new-recommendation destination from #92; recent-result
 * history is NOT duplicated as a second source — this reads the same MOGU
 * Recent data. Accountless and geolocation-free.
 */
import { Link, useNavigate } from 'react-router-dom';
import { useI18n, type LocaleKey } from '../../i18n';
import { StorySection } from '../../ui';
import { hasFoodProfile } from '../../lib/food-profile-storage';
import { beginNewExploration } from './exploration-session';
import { loadMoguRecent, type MoguRecentEntry } from '../../lib/mogu-recent';
import { reopenHref, restoreReopenSession } from '../MoguPage';
import './onboarding.css';

/** Compact display for an ISO 8601 timestamp (MM/DD HH:mm, local). */
function formatRecommendedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getMonth() + 1}/${date.getDate()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function LandingPage() {
  const { t } = useI18n();

  // Returning users skip the Food Profile re-ask and start a new Exploration.
  const journeyTarget = hasFoodProfile() ? '/explore' : '/food-profile';

  if (hasFoodProfile()) {
    return <ReturningHome journeyTarget={journeyTarget} />;
  }

  const steps = [
    { id: 's0Step1', title: t('s0Step1Title'), desc: t('s0Step1Desc') },
    { id: 's0Step2', title: t('s0Step2Title'), desc: t('s0Step2Desc') },
    { id: 's0Step3', title: t('s0Step3Title'), desc: t('s0Step3Desc') },
  ];

  return (
    <div className="tmm-page tmm-landing">
      <section className="tmm-landing-hero">
        <div
          className="tmm-landing-hero__media"
          role="img"
          aria-label={t('appName')}
        >
          <span className="tmm-landing-hero__media-glyph" aria-hidden="true">🌿</span>
          <span className="tmm-landing-hero__media-name">{t('appName')}</span>
        </div>
        <div className="tmm-landing-hero__body">
          <span className="tmm-landing-hero__eyebrow">{t('s0Eyebrow')}</span>
          <h1 className="tmm-landing-hero__title">{t('s0Title')}</h1>
          <p className="tmm-landing-hero__tagline">{t('s0Tagline')}</p>
          <div className="tmm-landing-hero__cta">
            <Link
              to={journeyTarget}
              className="tmm-btn tmm-btn--primary tmm-btn--block"
              onClick={beginNewExploration}
            >
              {t('s0Cta')}
            </Link>
          </div>
          <p className="tmm-landing-hero__note">{t('s0CtaNote')}</p>
        </div>
      </section>

      <StorySection kicker={t('s0StepsKicker')} title={t('s0StepsTitle')}>
        <div className="tmm-landing-steps">
          {steps.map((step, i) => (
            <div key={step.id} className="tmm-landing-step">
              <span className="tmm-landing-step__num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <div className="tmm-landing-step__title">{step.title}</div>
                <p className="tmm-landing-step__desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </StorySection>

      <section className="tmm-landing-why" aria-labelledby="s0-why-title">
        <h2 id="s0-why-title" className="tmm-landing-why__title">
          {t('s0WhyTitle')}
        </h2>
        <div className="tmm-landing-why__body">
          <p>{t('s0WhyBody1')}</p>
          <p>{t('s0WhyBody2')}</p>
        </div>
      </section>
    </div>
  );
}

/**
 * Returning Home — Figma `Talk12` grammar (Issue #181). Image-led hero with a
 * generic greeting (no nickname persistence), one dominant continue CTA, then
 * the shared MOGU Recent cards. Recent is system-managed history (max 5); My
 * Saved Routes stays a separate user-managed concept.
 */
function ReturningHome({ journeyTarget }: { journeyTarget: string }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const entries = loadMoguRecent().slice(0, 3);

  const handleReopen = (entry: MoguRecentEntry) => {
    restoreReopenSession(entry);
    navigate(reopenHref(entry));
  };

  return (
    <div className="tmm-page tmm-home-return">
      <section className="tmm-home-return__hero">
        <div
          className="tmm-home-return__media"
          role="img"
          aria-label={t('appName')}
        >
          <span className="tmm-home-return__glyph" aria-hidden="true">🌿</span>
          <div className="tmm-home-return__shade" />
          <div className="tmm-home-return__greet">
            <span className="tmm-home-return__greet-line">{t('homeGreeting')}</span>
            <span className="tmm-home-return__greet-title">
              {t('homeGreetingTitle')}
            </span>
          </div>
        </div>
        <div className="tmm-home-return__cta">
          <Link
            to={journeyTarget}
            className="tmm-btn tmm-btn--primary tmm-btn--block"
            onClick={beginNewExploration}
          >
            {t('homeCtaContinue')}
          </Link>
        </div>
      </section>

      <section className="tmm-home-return__recent" aria-labelledby="home-recent-title">
        <div className="tmm-home-return__recent-head">
          <h2 id="home-recent-title" className="tmm-home-return__recent-title">
            {t('homeRecentTitle')}
          </h2>
          <Link to="/mogu" className="tmm-home-return__recent-all">
            {t('homeRecentCta')}
          </Link>
        </div>
        {entries.length === 0 ? (
          <p className="tmm-home-return__recent-empty">{t('homeRecentEmpty')}</p>
        ) : (
          <ul className="tmm-home-return__recent-list">
            {entries.map((entry) => (
              <li key={`${entry.candidateId ?? entry.resultId}-${entry.createdAt}`}>
                <div className="tmm-home-return__card">
                  <div className="tmm-home-return__card-media" aria-hidden="true">
                    <span>🌿</span>
                  </div>
                  <div className="tmm-home-return__card-body">
                    <div className="tmm-home-return__card-title">
                      {t(entry.titleKey as LocaleKey)}
                    </div>
                    <div className="tmm-home-return__card-footer">
                      <span className="tmm-home-return__card-time">
                        {formatRecommendedAt(entry.createdAt)}
                      </span>
                      <button
                        type="button"
                        className="tmm-btn tmm-btn--sm tmm-btn--secondary"
                        onClick={() => handleReopen(entry)}
                      >
                        {t('moguReopenCta')}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
