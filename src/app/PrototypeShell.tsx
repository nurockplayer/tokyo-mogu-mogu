/**
 * Guided-journey shell (Issue #217; productized by Issue #252).
 *
 * The guided conversational journey renders inside this slim shell instead of
 * the production AppShell: it keeps only the MOGU wordmark, the locale switch,
 * and the demo reset control. The production bottom navigation stays out of the
 * conversation screens.
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
import { LocaleToggle } from '../components/LocaleToggle';
import { DemoResetButton } from '../components/DemoResetButton';
import { hasFoodProfile } from '../lib/food-profile-storage';
import { ErrorBoundary } from './ErrorBoundary';
import { PrimaryNav } from './PrimaryNav';
import './PrototypeShell.css';

export function PrototypeShell() {
  const { t } = useI18n();
  const location = useLocation();

  // Keep first-use setup and the per-trip interview focused. Once a traveler
  // reaches product content, the durable primary IA is always available.
  const returningHome = location.pathname === '/' && hasFoodProfile();
  const showNav =
    returningHome ||
    location.pathname === '/explore/result' ||
    location.pathname.startsWith('/story') ||
    location.pathname === '/route' ||
    location.pathname.startsWith('/spot/');

  return (
    <div className={`tmm-shell tmm-prototype${showNav ? ' tmm-prototype--nav' : ''}`}>
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
      {showNav ? <PrimaryNav className="tmm-nav--proto" /> : null}
    </div>
  );
}
