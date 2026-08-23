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
    { title: '研究から生まれた、大型のヤマメ', description: '奥多摩やまめの食文化／炉ばた あかべこ・渓流さんぽ' },
  ],
  en: [
    { title: 'A journey through Tokyo wasabi culture', description: 'Okutama · Half day / Wasabi Shokudo, Hikawa Valley, and more' },
    { title: 'A large yamame born from research', description: 'Okutama yamame / Robata Akabeko and a streamside walk' },
  ],
  'zh-TW': [
    { title: '走訪東京山葵文化之旅', description: '奧多摩・半日／山葵食堂、冰川溪谷等' },
    { title: '從研究中誕生的大型山女魚', description: '奧多摩山女魚／爐端燒 AKABEKO、溪流散步' },
  ],
};

interface HomeScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  nickname: string;
  favoriteJourneyIds?: readonly string[];
  onNavigate: (path: string) => void;
  onOpenJourney: (journey: JourneyPresentation) => void;
  onToggleFavorite: (journey: JourneyPresentation) => void;
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
  favoriteJourneyIds = [],
  onNavigate,
  onOpenJourney,
  onToggleFavorite,
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
              const favorite = favoriteJourneyIds.includes(journey.id);
              return (
                <article className="trip-card" key={journey.id}>
                  <button
                    className="trip-card-open"
                    onClick={() => onOpenJourney(journey)}
                    tabIndex={active ? 0 : -1}
                    type="button"
                  >
                    <div className="ph">
                      <img src={index === 0 ? referenceAssets.river : referenceAssets.valley} alt="" />
                    </div>
                    <div className="tx">
                      <b>{card.title}</b>
                      <p>{card.description}</p>
                    </div>
                  </button>
                  <button
                    className={`bk${favorite ? ' saved' : ''}`}
                    onClick={() => onToggleFavorite(journey)}
                    tabIndex={active ? 0 : -1}
                    type="button"
                    aria-label={favorite
                      ? locale === 'ja' ? 'お気に入りから削除' : locale === 'zh-TW' ? '從收藏移除' : 'Remove from favorites'
                      : locale === 'ja' ? 'お気に入りに保存' : locale === 'zh-TW' ? '儲存至收藏' : 'Save to favorites'}
                    aria-pressed={favorite}
                  >
                      <BookmarkIcon />
                  </button>
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
