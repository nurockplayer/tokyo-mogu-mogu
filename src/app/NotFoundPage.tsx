/**
 * Fallback UI for unknown routes (Issue #14).
 *
 * Rendered when no route matches, with ja/en copy and a way back into the app.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export function NotFoundPage({ hardNavigation = false }: { hardNavigation?: boolean } = {}) {
  const { t } = useI18n();
  return (
    <section className="page">
      <h1 className="page-title">{t('notFoundTitle')}</h1>
      <p className="page-sub">{t('notFoundBody')}</p>
      {hardNavigation ? (
        <a href="/" className="btn btn-secondary">{t('navHome')}</a>
      ) : (
        <Link to="/" className="btn btn-secondary">{t('navHome')}</Link>
      )}
    </section>
  );
}
