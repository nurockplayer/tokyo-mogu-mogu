/**
 * Shared application shell (Issue #77).
 *
 * Common layout container: header + bottom nav shown on every screen.
 *
 * The S0–S9 journey shares the approved header hierarchy from
 * `docs/specs/product/approved-ui-fidelity.md`: wordmark logo in the
 * `app-header-top` row, then the tagline and the demo controls row below. The
 * optional Google Auth entry stays in the secondary demo controls row, out of
 * the approved core header (product
 * contract "Account / Persistence"); the persistent bottom nav is
 * Home / Discover / MOGU / My (Issue #95 / current #92 App IA). The older
 * Diagnosis / Support / My Route screens stay registered as routes and remain
 * reachable by direct URL, but they are no longer primary-nav destinations.
 *
 * This shell is built entirely on the shared `tmm-*` foundation
 * (`src/ui/tokens.css`, `src/ui/ui.css`) so every screen shares one visual
 * system. Feature screens render inside <main> and never build their own app
 * root.
 */
import { Link, Outlet } from 'react-router-dom';
import { useI18n } from '../i18n';
import { AuthControl } from '../components/AuthControl';
import { DemoResetButton } from '../components/DemoResetButton';
import { ErrorBoundary } from './ErrorBoundary';
import { PrimaryNav } from './PrimaryNav';

/**
 * Production shell — used as a React Router layout route for the Phase 2
 * surfaces (Issue #217). The matched child route renders through <Outlet />.
 */
export function AppShell() {
  const { t } = useI18n();
  return (
    <div className="tmm-shell">
      <header className="tmm-header">
        <div className="tmm-header__top">
          <Link to="/" className="tmm-header__logo">{t('appName')}</Link>
        </div>
        <span className="tmm-header__tagline">{t('appTagline')}</span>
        <div className="tmm-header__demo">
          <AuthControl />
          <DemoResetButton />
        </div>
      </header>
      <main className="tmm-main">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <PrimaryNav />
    </div>
  );
}
