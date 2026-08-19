import { NavLink } from 'react-router-dom';
import { useI18n } from '../i18n';

/** The established #92 Home / Discover / MOGU / My product navigation. */
export function PrimaryNav({ className = '' }: { className?: string }) {
  const { t } = useI18n();

  return (
    <nav className={`tmm-nav${className ? ` ${className}` : ''}`} aria-label={t('primaryNavLabel')}>
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
  );
}
