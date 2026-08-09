/**
 * Discover destination shell (Issue #95).
 *
 * Scaffold-level placeholder for the `/discover` primary-nav destination.
 * Issue #93 implements the browse-first free-exploration experience here;
 * this shell only establishes the route and an i18n'd coming-soon surface so
 * the primary nav stays complete without guessing #93's content.
 */
import { useI18n } from '../i18n';

export function DiscoverPage() {
  const { t } = useI18n();
  return (
    <div className="tmm-page">
      <h1 className="page-title">{t('discoverPageTitle')}</h1>
      <p className="page-sub">{t('discoverPageBody')}</p>
    </div>
  );
}
