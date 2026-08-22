import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { OKUTAMA_STORY_MEDIA, OKUTAMA_TOURISM_OFFICE_MEDIA } from './fieldwork-media';

const FIELDWORK_DERIVATIVES = [
  'hikawa-bridge.jpg',
  'hikawa-river.jpg',
  'hikawa-valley.jpg',
  'okutama-station.jpg',
  'tourism-office-stamps.jpg',
  'tourism-office-wasabi-gelato.jpg',
  'tourism-office-wasapy.jpg',
  'tourism-office.jpg',
] as const;

const PRIVATE_METADATA_MARKERS = [
  Buffer.from('Exif\0\0', 'ascii'),
  Buffer.from('http://ns.adobe.com/xap/1.0/', 'ascii'),
  Buffer.from('Photoshop 3.0', 'ascii'),
] as const;

describe('Okutama fieldwork derivative publication boundary', () => {
  it.each(FIELDWORK_DERIVATIVES)('%s contains no EXIF, XMP, or IPTC payload', (filename) => {
    const image = readFileSync(
      new URL(`../assets/fieldwork/okutama/${filename}`, import.meta.url),
    );

    for (const marker of PRIVATE_METADATA_MARKERS) {
      expect(image.includes(marker)).toBe(false);
    }
  });

  it('does not publish audited photos with identifiable bystanders', () => {
    expect(OKUTAMA_STORY_MEDIA.map((media) => media.originalFilename)).not.toEqual(
      expect.arrayContaining(['駅.JPG', '川.JPG']),
    );
  });

  it('does not publish the price-dominant gelato photo', () => {
    expect(OKUTAMA_TOURISM_OFFICE_MEDIA.map((media) => media.originalFilename)).not.toContain(
      '案内所_わさびジェラート.JPG',
    );
  });
});
