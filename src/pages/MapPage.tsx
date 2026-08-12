/**
 * Map page — where seed places can be experienced.
 *
 * Supports deep links from the food culture detail page:
 *   /map?place=<id>            focus a specific place
 *   /map?foodCulture=<id>      focus the food culture's first place
 */
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  places,
  getPlaceById,
  getFoodCultureById,
  getRelatedFoodCultures,
  getRelatedPlaces,
} from '../data';
import { useI18n } from '../i18n';
import { MapView, type MapViewPlace } from '../components/MapView';
import {
  appleMapsDirectionsUrl,
  googleMapsDirectionsUrl,
  openDirectionsInMapApp,
  type DirectionsPlace,
} from '../lib/map-links';
import './MapPage.css';

/** Default view: the Tama / Okutama area. */
const DEFAULT_CENTER = { lat: 35.8, lng: 139.15 };
const DEFAULT_ZOOM = 10;
const PLACE_ZOOM = 13;

/** Build the directions descriptor for a selected map place (Issue #127:
 *  approximate places navigate by sourced name/address, not the centroid). */
function placeDirections(place: {
  latitude: number;
  longitude: number;
  coordinatePrecision?: 'precise' | 'approximate';
  nameJa: string;
  address: string;
}): DirectionsPlace {
  return {
    latitude: place.latitude,
    longitude: place.longitude,
    coordinatePrecision: place.coordinatePrecision,
    name: place.nameJa,
    address: place.address,
  };
}

export function MapPage() {
  const { t, locale } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();

  // Seed places enriched with their related food cultures.
  const mapPlaces: MapViewPlace[] = useMemo(
    () => places.map((p) => ({ ...p, foodCultures: getRelatedFoodCultures(p) })),
    [],
  );

  // Resolve the deep-link target (place > foodCulture > none).
  const targetPlaceId = useMemo(() => {
    const placeParam = searchParams.get('place');
    if (placeParam && getPlaceById(placeParam)) {
      return placeParam;
    }
    const fcParam = searchParams.get('foodCulture');
    if (fcParam) {
      const fc = getFoodCultureById(fcParam);
      if (!fc) {
        return null;
      }
      return getRelatedPlaces(fc)[0]?.id ?? null;
    }
    return null;
  }, [searchParams]);

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(targetPlaceId);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Re-focus when the URL deep link changes while the page is mounted.
  useEffect(() => {
    if (targetPlaceId) {
      setSelectedPlaceId(targetPlaceId);
    }
  }, [targetPlaceId]);

  const initialCenter = useMemo(() => {
    const target = targetPlaceId ? getPlaceById(targetPlaceId) : undefined;
    return target ? { lat: target.latitude, lng: target.longitude } : DEFAULT_CENTER;
  }, [targetPlaceId]);

  const initialZoom = targetPlaceId ? PLACE_ZOOM : DEFAULT_ZOOM;

  const selectedPlace = useMemo(
    () => mapPlaces.find((p) => p.id === selectedPlaceId) ?? null,
    [mapPlaces, selectedPlaceId],
  );

  const handleSelectPlace = (place: MapViewPlace) => {
    setSelectedPlaceId(place.id);
    setSearchParams({ place: place.id });
  };

  const handleShowLocation = () => {
    setLocationError(null);
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setLocationError(t('geolocationUnavailable'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        setLocationError(
          err.code === err.PERMISSION_DENIED
            ? t('permissionDenied')
            : t('geolocationUnavailable'),
        );
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  };

  return (
    <section className="page">
      <h1 className="page-title">{t('navMap')}</h1>
      <p className="page-sub">{t('mapSubtitle')}</p>

      <div className="map-container map-page-map">
        <MapView
          places={mapPlaces}
          selectedPlaceId={selectedPlaceId}
          userLocation={userLocation}
          center={initialCenter}
          zoom={initialZoom}
          locale={locale}
          onSelectPlace={handleSelectPlace}
        />
        <div className="map-legend">
          <span>{t('mapLegend')}</span>
        </div>
      </div>

      <button type="button" className="btn btn-secondary map-locate-btn" onClick={handleShowLocation}>
        {t('showMyLocation')}
      </button>
      {locationError && <p className="map-error" role="alert">{locationError}</p>}

      {selectedPlace && (
        <div className="map-place-card">
          <h2 className="map-place-name">
            {locale === 'ja' ? selectedPlace.nameJa : selectedPlace.nameEn}
          </h2>
          <p className="map-place-address">{selectedPlace.address}</p>

          <div className="map-fc-list">
            <span className="map-fc-label">{t('relatedFoodCultures')}</span>
            {selectedPlace.foodCultures.length > 0 ? (
              selectedPlace.foodCultures.map((fc) => (
                <Link key={fc.id} className="badge map-fc-link" to={`/food-cultures/${fc.id}`}>
                  {locale === 'ja' ? fc.nameJa : fc.nameEn}
                </Link>
              ))
            ) : (
              <span className="muted">{t('noPlaces')}</span>
            )}
          </div>

          <div className="map-place-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => openDirectionsInMapApp(placeDirections(selectedPlace))}
            >
              {t('openInMap')}
            </button>
            <div className="map-place-links">
              <a
                href={googleMapsDirectionsUrl(placeDirections(selectedPlace))}
                target="_blank"
                rel="noreferrer"
              >
                {t('openInGoogleMaps')}
              </a>
              <a
                href={appleMapsDirectionsUrl(placeDirections(selectedPlace))}
                target="_blank"
                rel="noreferrer"
              >
                {t('openInAppleMaps')}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
