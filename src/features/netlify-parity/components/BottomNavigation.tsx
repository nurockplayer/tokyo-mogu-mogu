import type { ReactNode } from 'react';
import discoverIcon from '../../../assets/figma-296/nav-discover.svg';
import favoritesIcon from '../../../assets/figma-296/nav-favorites.svg';
import moguIcon from '../../../assets/figma-296/nav-mogu.svg';
import myIcon from '../../../assets/figma-296/nav-my.svg';
import type { ReferenceCopy } from '../content';

export type ReferenceTab = 'home' | 'mogu' | 'favorites' | 'my';

interface BottomNavigationProps {
  active: ReferenceTab;
  copy: ReferenceCopy['nav'];
  onNavigate: (path: string) => void;
  variant?: 'default' | 'issue-296-my';
}

const tabs: Array<{
  id: ReferenceTab;
  path: string;
  labelKey: keyof Pick<ReferenceCopy['nav'], 'home' | 'mogu' | 'favorites' | 'my'>;
  icon: ReactNode;
}> = [
  {
    id: 'home',
    path: '/home',
    labelKey: 'home',
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.5 15.5 21 21" />
      </>
    ),
  },
  {
    id: 'mogu',
    path: '/mogu',
    labelKey: 'mogu',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M7.5 8c1.5 2 1.5 2 3 0M13.5 8c1.5 2 1.5 2 3 0M8.5 14c2.5 2.5 4.5 2.5 7 0" />
      </>
    ),
  },
  {
    id: 'favorites',
    path: '/my-route',
    labelKey: 'favorites',
    icon: <path d="M7 4h10v16l-5-3.5L7 20Z" />,
  },
  {
    id: 'my',
    path: '/my',
    labelKey: 'my',
    icon: (
      <>
        <circle cx="12" cy="8.5" r="3.6" />
        <path d="M5.5 19.5c1-4.4 3.4-5.6 6.5-5.6s5.5 1.2 6.5 5.6" />
      </>
    ),
  },
];

const issue296Icons: Record<ReferenceTab, string> = {
  home: discoverIcon,
  mogu: moguIcon,
  favorites: favoritesIcon,
  my: myIcon,
};

export function BottomNavigation({ active, copy, onNavigate, variant = 'default' }: BottomNavigationProps) {
  return (
    <nav className={`tabbar${variant === 'issue-296-my' ? ' issue-296-tabbar' : ''}`} aria-label="Primary">
      {tabs.map((tab) => (
        <button
          className={tab.id === active ? 'on' : undefined}
          key={tab.id}
          onClick={() => onNavigate(tab.path)}
          type="button"
          aria-current={tab.id === active ? 'page' : undefined}
        >
          {variant === 'issue-296-my' ? (
            <img src={issue296Icons[tab.id]} alt="" aria-hidden="true" />
          ) : (
            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {tab.icon}
            </svg>
          )}
          <span>{copy[tab.labelKey]}</span>
        </button>
      ))}
    </nav>
  );
}
