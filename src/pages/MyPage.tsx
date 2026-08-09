/**
 * My destination shell (Issue #95).
 *
 * Scaffold-level placeholder for the `/my` primary-nav destination.
 * Issue #81 implements Saved Routes + Food Profile + Badge entry here; this
 * shell only establishes the route and an i18n'd coming-soon surface so the
 * primary nav stays complete without guessing #81's content.
 */
import { useI18n } from '../i18n';

export function MyPage() {
  const { t } = useI18n();
  return (
    <div className="tmm-page">
      <h1 className="page-title">{t('myPageTitle')}</h1>
      <p className="page-sub">{t('myPageBody')}</p>
    </div>
  );
}
