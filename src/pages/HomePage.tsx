/**
 * Home page (legacy route, Issue #66 cleanup).
 *
 * Kept as the fallback for `/home` links left behind by legacy screens. It no
 * longer leads to pure legacy content (Pokédex / Map): it funnels into the S0
 * journey entry point (the diagnosis) and the saved-route view, mirroring the
 * #41 nav. The collection-first NextDiscovery block is intentionally removed.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export function HomePage() {
  const { t } = useI18n();
  return (
    <section className="page home-page">
      <h1>{t('appName')}</h1>
      <p className="home-tagline">{t('appTagline')}</p>
      <div className="home-actions">
        <Link to="/diagnosis" className="btn btn-primary">{t('s0Cta')}</Link>
        <Link to="/my-route" className="btn btn-secondary">{t('s8NavLabel')}</Link>
      </div>
    </section>
  );
}
