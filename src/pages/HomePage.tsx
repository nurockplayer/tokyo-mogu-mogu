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

export function HomePage() {
  const { t } = useI18n();
  const journeyTarget = hasFoodProfile() ? '/explore' : '/food-profile';
  return (
    <section className="page home-page">
      <h1>{t('appName')}</h1>
      <p className="home-tagline">{t('appTagline')}</p>
      <div className="home-actions">
        <Link to={journeyTarget} className="btn btn-primary" onClick={beginNewExploration}>
          {t('s0Cta')}
        </Link>
        <Link to="/my-route" className="btn btn-secondary">{t('s8NavLabel')}</Link>
      </div>
    </section>
  );
}
