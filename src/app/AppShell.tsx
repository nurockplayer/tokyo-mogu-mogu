/**
 * Shared application shell (Issue #14).
 *
 * Common layout container: header + nav shown on every screen. Reuses the
 * existing design-system classes from src/styles.css (.app-shell,
 * .app-header, .app-logo, .app-tagline, .app-nav) without restyling them.
 *
 * Feature screens render inside <main> and never build their own app root.
 */
import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useI18n } from '../i18n';
import { DemoResetButton } from '../components/DemoResetButton';
import { LocaleToggle } from '../components/LocaleToggle';
import { ErrorBoundary } from './ErrorBoundary';

export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-top">
          <Link to="/" className="app-logo">{t('appName')}</Link>
          <LocaleToggle />
        </div>
        <span className="app-tagline">{t('appTagline')}</span>
        <div className="app-header-actions">
          <DemoResetButton />
        </div>
      </header>
      <main className="app-main">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <nav className="app-nav">
        <NavLink to="/" end>{t('navHome')}</NavLink>
        <NavLink to="/pokedex">{t('navPokedex')}</NavLink>
        <NavLink to="/map">{t('navMap')}</NavLink>
      </nav>
    </div>
  );
}
