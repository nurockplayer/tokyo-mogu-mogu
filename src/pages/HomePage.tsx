/**
 * Home page (legacy route, Issue #66 cleanup; reframed by Issue #78/#92).
 *
 * Kept as the fallback for `/home` links left behind by legacy screens. It is
 * the start-new-recommendation destination: the primary CTA begins the current
 * trip (Food Profile first on first use, then the Exploration 5 questions), and
 * the saved-route view stays reachable. Recent recommendation history is owned
 * by MOGU (#94) and is intentionally NOT duplicated here.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { hasFoodProfile } from '../lib/food-profile-storage';
import { beginNewExploration } from './s0s3/exploration-session';
import './HomePage.css';

export function HomePage() {
  const { t } = useI18n();
  const journeyTarget = hasFoodProfile() ? '/explore' : '/food-profile';
  return (
    <section className="tmm-page tmm-home">
      <div className="tmm-home__hero">
        <span className="tmm-home__eyebrow">{t('s0Eyebrow')}</span>
        <h1 className="tmm-home__title">{t('appName')}</h1>
        <p className="tmm-home__tagline">{t('appTagline')}</p>
      </div>
      <div className="tmm-home__actions">
        <Link
          to={journeyTarget}
          className="tmm-btn tmm-btn--primary tmm-btn--block"
          onClick={beginNewExploration}
        >
          {t('s0Cta')}
        </Link>
        <Link to="/my" className="tmm-btn tmm-btn--secondary tmm-btn--block">
          {t('navMy')}
        </Link>
      </div>
    </section>
  );
}
