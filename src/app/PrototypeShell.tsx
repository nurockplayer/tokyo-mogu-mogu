/**
 * Guided-journey shell (Issue #217; productized by Issue #252).
 *
 * The guided setup and diagnosis render inside this slim shell instead of
 * the production AppShell: it keeps only the MOGU wordmark and the demo reset
 * control. The production bottom navigation stays out of the focused setup
 * screens.
 *
 * The first-use interview remains focused, while returning Home and the
 * Result / Story / Route / Spot product surfaces expose the established #92
 * Home / Discover / MOGU / My destinations. This preserves the approved
 * compact journey chrome without leaving the primary navigation inert.
 *
 * Used as a React Router layout route: the matched child route renders through
 * <Outlet /> (no `children` prop).
 */
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';
import { DemoResetButton } from '../components/DemoResetButton';
import { hasFoodProfile } from '../lib/food-profile-storage';
import { ErrorBoundary } from './ErrorBoundary';
import { PrimaryNav } from './PrimaryNav';
import './PrototypeShell.css';

export function PrototypeShell() {
  const { t } = useI18n();
  const location = useLocation();

  // Keep first-use setup and the per-trip diagnosis focused. Once a traveler
  // reaches product content, the durable primary IA is always available.
  const returningHome = location.pathname === '/' && hasFoodProfile();
  const showNav =
    returningHome ||
    location.pathname === '/explore/result' ||
    location.pathname.startsWith('/story') ||
    location.pathname === '/route' ||
    location.pathname.startsWith('/spot/');

  return (
    <div className={`tmm-shell tmm-prototype tmm-prototype--figma${showNav ? ' tmm-prototype--nav' : ''}`}>
      <header className="tmm-prototype__bar" aria-label={t('appName')}>
        <Link to="/" className="tmm-header__logo">
          {t('appName')}
        </Link>
        <div className="tmm-header__actions">
          <DemoResetButton />
        </div>
      </header>
      <main className="tmm-main">
        <div className="tmm-route-transition" key={location.key}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>
      {showNav ? <PrimaryNav className="tmm-nav--proto" /> : null}
    </div>
  );
}
