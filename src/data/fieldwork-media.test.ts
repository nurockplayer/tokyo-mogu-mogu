import { describe, expect, it } from 'vitest';
import { FIELDWORK_MEDIA, type FieldworkMedia } from './fieldwork-media';

describe('fieldwork media mapping contract', () => {
  it('can represent another Tokyo region or place without changing the shared type', () => {
    const futureRegion: FieldworkMedia['mapping'] = {
      scope: 'region-scenery',
      regionId: 'hachioji',
      constraint: 'Example only.',
    };
    const futurePlace: FieldworkMedia['mapping'] = {
      scope: 'place',
      placeId: 'hachioji-example-place',
      constraint: 'Example only.',
    };

    expect(futureRegion.regionId).toBe('hachioji');
    expect(futurePlace.placeId).toBe('hachioji-example-place');
  });

  it('keeps the current demo records explicitly scoped to Okutama', () => {
    const mappings = Object.values(FIELDWORK_MEDIA).map((media) => media.mapping);

    expect(mappings.filter((mapping) => mapping.scope === 'place')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ placeId: 'okutama-tourism-office' }),
      ]),
    );
    expect(mappings.filter((mapping) => mapping.scope === 'region-scenery')).toEqual(
      expect.arrayContaining([expect.objectContaining({ regionId: 'okutama' })]),
    );
  });
});
