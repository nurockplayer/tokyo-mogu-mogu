/**
 * Shared application shell (Issue #77).
 *
 * Common layout container: header + bottom nav shown on every screen.
 *
 * The S0–S9 journey shares the approved header hierarchy from
 * `docs/specs/product/approved-ui-fidelity.md`: wordmark logo (left) and locale
 * switch (right) in the `app-header-top` row, then the tagline and the demo
 * controls row below. The optional Google Auth entry stays in the secondary
 * demo controls row, out of the approved brand + locale core header (product
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
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useI18n } from '../i18n';
import { AuthControl } from '../components/AuthControl';
import { DemoResetButton } from '../components/DemoResetButton';
import { LocaleToggle } from '../components/LocaleToggle';
import { ErrorBoundary } from './ErrorBoundary';

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
          <div className="tmm-header__actions">
            <LocaleToggle />
          </div>
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
      <nav className="tmm-nav">
        <NavLink to="/" end className="tmm-nav__link">
          <span className="tmm-nav__icon" aria-hidden="true">🏠</span>
          {t('navHome')}
        </NavLink>
        <NavLink to="/discover" className="tmm-nav__link">
          <span className="tmm-nav__icon" aria-hidden="true">🔍</span>
          {t('navDiscover')}
        </NavLink>
        <NavLink to="/mogu" className="tmm-nav__link">
          <span className="tmm-nav__icon" aria-hidden="true">🍽️</span>
          {t('navMogu')}
        </NavLink>
        <NavLink to="/my" className="tmm-nav__link">
          <span className="tmm-nav__icon" aria-hidden="true">👤</span>
          {t('navMy')}
        </NavLink>
      </nav>
    </div>
  );
}
