import type { KeyboardEvent } from 'react';
import { referenceAssets, type ReferenceCopy } from '../content';

interface SplashScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  onStart: () => void;
}

export function SplashScreen({ active, copy, onStart }: SplashScreenProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onStart();
    }
  };

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="splash"
      data-screen-active={active}
      onClick={onStart}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={active ? 0 : -1}
      aria-label={copy.actions.start}
      aria-hidden={!active}
    >
      <img className="bg" src={referenceAssets.welcomeCta} alt={copy.splash.imageAlt} />
      <span className="hotspot" aria-hidden="true" />
    </section>
  );
}
