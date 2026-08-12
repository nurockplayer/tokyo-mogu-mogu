import { describe, expect, it } from 'vitest';
import {
  appleMapsDirectionsUrl,
  coords,
  directionsDestination,
  googleMapsDirectionsUrl,
  platformDirectionsScheme,
  type DirectionsPlace,
} from './map-links';

const PRECISE: DirectionsPlace = {
  latitude: 35.8089218,
  longitude: 139.0967554,
  coordinatePrecision: 'precise',
  address: '東京都西多摩郡奥多摩町氷川',
  name: '奥多摩観光案内所',
};

const APPROXIMATE: DirectionsPlace = {
  latitude: 35.8104963,
  longitude: 139.1538298,
  coordinatePrecision: 'approximate',
  address: '東京都西多摩郡奥多摩町丹三郎8-2',
  name: '千島わさび園',
};

describe('map-links (#5)', () => {
  it('formats coordinates as lat,lng', () => {
    expect(coords(35.8015, 139.0831)).toBe('35.8015,139.0831');
  });

  it('builds a Google Maps directions URL from precise coordinates', () => {
    expect(googleMapsDirectionsUrl(PRECISE)).toBe(
      'https://www.google.com/maps/dir/?api=1&destination=35.8089218,139.0967554',
    );
  });

  it('builds an Apple Maps directions URL from precise coordinates', () => {
    expect(appleMapsDirectionsUrl(PRECISE)).toBe(
      'maps://?daddr=35.8089218,139.0967554',
    );
  });

  it('picks Google Maps on Android', () => {
    expect(platformDirectionsScheme('Mozilla/5.0 (Linux; Android 13) Mobile')).toBe('google');
  });

  it('picks Apple Maps on iOS', () => {
    expect(platformDirectionsScheme('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)')).toBe('apple');
  });

  it('picks Apple Maps on iPadOS', () => {
    expect(platformDirectionsScheme('Mozilla/5.0 (iPad; CPU OS 17_0)')).toBe('apple');
  });

  it('picks Apple Maps on macOS', () => {
    expect(platformDirectionsScheme('Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)')).toBe(
      'apple',
    );
  });

  it('falls back to Google Maps on unknown desktop browsers', () => {
    expect(platformDirectionsScheme('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toBe('google');
  });
});

describe('approximate-coordinate directions (Issue #127)', () => {
  it('never uses the district-centroid coordinates as the navigation destination', () => {
    // 千島わさび園's coordinates are the 丹三郎 centroid (shared with 一心亭);
    // they must not appear in a turn-by-turn destination.
    const google = googleMapsDirectionsUrl(APPROXIMATE);
    const apple = appleMapsDirectionsUrl(APPROXIMATE);
    expect(google).not.toContain('35.8104963');
    expect(google).not.toContain('139.1538298');
    expect(apple).not.toContain('35.8104963');
    expect(apple).not.toContain('139.1538298');
  });

  it('uses the sourced address for Google directions of approximate places', () => {
    expect(directionsDestination(APPROXIMATE)).toBe(encodeURIComponent(APPROXIMATE.address!));
    expect(googleMapsDirectionsUrl(APPROXIMATE)).toBe(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(APPROXIMATE.address!)}`,
    );
  });

  it('uses the sourced address for Apple directions of approximate places', () => {
    expect(appleMapsDirectionsUrl(APPROXIMATE)).toBe(
      `maps://?daddr=${encodeURIComponent(APPROXIMATE.address!)}`,
    );
  });

  it('falls back to the sourced name when the address is absent', () => {
    const noAddress: DirectionsPlace = { ...APPROXIMATE, address: undefined };
    expect(directionsDestination(noAddress)).toBe(encodeURIComponent(APPROXIMATE.name!));
  });

  it('keeps coordinate-based directions for precise places', () => {
    // 奥多摩観光案内所 has a precise OSM point — coordinates are a valid
    // navigation destination.
    expect(directionsDestination(PRECISE)).toBe(coords(PRECISE.latitude, PRECISE.longitude));
    expect(googleMapsDirectionsUrl(PRECISE)).toContain('destination=35.8089218,139.0967554');
    expect(appleMapsDirectionsUrl(PRECISE)).toContain('daddr=35.8089218,139.0967554');
  });

  it('keeps coordinate-based directions when precision is unspecified', () => {
    const unspecified: DirectionsPlace = {
      latitude: 35.8015,
      longitude: 139.0831,
      address: '東京都西多摩郡奥多摩町',
    };
    expect(directionsDestination(unspecified)).toBe('35.8015,139.0831');
  });
});
