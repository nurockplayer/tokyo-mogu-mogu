import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../../../i18n';
import {
  demoSpots,
  referenceAssets,
  type JourneyPresentation,
  type ReferenceAssetId,
  type ReferenceCopy,
  type SpotPresentation,
} from '../content';
import { BackIcon, PinIcon, TrainIcon } from './screenIcons';

interface LocalizedText {
  ja: string;
  en: string;
  'zh-TW': string;
}

interface StorySpotReference {
  spotId: string;
  imageAssetId: ReferenceAssetId;
  badge: LocalizedText;
  badgeColor: string;
  description?: LocalizedText;
  note?: LocalizedText;
}

const storySpotGroups: Record<string, { nearby: StorySpotReference[]; nature: StorySpotReference[] }> = {
  'demo-okutama-wasabi': {
    nearby: [
      {
        spotId: 'akabeko', imageAssetId: 'akabeko', badgeColor: '#E98A1C',
        badge: { ja: '飲食店', en: 'Restaurant', 'zh-TW': '餐廳' },
        description: {
          ja: '奥多摩ヤマメや手作りこんにゃく、わさびジェラートなど、地元の味',
          en: 'Local flavors including Okutama yamame, handmade konnyaku, and wasabi gelato',
          'zh-TW': '奧多摩山女魚、手作蒟蒻與山葵義式冰淇淋等在地滋味',
        },
      },
      {
        spotId: 'yamashiroya', imageAssetId: 'yamashiroya', badgeColor: '#E98A1C',
        badge: { ja: 'ショップ・雑貨', en: 'Shop', 'zh-TW': '商店・雜貨' },
        description: {
          ja: 'ショップ・わさび加工の老舗。創業172年、6代目が受け継ぐ',
          en: 'A 172-year-old wasabi shop now carried on by its sixth generation',
          'zh-TW': '創業 172 年、傳承至第六代的山葵加工老店',
        },
      },
    ],
    nature: [
      {
        spotId: 'wasabi-experience', imageAssetId: 'wasabiExperience', badgeColor: '#E05B5B',
        badge: { ja: '体験', en: 'Experience', 'zh-TW': '體驗' },
        description: { ja: '体験・わさび田', en: 'Visit and experience a wasabi field', 'zh-TW': '山葵田參訪體驗' },
        note: { ja: '要予約・1日1組', en: 'Booking required · One group daily', 'zh-TW': '需預約・每日一組' },
      },
      {
        spotId: 'hikawa-valley', imageAssetId: 'valley', badgeColor: '#5E7239',
        badge: { ja: '自然', en: 'Nature', 'zh-TW': '自然' },
        description: {
          ja: '多摩川と日原川が合流する、奥多摩駅近くの自然豊かな渓谷',
          en: 'A lush valley near Okutama Station where the Tama and Nippara rivers meet',
          'zh-TW': '多摩川與日原川交會、鄰近奧多摩站的自然溪谷',
        },
      },
    ],
  },
  'demo-okutama-yamame': {
    nearby: [
      {
        spotId: 'akabeko', imageAssetId: 'akabekoYamame', badgeColor: '#E98A1C',
        badge: { ja: '飲食店', en: 'Restaurant', 'zh-TW': '餐廳' },
        description: {
          ja: '奥多摩やまめの刺身、味噌と山椒を合わせた焼き物',
          en: 'Okutama yamame sashimi and grilled fish with miso and sansho',
          'zh-TW': '奧多摩山女魚生魚片與味噌山椒烤魚',
        },
      },
      {
        spotId: 'yamashiroya', imageAssetId: 'yamashiroyaGoods', badgeColor: '#E98A1C',
        badge: { ja: 'ショップ・雑貨', en: 'Shop', 'zh-TW': '商店・雜貨' },
        description: {
          ja: 'わさび漬・生わさび・チーズわさびの老舗',
          en: 'A long-running shop for pickled, fresh, and cheese wasabi',
          'zh-TW': '販售山葵漬、生山葵與起司山葵的老店',
        },
      },
    ],
    nature: [
      {
        spotId: 'hikawa-valley', imageAssetId: 'valleyBridge', badgeColor: '#5E7239',
        badge: { ja: '自然', en: 'Nature', 'zh-TW': '自然' },
        description: {
          ja: '冷たく澄んだ流れと吊り橋を歩く渓流さんぽ',
          en: 'A streamside walk over clear, cold water and a suspension bridge',
          'zh-TW': '沿著冰涼清澈溪流與吊橋散步',
        },
      },
      {
        spotId: 'hikawa-valley', imageAssetId: 'riverPortrait', badgeColor: '#5E7239',
        badge: { ja: '自然', en: 'Nature', 'zh-TW': '自然' },
        description: {
          ja: 'やまめも、わさびも、はじまりは多摩川の水',
          en: 'Both yamame and wasabi begin with the Tama River’s water',
          'zh-TW': '山女魚與山葵，都源自多摩川的水',
        },
      },
    ],
  },
};

