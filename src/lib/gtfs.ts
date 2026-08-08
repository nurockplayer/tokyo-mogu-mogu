/**
 * Nishi Tokyo Bus GTFS data layer (Issue #17).
 *
 * Pure, framework-free helpers over a GTFS / GTFS-JP snapshot. MVP scope only:
 * load stops / routes / trips / stop_times, find nearby bus stops for a Place,
 * and look up the next departures after a given time. No fares, no realtime,
 * no route planning, no train routing.
 *
 * Time representation: all times are **minutes from midnight** as integers
 * (e.g. 510 = 08:30). GTFS times can exceed 24:00 ("25:30"), which is just
 * 1530 minutes. ISO timestamps are deliberately NOT used here because GTFS
 * stop_times are service-day-relative and carry no date; a consumer that needs
 * wall-clock output converts minutes-from-midnight itself.
 *
 * GTFS availability is OPTIONAL. Every function treats an empty / missing
 * dataset as an empty result rather than throwing, so future consumers degrade
 * gracefully when the dataset has not been ingested.
 */
import { distanceInMeters } from './geo';

/** A transit stop (GTFS `stops.txt`). */
export interface GtfsStop {
  stopId: string;
  /** Display name, e.g. "奥多摩駅". */
  stopName: string;
  /** WGS84 coordinates. */
  latitude: number;
  longitude: number;
}

/** A route (GTFS `routes.txt`), e.g. "奥多摩駅 - 御前山" line. */
export interface GtfsRoute {
  routeId: string;
  /** Short code / label, e.g. "奥多摩・日原" or "西武バス 立1". */
  routeShortName: string;
  /** Long display name, e.g. "奥多摩駅・氷川". */
  routeLongName: string;
}

/** A scheduled trip along a route on a service day (GTFS `trips.txt`). */
export interface GtfsTrip {
  tripId: string;
  routeId: string;
  /** e.g. "平日" or "土休日" — which calendar the trip runs on. */
  serviceId: string;
  /** Headsign shown on the front of the bus, e.g. "日原方面". */
  tripHeadsign?: string;
}

/** One scheduled arrival/departure of a trip at a stop (GTFS `stop_times.txt`). */
export interface GtfsStopTime {
  tripId: string;
  stopId: string;
  /** Scheduled arrival, minutes from midnight (may exceed 1440 for 25:xx). */
  arrivalMin: number;
  /** Scheduled departure, minutes from midnight. */
  departureMin: number;
  /** 0-based position of this stop along the trip. */
  stopSequence: number;
}

/** A GTFS snapshot loaded into memory. Any array may be empty. */
export interface GtfsDataset {
  stops: GtfsStop[];
  routes: GtfsRoute[];
  trips: GtfsTrip[];
  stopTimes: GtfsStopTime[];
  /**
   * Provenance / provenance of this snapshot. Consumers can use this to tell
   * verified source data from a demo fixture. Never a fabricated truth.
   */
  origin: 'source' | 'demo';
  /** Source label (dataset id / operator) when known. */
  sourceLabel?: string;
  /** Retrieval or last-verified date (ISO 8601, e.g. "2026-08-08"). */
  retrievedAt?: string;
}

/** Nearby stops for a Place, sorted by ascending distance from the point. */
export function findNearbyStops(
  dataset: GtfsDataset,
  lat: number,
  lng: number,
  radiusMeters: number,
): GtfsStop[] {
  return dataset.stops
    .map((stop) => ({
      stop,
      distance: distanceInMeters(lat, lng, stop.latitude, stop.longitude),
    }))
    .filter(({ distance }) => distance <= radiusMeters)
    .sort((a, b) => a.distance - b.distance)
    .map(({ stop }) => stop);
}

/**
 * A departure for display: the stop_time plus the route and trip it belongs
 * to, resolved via the dataset.
 */
export interface GtfsDeparture {
  stopTime: GtfsStopTime;
  route: GtfsRoute;
  trip: GtfsTrip;
}

/**
 * Next departures from `stopId` after `afterTime` (minutes from midnight),
 * ordered by departure time. Stops that serve the trip as both arrival and
 * departure on the same line would produce duplicates; GTFS stop_times for a
 * bus are typically one row per stop, so no dedup is attempted. Results are
 * limited to `limit`. An empty / missing dataset yields an empty array.
 */
export function getNextDepartures(
  dataset: GtfsDataset,
  stopId: string,
  afterTime: number,
  limit = 5,
): GtfsDeparture[] {
  const routeById = new Map(dataset.routes.map((r) => [r.routeId, r]));
  const tripById = new Map(dataset.trips.map((t) => [t.tripId, t]));
  const matches: { departure: GtfsDeparture; when: number }[] = [];

  for (const stopTime of dataset.stopTimes) {
    if (stopTime.stopId !== stopId || stopTime.departureMin < afterTime) {
      continue;
    }
    const trip = tripById.get(stopTime.tripId);
    if (!trip) {
      continue;
    }
    const route = routeById.get(trip.routeId);
    if (!route) {
      continue;
    }
    matches.push({
      departure: { stopTime, route, trip },
      when: stopTime.departureMin,
    });
  }

  matches.sort((a, b) => a.when - b.when);
  return matches.slice(0, limit).map(({ departure }) => departure);
}
