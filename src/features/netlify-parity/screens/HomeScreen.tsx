import { BottomNavigation } from '../components/BottomNavigation';
import {
  demoJourneys,
  referenceAssets,
  type JourneyPresentation,
  type ReferenceCopy,
} from '../content';
import type { Locale } from '../../../i18n';

const homeJourneyCards: Record<Locale, Array<{ title: string; description: string }>> = {
  ja: [
    { title: '東京わさび文化を巡る旅', description: '奥多摩・半日巡り／わさび食堂・氷川渓谷など' },
    { title: '水が育てる、幻の川魚', description: '奥多摩やまめの食文化／炉ばた あかべこ・渓流さんぽ' },
  ],
  en: [
    { title: 'A journey through Tokyo wasabi culture', description: 'Okutama · Half day / Wasabi Shokudo, Hikawa Valley, and more' },
    { title: 'A rare river fish raised by water', description: 'Okutama yamame / Robata Akabeko and a streamside walk' },
  ],
  'zh-TW': [
    { title: '走訪東京山葵文化之旅', description: '奧多摩・半日／山葵食堂、冰川溪谷等' },
    { title: '由水孕育的珍稀河魚', description: '奧多摩山女魚／爐端燒 AKABEKO、溪流散步' },
  ],
};

interface HomeScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  nickname: string;
  onNavigate: (path: string) => void;
  onOpenJourney: (journey: JourneyPresentation) => void;
  onStartExploration: () => void;
}

function BookmarkIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 4h10v16l-5-3.5L7 20Z" />
    </svg>
  );
}

export function HomeScreen({
  active,
  copy,
  locale,
  nickname,
  onNavigate,
  onOpenJourney,
  onStartExploration,
}: HomeScreenProps) {
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
        <div className="section">
          <h2>
            {locale === 'ja' ? '私の食旅' : locale === 'zh-TW' ? '我的美食之旅' : 'My food journeys'}{' '}
            <small>{locale === 'ja' ? '(過去の旅)' : locale === 'zh-TW' ? '（過去旅程）' : '(past journeys)'}</small>
          </h2>
          <div>
            {demoJourneys.map((journey, index) => {
              const card = homeJourneyCards[locale][index] ?? journey.copy[locale];
              return (
                <article
                  className="trip-card"
                  key={journey.id}
                  onClick={() => onOpenJourney(journey)}
                  role="button"
                  tabIndex={active ? 0 : -1}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onOpenJourney(journey);
                    }
                  }}
                >
                  <div className="ph">
                    <img src={index === 0 ? referenceAssets.river : referenceAssets.valley} alt="" />
                    <span className="bk">
                      <BookmarkIcon />
                    </span>
                  </div>
                  <div className="tx">
                    <b>{card.title}</b>
                    <p>{card.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <button className="wide-btn" onClick={() => onNavigate('/explore/result')} type="button">
            {copy.actions.viewAll}
          </button>
        </div>
      </div>
      <BottomNavigation active="home" copy={copy.nav} onNavigate={onNavigate} />
    </section>
  );
}
