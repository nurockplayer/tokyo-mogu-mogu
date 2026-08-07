/**
 * Location-based check-in logic (Issue #6).
 *
 * Pure, framework-free helpers for deciding whether a check-in at a Place
 * succeeds based on the user's current location, plus a thin wrapper over the
 * browser Geolocation API and a URL-driven demo location override so the demo
 * and tests can drive location without a real device.
 */
import { distanceInMeters, isWithinRadius } from './geo';
import { UNLOCK_RADIUS_METERS, getPlaceById, type Place } from '../data';

/** Outcome of a check-in attempt at a place. */
export type CheckInResult =
  | {
      ok: true;
      /** Distance from the user to the place in meters. */
      distanceMeters: number;
      /** Food culture ids unlocked by this check-in (the place's foodCultureIds). */
      collected: string[];
    }
  | {
      ok: false;
      reason: 'too-far' | 'no-location' | 'permission-denied' | 'unavailable';
      /** Distance in meters, present when the reason is 'too-far'. */
      distanceMeters?: number;
    };

/**
 * Decides whether a check-in at `place` succeeds for a user at
 * (userLat, userLng). Success is defined by the configured unlock radius
 * (`UNLOCK_RADIUS_METERS`, overridable via `radiusMeters` for demo/tests).
 *
 * This function is pure and idempotent: it never mutates collection state.
 * Duplicate-check-in handling lives in the collection store (Issue #4/#7),
 * whose `collect`/`visitPlace` ignore duplicate ids.
 */
export function checkInAtPlace(
  userLat: number,
  userLng: number,
  place: Place,
  radiusMeters: number = UNLOCK_RADIUS_METERS,
): CheckInResult {
  const distanceMeters = distanceInMeters(userLat, userLng, place.latitude, place.longitude);
  if (isWithinRadius(userLat, userLng, place.latitude, place.longitude, radiusMeters)) {
    return { ok: true, distanceMeters, collected: place.foodCultureIds };
  }
  return { ok: false, reason: 'too-far', distanceMeters };
}

/** Reasons a Geolocation lookup can fail. */
export type GeolocationErrorKind = 'permission-denied' | 'unavailable' | 'no-location';

/**
 * Typed error thrown by {@link getCurrentPosition} so callers can branch on
 * the failure without string-matching browser messages.
 */
export class GeolocationError extends Error {
  readonly kind: GeolocationErrorKind;

  constructor(kind: GeolocationErrorKind, message: string) {
    super(message);
    this.name = 'GeolocationError';
    this.kind = kind;
  }
}

// GeolocationPositionError numeric codes (stable across browsers).
const CODE_PERMISSION_DENIED = 1;
const CODE_POSITION_UNAVAILABLE = 2;
const CODE_TIMEOUT = 3;

/**
 * Thin promise wrapper over `navigator.geolocation.getCurrentPosition`.
 * Resolves with the WGS84 coordinate, or rejects with a typed
 * {@link GeolocationError}:
 *  - 'permission-denied' when the user blocked access,
 *  - 'no-location' when a fix could not be obtained,
 *  - 'unavailable' when geolocation is unsupported or the lookup timed out.
 */
export function getCurrentPosition(
  options?: PositionOptions,
): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new GeolocationError('unavailable', 'Geolocation is not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err) => {
        switch (err.code) {
          case CODE_PERMISSION_DENIED:
            reject(new GeolocationError('permission-denied', err.message));
            break;
          case CODE_POSITION_UNAVAILABLE:
            reject(new GeolocationError('no-location', err.message));
            break;
          case CODE_TIMEOUT:
          default:
            reject(new GeolocationError('unavailable', err.message));
            break;
        }
      },
      options,
    );
  });
}

/**
 * Demo location override read from the URL query string, so the demo and tests
 * can exercise location judgment without a real GPS device.
 *
 * Supported forms (combined with an `enabled` flag):
 *  - `?demoLat=<lat>&demoLng=<lng>`   pretend to be at explicit coordinates
 *  - `?at=place:<placeId>`            pretend to be at the given seed place
 *
 * Optional radius override (meters): `?demoRadius=<meters>` is read separately
 * by {@link readDemoRadiusOverride}.
 */
export interface DemoLocationOverride {
  enabled: boolean;
  latitude: number;
  longitude: number;
}

export function readDemoLocationOverride(): DemoLocationOverride {
  if (typeof window === 'undefined') {
    return { enabled: false, latitude: 0, longitude: 0 };
  }
  return parseDemoLocationOverride(new URLSearchParams(window.location.search));
}

/**
 * Pure parser for the demo location override — separate from the window read
 * so the parsing rules are unit-testable. Presence checks come first because
 * `Number(null)` is `0`, which would otherwise look like a valid coordinate
 * and silently enable demo mode.
 */
export function parseDemoLocationOverride(params: URLSearchParams): DemoLocationOverride {
  const latParam = params.get('demoLat');
  const lngParam = params.get('demoLng');
  if (latParam !== null && lngParam !== null) {
    const lat = Number(latParam);
    const lng = Number(lngParam);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return { enabled: true, latitude: lat, longitude: lng };
    }
  }

  const at = params.get('at');
  if (at !== null && at.startsWith('place:')) {
    const place = getPlaceById(at.slice('place:'.length));
    if (place) {
      return { enabled: true, latitude: place.latitude, longitude: place.longitude };
    }
  }

  return { enabled: false, latitude: 0, longitude: 0 };
}

/**
 * Optional unlock-radius override (meters) from `?demoRadius=<meters>`,
 * returned as `null` when absent or invalid. Lets a demo widen the radius so
 * check-in can be shown without being physically close to the place.
 */
export function readDemoRadiusOverride(): number | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const params = new URLSearchParams(window.location.search);
  const radius = Number(params.get('demoRadius'));
  return Number.isFinite(radius) && radius > 0 ? radius : null;
}
