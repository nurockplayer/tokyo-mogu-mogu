/**
 * Presentation-only bottom navigation for the Phase 1 prototype (Issue #224 /
 * Figma `Talk12` 3:1952, `55:4166`).
 *
 * Reproduces the latest KiKi Figma nav visibly ("食旅を見つけ / モグモグる /
 * お気に入り / マイ"). This is a **proposal surface**: it is partially
 * interactive (existing Phase 2 surfaces stay reachable by direct URL) but
 * carries no durable navigation semantics — those remain #203 / #204 deferred.
 * The old `おすすめ / 探す / お気に入り / マイ` frame is a stale Figma artifact
 * and is deliberately not reproduced.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { type LocaleKey } from '../../i18n/resources';
import './onboarding.css';

export type Phase1NavKey = 'explore' | 'mogu' | 'fav' | 'my';

const NAV_ITEMS: readonly { key: Phase1NavKey; labelKey: LocaleKey; to: string }[] = [
  { key: 'explore', labelKey: 'navProtoExplore', to: '/explore' },
  { key: 'mogu', labelKey: 'navProtoMogu', to: '/discover' },
  { key: 'fav', labelKey: 'navProtoFav', to: '/discover' },
  { key: 'my', labelKey: 'navProtoMy', to: '/my' },
];

export function Phase1Nav({ active }: { active?: Phase1NavKey }) {
  const { t } = useI18n();
  return (
    <nav className="phase1-nav" aria-label={t('navProtoExplore')}>
      {NAV_ITEMS.map((item) => {
        const isActive = item.key === active;
        return (
          <Link
            key={item.key}
            to={item.to}
            aria-current={isActive ? 'page' : undefined}
            className={`phase1-nav__item ${isActive ? 'phase1-nav__item--active' : ''}`.trim()}
          >
            {t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
