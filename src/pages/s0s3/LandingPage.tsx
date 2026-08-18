/**
 * S0 Landing / Home (Issue #43, reframed by Issue #78; Issue #181 Figma
 * parity → Issue #217 Phase 1; Issue #226 latest-Figma landing revision).
 *
 * The entry of the Phase 1 guided prototype. Returning-aware:
 *
 *   - First-time user (no Food Profile) → the Figma `1:95` welcome
 *     composition: brand media, one statement, one dominant CTA. The CTA routes
 *     by flow contract (profile setup, then Exploration).
 *   - Returning user (valid Food Profile) → the Figma `3:1952` hero greeting
 *     (one-line, nickname highlighted), a single `Let's Go!` CTA into
 *     Exploration, and the `私の食旅 (過去の旅)` history section reading the
 *     system-managed MOGU Recent contract (up to 3 cards).
 *
 * Accountless and geolocation-free.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { hasFoodProfile } from '../../lib/food-profile-storage';
import { loadNickname } from '../../lib/nickname';
import { beginNewExploration } from './exploration-session';
import { HistorySection } from './history-section';
import './onboarding.css';
import './history-section.css';
import mascot from '../../assets/figma/mascot.svg';

export function LandingPage() {
  // Returning users skip the Food Profile re-ask and start a new Exploration.
  const journeyTarget = hasFoodProfile() ? '/explore' : '/food-profile';

  if (hasFoodProfile()) {
    return <ReturningHome journeyTarget={journeyTarget} />;
  }

  return <FirstTimeHome journeyTarget={journeyTarget} />;
}

/**
 * First-time welcome (Figma `1:95`): brand media plate, one statement, one
 * dominant CTA. The 3-step / why sections from the earlier landing composition
 * are intentionally not rendered on the Phase 1 landing (Figma parity).
 */
function FirstTimeHome({ journeyTarget }: { journeyTarget: string }) {
  const { t } = useI18n();
  return (
    <div className="tmm-page tmm-landing">
      <section className="tmm-landing-hero tmm-landing-hero--welcome">
        <div
          className="tmm-landing-hero__media"
          role="img"
          aria-label={t('appName')}
        >
          <img src={mascot} alt="" className="tmm-landing-hero__mascot" />
        </div>
        <div className="tmm-landing-hero__body">
          <h1 className="tmm-landing-hero__title">{t('s0Title')}</h1>
          <div className="tmm-landing-hero__cta">
            <Link
              to={journeyTarget}
              className="tmm-btn tmm-btn--primary"
              onClick={beginNewExploration}
            >
              {t('s0Cta')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Returning Home — hero greeting + history (Figma `3:1952`). The greeting is
 * the one-line Figma copy with the session nickname highlighted; the
 * production-oriented MOGU Recent surface is rendered here as the
 * `私の食旅 (過去の旅)` history section (fixture-backed, Issue #226).
 */
function ReturningHome({ journeyTarget }: { journeyTarget: string }) {
  const { t } = useI18n();
  const nickname = loadNickname();
  const template = nickname ? t('homeGreetingName') : t('homeGreeting');

  return (
    <div className="tmm-page tmm-landing-return">
      <section className="tmm-landing-hero tmm-landing-return__hero">
        <div className="tmm-landing-return__hero-media">
          <div
            className="tmm-landing-hero__media tmm-landing-return__media"
            aria-hidden="true"
          >
            <span className="tmm-landing-hero__media-glyph" aria-hidden="true">🌿</span>
          </div>
          <h1 className="tmm-landing-return__greeting">
            <HighlightedGreeting template={template} name={nickname} />
          </h1>
        </div>
        <div className="tmm-landing-hero__body">
          <div className="tmm-landing-hero__cta">
            <Link
              to={journeyTarget}
              className="tmm-btn tmm-btn--primary tmm-btn--block"
              onClick={beginNewExploration}
            >
              {t('homeCtaContinue')}
            </Link>
          </div>
        </div>
      </section>

      <HistorySection />
    </div>
  );
}

/**
 * Renders a greeting template with the `{name}` placeholder wrapped in the
 * Figma name-highlight accent. Without a nickname the template has no
 * placeholder and is rendered as-is.
 */
function HighlightedGreeting({ template, name }: { template: string; name: string | null }) {
  if (!name) {
    return <>{template}</>;
  }
  const [before, after] = template.split('{name}');
  return (
    <>
      {before}
      <mark className="tmm-landing-return__name">{name}</mark>
      {after}
    </>
  );
}
