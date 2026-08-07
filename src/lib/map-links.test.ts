import { describe, expect, it } from 'vitest';
import {
  appleMapsDirectionsUrl,
  coords,
  googleMapsDirectionsUrl,
  platformDirectionsScheme,
} from './map-links';

describe('map-links (#5)', () => {
  it('formats coordinates as lat,lng', () => {
    expect(coords(35.8015, 139.0831)).toBe('35.8015,139.0831');
  });

  it('builds a Google Maps directions URL', () => {
    expect(googleMapsDirectionsUrl(35.8015, 139.0831)).toBe(
      'https://www.google.com/maps/dir/?api=1&destination=35.8015,139.0831',
    );
  });

  it('builds an Apple Maps directions URL', () => {
    expect(appleMapsDirectionsUrl(35.8015, 139.0831)).toBe(
      'maps://?daddr=35.8015,139.0831',
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
