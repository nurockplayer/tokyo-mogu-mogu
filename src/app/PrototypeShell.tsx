/**
 * Phase 1 prototype shell (Issue #217).
 *
 * The guided conversational journey renders inside this slim shell instead of
 * the production AppShell: it keeps only the MOGU wordmark, the locale switch,
 * and the demo reset control, and hides the production bottom navigation
 * (Home / Discover / MOGU / My) so the demo reads as a LINE / ChatGPT-style
 * guided conversation. The production surfaces stay reachable by direct URL
 * under the AppShell (Phase 2) but never leak into the Phase 1 demo path.
 *
 * Used as a React Router layout route: the matched child route renders through
 * <Outlet /> (no `children` prop).
 */
import { Link, Outlet } from 'react-router-dom';
import { useI18n } from '../i18n';
import { LocaleToggle } from '../components/LocaleToggle';
import { DemoResetButton } from '../components/DemoResetButton';
import { ErrorBoundary } from './ErrorBoundary';
import './PrototypeShell.css';

export function PrototypeShell() {
  const { t } = useI18n();
  return (
    <div className="tmm-shell tmm-prototype">
      <header className="tmm-prototype__bar">
        <Link to="/" className="tmm-header__logo">
          {t('appName')}
        </Link>
        <div className="tmm-header__actions">
          <LocaleToggle />
          <DemoResetButton />
        </div>
      </header>
      <main className="tmm-main">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}
