/**
 * S5 Model Route page (Issue #45).
 *
 * Renders deterministic editorial Tokyo food-culture routes, including the
 * frozen 奥多摩わさび golden path and the source-backed regional journeys:
 * course header (name / duration / transport / total time), a half-day ⇄ 1-day
 * switch, a stylized SVG map with numbered pins (pin number == timeline step
 * number), the vertical timeline of steps with mobility between them, warning
 * badges, and the primary "save this itinerary" CTA writing to the shared
 * `tmm:savedRoutes` persistence contract (#45 / #47).
 *
 * Deterministic, accountless, no geolocation. All UI chrome copy goes through
 * useI18n().t(); place/route content uses the records' {Ja,En} fields.
 */
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  Card,
  Chip,
  Mobility,
  RouteStep,
  StorySection,
  Tag,
  Toast,
} from '../ui';
import {
  getPlaceById,
  getRouteById,
  places,
  projectRoutePins,
  resolveRouteId,
} from '../data';
import type { RouteDuration } from '../data';
import { useI18n, type Locale, type LocaleKey } from '../i18n';
import {
  routeNameKey,
  placeNameKey,
  stepRoleKey,
  mobilityLabelKey,
  routeAdvisoryKeys,
  routeEstimateKey,
  routeOperationalNoteKey,
  routeTransportKey,
} from '../i18n/data-content';
import { isRouteSaved, saveRoute, unsaveRoute } from '../lib/saved-routes';
import { routeBackHref, routeContextSearch } from './route-context';
import './route-spot.css';
import { journeyScrollRestoreState } from '../app/JourneyScrollManager';

const DURATIONS: RouteDuration[] = ['half-day', '1-day'];

/** Formats a minute total as "3h 10m" (kept locale-agnostic for the header). */
function formatTotalMinutes(total: number, locale: Locale): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  // English orders hours before minutes; Japanese orders units too but keeps
  // the same shape here for a compact single-line header.
  return locale === 'ja' ? `${h}時間${m}分` : `${h}h ${m}m`;
}

