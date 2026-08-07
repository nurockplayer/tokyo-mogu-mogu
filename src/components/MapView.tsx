/**
 * Leaflet map that renders seed places as colored pins.
 *
 * Uses `leaflet` directly with a small typed React wrapper instead of
 * react-leaflet, keeping the dependency surface minimal. Pins are L.divIcon
 * styled to match the design system (forest green default, vermilion selected),
 * which also sidesteps the bundler marker-icon problem entirely.
 */
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';
import type { Locale } from '../i18n';
import type { Place, FoodCulture } from '../data/model';

export interface MapViewPlace extends Place {
  /** Related food cultures, rendered in the popup / card. */
  foodCultures: FoodCulture[];
}

export interface MapViewProps {
  places: MapViewPlace[];
  /** Place whose pin is selected (vermillion). */
  selectedPlaceId?: string | null;
  /** User's current location (from geolocation), or null when unknown. */
  userLocation?: { lat: number; lng: number } | null;
  /** Center used when the map initializes (lat, lng). */
  center: { lat: number; lng: number };
  /** Default zoom when the map initializes. */
  zoom: number;
  /** Active locale, used for popup copy. */
  locale: Locale;
  /** Called when a pin is tapped. */
  onSelectPlace: (place: MapViewPlace) => void;
}

const DEFAULT_COLOR = 'var(--forest)';
const SELECTED_COLOR = 'var(--vermillion)';
const LOCATION_COLOR = 'var(--stream)';

/** Build a pin-style divIcon whose color follows the design tokens. */
function pinIcon(selected: boolean): L.DivIcon {
  const color = selected ? SELECTED_COLOR : DEFAULT_COLOR;
  const html = `<div class="map-pin" style="--pin-color: ${color}"></div>`;
  return L.divIcon({
    className: 'map-pin-icon',
    html,
    iconSize: [26, 34],
    iconAnchor: [13, 32],
    popupAnchor: [0, -30],
  });
}

/** Pulsing circle for the user's current location. */
function locationIcon(): L.DivIcon {
  const html = `<div class="map-location" style="--location-color: ${LOCATION_COLOR}"></div>`;
  return L.divIcon({
    className: 'map-location-icon',
    html,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function placeName(place: MapViewPlace, locale: Locale): string {
  return locale === 'ja' ? place.nameJa : place.nameEn;
}

/** Popup content: place name + related food culture names (comma-joined). */
function popupContent(place: MapViewPlace, locale: Locale): string {
  const names = place.foodCultures.map((fc) => (locale === 'ja' ? fc.nameJa : fc.nameEn));
  return `<strong class="map-popup-title">${placeName(place, locale)}</strong>` +
    (names.length > 0 ? `<span class="map-popup-tags">${names.join(' · ')}</span>` : '');
}

export function MapView({
  places,
  selectedPlaceId,
  userLocation,
  center,
  zoom,
  locale,
  onSelectPlace,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const locationMarkerRef = useRef<L.Marker | null>(null);
  const onSelectPlaceRef = useRef(onSelectPlace);

  // Keep the latest callback without re-binding markers.
  onSelectPlaceRef.current = onSelectPlace;

  // Create the map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }
    const map = L.map(containerRef.current, {
      center: [center.lat, center.lng],
      zoom,
      scrollWheelZoom: false,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    mapRef.current = map;
    const markers = markersRef.current;
    const locationMarker = locationMarkerRef.current;

    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
      locationMarker?.remove();
    };
    // center/zoom are only the initial view; re-centering is handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync markers with the places prop.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }
    const markers = markersRef.current;
    const layer = L.layerGroup().addTo(map);
    for (const place of places) {
      const marker = L.marker([place.latitude, place.longitude], {
        icon: pinIcon(false),
        title: place.nameEn,
      }).addTo(layer);
      marker.bindPopup(popupContent(place, locale));
      marker.on('click', () => onSelectPlaceRef.current(place));
      markers.set(place.id, marker);
    }
    return () => {
      layer.remove();
      markers.clear();
    };
  }, [places, locale]);

  // Show / move the current-location marker.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }
    if (!userLocation) {
      locationMarkerRef.current?.remove();
      locationMarkerRef.current = null;
      return;
    }
    const marker = L.marker([userLocation.lat, userLocation.lng], {
      icon: locationIcon(),
      title: 'You',
      zIndexOffset: 1000,
      interactive: false,
    }).addTo(map);
    locationMarkerRef.current = marker;
    return () => {
      marker.remove();
      locationMarkerRef.current = null;
    };
  }, [userLocation]);

  // Sync the selected pin's color and re-open its popup when it changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }
    for (const [id, marker] of markersRef.current) {
      marker.setIcon(pinIcon(id === selectedPlaceId));
    }
    if (selectedPlaceId) {
      const selected = markersRef.current.get(selectedPlaceId);
      if (selected) {
        map.flyTo(selected.getLatLng(), Math.max(map.getZoom(), 13), { duration: 0.4 });
        selected.openPopup();
      }
    }
  }, [selectedPlaceId]);

  return <div ref={containerRef} className="map-frame" style={{ minHeight: 380 }} />;
}
