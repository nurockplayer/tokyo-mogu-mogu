import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../../../i18n';
import {
  currentSpots,
  referenceAssets,
  type JourneyPresentation,
  type ReferenceCopy,
  type SpotPresentation,
} from '../content';
import {
  routeNames,
  routeRegionGuidance,
  routeStats,
  routeStepText,
} from '../factual-presentation';
import { PresentationMedia } from '../components/PresentationMedia';
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

const routeLabels: Record<Locale, {
  from: string;
  regenerate: [string, string];
  start: string;
  goal: string;
  completed: string;
  mission: string;
  missionDone: string;
}> = {
  ja: { from: 'から', regenerate: ['ルートを', '再生成する'], start: '発', goal: 'Goal', completed: 'お疲れ様でした！', mission: 'ミッション', missionDone: 'ミッション達成！' },
  en: { from: 'from', regenerate: ['Regenerate', 'route'], start: 'Go', goal: 'Goal', completed: 'Well done!', mission: 'Mission', missionDone: 'Mission complete!' },
  'zh-TW': { from: '出發', regenerate: ['重新建立', '路線'], start: '發', goal: 'Goal', completed: '辛苦了！', mission: '任務', missionDone: '任務完成！' },
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
  const localizedStats = routeStats[routeKey];
  const localizedRegion = routeRegionGuidance[journey.id];
  if (!localizedStats || !localizedRegion) {
    throw new Error(`Missing Route presentation for journey variant: ${routeKey}`);
  }
  const stats = localizedStats[locale];

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
          <PresentationMedia
            alt={copy.route.mapAlt}
            assetId={variant.imageAssetId}
            locale={locale}
          />
        </div>

        <div className="route-info">
          <div className="tx">
            <PinIcon /> {localizedRegion[locale]}
            <br />
            <TrainIcon /> {stats.access ? <em>{stats.access}</em> : <><em>{stats.station}</em> {labels.from} <em>{stats.minutes}</em></>}
            {stats.caution ? <small className="route-caution">{stats.caution}</small> : null}
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
            const spot = currentSpots[step.spotId];
            if (!spot) return null;
            const stepText = steps.find((candidate) => candidate.spotId === step.spotId);
            const isStart = index === 0;
            const mission = missionSpotIds.has(step.spotId);
            const missionDone = completedMissionSpotIds.includes(step.spotId);
            return (
              <div className="tl-step" key={`${step.spotId}-${index}`}>
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
                    <PresentationMedia assetId={step.imageAssetId} locale={locale} />
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