export function RoutePage() {
  const { locale, t } = useI18n();
  const location = useLocation();
  // The route comes from the URL context. An explicit `?routeId=` (a
  // saved-route reopen from My) is authoritative and never substituted — an
  // unknown/stale id resolves to itself so this screen shows its honest
  // not-found state instead of the pilot route. Otherwise a forwarded
  // candidate id resolves its journey; Discover / direct entry falls back to
  // the demo journey.
  const routeId = useMemo(() => resolveRouteId(location.search), [location.search]);
  const route = useMemo(() => getRouteById(routeId ?? ''), [routeId]);

  const [duration, setDuration] = useState<RouteDuration>(
    route?.defaultDuration ?? 'half-day',
  );
  const [saved, setSaved] = useState<boolean>(() => (routeId ? isRouteSaved(routeId) : false));
  const [toast, setToast] = useState<null | { message: string; saved: boolean }>(null);

  if (!route) {
    return (
      <div className="tmm-page">
        <Card>
          <h2>{t('s5NotFoundTitle')}</h2>
          <p>{t('s5NotFoundBody')}</p>
          <Link
            to={routeBackHref(location.search)}
            className="tmm-btn tmm-btn--secondary"
          >
            {t('back')}
          </Link>
        </Card>
      </div>
    );
  }

  const variant = route.variants[duration];
  const pins = projectRoutePins(variant.steps, places);

  // Localized copy with the record's canonical {Ja,En} fields as the honest
  // fallback when no per-id i18n key is configured — never another culture's
  // name (no silent wasabi/Okutama copy for unknown/new ids).
  const localized = (key: LocaleKey | undefined, ja: string, en: string): string =>
    key ? t(key) : locale === 'ja' ? ja : en;

  // Route-specific transport guidance. A per-route localized key (ja/en/zh-TW)
  // wins when configured; otherwise the route's own {Ja,En} variant data is the
  // honest fallback (a non-Japanese locale uses the record's English variant).
  const transportKey = routeTransportKey(route.id);
  const transport = transportKey
    ? t(transportKey)
    : locale === 'ja' ? variant.transportJa : variant.transportEn || variant.transportJa;

  // Route-specific advisory/observation copy. Only the demo route carries one
  // today; any other route renders no advisory rather than Okutama's hedged
  // field note (honest unknown).
  const advisory = routeAdvisoryKeys(route.id);
  const estimateKey = routeEstimateKey(route.id);
  const operationalNoteKey = routeOperationalNoteKey(route.id);

  // Preserve the caller through every Route → Spot link. The helper allowlists
  // origins and the Story's own back target before forwarding them.
  const originQuery = routeContextSearch(location.search);

  const handleToggle = (next: RouteDuration) => {
    if (next === duration) return;
    setDuration(next);
  };

  const handleSave = () => {
    if (!routeId) return;
    if (saved) {
      unsaveRoute(routeId);
      setSaved(false);
      setToast({ message: t('s5UnsavedToast'), saved: false });
    } else {
      saveRoute(routeId);
      setSaved(true);
      setToast({ message: t('s5SavedToast'), saved: true });
    }
  };

  return (
    <div className="tmm-page">
      <header className="s5-figma-header">
        <Link
          to={routeBackHref(location.search)}
          state={journeyScrollRestoreState}
          aria-label={t('back')}
          className="s5-figma-header__back"
        >
          ‹
        </Link>
        <p>{localized(routeNameKey(route.id), route.nameJa, route.nameEn)}</p>
      </header>

      {/* Course header */}
      <div className="s5-hero">
        <p className="s5-hero__kicker">{t('s5Kicker')}</p>
        <h1 className="s5-hero__title">{localized(routeNameKey(route.id), route.nameJa, route.nameEn)}</h1>
        <div className="s5-hero__meta">
          <span className="s5-hero__meta-item">
            {t(duration === 'half-day' ? 's5DurationHalfDay' : 's5DurationFullDay')}
          </span>
          <span className="s5-hero__meta-item">
            🚌 {transport}
          </span>
          <span className="s5-hero__meta-item">
            ⏱ {formatTotalMinutes(variant.totalMinutes, locale)}
          </span>
        </div>
        {estimateKey ? <p className="s5-hero__note">{t(estimateKey)}</p> : null}
      </div>

      {/* Route-specific crowding advisory (#83) — hedged field observation,
          never stated as a verified fact or realtime data. Only routes that
          actually carry the observation render it. */}
      {advisory ? (
        <section className="s5-crowding" aria-label={t(advisory.advisory)}>
          <Tag tone="warning">{t(advisory.advisory)}</Tag>
          <p className="s5-crowding__source">{t(advisory.source)}</p>
        </section>
      ) : null}

      {/* Half-day ⇄ 1-day switch */}
      <div className="s5-duration-switch" role="group" aria-label={t('s5SwitchLabel')}>
        {DURATIONS.map((d) => (
          <Chip key={d} selected={d === duration} onClick={() => handleToggle(d)}>
            {t(d === 'half-day' ? 's5DurationHalfDay' : 's5DurationFullDay')}
          </Chip>
        ))}
      </div>

      {/* Stylized route map with numbered pins */}
      <section className="tmm-section" aria-label={t('s5MapLabel')}>
        <div className="s5-map">
          <div className="s5-map__canvas">
            <svg
              className="s5-map__deco"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="s5-map__river"
                d="M -5 92 C 20 78, 28 84, 44 66 C 58 50, 70 58, 106 34"
              />
              <path
                className="s5-map__path"
                d={pins
                  .map((pin, i) =>
                    i === 0 ? `M ${pin.x} ${pin.y}` : `L ${pin.x} ${pin.y}`,
                  )
                  .join(' ')}
              />
            </svg>
            {pins.map((pin) => (
              <Link
                key={pin.stepNumber}
                to={`/spot/${variant.steps[pin.stepNumber - 1].placeId}${originQuery}`}
                className={`s5-map__pin ${pin.stepNumber === 1 ? 's5-map__pin--current' : ''}`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                aria-label={`${t('s5PinLabel')} ${pin.stepNumber}`}
              >
                {pin.stepNumber}
              </Link>
            ))}
          </div>
          <div className="s5-map__legend">
            <span className="s5-map__legend-item">
              <span className="s5-map__legend-dot" aria-hidden="true" />
              {t('s5LegendStart')}
            </span>
            <span className="s5-map__legend-item">
              <span className="s5-map__legend-dot s5-map__legend-dot--orange" aria-hidden="true" />
              {t('s5LegendSteps')}
            </span>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <StorySection kicker={t('s5TimelineKicker')} title={t('s5TimelineTitle')}>
        <div className="s5-timeline">
          {variant.steps.map((step) => {
            const place = getPlaceById(step.placeId);
            if (!place) return null;
            const mobility = variant.mobility.find(
              (seg) => seg.fromStep === step.stepNumber,
            );
            const placeName = localized(placeNameKey(place.id), place.nameJa, place.nameEn);
            return (
              <div key={step.placeId}>
                <Link
                  to={`/spot/${step.placeId}${originQuery}`}
                  className="s5-timeline__pin-link"
                  aria-label={`${t('s5PinLabel')} ${step.stepNumber}: ${placeName}`}
                >
                  <RouteStep
                    number={step.stepNumber}
                    name={placeName}
                    role={localized(
                      stepRoleKey(route.id, step.placeId, duration),
                      step.roleJa,
                      step.roleEn,
                    )}
                  >
                    <span className="s5-timeline__stay">
                      ⏱ {t('s5Stay')}: {step.stayMinutes}min
                    </span>
                  </RouteStep>
                </Link>
                {mobility ? (
                  <div className="s5-mobility">
                    <Mobility
                      mode={mobility.mode}
                      duration={`${mobility.durationMinutes}min`}
                      label={localized(
                        mobilityLabelKey(route.id, mobility.fromStep, mobility.toStep),
                        mobility.labelJa,
                        mobility.labelEn,
                      )}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </StorySection>

      {/* Warning / reservation badge (not color-alone: Tag carries an icon).
          The demo marker applies only to the 8/23 Okutama golden-path route. */}
      <section className="tmm-section">
        {operationalNoteKey ? (
          <Tag tone="warning">
            {t(operationalNoteKey)}
            {route.isDemo ? ` — ${t('s5DemoNote')}` : ''}
          </Tag>
        ) : null}
      </section>

      {/* Route-local support meaning (#80): 訪れる / 保存する / 行程を実行する
          as a distributed support UX at the place of action — no standalone
          Support Hub. Short, no fabricated metrics. */}
      <section className="tmm-section">
        <StorySection kicker={t('s5SupportKicker')} title={t('s5SupportTitle')}>
          <p className="s5-support__lead">{t('s5SupportLead')}</p>
          <ul className="s5-support__list">
            <li className="s5-support__item">
              <span className="s5-support__icon" aria-hidden="true">📍</span>
              <span>
                <strong>{t('s5SupportVisit')}</strong>
                <span className="s5-support__desc">{t('s5SupportVisitDesc')}</span>
              </span>
            </li>
            <li className="s5-support__item">
              <span className="s5-support__icon" aria-hidden="true">🔖</span>
              <span>
                <strong>{t('s5SupportSave')}</strong>
                <span className="s5-support__desc">{t('s5SupportSaveDesc')}</span>
              </span>
            </li>
            <li className="s5-support__item">
              <span className="s5-support__icon" aria-hidden="true">🚶</span>
              <span>
                <strong>{t('s5SupportGo')}</strong>
                <span className="s5-support__desc">{t('s5SupportGoDesc')}</span>
              </span>
            </li>
          </ul>
        </StorySection>
      </section>

      {/* Primary CTA: save this itinerary */}
      <section className="tmm-section">
        <Button
          variant={saved ? 'secondary' : 'primary'}
          className="tmm-btn--block"
          onClick={handleSave}
          aria-pressed={saved}
        >
          {saved ? `${t('s5Saved')} ✓` : `🔖 ${t('s5SaveCta')}`}
        </Button>
        <p className="s6-info-unverified">{t('s5SaveHint')}</p>
      </section>

      {toast ? (
        <Toast
          message={toast.message}
          onClose={() => setToast(null)}
          closeLabel={t('close')}
        />
      ) : null}
    </div>
  );
}
