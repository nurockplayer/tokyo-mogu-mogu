import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../../../i18n';
import {
  demoSpots,
  referenceAssets,
  type JourneyPresentation,
  type ReferenceCopy,
  type SpotPresentation,
} from '../content';
import {
  BookmarkIcon,
  CameraIcon,
  ClockIcon,
  GearIcon,
  PinIcon,
  ShareIcon,
  TrainIcon,
  WalkIcon,
} from './screenIcons';

type RouteVariant = JourneyPresentation['routeVariants'][number];
type RouteVariantId = RouteVariant['id'];

interface LocalizedText {
  ja: string;
  en: string;
  'zh-TW': string;
}

interface RouteStepText {
  walk?: LocalizedText;
  description: LocalizedText;
  note?: LocalizedText;
}

const t = (ja: string, en: string, zhTW: string): LocalizedText => ({ ja, en, 'zh-TW': zhTW });

const routeNames: Record<string, LocalizedText> = {
  'demo-okutama-wasabi': t('東京わさび文化を巡る旅', 'A journey through Tokyo wasabi culture', '走訪東京山葵文化之旅'),
  'demo-okutama-yamame': t('新宿から約90分、奥多摩やまめを味わう旅', 'Taste Okutama yamame, 90 minutes from Shinjuku', '從新宿約 90 分鐘，品嚐奧多摩山女魚'),
};

