/**
 * Deep links that open directions to a place in an external map app.
 *
 * Pure functions, no Leaflet / DOM dependency, so they stay unit-testable.
 */

/** URL-encode each coordinate for use inside a deep-link query string. */
export function coords(lat: number, lng: number): string {
  return `${lat},${lng}`;
}

/**
 * Google Maps directions URL (web + Android).
 * @see https://developers.google.com/maps/documentation/urls/ios-urlscheme
 */
export function googleMapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${coords(lat, lng)}`;
}

/**
 * Apple Maps directions URL (iOS / macOS).
 * @see https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
 */
export function appleMapsDirectionsUrl(lat: number, lng: number): string {
  return `maps://?daddr=${coords(lat, lng)}`;
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
  lat: number,
  lng: number,
  userAgent?: string,
): void {
  if (typeof window === 'undefined') {
    return;
  }
  const ua = userAgent ?? navigator.userAgent;
  const url =
    platformDirectionsScheme(ua) === 'apple'
      ? appleMapsDirectionsUrl(lat, lng)
      : googleMapsDirectionsUrl(lat, lng);
  window.location.href = url;
}
