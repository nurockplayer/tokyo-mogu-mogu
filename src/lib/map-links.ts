/**
 * Deep links that open directions to a place in an external map app.
 *
 * Pure functions, no Leaflet / DOM dependency, so they stay unit-testable.
 *
 * Navigation rule (Issue #127): approximate coordinates (district centroids)
 * are fine for map display but must NOT be used as a turn-by-turn navigation
 * destination. Places marked `coordinatePrecision: 'approximate'` use the
 * sourced name/address for directions instead; precise places keep
 * coordinate-based directions.
 */

/** URL-encode each coordinate for use inside a deep-link query string. */
export function coords(lat: number, lng: number): string {
  return `${lat},${lng}`;
}

/** A place descriptor used to build a directions URL. */
export interface DirectionsPlace {
  latitude: number;
  longitude: number;
  /** 'approximate' (district centroid) ⇒ directions use name/address, never the
   *  coordinates. 'precise' (or absent) ⇒ coordinate-based directions. */
  coordinatePrecision?: 'precise' | 'approximate';
  /** Sourced display name (Japanese) — destination fallback. */
  name?: string;
  /** Sourced address — the destination for approximate places. */
  address?: string;
}

/**
 * The navigation destination for a place: coordinates only when the record's
 * coordinates are precise; otherwise the sourced name/address. Approximate map
 * coordinates are for map display, never for turn-by-turn navigation (Issue
 * #127).
 */
export function directionsDestination(place: DirectionsPlace): string {
  if (place.coordinatePrecision === 'approximate' && (place.address || place.name)) {
    return encodeURIComponent(place.address ?? place.name ?? '');
  }
  return coords(place.latitude, place.longitude);
}

/**
 * Google Maps directions URL (web + Android).
 * @see https://developers.google.com/maps/documentation/urls/ios-urlscheme
 */
export function googleMapsDirectionsUrl(place: DirectionsPlace): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${directionsDestination(place)}`;
}

/**
 * Apple Maps directions URL (iOS / macOS).
 * @see https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
 */
export function appleMapsDirectionsUrl(place: DirectionsPlace): string {
  return `maps://?daddr=${directionsDestination(place)}`;
}

export type DirectionsScheme = 'google' | 'apple';

/** Pick the native map app for the current platform via UA sniffing. */
export function platformDirectionsScheme(userAgent: string): DirectionsScheme {
  const ua = userAgent.toLowerCase();
  if (ua.includes('android')) {
    return 'google';
  }
  // Apple Maps opens a native app on iOS / iPadOS; fall through to Apple.
  if (/iphone|ipad|ipod|macintosh|mac os/.test(ua)) {
    return 'apple';
  }
  // Unknown desktop / other platforms: open Google Maps on the web.
  return 'google';
}

/**
 * Open directions to a place in the user's map app. Picks Apple Maps on iOS /
 * macOS, Google Maps (native) on Android, and Google Maps (web) otherwise.
 * Uses window.location on purpose so iOS Safari opens the native app directly.
 */
export function openDirectionsInMapApp(
  place: DirectionsPlace,
  userAgent?: string,
): void {
  if (typeof window === 'undefined') {
    return;
  }
  const ua = userAgent ?? navigator.userAgent;
  const url =
    platformDirectionsScheme(ua) === 'apple'
      ? appleMapsDirectionsUrl(place)
      : googleMapsDirectionsUrl(place);
  window.location.href = url;
}
