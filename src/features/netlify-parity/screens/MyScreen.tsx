import type { Locale } from '../../../i18n';
import { BottomNavigation } from '../components/BottomNavigation';
import { LocaleControl } from '../components/LocaleControl';
import {
  referenceAssets,
  type JourneyPresentation,
  type ReferenceAssetId,
  type ReferenceCopy,
} from '../content';

interface LocalizedText {
  ja: string;
  en: string;
  'zh-TW': string;
}

export interface MyBadgePresentation {
  id: string;
  name: LocalizedText;
  imageAssetId: ReferenceAssetId;
  earned: boolean;
}

const defaultBadges: MyBadgePresentation[] = [
  { id: 'akabeko', name: { ja: 'わさび料理バッジ', en: 'Wasabi dish badge', 'zh-TW': '山葵料理徽章' }, imageAssetId: 'akabeko', earned: false },
  { id: 'wasabi-kitchen', name: { ja: 'わさび丼バッジ', en: 'Wasabi bowl badge', 'zh-TW': '山葵丼徽章' }, imageAssetId: 'wasabiKitchen', earned: false },
  { id: 'yamashiroya', name: { ja: 'おみやげバッジ', en: 'Souvenir badge', 'zh-TW': '伴手禮徽章' }, imageAssetId: 'yamashiroyaGoods', earned: false },
  { id: 'hikawa-valley', name: { ja: '渓流バッジ', en: 'Mountain stream badge', 'zh-TW': '溪流徽章' }, imageAssetId: 'valley', earned: false },
  { id: 'wasabi-experience', name: { ja: 'わさび田バッジ', en: 'Wasabi field badge', 'zh-TW': '山葵田徽章' }, imageAssetId: 'wasabiExperience', earned: false },
];

const myLabels: Record<Locale, {
  guest: string;
  honorific: string;
  prompt: string;
  profileTitle: string;
  unregistered: string;
  edit: string;
  languageTitle: string;
  badgeTitle: string;
  notEarned: string;
  routeTitle: string;
  noRoutes: string;
}> = {
  ja: {
    guest: 'ゲストさん', honorific: 'さん', prompt: '東京の食旅、たのしんでいますか？',
    profileTitle: 'あなたのFood Profile', unregistered: '未登録', edit: '編集する',
    languageTitle: '表示言語',
    badgeTitle: 'モグモグバッジ', notEarned: '未獲得', routeTitle: 'マイルート', noRoutes: 'まだ保存されていません',
  },
  en: {
    guest: 'Guest', honorific: '', prompt: 'Enjoying your Tokyo food journeys?',
    profileTitle: 'Your Food Profile', unregistered: 'Not registered', edit: 'Edit',
    languageTitle: 'Language',
    badgeTitle: 'MOGU MOGU badges', notEarned: 'Not earned', routeTitle: 'My Routes', noRoutes: 'No routes saved yet',
  },
  'zh-TW': {
    guest: '訪客', honorific: '', prompt: '享受你的東京美食之旅嗎？',
    profileTitle: '你的飲食檔案', unregistered: '尚未建立', edit: '編輯',
    languageTitle: '顯示語言',
    badgeTitle: 'MOGU MOGU 徽章', notEarned: '尚未獲得', routeTitle: '我的路線', noRoutes: '目前尚未儲存',
  },
};

export interface MyScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  nickname: string;
  profileSummary?: readonly string[];
  badges?: MyBadgePresentation[];
  savedJourneys: JourneyPresentation[];
  onEditProfile: () => void;
  onOpenSavedJourney: (journey: JourneyPresentation) => void;
  onChangeLocale: (locale: Locale) => void;
  onNavigate: (path: string) => void;
}

export function MyScreen({
  active,
  copy,
  locale,
  nickname,
  profileSummary = [],
  badges = defaultBadges,
  savedJourneys,
  onEditProfile,
  onOpenSavedJourney,
  onChangeLocale,
  onNavigate,
}: MyScreenProps) {
  const labels = myLabels[locale];
  const earnedCount = badges.filter((badge) => badge.earned).length;

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="my"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <header className="ghead">{copy.my.title}</header>
      <div className="simple-body">
        <div className="profile-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={referenceAssets.logoFace} style={{ width: 56 }} alt="" />
          <div>
            <b style={{ fontSize: 18 }}>
              {nickname ? `${nickname}${labels.honorific}` : labels.guest}
            </b>
            <p style={{ color: 'var(--ink-soft)', fontSize: 12.5 }}>{labels.prompt}</p>
          </div>
        </div>

        <section className="profile-card">
          <h3>{labels.profileTitle}</h3>
          {profileSummary.length > 0 ? (
            <p>
              {profileSummary.map((line) => (
                <span key={line}>
                  ・{line}
                  <br />
                </span>
              ))}
            </p>
          ) : (
            <p>・{labels.unregistered}</p>
          )}
          <button
            className="btn outline"
            style={{ marginTop: 12, width: '100%' }}
            onClick={onEditProfile}
            type="button"
          >
            {labels.edit}
          </button>
        </section>

        <section className="profile-card locale-preference">
          <h3>{labels.languageTitle}</h3>
          <LocaleControl locale={locale} label={labels.languageTitle} onChange={onChangeLocale} />
        </section>

        <section className="profile-card">
          <h3>
            {labels.badgeTitle}{' '}
            <small style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>
              {earnedCount}/{badges.length}
            </small>
          </h3>
          <div className="badge-grid">
            {badges.map((badge) => (
              <div className={`badge-item${badge.earned ? '' : ' locked'}`} key={badge.id}>
                <div className="bimg">
                  <img className="ph" src={referenceAssets[badge.imageAssetId]} alt="" />
                  {badge.earned ? <img className="hana" src={referenceAssets.hanamaru} alt="" /> : null}
                </div>
                <b>{badge.name[locale]}</b>
                {badge.earned ? null : <small>{labels.notEarned}</small>}
              </div>
            ))}
          </div>
        </section>

        <section className="profile-card">
          <h3>{labels.routeTitle}</h3>
          {savedJourneys.length > 0 ? (
            savedJourneys.map((journey) => {
              const localized = journey.copy[locale];
              return (
                <article
                  className="my-route"
                  data-journey-id={journey.id}
                  key={journey.id}
                  onClick={() => onOpenSavedJourney(journey)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onOpenSavedJourney(journey);
                    }
                  }}
                  role="button"
                  tabIndex={active ? 0 : -1}
                >
                  <img src={referenceAssets[journey.imageAssetId]} alt="" />
                  <div className="tx">
                    <b>{localized.title}</b>
                    <p>{localized.subtitle}</p>
                  </div>
                  <span className="arw" aria-hidden="true">›</span>
                </article>
              );
            })
          ) : (
            <p style={{ color: 'var(--ink-soft)' }}>{labels.noRoutes}</p>
          )}
        </section>
      </div>
      <BottomNavigation active="my" copy={copy.nav} onNavigate={onNavigate} />
    </section>
  );
}
