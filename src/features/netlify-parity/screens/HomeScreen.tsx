import { BottomNavigation } from '../components/BottomNavigation';
import { referenceAssets, type ReferenceCopy } from '../content';
import type { Locale } from '../../../i18n';

interface HomeScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  nickname: string;
  onNavigate: (path: string) => void;
  onStartExploration: () => void;
}

export function HomeScreen({ active, copy, locale, nickname, onNavigate, onStartExploration }: HomeScreenProps) {
  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="home"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <div className="scroll">
        <div className="hero">
          <img src={referenceAssets.homeHero} alt={copy.home.title} />
          <div className="greet">
            {nickname ? (
              <>
                {copy.home.greeting}{locale === 'ja' ? null : ' '}<span className="nm">{nickname}</span>
                {locale === 'ja' ? 'さん' : null}
                <br />
              </>
            ) : null}
            {copy.home.title}
          </div>
          <button className="letsgo glow" onClick={onStartExploration} type="button">
            Let&apos;s Go!&nbsp;&nbsp;⟶
          </button>
        </div>
      </div>
      <BottomNavigation active="home" copy={copy.nav} onNavigate={onNavigate} />
    </section>
  );
}
