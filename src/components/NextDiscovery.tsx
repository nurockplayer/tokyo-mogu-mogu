/**
 * NextDiscovery — suggests the next collectible after a check-in (Issue #8).
 *
 * Shows the top undiscovered food cultures near the user (or, without a
 * location, the ones with the most places), each linking to its detail page
 * or the map. Mounted on the home page so the demo's "next discovery" step
 * is one tap away.
 *
 * Transit-aware extension: when the demo GTFS dataset is present, each
 * suggestion also shows the nearest bus stop and the next departure time, and
 * candidates are ranked by transit accessibility (see `progression.ts`). The
 * fixture times are demo data and are labeled as such.
 */
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { foodCultures, places, getPlaceById } from '../data';
import { GTFS_FIXTURE } from '../data/gtfs-fixture';
import {
  getNextDiscoveriesWithTransit,
  getTransitInfoForPlace,
  toMinutesFromMidnight,
  type PlaceTransitInfo,
} from '../lib/progression';
import { useCollection } from '../store/collection';
import { useI18n } from '../i18n';
import './NextDiscovery.css';

/** 547 -> "09:07" (GTFS times are minutes from midnight, may exceed 24:00). */
function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function NextDiscovery() {
  const { t, locale } = useI18n();
  const { isCollected } = useCollection();
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [now, setNow] = useState(() => toMinutesFromMidnight(new Date()));

  // Refresh "now" every minute so the next-departure stays honest over time.
  useEffect(() => {
    const id = setInterval(() => setNow(toMinutesFromMidnight(new Date())), 60_000);
    return () => clearInterval(id);
  }, []);

  const collectedIds = useMemo(
    () => foodCultures.filter((fc) => isCollected(fc.id)).map((fc) => fc.id),
    [isCollected],
  );

  const suggestions = useMemo(
    () =>
      getNextDiscoveriesWithTransit(
        collectedIds,
        foodCultures,
        places,
        GTFS_FIXTURE,
        userLocation ?? undefined,
        3,
        now,
      ),
    [collectedIds, userLocation, now],
  );

  // Best (earliest) transit info among each suggestion's places, if any.
  const transitByFoodCultureId = useMemo(() => {
    const map = new Map<string, PlaceTransitInfo>();
    for (const fc of suggestions) {
      let best: PlaceTransitInfo | null = null;
      for (const placeId of fc.placeIds) {
        const place = getPlaceById(placeId);
        if (!place) continue;
        const info = getTransitInfoForPlace(GTFS_FIXTURE, place, now);
        if (!info) continue;
        if (!best || info.nextDeparture.stopTime.departureMin < best.nextDeparture.stopTime.departureMin) {
          best = info;
        }
      }
      if (best) map.set(fc.id, best);
    }
    return map;
  }, [suggestions, now]);

  const allCollected = collectedIds.length === foodCultures.length;
  const showDemoNote = transitByFoodCultureId.size > 0;

  if (allCollected) {
    return (
      <section className="nd">
        <h2>{t('nextDiscovery')}</h2>
        <p className="muted">{t('nextDiscoveryComplete')}</p>
      </section>
    );
  }

  return (
    <section className="nd">
      <h2>{t('nextDiscovery')}</h2>
      {suggestions.length === 0 ? (
        <p className="muted">{t('noRelatedPlaces')}</p>
      ) : (
        <>
          <ul className="nd-list">
            {suggestions.map((fc) => {
              const transitInfo = transitByFoodCultureId.get(fc.id);
              return (
                <li key={fc.id} className="nd-item">
                  <Link to={`/food-cultures/${fc.id}`} className="nd-link">
                    <span className="nd-name">{locale === 'ja' ? fc.nameJa : fc.nameEn}</span>
                    <span className="nd-hint">{locale === 'ja' ? fc.hintJa : fc.hintEn}</span>
                  </Link>
                  {transitInfo ? (
                    <p className="nd-transit">
                      <span className="nd-transit-stop">
                        {t('busStop')}: {transitInfo.nearestStop.stopName}
                      </span>
                      <span className="nd-transit-time">
                        {t('nextDeparture')}: {formatMinutes(transitInfo.nextDeparture.stopTime.departureMin)}
                      </span>
                    </p>
                  ) : (
                    <p className="nd-transit nd-transit-none">{t('noTransitInfo')}</p>
                  )}
                </li>
              );
            })}
          </ul>
          {showDemoNote && <p className="nd-demo-note">{t('demoTransitNote')}</p>}
          <button
            type="button"
            className="btn btn-secondary nd-locate"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (pos) =>
                  setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
                () => setUserLocation(null),
              );
            }}
          >
            {t('locateNearby')}
          </button>
        </>
      )}
    </section>
  );
}
