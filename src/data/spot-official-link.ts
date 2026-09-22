import type { DataSource, Place } from './model';
import type { SpotDetail } from './seed-routes';

export interface SpotOfficialLink {
  url: string;
  source: DataSource;
  kind: 'current-schedule' | 'current-information' | 'booking' | 'official-information';
}

function visitorUrl(value: string | undefined): URL | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password
      ? url : undefined;
  } catch {
    return undefined;
  }
}

function officialLink(source: DataSource, kind: SpotOfficialLink['kind']): SpotOfficialLink | undefined {
  return source.sourceType === 'official_web' && visitorUrl(source.url)
    ? { url: source.url!, source, kind } : undefined;
}

/** Consume provenance without treating a working outbound link as factual confirmation. */
export function resolveSpotOfficialLink(place: Place | undefined, detail?: SpotDetail): SpotOfficialLink | undefined {
  if (!place) return undefined;
  if (place.locationKind === 'mobile') {
    return officialLink(place.mobileVenue.scheduleDirectorySource, 'current-schedule');
  }
  if (place.locationKind === 'area') {
    const safety = place.naturalArea.safety;
    return safety.currentInformationUrl === safety.source.url
      ? officialLink(safety.source, 'current-information') : undefined;
  }
  const official = officialLink(place.source, 'official-information');
  const tour = place.visitorInformation?.experienceTour;
  if (tour) {
    const booking = visitorUrl(tour.bookingUrl);
    // A booking CTA must not silently fall back to an unrelated information page.
    return official && booking && booking.origin === new URL(official.url).origin
      ? { ...official, url: tour.bookingUrl, kind: 'booking' } : undefined;
  }
  if (detail?.practical) {
    const practical = officialLink(detail.source, 'official-information');
    // Prefer the source of the displayed visitor guidance over a generic homepage.
    return detail.placeId === place.id && official && practical
      && new URL(practical.url).origin === new URL(official.url).origin
      ? practical : undefined;
  }
  return official;
}
