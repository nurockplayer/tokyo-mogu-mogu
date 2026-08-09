/**
 * MOGU destination shell (Issue #95).
 *
 * Scaffold-level placeholder for the `/mogu` primary-nav destination.
 * Issue #94 implements the system-managed recent-recommendation history here;
 * this shell only establishes the route and an i18n'd coming-soon surface so
 * the primary nav stays complete without guessing #94's content.
 */
import { useI18n } from '../i18n';

export function MoguPage() {
  const { t } = useI18n();
  return (
    <div className="tmm-page">
      <h1 className="page-title">{t('moguPageTitle')}</h1>
      <p className="page-sub">{t('moguPageBody')}</p>
    </div>
  );
}
