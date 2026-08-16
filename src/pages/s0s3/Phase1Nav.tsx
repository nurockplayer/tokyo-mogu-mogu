/**
 * Presentation-only bottom navigation for the Phase 1 prototype (Issue #224 /
 * Figma `Talk12` 3:1952, `55:4166`).
 *
 * Reproduces the latest KiKi Figma nav visibly ("食旅を見つけ / モグモグる /
 * お気に入り / マイ"). This is a **proposal surface**: only "食旅を見つけ" links
 * into the prototype journey (`/explore`); the other three items are
 * presentation-only labels with no destination — the Figma defines no
 * downstream prototype branch for them, so they must NOT silently acquire
 * Phase 2 production navigation (`/discover`, `/mogu`, `/my`) semantics
 * (#201 / #203 / #204 deferred). The old `おすすめ / 探す / お気に入り / マイ`
 * frame is a stale Figma artifact and is deliberately not reproduced.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { type LocaleKey } from '../../i18n/resources';
import './onboarding.css';

export type Phase1NavKey = 'explore' | 'mogu' | 'fav' | 'my';

const NAV_ITEMS: readonly { key: Phase1NavKey; labelKey: LocaleKey; to: string | null }[] = [
  { key: 'explore', labelKey: 'navProtoExplore', to: '/explore' },
  { key: 'mogu', labelKey: 'navProtoMogu', to: null },
  { key: 'fav', labelKey: 'navProtoFav', to: null },
  { key: 'my', labelKey: 'navProtoMy', to: null },
];

export function Phase1Nav({ active }: { active?: Phase1NavKey }) {
  const { t } = useI18n();
  return (
    <nav className="phase1-nav" aria-label={t('navProtoExplore')}>
      {NAV_ITEMS.map((item) => {
        const isActive = item.key === active;
        const className = `phase1-nav__item ${isActive ? 'phase1-nav__item--active' : ''}`.trim();
        return item.to ? (
          <Link key={item.key} to={item.to} aria-current={isActive ? 'page' : undefined} className={className}>
            {t(item.labelKey)}
          </Link>
        ) : (
          <span key={item.key} className={className} aria-hidden={!isActive}>
            {t(item.labelKey)}
          </span>
        );
      })}
    </nav>
  );
}