const routeStepText: Record<string, RouteStepText[]> = {
  'demo-okutama-wasabi:half-day': [
    { description: t('旅のスタート地点', 'Starting point', '旅程起點') },
    { walk: t('徒歩 約1分', 'About 1 min on foot', '步行約 1 分鐘'), description: t('わさぴーと観光案内で情報をチェック！', 'Check maps and local tips with Wasapy!', '和 Wasapy 一起確認觀光資訊！') },
    { walk: t('徒歩 約 1 分', 'About 1 min on foot', '步行約 1 分鐘'), description: t('・土日のみ営業\n・¥900〜', 'Weekends only · From ¥900', '僅週末營業・¥900 起'), note: t('※平日はあかべこ推奨', 'Akabeko is recommended on weekdays', '平日建議前往 AKABEKO') },
    { walk: t('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: t('・わさびジェラート', 'Wasabi gelato', '山葵義式冰淇淋') },
    { walk: t('徒歩 約 10 分', 'About 10 min on foot', '步行約 10 分鐘'), description: t('川辺で涼む', 'Cool off beside the river', '在河畔納涼') },
    { walk: t('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: t('お参り！', 'Visit the shrine', '參拜神社！') },
    { walk: t('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: t('カフェ・雑貨でゆったり！', 'Relax with coffee and local goods', '在咖啡與雜貨中悠閒休息！') },
  ],
  'demo-okutama-wasabi:full-day': [
    { description: t('JR青梅線・旅のスタート地点', 'JR Ome Line · Starting point', 'JR 青梅線・旅程起點') },
    { walk: t('集合 8:30', 'Meet at 8:30', '8:30 集合'), description: t('わさび田プライベートツアー\n・2〜2.5時間・1日1組', 'Private wasabi-field tour · 2–2.5 hours · One group daily', '山葵田私人導覽・2～2.5 小時・每日一組') },
    { walk: t('御岳駅から電車', 'Train from Mitake Station', '從御嶽站搭電車'), description: t('青梅線 約20分', 'About 20 min on the Ome Line', '青梅線約 20 分鐘') },
    { walk: t('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: t('昼食・13:30 L.O.注意', 'Lunch · Last order 13:30', '午餐・13:30 最後點餐') },
    { walk: t('徒歩 約 3 分', 'About 3 min on foot', '步行約 3 分鐘'), description: t('わさび漬・チーズわさび', 'Pickled and cheese wasabi', '山葵漬・起司山葵') },
    { walk: t('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: t('締めのコーヒー', 'Coffee to close the journey', '以咖啡為旅程收尾') },
  ],
  'demo-okutama-yamame:half-day': [
    { description: t('旅のスタート地点', 'Starting point', '旅程起點') },
    { walk: t('徒歩 約 1 分', 'About 1 min on foot', '步行約 1 分鐘'), description: t('情報収集 30分', 'Gather information · 30 min', '蒐集資訊・30 分鐘') },
    { walk: t('徒歩 約 10 分', 'About 10 min on foot', '步行約 10 分鐘'), description: t('渓流さんぽ 60分', 'Streamside walk · 60 min', '溪流散步・60 分鐘') },
    { walk: t('徒歩 約 15 分', 'About 15 min on foot', '步行約 15 分鐘'), description: t('やまめの昼食 60分', 'Yamame lunch · 60 min', '山女魚午餐・60 分鐘') },
  ],
};

const routeStats: Record<string, Record<Locale, { time: string; distance: string; spots: string; station: string; minutes: string }>> = {
  'demo-okutama-wasabi:half-day': {
    ja: { time: '約 2.5 時間', distance: '徒歩約 6 km', spots: '6 スポット', station: '東京駅', minutes: '60 分' },
    en: { time: 'About 2.5 hr', distance: 'Walk about 6 km', spots: '6 spots', station: 'Tokyo Station', minutes: '60 min' },
    'zh-TW': { time: '約 2.5 小時', distance: '步行約 6 km', spots: '6 個景點', station: '東京站', minutes: '60 分鐘' },
  },
  'demo-okutama-wasabi:full-day': {
    ja: { time: '約 7 時間', distance: '電車 + 徒歩', spots: '6 スポット', station: '東京駅', minutes: '90 分' },
    en: { time: 'About 7 hr', distance: 'Train + walking', spots: '6 spots', station: 'Tokyo Station', minutes: '90 min' },
    'zh-TW': { time: '約 7 小時', distance: '電車＋步行', spots: '6 個景點', station: '東京站', minutes: '90 分鐘' },
  },
  'demo-okutama-yamame:half-day': {
    ja: { time: '約 4 時間', distance: '徒歩約 4 km', spots: '3 スポット', station: '新宿駅', minutes: '90 分' },
    en: { time: 'About 4 hr', distance: 'Walk about 4 km', spots: '3 spots', station: 'Shinjuku Station', minutes: '90 min' },
    'zh-TW': { time: '約 4 小時', distance: '步行約 4 km', spots: '3 個景點', station: '新宿站', minutes: '90 分鐘' },
  },
};

const routeLabels: Record<Locale, {
  region: string;
  from: string;
  regenerate: [string, string];
  start: string;
  goal: string;
  completed: string;
  mission: string;
  missionDone: string;
}> = {
  ja: { region: '奥多摩・東京都 (東京西部)', from: 'から', regenerate: ['ルートを', '再生成する'], start: '発', goal: 'Goal', completed: 'お疲れ様でした！', mission: 'ミッション', missionDone: 'ミッション達成！' },
  en: { region: 'Okutama, Tokyo (Western Tokyo)', from: 'from', regenerate: ['Regenerate', 'route'], start: 'Go', goal: 'Goal', completed: 'Well done!', mission: 'Mission', missionDone: 'Mission complete!' },
  'zh-TW': { region: '東京都奧多摩（東京西部）', from: '出發', regenerate: ['重新建立', '路線'], start: '發', goal: 'Goal', completed: '辛苦了！', mission: '任務', missionDone: '任務完成！' },
};

const missionSpotIds = new Set([
  'akabeko',
  'yamashiroya',
  'wasabi-kitchen',
  'hikawa-valley',
  'wasabi-experience',
]);

const routeGenerationLabel: Record<Locale, [string, string]> = {
  ja: ['あなたにぴったりの', '観光ルートを生成中！'],
  en: ['Creating a sightseeing route', 'just for you!'],
  'zh-TW': ['正在建立最適合你的', '觀光路線！'],
};

export interface RouteScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  journey: JourneyPresentation;
  saved?: boolean;
  completedMissionSpotIds?: readonly string[];
  onBack: () => void;
  onShare?: (journey: JourneyPresentation) => void;
  onRegenerate?: (journey: JourneyPresentation, variant: RouteVariant) => void;
  onOpenSpot: (spot: SpotPresentation) => void;
  onSaveRoute: (journey: JourneyPresentation) => void;
  onViewSavedRoutes: () => void;
}

export function RouteScreen({
  active,
  copy,
  locale,
  journey,
  saved = false,
  completedMissionSpotIds = [],
  onBack,
  onShare,
  onRegenerate,
  onOpenSpot,
  onSaveRoute,
  onViewSavedRoutes,
}: RouteScreenProps) {
  const [variantId, setVariantId] = useState<RouteVariantId>('half-day');
  const [regenerating, setRegenerating] = useState(false);
  const wasActiveRef = useRef(active);
  const regenerationTimerRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const labels = routeLabels[locale];
  const variants = journey.routeVariants;
  const variant = variants.find((candidate) => candidate.id === variantId) ?? variants[0];
  const routeKey = `${journey.id}:${variant.id}`;
  const steps = routeStepText[routeKey] ?? [];
  const stats = routeStats[routeKey]?.[locale] ?? routeStats['demo-okutama-wasabi:half-day'][locale];

  useEffect(() => {
    if (active && !wasActiveRef.current) setVariantId('half-day');
    wasActiveRef.current = active;
  }, [active]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [journey.id, variant.id]);

  useEffect(
    () => () => {
      if (regenerationTimerRef.current !== null) window.clearTimeout(regenerationTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (active || regenerationTimerRef.current === null) return;
    window.clearTimeout(regenerationTimerRef.current);
    regenerationTimerRef.current = null;
    setRegenerating(false);
  }, [active]);

  const startRegeneration = () => {
    if (regenerating) return;
    setRegenerating(true);
    regenerationTimerRef.current = window.setTimeout(() => {
      regenerationTimerRef.current = null;
      setRegenerating(false);
      onRegenerate?.(journey, variant);
    }, 1_200);
  };

  if (!variant) return null;

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="route"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <header className="ghead">
        <button className="back" onClick={onBack} type="button" aria-label={copy.actions.back}>
          ‹
        </button>
        <span>{routeNames[journey.id]?.[locale] ?? journey.copy[locale].title}</span>
        <button
          className="share-btn"
          onClick={() => onShare?.(journey)}
          type="button"
          aria-label={copy.actions.shareRoute}
        >
          <ShareIcon />
        </button>
      </header>
      <div className="day-toggle">
        {variants.map((candidate) => (
          <button
            className={candidate.id === variant.id ? 'on' : undefined}
            key={candidate.id}
            onClick={() => setVariantId(candidate.id)}
            type="button"
          >
            {candidate.id === 'half-day' ? copy.route.halfDay : copy.route.fullDay}
          </button>
        ))}
      </div>
      <div className="scroll" ref={scrollRef}>
        <div className="route-map">
          <img src={referenceAssets[variant.imageAssetId]} alt={copy.route.mapAlt} />
        </div>

        <div className="route-info">
          <div className="tx">
            <PinIcon /> {labels.region}
            <br />
            <TrainIcon /> <em>{stats.station}</em> {labels.from} <em>{stats.minutes}</em>
          </div>
          <button className="regen" disabled={regenerating} onClick={startRegeneration} type="button">
            {labels.regenerate[0]}
            <br />
            {labels.regenerate[1]}
          </button>
        </div>

        <div className="tl">
          <div className="tl-line" />
          {variant.steps.map((step, index) => {
            const spot = demoSpots[step.spotId];
            if (!spot) return null;
            const stepText = steps[index];
            const isStart = index === 0;
            const mission = missionSpotIds.has(step.spotId);
            const missionDone = completedMissionSpotIds.includes(step.spotId);
            return (
              <div key={`${step.spotId}-${index}`}>
                {stepText?.walk ? (
                  <div className="seg">
                    <WalkIcon /> {stepText.walk[locale]}
                  </div>
                ) : null}
                <div className="tl-row">
                  <div className={`num${isStart ? ' start' : ''}`}>{isStart ? labels.start : index}</div>
                  <article
                    className="card"
                    data-spot-id={spot.id}
                    onClick={() => onOpenSpot(spot)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onOpenSpot(spot);
                      }
                    }}
                    role="button"
                    tabIndex={active ? 0 : -1}
                  >
                    {mission ? (
                      <span className={`mission-tag${missionDone ? ' done' : ''}`}>
                        <CameraIcon />
                        {missionDone ? labels.missionDone : labels.mission}
                      </span>
                    ) : null}
                    <img src={referenceAssets[step.imageAssetId]} alt="" />
                    <div className="tx">
                      <b>{spot.copy[locale].name}</b>
                      <p style={{ whiteSpace: 'pre-line' }}>{stepText?.description[locale] ?? spot.copy[locale].lead}</p>
                    </div>
                    <span className="arw" aria-hidden="true">›</span>
                  </article>
                </div>
                {stepText?.note ? <div className="tl-note">{stepText.note[locale]}</div> : null}
              </div>
            );
          })}
          <div className="goal-row">
            <div className="num goal">{labels.goal}</div>
            <b>{labels.completed}</b>
          </div>
        </div>

        <div className="route-stats">
          <div className="st">
            <ClockIcon />
            <b>{stats.time}</b>
          </div>
          <div className="st">
            <WalkIcon />
            <b>{stats.distance}</b>
          </div>
          <div className="st">
            <GearIcon />
            <b>{stats.spots}</b>
          </div>
        </div>
        <div className="route-actions">
          <button
            className="save"
            disabled={saved}
            onClick={() => {
              if (!saved) onSaveRoute(journey);
            }}
            type="button"
            aria-pressed={saved}
          >
            <BookmarkIcon /> {saved ? copy.route.saved : copy.actions.saveRoute}
          </button>
          <button className="view" onClick={onViewSavedRoutes} type="button">
            {copy.actions.viewSavedRoute}
          </button>
        </div>
      </div>

      <div
        className={`reference-loading${regenerating ? ' on' : ''}`}
        data-loading={regenerating}
        data-route-loading
        aria-hidden={!regenerating}
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
          {routeGenerationLabel[locale][0]}
          <br />
          {routeGenerationLabel[locale][1]}
        </p>
      </div>
    </section>
  );
}
