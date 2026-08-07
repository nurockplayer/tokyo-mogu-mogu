/**
 * NextDiscovery — suggests the next collectible after a check-in (Issue #8).
 *
 * Shows the top undiscovered food cultures near the user (or, without a
 * location, the ones with the most places), each linking to its detail page
 * or the map. Mounted on the home page so the demo's "next discovery" step
 * is one tap away.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { foodCultures, places } from '../data';
import { getNextDiscoveries } from '../lib/progression';
import { useCollection } from '../store/collection';
import { useI18n } from '../i18n';
import './NextDiscovery.css';

export function NextDiscovery() {
  const { t, locale } = useI18n();
  const { isCollected } = useCollection();
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const collectedIds = useMemo(
    () => foodCultures.filter((fc) => isCollected(fc.id)).map((fc) => fc.id),
    [isCollected],
  );

  const suggestions = useMemo(
    () => getNextDiscoveries(collectedIds, foodCultures, places, userLocation ?? undefined, 3),
    [collectedIds, userLocation],
  );

  const allCollected = collectedIds.length === foodCultures.length;

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
            {suggestions.map((fc) => (
              <li key={fc.id} className="nd-item">
                <Link to={`/food-cultures/${fc.id}`} className="nd-link">
                  <span className="nd-name">{locale === 'ja' ? fc.nameJa : fc.nameEn}</span>
                  <span className="nd-hint">{locale === 'ja' ? fc.hintJa : fc.hintEn}</span>
                </Link>
              </li>
            ))}
          </ul>
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
