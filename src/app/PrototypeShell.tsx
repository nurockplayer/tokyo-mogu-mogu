/**
 * Phase 1 prototype shell (Issue #217; Issue #226 adds the fixture bottom nav).
 *
 * The guided conversational journey renders inside this slim shell instead of
 * the production AppShell: it keeps only the MOGU wordmark, the locale switch,
 * and the demo reset control. The production bottom navigation stays out of the
 * conversation screens.
 *
 * The latest Figma shows a fixed 4-tab bottom nav on the returning-home and
 * Route frames only (Figma `3:1952` / `55:4166`), so this shell renders it
 * there with the Figma labels (`食旅を見つけ / モグモグる / お気に入り / マイ`).
 * It is fixture-backed / prototype-only (Issue #226): the tabs are
 * presentational and are not wired into a durable IA/persistence contract.
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
import './PrototypeShell.css';

const PROTO_NAV = [
  { key: 'protoNavDiscover', icon: '🔎' },
  { key: 'protoNavMogu', icon: '🍽️' },
  { key: 'protoNavFavorites', icon: '❤️' },
  { key: 'protoNavMy', icon: '👤' },
] as const;

export function PrototypeShell() {
  const { t } = useI18n();
  const location = useLocation();

  // The Figma bottom nav appears on the returning home and the Route frame.
  const returningHome = location.pathname === '/' && hasFoodProfile();
  const showNav = returningHome || location.pathname === '/route';

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
      {showNav ? (
        <nav className="tmm-nav tmm-nav--proto" aria-label={t('protoNavDiscover')}>
          {PROTO_NAV.map((item, index) => (
            <span
              key={item.key}
              className={`tmm-nav__link tmm-nav__link--proto${index === 0 ? ' is-active' : ''}`}
              aria-disabled={index !== 0 ? 'true' : undefined}
            >
              <span className="tmm-nav__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{t(item.key)}</span>
            </span>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
