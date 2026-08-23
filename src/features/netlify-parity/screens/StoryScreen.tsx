import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../../../i18n';
import { PresentationFactsBlock } from '../components/PresentationFactsBlock';
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
          ja: '地域の味を探すデモ参考スポット',
          en: 'A demo reference stop for exploring local flavors',
          'zh-TW': '探索地方風味的示範參考景點',
        },
      },
      {
        spotId: 'yamashiroya', imageAssetId: 'yamashiroya', badgeColor: '#E98A1C',
        badge: { ja: 'ショップ・雑貨', en: 'Shop', 'zh-TW': '商店・雜貨' },
        description: {
          ja: '長くわさび栽培・加工を続ける奥多摩のわさび専門店',
          en: 'A long-running Okutama shop specializing in wasabi',
          'zh-TW': '長期從事山葵栽培與加工的奧多摩山葵專門店',
        },
      },
      {
        spotId: 'wasabi-kitchen', imageAssetId: 'wasabiKitchen', badgeColor: '#E98A1C',
        badge: { ja: '飲食店', en: 'Restaurant', 'zh-TW': '餐廳' },
        description: {
          ja: '土日を中心に出店・最新の出店予定を確認',
          en: 'Operates mainly on weekends · Check the current schedule',
          'zh-TW': '主要於週末出店・請確認最新行程',
        },
      },
      {
        spotId: 'okutama-kitchen', imageAssetId: 'okutamaKitchen', badgeColor: '#E98A1C',
        badge: { ja: 'カフェ', en: 'Café', 'zh-TW': '咖啡廳' },
        description: {
          ja: '地域の味を探すデモ参考スポット',
          en: 'A demo reference stop for exploring local flavors',
          'zh-TW': '探索地方風味的示範參考景點',
        },
      },
      {
        spotId: 'port-okutama', imageAssetId: 'portCafe', badgeColor: '#E98A1C',
        badge: { ja: 'カフェ', en: 'Café', 'zh-TW': '咖啡廳' },
        description: {
          ja: 'カフェと雑貨の複合スポット',
          en: 'A combined café and lifestyle-goods spot',
          'zh-TW': '結合咖啡與生活雜貨的複合空間',
        },
      },
    ],
    nature: [
      {
        spotId: 'wasabi-experience', imageAssetId: 'wasabiExperience', badgeColor: '#E05B5B',
        badge: { ja: '体験', en: 'Experience', 'zh-TW': '體驗' },
        description: { ja: 'わさび田体験・2〜2.5時間', en: 'Wasabi-field experience · 2–2.5 hours', 'zh-TW': '山葵田體驗・2～2.5 小時' },
        note: { ja: '1日1組・集合時間・料金・空き状況は予約時に確認', en: 'One group daily · Confirm meeting time, price, and availability when booking', 'zh-TW': '每日一組・預約時確認集合時間、價格與名額' },
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
      {
        spotId: 'oku-hikawa-shrine', imageAssetId: 'okuHikawaShrine', badgeColor: '#5E7239',
        badge: { ja: '神社', en: 'Shrine', 'zh-TW': '神社' },
        description: {
          ja: '奥多摩駅近くに佇む、地域の歴史と自然を感じられる静かな神社',
          en: 'A quiet shrine near Okutama Station, alive with the area’s history and nature',
          'zh-TW': '靜靜坐落於奧多摩站附近，能感受地方歷史與自然的神社',
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
          ja: '地域の味を探すデモ参考スポット',
          en: 'A demo reference stop for exploring local flavors',
          'zh-TW': '探索地方風味的示範參考景點',
        },
      },
      {
        spotId: 'yamashiroya', imageAssetId: 'yamashiroyaGoods', badgeColor: '#E98A1C',
        badge: { ja: 'ショップ・雑貨', en: 'Shop', 'zh-TW': '商店・雜貨' },
        description: {
          ja: '長くわさび栽培・加工を続ける奥多摩のわさび専門店',
          en: 'A long-running Okutama shop specializing in wasabi',
          'zh-TW': '長期從事山葵栽培與加工的奧多摩山葵專門店',
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
          ja: '氷川渓谷の水辺をたどる散策',
          en: 'A walk through Hikawa Valley’s waterside landscape',
          'zh-TW': '沿著冰川溪谷水岸景觀散步',
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
    ja: { title: '奥多摩わさびは、どんな味？', body: '奥多摩わさびは、強い辛味、キレの良さ、豊かな風味が特徴です。東京都の公式紹介では、力を入れず細かくすりおろすと風味と辛味が引き出され、3〜5分で香りと辛味が最も高まるとされています。寿司、蕎麦、牛ステーキ、アボカドなどとの組み合わせも紹介されています。' },
    en: { title: 'What does Okutama wasabi taste like?', body: 'Okutama wasabi is known for strong heat, a clean finish, and rich flavor. Tokyo’s official guide says gentle, fine grating brings out its flavor and heat, which peak after about 3–5 minutes; it also suggests sushi, soba, beef steak, and avocado.' },
    'zh-TW': { title: '奧多摩山葵是什麼味道？', body: '奧多摩山葵以鮮明辛味、俐落尾韻與濃郁風味為特色。東京都官方介紹指出，輕柔細磨可帶出風味與辛味，約3–5分鐘達到高峰；亦適合搭配壽司、蕎麥麵、牛排與酪梨。' },
  },
  'demo-okutama-yamame': {
    ja: { title: '奥多摩やまめは、どんな魚？', body: 'すべて雌の三倍体で、性的に成熟しないため、通常のヤマメより長く生きて大型になる養殖魚です。刺身や寿司、ムニエルなどにも利用されています。' },
    en: { title: 'What kind of fish is Okutama Yamame?', body: 'It is an all-female triploid farmed fish. Because it does not mature sexually, it lives longer and grows larger than ordinary yamame, and is used for sashimi, sushi, meunière, and other dishes.' },
    'zh-TW': { title: '奧多摩山女魚是什麼魚？', body: '這是全雌三倍體的養殖魚；因不會性成熟，比一般山女魚壽命更長、體型更大，可用於生魚片、壽司與法式奶油煎魚等料理。' },
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

  useEffect(() => {
    if (active || timerRef.current === null) return;
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setLoading(false);
  }, [active]);

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
          <PresentationFactsBlock
            className="story-presentation-facts"
            facts={journey.facts}
            locale={locale}
          />
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
