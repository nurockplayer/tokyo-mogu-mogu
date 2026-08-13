import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getFoodCultureById, getMunicipalityAgricultureById, getPlaceById, getSpotDetail } from '../data';
import { storyContent } from '../i18n/data-content';
import { resolveKey } from '../i18n/fallback';
import { DEFAULT_LOCALE, strings } from '../i18n/resources';
import { generateStakeholderReviewPacket, resolveStoryEvidence, UNKNOWN_JA } from './stakeholder-review-packet';

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

  it('resolves Story narrative from canonical storyContent, not duplicated pilot strings', () => {
    const foodCulture = getFoodCultureById('wasabi-okutama')!;
    const place = getPlaceById('chishima-wasabi-garden')!;
    const markdown = generateStakeholderReviewPacket({
      foodCulture,
      place,
      spot: getSpotDetail(place.id),
      generatedAt: '2026-08-12',
    });

    // `challenge` exists only on the canonical Story content map (storyContent),
    // never on the FoodCulture record — so its presence proves the narrative is
    // resolved through the same contract StoryPage renders.
    const content = storyContent('wasabi-okutama')!;
    expect(markdown).toContain(resolveKey(strings, DEFAULT_LOCALE, content.lead));
    expect(markdown).toContain(resolveKey(strings, DEFAULT_LOCALE, content.challenge));
    expect(markdown).toContain('後継者や担い手の減少が共通の課題');
  });

  it('includes municipality census claim, e-Stat provenance, and needs_confirmation for the Okutama story', () => {
    const foodCulture = getFoodCultureById('wasabi-okutama')!;
    const place = getPlaceById('chishima-wasabi-garden')!;
    const markdown = generateStakeholderReviewPacket({
      foodCulture,
      place,
      spot: getSpotDetail(place.id),
      generatedAt: '2026-08-12',
    });

    expect(markdown).toContain('市町村別の参考情報（農林業センサス）');
    expect(markdown).toContain('農林水産省 2020年農林業センサス（市町村別統計表）');
    expect(markdown).toContain('e-stat.go.jp');
    expect(markdown).toContain('農業経営体は1経営体');
    expect(markdown).toContain('1経営体');
    expect(markdown).toContain('needs_confirmation');
  });

  it('surfaces the municipality interpretation boundary in the packet', () => {
    const foodCulture = getFoodCultureById('wasabi-okutama')!;
    const place = getPlaceById('chishima-wasabi-garden')!;
    const markdown = generateStakeholderReviewPacket({
      foodCulture,
      place,
      spot: getSpotDetail(place.id),
      generatedAt: '2026-08-12',
    });

    const profile = getMunicipalityAgricultureById('133086')!;
    expect(markdown).toContain('解釈の範囲');
    expect(markdown).toContain(profile.interpretationNoteJa);
  });

  it('excludes Okutama census evidence for a non-Okutama story', () => {
    const foodCulture = getFoodCultureById('kumma-hyakka-ome')!;
    const place = getPlaceById(foodCulture.placeIds[0])!;
    const markdown = generateStakeholderReviewPacket({ foodCulture, place, generatedAt: '2026-08-12' });

    expect(markdown).not.toContain('市町村別の参考情報（農林業センサス）');
    expect(markdown).not.toContain('農林水産省 2020年農林業センサス');
    expect(markdown).not.toContain('e-stat.go.jp');
    expect(markdown).not.toContain('奥多摩町の農業経営体');
  });

  it('resolves Story evidence generically and ties census to the story municipalityId', () => {
    const evidence = resolveStoryEvidence('wasabi-okutama')!;
    const content = storyContent('wasabi-okutama')!;

    expect(evidence.narrative.find((f) => f.label === 'Story リード')?.value)
      .toBe(resolveKey(strings, DEFAULT_LOCALE, content.lead));
    expect(evidence.municipality).toBeDefined();
    expect(evidence.municipality!.source.name)
      .toBe('農林水産省 2020年農林業センサス（市町村別統計表）');

    // A culture without a full Story resolves to no evidence — and therefore
    // no census — rather than inheriting Okutama's.
    expect(resolveStoryEvidence('kumma-hyakka-ome')).toBeUndefined();
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

describe('stakeholder review packet reusable boundary (#133)', () => {
  // The generic CLI and generator must not infer demo scope from a hard-coded
  // food-culture id or the pilot-journey constant. Assert the source stays free
  // of those inference tokens so a future edit cannot silently re-couple the
  // packet to Okutama × Tokyo Wasabi.
  const cliSource = readFileSync(
    fileURLToPath(new URL('../../scripts/generate-review-packet.ts', import.meta.url)),
    'utf8',
  );
  const generatorSource = readFileSync(
    fileURLToPath(new URL('./stakeholder-review-packet.ts', import.meta.url)),
    'utf8',
  );

  it('contains no PILOT_JOURNEY or hard-coded food-culture inference', () => {
    expect(cliSource).not.toContain('PILOT_JOURNEY');
    expect(cliSource).not.toContain('wasabi-okutama');
    expect(generatorSource).not.toContain('PILOT_JOURNEY');
    expect(generatorSource).not.toContain('wasabi-okutama');
  });
});
