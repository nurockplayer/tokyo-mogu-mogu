import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../../../i18n';
import { selectRouteStop, type JourneyRecord } from '../../../data/journey-record';
import { factRetrievalNote, retrievalNote } from '../journey-publication';
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

const stopLabels: Record<Locale, { alternative: string; noAlternative: string }> = {
  ja: { alternative: '代替スポット', noAlternative: 'この立ち寄り先の代替スポットはありません。' },
  en: { alternative: 'Alternative stop', noAlternative: 'There is no alternative for this stop.' },
  'zh-TW': { alternative: '替代景點', noAlternative: '這個停靠點沒有替代景點。' },
};

const shareLabels: Record<Locale, { link: string; close: string }> = {
  ja: { link: 'ルートのリンクをコピー', close: '閉じる' },
  en: { link: 'Copy the route link', close: 'Close' },
  'zh-TW': { link: '複製路線連結', close: '關閉' },
};

const missionSpotIds = import.meta.env.DEV || import.meta.env.MODE === 'data-review' ? new Set([
  'akabeko',
  'yamashiroya',
  'wasabi-kitchen',
  'hikawa-valley',
  'wasabi-experience',
]) : undefined;

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
  record?: JourneyRecord;
  initialVariantId?: RouteVariantId;
  saved?: boolean;
  completedMissionSpotIds?: readonly string[];
  onBack: () => void;
  onShare: (variant: RouteVariant) => Promise<string | undefined>;
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
  record,
  initialVariantId = 'half-day',
  saved = false,
  completedMissionSpotIds = [],
  onBack,
  onShare,
  onRegenerate,
  onOpenSpot,
  onSaveRoute,
  onViewSavedRoutes,
}: RouteScreenProps) {
  const [variantId, setVariantId] = useState(initialVariantId);
  const [shareLink, setShareLink] = useState<string>();
  const shareDialogRef = useRef<HTMLDialogElement>(null);
  const [regenerating, setRegenerating] = useState(false);
  const regenerationTimerRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const labels = routeLabels[locale];
  const variants = journey.routeVariants;
  const variant = variants.find((candidate) => candidate.id === variantId) ?? variants[0];
  const routeKey = `${journey.id}:${variant.id}`;
  const steps = routeStepText[routeKey] ?? [];
  const localizedStats = routeStats[routeKey];
  const localizedRegion = routeRegionGuidance[routeKey];
  if (!localizedStats || !localizedRegion) {
    throw new Error(`Missing Route presentation for journey variant: ${routeKey}`);
  }
  const stats = localizedStats[locale];
  const plannedStops = variant.steps.map((step, index) => ({
    step, index, selectedId: selectRouteStop(record, step.spotId),
  }));
  const changed = plannedStops.some(({ step, selectedId }) => step.spotId !== selectedId);
  const substitutes = new Set(plannedStops.flatMap(({ step, selectedId }) =>
    selectedId && selectedId !== step.spotId ? [selectedId] : []));
  const timeline = plannedStops.filter(({ step, selectedId }) =>
    step.spotId !== selectedId || !substitutes.has(step.spotId));
  const authoredArrival = record?.variants[variant.id]?.arrival;
  const arrival = authoredArrival && !record?.spots[authoredArrival.spotId]?.unavailable ? authoredArrival : undefined;
  const arrivalNote = arrival && record && retrievalNote(locale, [record.sources[arrival.sourceId]]);
  const routeNote = record && factRetrievalNote(record, locale,
    `journey.routeVariants.${record.journey.routeVariants.findIndex(({ id }) => id === variant.id)}.durationMinutes`,
    `variants.${variant.id}.stats.${locale}`,
    `variants.${variant.id}.guidance.${locale}`,
  );

  useEffect(() => {
    if (active) setVariantId(initialVariantId);
  }, [active, initialVariantId]);

  useEffect(() => {
    if (active && shareLink) shareDialogRef.current!.showModal();
    if (!active) shareDialogRef.current!.close();
  }, [active, shareLink]);

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
          onClick={async () => setShareLink(await onShare(variant))}
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
            aria-pressed={candidate.id === variant.id}
          >
            {candidate.id === 'half-day' ? copy.route.halfDay : copy.route.fullDay}
          </button>
        ))}
      </div>
      <dialog
        ref={shareDialogRef}
        className="route-share-dialog"
        aria-labelledby="route-share-link-label"
        onClose={() => setShareLink(undefined)}
      >
        <label id="route-share-link-label" htmlFor="route-share-link">{shareLabels[locale].link}</label>
        <textarea
          id="route-share-link"
          readOnly
          rows={2}
          value={shareLink ?? ''}
          onFocus={(event) => event.currentTarget.select()}
        />
        <form method="dialog">
          <button type="submit">{shareLabels[locale].close}</button>
        </form>
      </dialog>
      <div className="scroll" ref={scrollRef}>
        <div className="route-map">
          <PresentationMedia
            alt={copy.route.mapAlt}
            assetId={changed ? undefined : variant.imageAssetId}
            locale={locale}
          />
        </div>

        <div className="route-info">
          <div className="tx">
            <PinIcon /> {localizedRegion[locale]}
            {arrival ? <><br /><TrainIcon /> <em>{arrival.name[locale]}</em></>
              : !changed && (stats.access || stats.station) ? <><br /><TrainIcon /> {stats.access ? <em>{stats.access}</em> : <><em>{stats.station}</em> {labels.from} <em>{stats.minutes}</em></>}</> : null}
            {arrivalNote ? <small className="route-caution">{arrivalNote}</small> : null}
            {!changed && stats.caution ? <small className="route-caution">{stats.caution}</small> : null}
            {!changed && routeNote ? <small className="route-caution">{stats.time} · {routeNote}</small> : null}
          </div>
          {!record && <button className="regen" disabled={regenerating} onClick={startRegeneration} type="button">
            {labels.regenerate[0]}
            <br />
            {labels.regenerate[1]}
          </button>}
        </div>

        <div className="tl">
          <div className="tl-line" />
          {timeline.map(({ step, index, selectedId }, position) => {
            const spot = currentSpots[selectedId ?? step.spotId];
            if (!spot) throw new Error(`Missing current Spot presentation: ${routeKey} / ${step.spotId}`);
            const unavailable = record?.spots[step.spotId]?.unavailable;
            const isAlternative = unavailable && selectedId;
            const stepText = steps.find((candidate) => candidate.spotId === spot.id);
            const stepNote = record && selectedId && (unavailable
              ? factRetrievalNote(record, locale, `spots.${spot.id}.presentation`)
              : factRetrievalNote(record, locale, `variants.${variant.id}.steps.${index}`, `spots.${spot.id}.presentation`));
            const unavailableNote = record && unavailable &&
              factRetrievalNote(record, locale, `spots.${step.spotId}.unavailable`);
            const isStart = position === 0;
            const openSpot = selectedId ? () => onOpenSpot(spot) : undefined;
            const mission = selectedId && missionSpotIds?.has(selectedId);
            const missionDone = completedMissionSpotIds.includes(spot.id);
            return (
              <div className="tl-step" key={`${step.spotId}-${index}`}>
                {!changed && stepText?.walk ? (
                  <div className="seg">
                    <WalkIcon /> {stepText.walk[locale]}
                  </div>
                ) : null}
                <div className="tl-row">
                  <div className={`num${isStart ? ' start' : ''}`}>{isStart ? labels.start : position}</div>
                  <article
                    className="card"
                    data-spot-id={selectedId}
                    onClick={openSpot}
                    onKeyDown={openSpot && ((event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openSpot();
                      }
                    })}
                    role={openSpot ? 'button' : undefined}
                    tabIndex={openSpot ? (active ? 0 : -1) : undefined}
                  >
                    {mission ? (
                      <span className={`mission-tag${missionDone ? ' done' : ''}`}>
                        <CameraIcon />
                        {missionDone ? labels.missionDone : labels.mission}
                      </span>
                    ) : null}
                    <PresentationMedia assetId={isAlternative ? spot.imageAssetId : step.imageAssetId} locale={locale} />
                    <div className="tx">
                      <b>{isAlternative ? `${stopLabels[locale].alternative} · ` : ''}{spot.copy[locale].name}</b>
                      <p style={{ whiteSpace: 'pre-line' }}>{selectedId
                        ? stepText?.description[locale] ?? spot.copy[locale].lead
                        : stopLabels[locale].noAlternative}</p>
                    </div>
                    {openSpot ? <span className="arw" aria-hidden="true">›</span> : null}
                  </article>
                </div>
                {unavailable ? <div className="tl-note">
                  {isAlternative ? `${currentSpots[step.spotId].copy[locale].name} · ` : ''}{unavailable.reason[locale]}
                  {unavailableNote ? <><br />{unavailableNote}</> : null}
                </div> : null}
                {!changed && stepText?.note ? <div className="tl-note">{stepText.note[locale]}</div> : null}
                {stepNote ? <div className="tl-note">{stepNote}</div> : null}
              </div>
            );
          })}
          {timeline.every(({ selectedId }) => selectedId) && <div className="goal-row">
            <div className="num goal">{labels.goal}</div>
            <b>{labels.completed}</b>
          </div>}
        </div>

        {!changed && <div className="route-stats">
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
        </div>}
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