const storyLocation: Record<string, Record<Locale, { region: string; station: string }>> = {
  'demo-okutama-wasabi': {
    ja: { region: '奥多摩・東京都 (東京西部)', station: '最寄駅：奥多摩駅、御岳駅' },
    en: { region: 'Okutama, Tokyo (Western Tokyo)', station: 'Nearest stations: Okutama and Mitake' },
    'zh-TW': { region: '東京都奧多摩（東京西部）', station: '最近車站：奧多摩站、御嶽站' },
  },
  'demo-okutama-yamame': {
    ja: { region: '奥多摩・東京都 (東京西部)', station: '最寄駅：奥多摩駅' },
    en: { region: 'Okutama, Tokyo (Western Tokyo)', station: 'Nearest station: Okutama' },
    'zh-TW': { region: '東京都奧多摩（東京西部）', station: '最近車站：奧多摩站' },
  },
};

const chapterPoint: Record<string, Record<Locale, { title: string; body: string }>> = {
  'demo-okutama-wasabi': {
    ja: { title: '奥多摩わさびは、どんな味？', body: '奥多摩わさびは、強い辛味とキレ、豊かな風味が特徴。やさしくすりおろすと香りが引き立ち、3〜5分ほどが食べごろです。寿司や蕎麦はもちろん、ステーキやアボカドとも相性抜群です。' },
    en: { title: 'What does Okutama wasabi taste like?', body: 'It is known for vivid heat and a rich aroma. Gently grating it brings the fragrance forward.' },
    'zh-TW': { title: '奧多摩山葵是什麼味道？', body: '特色是鮮明辛味與豐富香氣。輕柔研磨能讓香氣更加突出。' },
  },
  'demo-okutama-yamame': {
    ja: { title: '奥多摩やまめは、どんな魚？', body: '通常より長く生き、大きく育つ希少な川魚。塩焼きだけでなく、刺身や切り身でも味わえます。' },
    en: { title: 'What kind of fish is Okutama yamame?', body: 'A rare river fish that grows larger over a longer life, served grilled, sliced, or as sashimi.' },
    'zh-TW': { title: '奧多摩山女魚是什麼魚？', body: '壽命較長、體型較大的珍稀河魚，可鹽烤、切片或作為生魚片品嚐。' },
  },
};

const routeActionLabel: Record<Locale, string> = {
  ja: 'この食文化の観光ルートを作成する',
  en: 'Create a sightseeing route for this food culture',
  'zh-TW': '建立這項飲食文化的觀光路線',
};

const loadingLabel: Record<Locale, [string, string]> = {
  ja: ['あなたにぴったりの', '観光ルートを生成中！'],
  en: ['Creating a sightseeing route', 'just for you!'],
  'zh-TW': ['正在建立最適合你的', '觀光路線！'],
};

function StorySpotCard({
  active,
  locale,
  reference,
  spot,
  onOpenSpot,
}: {
  active: boolean;
  locale: Locale;
  reference: StorySpotReference;
  spot: SpotPresentation;
  onOpenSpot: (spot: SpotPresentation) => void;
}) {
  const localized = spot.copy[locale];
  const open = () => onOpenSpot(spot);

  return (
    <article
      className="spot-card"
      data-spot-id={spot.id}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      }}
      role="button"
      tabIndex={active ? 0 : -1}
    >
      <div className="ph">
        <img src={referenceAssets[reference.imageAssetId]} alt="" />
        <span className="badge" style={{ background: reference.badgeColor }}>
          {reference.badge[locale]}
        </span>
      </div>
      <b>{localized.name}</b>
      <p>{reference.description?.[locale] ?? localized.lead}</p>
      {reference.note ? <div className="note">{reference.note[locale]}</div> : null}
    </article>
  );
}

