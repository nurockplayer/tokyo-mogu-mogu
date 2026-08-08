/**
 * S0 Landing page (Issue #43).
 *
 * Entry of the S0–S8 journey: hero + service name + tagline, a 3-step value
 * explanation (好みを診断 → 物語を知る → 巡って応援), a primary CTA into the
 * diagnosis, and a short "why now" section. Accountless and geolocation-free.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { StorySection } from '../../ui';
import './onboarding.css';

export function LandingPage() {
  const { t } = useI18n();

  const steps = [
    { id: 's0Step1', title: t('s0Step1Title'), desc: t('s0Step1Desc') },
    { id: 's0Step2', title: t('s0Step2Title'), desc: t('s0Step2Desc') },
    { id: 's0Step3', title: t('s0Step3Title'), desc: t('s0Step3Desc') },
  ];

  return (
    <div className="tmm-page">
      <section className="tmm-landing-hero">
        <span className="tmm-landing-hero__eyebrow">{t('s0Eyebrow')}</span>
        <h1 className="tmm-landing-hero__title">{t('s0Title')}</h1>
        <p className="tmm-landing-hero__tagline">{t('s0Tagline')}</p>
        <div className="tmm-landing-hero__cta">
          <Link to="/diagnosis" className="tmm-btn tmm-btn--primary tmm-btn--block">
            {t('s0Cta')}
          </Link>
        </div>
        <p className="tmm-landing-hero__note">{t('s0CtaNote')}</p>
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
