/**
 * S0 Landing page (Issue #43, reframed by Issue #78).
 *
 * Entry of the S0–S8 journey: hero + service name + tagline, a 3-step value
 * explanation, and a short "why now" section. The main CTA communicates
 * starting a personalized food-culture journey (not a one-time quiz) and routes
 * by flow contract:
 *
 *   - First-time user (no Food Profile) → Food Profile setup, then Exploration
 *   - Returning user (valid Food Profile) → Exploration 5 questions directly
 *
 * Home is the start-new-recommendation destination from #92; recent-result
 * history is NOT duplicated here (MOGU owns Recent). Accountless and
 * geolocation-free.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { StorySection } from '../../ui';
import { hasFoodProfile } from '../../lib/food-profile-storage';
import { beginNewExploration } from './exploration-session';
import './onboarding.css';

export function LandingPage() {
  const { t } = useI18n();

  // Returning users skip the Food Profile re-ask and start a new Exploration.
  const journeyTarget = hasFoodProfile() ? '/explore' : '/food-profile';

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
