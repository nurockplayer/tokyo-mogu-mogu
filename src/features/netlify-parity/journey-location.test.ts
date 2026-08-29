import { describe, expect, it } from 'vitest';
import { resolveCurrentJourneyLocation } from './journey-location';

describe('current journey location resolution', () => {
  it.each([
    '/story/%E0%A4%A',
    '/spot/%E0%A4%A',
  ])('fails closed for a malformed encoded path identity: %s', (pathname) => {
    expect(resolveCurrentJourneyLocation(pathname, '')).toEqual({ status: 'invalid' });
  });
});
