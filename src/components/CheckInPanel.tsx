/**
 * CheckInPanel — location-based check-in for a single Place (Issue #6).
 *
 * Lets the user "check in" at a place from the browser: obtains the current
 * location (or the URL demo override), decides within the configured unlock
 * radius, and on success unlocks the place's FoodCulture(s) through the
 * collection store. Handles failure reasons and duplicate check-ins.
 */
import { useState, type ReactNode } from 'react';
import type { FixedPlace } from '../data/model';
import { UNLOCK_RADIUS_METERS } from '../data/model';
import { useCollection } from '../store/collection';
import { useI18n } from '../i18n';
import {
  checkInAtPlace,
  getCurrentPosition,
  GeolocationError,
  readDemoLocationOverride,
  readDemoRadiusOverride,
  type CheckInResult,
} from '../lib/checkin';
import './CheckInPanel.css';

/** Shared UI state the panel can be in after a check-in attempt. */
type PanelStatus =
  | { kind: 'idle' }
  | { kind: 'checking' }
  | { kind: 'success'; result: Extract<CheckInResult, { ok: true }> }
  | { kind: 'too-far'; distanceMeters: number }
  | { kind: 'error'; reason: 'no-location' | 'permission-denied' | 'unavailable' };

/** Replaces `{n}` placeholders in i18n templates with a value. */
function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}

export function CheckInPanel({ place }: { place: FixedPlace }) {
  const { t } = useI18n();
  const { isCollected, isVisited, collect, visitPlace } = useCollection();
  const [status, setStatus] = useState<PanelStatus>({ kind: 'idle' });

  const demo = readDemoLocationOverride();
  const demoRadius = readDemoRadiusOverride();
  const radius = demoRadius ?? UNLOCK_RADIUS_METERS;

  const alreadyDone = place.foodCultureIds.every((id) => isCollected(id)) || isVisited(place.id);

  async function handleCheckIn() {
    setStatus({ kind: 'checking' });
    try {
      let userLat: number;
      let userLng: number;
      if (demo.enabled) {
        userLat = demo.latitude;
        userLng = demo.longitude;
      } else {
        const pos = await getCurrentPosition({ enableHighAccuracy: false, timeout: 10000 });
        userLat = pos.latitude;
        userLng = pos.longitude;
      }

      const result = checkInAtPlace(userLat, userLng, place, radius);
      if (!result.ok) {
        if (result.reason === 'too-far') {
          setStatus({ kind: 'too-far', distanceMeters: result.distanceMeters ?? 0 });
        } else {
          setStatus({ kind: 'error', reason: result.reason });
        }
        return;
      }

      // Idempotent: the store ignores duplicate ids, so a repeated check-in is
      // safe even under StrictMode's double-invocation.
      visitPlace(place.id);
      result.collected.forEach((id) => collect(id));
      setStatus({ kind: 'success', result });
    } catch (err) {
      if (err instanceof GeolocationError && err.kind !== 'no-location') {
        // permission-denied / unavailable map directly; no-location and any
        // unexpected error fall through to the generic 'unavailable' reason.
        setStatus({ kind: 'error', reason: err.kind });
      } else {
        setStatus({ kind: 'error', reason: 'unavailable' });
      }
    }
  }

  let body: ReactNode;
  if (status.kind === 'success') {
    // Priority: right after a successful check-in the store already marks the
    // place as collected, so the GET seal must outrank the "already collected"
    // branch (which is for returning visitors on a fresh mount).
    body = (
      <div className="checkin-success" role="status">
        <span className="checkin-seal-big">{t('checkInSuccess')}</span>
        <p className="checkin-status success-text">
          {format(t('unlockedCount'), { n: status.result.collected.length })}
        </p>
      </div>
    );
  } else if (alreadyDone) {
    body = (
      <div className="checkin-already">
        <span className="checkin-seal-done">GET</span>
        <p className="checkin-already-text">{t('checkInDuplicate')}</p>
        <p className="muted">{t('checkInSuccess')}</p>
      </div>
    );
  } else {
    body = (
      <>
        <div
          className={
            status.kind === 'error' || status.kind === 'too-far'
              ? 'checkin-status error'
              : 'checkin-status'
          }
          role="status"
          aria-live="polite"
        >
          {status.kind === 'checking' && t('checkInProgress')}
          {status.kind === 'too-far' && (
            <>
              {format(t('checkInDistanceMeters'), { n: Math.round(status.distanceMeters) })} ·{' '}
              {t('checkInTooFar')}
            </>
          )}
          {status.kind === 'error' && status.reason === 'permission-denied' && t('permissionDenied')}
          {status.kind === 'error' && status.reason === 'no-location' && t('geolocationUnavailable')}
          {status.kind === 'error' && status.reason === 'unavailable' && t('geolocationUnavailable')}
          {status.kind === 'idle' && format(t('checkInRadius'), { n: radius })}
        </div>
        <button
          type="button"
          className="btn btn-vermillion checkin-btn"
          onClick={handleCheckIn}
          disabled={status.kind === 'checking'}
        >
          {t('checkIn')}
        </button>
        {demo.enabled && <p className="muted checkin-demo-hint">{t('demoModeOn')}</p>}
      </>
    );
  }

  return (
    <section className={`checkin-card${alreadyDone ? ' checked' : ''}`}>
      <h2>{t('checkIn')}</h2>
      {body}
    </section>
  );
}
