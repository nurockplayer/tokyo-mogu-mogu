import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { NextDiscovery } from '../components/NextDiscovery';

export function HomePage() {
  const { t } = useI18n();
  return (
    <section className="page home-page">
      <h1>{t('appName')}</h1>
      <p className="home-tagline">{t('appTagline')}</p>
      <div className="home-actions">
        <Link to="/pokedex" className="btn btn-primary">{t('navPokedex')}</Link>
        <Link to="/map" className="btn btn-secondary">{t('navMap')}</Link>
      </div>
      <NextDiscovery />
    </section>
  );
}
