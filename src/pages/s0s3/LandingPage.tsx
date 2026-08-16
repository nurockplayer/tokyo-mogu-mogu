/**
 * S0 Landing / Home (Issue #43, reframed by Issue #78; Issue #181 Figma
 * parity → Issue #217 Phase 1).
 *
 * The entry of the Phase 1 guided prototype. Returning-aware:
 *
 *   - First-time user (no Food Profile) → the Figma `1:95` welcome
 *     composition: a media-forward hero, tagline, one dominant CTA, a 3-step
 *     value explanation, and a short "why now" section. The CTA routes by flow
 *     contract (profile setup, then Exploration).
 *   - Returning user (valid Food Profile) → a conversational MOGU greeting
 *     (reusing the session-only nickname when present) plus one dominant
 *     "continue" CTA straight into Exploration. Phase 1 hides the
 *     production-oriented MOGU Recent surface from the demo journey (#201 /
 *     #217), so no recent-history section and no production navigation leak.
 *
 * Accountless and geolocation-free.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { StorySection } from '../../ui';
import { hasFoodProfile } from '../../lib/food-profile-storage';
import { loadNickname } from '../../lib/nickname';
import { fillTemplate } from '../../lib/exploration';
import { beginNewExploration } from './exploration-session';
import { Phase1Nav } from './Phase1Nav';
import './onboarding.css';

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
 * Returning Home — conversational MOGU greeting + latest-Figma past-trips
 * presentation + presentation-only bottom nav (Issue #217 / #224). The
 * production-oriented MOGU Recent surface stays hidden from the demo journey
 * (#201 / #217); the `私の食旅` cards are fixture-backed presentation only.
 */
function ReturningHome({ journeyTarget }: { journeyTarget: string }) {
  const { t } = useI18n();
  const nickname = loadNickname();
  const greeting = nickname
    ? fillTemplate(t('homeGreetingName'), { name: nickname })
    : t('homeGreeting');

  return (
    <div className="tmm-page tmm-landing-return">
      <div className="fp-convo__msg fp-convo__msg--assistant tmm-landing-return__greet">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__title">{t('homeGreetingTitle')}</p>
          <p className="fp-convo__body">{greeting}</p>
        </div>
      </div>
      <div className="tmm-landing-return__cta">
        <Link
          to={journeyTarget}
          className="tmm-btn tmm-btn--primary tmm-btn--block"
          onClick={beginNewExploration}
        >
          {t('homeCtaContinue')}
        </Link>
      </div>

      <section className="tmm-past-trips" aria-labelledby="past-trips-title">
        <h2 id="past-trips-title" className="tmm-past-trips__title">
          {t('homePastTrips')}
        </h2>
        <div className="tmm-past-trips__list">
          {[0, 1, 2].map((index) => (
            <div key={index} className="tmm-past-trips__card">
              <div className="tmm-past-trips__card-title">{t('homeTripTitle')}</div>
              <p className="tmm-past-trips__card-desc">{t('homeTripDesc')}</p>
            </div>
          ))}
        </div>
        <Link to="/explore" className="tmm-past-trips__see-all">
          {t('homeSeeAll')}
        </Link>
      </section>

      <Phase1Nav active="explore" />
    </div>
  );
}
