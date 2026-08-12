import { describe, expect, it } from 'vitest';
import { getFoodCultureById, getPlaceById, getSpotDetail } from '../data';
import { generateStakeholderReviewPacket, UNKNOWN_JA } from './stakeholder-review-packet';

describe('stakeholder review packet (#133)', () => {
  it('generates a Japanese-first packet from live demo records without inventing unknowns', () => {
    const foodCulture = getFoodCultureById('wasabi-okutama')!;
    const place = getPlaceById('chishima-wasabi-garden')!;
    const markdown = generateStakeholderReviewPacket({
      foodCulture,
      place,
      spot: getSpotDetail(place.id),
      generatedAt: '2026-08-12',
    });

    expect(markdown).toContain(foodCulture.storyJa);
    expect(markdown).toContain(place.address);
    expect(markdown).toContain(UNKNOWN_JA);
    expect(markdown).toContain('needs_confirmation');
    expect(markdown).toContain("verificationStatus: 'verified'");
    expect(markdown).toContain('東京都全域 × 複数地域 × 複数食文化');
  });

  it('uses record inputs rather than assuming Okutama or wasabi identifiers', () => {
    const foodCulture = getFoodCultureById('kumma-hyakka-ome')!;
    const place = getPlaceById(foodCulture.placeIds[0])!;
    const markdown = generateStakeholderReviewPacket({ foodCulture, place, generatedAt: '2026-08-12' });

    expect(markdown).toContain(foodCulture.nameJa);
    expect(markdown).toContain(place.nameJa);
    expect(markdown).not.toContain('対象: okutama');
    expect(markdown).not.toContain('奥多摩 × 東京わさび');
  });

  it('keeps missing fields reviewable even when a source is verified and preserves false', () => {
    const foodCulture = getFoodCultureById('wasabi-okutama')!;
    const place = getPlaceById('chishima-wasabi-garden')!;
    const spot = {
      ...getSpotDetail(place.id)!,
      practical: { reservationAvailable: false },
      tags: { vegetarian: false, allergyNotice: false, accessibility: false },
      source: { ...getSpotDetail(place.id)!.source, verificationStatus: 'verified' as const, confirmedAt: '2026-08-12' },
    };
    const markdown = generateStakeholderReviewPacket({ foodCulture, place, spot, generatedAt: '2026-08-12' });

    expect(markdown).toContain('reservationAvailable: false');
    expect(markdown).toContain('accessibility: false');
    expect(markdown).toMatch(/営業時間 \| 不明（未確認） \| 要確認/);
    expect(markdown).toContain('- [ ] 営業時間 — 要確認');
  });

  it('keeps absent dietary and allergy tags unknown for a verified source', () => {
    const foodCulture = getFoodCultureById('wasabi-okutama')!;
    const place = getPlaceById('chishima-wasabi-garden')!;
    const spot = {
      ...getSpotDetail(place.id)!,
      source: { ...getSpotDetail(place.id)!.source, verificationStatus: 'verified' as const, confirmedAt: '2026-08-12' },
    };
    const markdown = generateStakeholderReviewPacket({ foodCulture, place, spot, generatedAt: '2026-08-12' });

    expect(markdown).toMatch(/Vegetarian \/ Vegan・アレルギー対応 \| 不明（未確認） \| 要確認/);
    expect(markdown).toContain('- [ ] Vegetarian / Vegan・アレルギー対応 — 要確認');
  });

  it('keeps an empty language list in the review loop', () => {
    const foodCulture = getFoodCultureById('wasabi-okutama')!;
    const place = getPlaceById('chishima-wasabi-garden')!;
    const baseSpot = getSpotDetail(place.id)!;
    const spot = {
      ...baseSpot,
      tags: { ...baseSpot.tags, language: [] },
      source: { ...baseSpot.source, verificationStatus: 'verified' as const, confirmedAt: '2026-08-12' },
    };
    const markdown = generateStakeholderReviewPacket({ foodCulture, place, spot, generatedAt: '2026-08-12' });

    expect(markdown).toMatch(/英語・多言語対応 \| 空の配列（対応言語の確認なし） \| 要確認/);
    expect(markdown).toContain('- [ ] 英語・多言語対応 — 要確認');
  });
});
