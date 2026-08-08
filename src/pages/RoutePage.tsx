/**
 * S5 Model Route page (Issue #45).
 *
 * Renders the deterministic editorial 奥多摩 × 東京わさび route:
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
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonLink,
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
} from '../data';
import type { RouteDuration } from '../data';
import { useI18n } from '../i18n';
import { isRouteSaved, saveRoute, unsaveRoute } from '../lib/saved-routes';
import './route-spot.css';

const DURATIONS: RouteDuration[] = ['half-day', '1-day'];

/** Deterministic route id for the demo (single authored route). */
const DEFAULT_ROUTE_ID = 'okutama-wasabi-journey';

/** Formats a minute total as "3h 10m" (kept locale-agnostic for the header). */
function formatTotalMinutes(total: number, locale: 'ja' | 'en'): string {
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
  const route = useMemo(() => getRouteById(DEFAULT_ROUTE_ID), []);

  const [duration, setDuration] = useState<RouteDuration>(
    route?.defaultDuration ?? 'half-day',
  );
  const [saved, setSaved] = useState<boolean>(() => isRouteSaved(DEFAULT_ROUTE_ID));
  const [toast, setToast] = useState<null | { message: string; saved: boolean }>(null);

  const pick = (ja: string, en: string) => (locale === 'ja' ? ja : en);

  if (!route) {
    return (
      <div className="tmm-page">
        <Card>
          <h2>{t('s5NotFoundTitle')}</h2>
          <p>{t('s5NotFoundBody')}</p>
          <ButtonLink variant="secondary" href="#/">
            {t('back')}
          </ButtonLink>
        </Card>
      </div>
    );
  }

  const variant = route.variants[duration];
  const pins = projectRoutePins(variant.steps, places);

  const handleToggle = (next: RouteDuration) => {
    if (next === duration) return;
    setDuration(next);
  };

  const handleSave = () => {
    if (saved) {
      unsaveRoute(DEFAULT_ROUTE_ID);
      setSaved(false);
      setToast({ message: t('s5UnsavedToast'), saved: false });
    } else {
      saveRoute(DEFAULT_ROUTE_ID);
      setSaved(true);
      setToast({ message: t('s5SavedToast'), saved: true });
    }
  };

  return (
    <div className="tmm-page">
      {/* Course header */}
      <div className="s5-hero">
        <p className="s5-hero__kicker">{t('s5Kicker')}</p>
        <h1 className="s5-hero__title">{pick(route.nameJa, route.nameEn)}</h1>
        <div className="s5-hero__meta">
          <span className="s5-hero__meta-item">
            {t(duration === 'half-day' ? 's5DurationHalfDay' : 's5DurationFullDay')}
          </span>
          <span className="s5-hero__meta-item">
            🚌 {pick(variant.transportJa, variant.transportEn)}
          </span>
          <span className="s5-hero__meta-item">
            ⏱ {formatTotalMinutes(variant.totalMinutes, locale)}
          </span>
        </div>
      </div>

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
                to={`/spot/${variant.steps[pin.stepNumber - 1].placeId}`}
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
            return (
              <div key={step.placeId}>
                <Link
                  to={`/spot/${step.placeId}`}
                  className="s5-timeline__pin-link"
                  aria-label={`${t('s5PinLabel')} ${step.stepNumber}: ${pick(place.nameJa, place.nameEn)}`}
                >
                  <RouteStep
                    number={step.stepNumber}
                    name={pick(place.nameJa, place.nameEn)}
                    role={pick(step.roleJa, step.roleEn)}
                  >
                    <span className="s5-timeline__stay">
                      ⏱ {t('s5Stay')}: {step.stayMinutes}min
                    </span>
                  </RouteStep>
                </Link>
                {mobility ? (
                  <div className="s5-mobility">
                    <span className="s5-mobility__arrow" aria-hidden="true">
                      ↓
                    </span>
                    <Mobility
                      mode={mobility.mode}
                      duration={`${mobility.durationMinutes}min`}
                      label={pick(mobility.labelJa, mobility.labelEn)}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </StorySection>

      {/* Warning / reservation badge (not color-alone: Tag carries an icon) */}
      <section className="tmm-section">
        <Tag tone="warning">
          {t('s5ReservationNote')} — {t('s5DemoNote')}
        </Tag>
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