export interface StoryScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  journey: JourneyPresentation;
  guideMode?: boolean;
  onBack: () => void;
  onCreateRoute: (journey: JourneyPresentation) => void;
  onOpenSpot: (spot: SpotPresentation) => void;
}

export function StoryScreen({
  active,
  copy,
  locale,
  journey,
  guideMode = true,
  onBack,
  onCreateRoute,
  onOpenSpot,
}: StoryScreenProps) {
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<number | null>(null);
  const localized = journey.copy[locale];
  const location = storyLocation[journey.id]?.[locale] ?? storyLocation['demo-okutama-wasabi'][locale];
  const groups = storySpotGroups[journey.id] ?? storySpotGroups['demo-okutama-wasabi'];
  const point = chapterPoint[journey.id]?.[locale];

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const startRouteGeneration = () => {
    if (loading) return;
    setLoading(true);
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setLoading(false);
      onCreateRoute(journey);
    }, 2_200);
  };

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="story"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <button className="fab-back" onClick={onBack} type="button" aria-label={copy.actions.back}>
        <BackIcon />
      </button>
      <div className="scroll">
        <div className="story-hero">
          <img src={referenceAssets[journey.heroAssetId]} alt="" />
        </div>
        <div className="story-tx">
          <h1>{localized.title}</h1>
          <h2>{localized.subtitle}</h2>
          {localized.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="loc-box">
            <PinIcon /> {location.region}
            <br />
            <TrainIcon /> {location.station}
          </div>
        </div>

        <section className="story-sec">
          <h2>{localized.storyTitle}</h2>
          <div className="hscroll">
            {journey.chapters[locale].map((chapter, index) => (
              <article className="page-card" key={`${chapter.number}-${chapter.title}`}>
                <h3>
                  <em>{chapter.number}</em>
                  {chapter.title}
                </h3>
                <p>{chapter.body}</p>
                {index === 0 && point ? (
                  <div className="mogu-point">
                    <div className="pt">
                      <img src={referenceAssets.logoFace} alt="" /> MOGUMOGU{' '}
                      <em>{copy.story.pointLabel.replace(/^MOGUMOGU\s*/i, '')}</em>
                    </div>
                    <b>{point.title}</b>
                    <p>{point.body}</p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="story-sec">
          <h2>{copy.story.nearbyTitle}</h2>
          <div className="hscroll">
            {groups.nearby.map((reference) => {
              const spot = demoSpots[reference.spotId];
              return spot ? (
                <StorySpotCard
                  active={active}
                  key={`${reference.spotId}-${reference.imageAssetId}`}
                  locale={locale}
                  onOpenSpot={onOpenSpot}
                  reference={reference}
                  spot={spot}
                />
              ) : null;
            })}
          </div>
        </section>

        <section className="story-sec">
          <h2>{copy.story.natureTitle}</h2>
          <div className="hscroll">
            {groups.nature.map((reference) => {
              const spot = demoSpots[reference.spotId];
              return spot ? (
                <StorySpotCard
                  active={active}
                  key={`${reference.spotId}-${reference.imageAssetId}`}
                  locale={locale}
                  onOpenSpot={onOpenSpot}
                  reference={reference}
                  spot={spot}
                />
              ) : null;
            })}
          </div>
        </section>

        <div className="story-cta-wrap">
          <button
            className={`story-cta${guideMode ? ' glow' : ''}`}
            disabled={loading}
            onClick={startRouteGeneration}
            type="button"
          >
            {routeActionLabel[locale]}
          </button>
        </div>
      </div>

      <div
        className={`reference-loading${loading ? ' on' : ''}`}
        data-loading={loading}
        data-route-loading
        aria-hidden={!loading}
        aria-live="polite"
      >
        <div className="face">
          <img src={referenceAssets.logoFace} alt="" />
        </div>
        <div className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <p>
          {loadingLabel[locale][0]}
          <br />
          {loadingLabel[locale][1]}
        </p>
      </div>
    </section>
  );
}
