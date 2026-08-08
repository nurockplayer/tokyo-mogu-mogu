/**
 * Fallback UI for unknown routes (Issue #14).
 *
 * Rendered when no route matches, with ja/en copy and a way back into the app.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <section className="page">
      <h1 className="page-title">{t('notFoundTitle')}</h1>
      <p className="page-sub">{t('notFoundBody')}</p>
      <Link to="/pokedex" className="btn btn-secondary">{t('navPokedex')}</Link>
    </section>
  );
}
