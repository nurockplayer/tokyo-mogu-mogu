import { describe, expect, it } from 'vitest';
import { strings, type Locale } from '../../i18n/resources';
import { createDefaultFoodProfile } from '../../lib/food-profile';
import { foodProfileToDurableProfile } from './chat/foodProfileMachine';
import { buildSpotPhrase } from './spot-phrase';

describe('Spot phrase', () => {
  it('uses the stored selection IDs and preserves a custom allergy in each language', () => {
    const profile = foodProfileToDurableProfile({
      answers: { allergy: ['egg', 'wheat', 'custom:そば'], diet: ['none'], religion: ['pork'], dislike: [] },
      customAnswers: { allergy: ['そば'], diet: [], religion: [], dislike: [] },
    });

    for (const [locale, egg, wheat, pork] of [
      ['ja', '卵', '小麦', '豚肉'],
      ['en', 'Egg', 'Wheat', 'Pork'],
      ['zh-TW', '蛋', '小麥', '豬肉'],
    ] as const) {
      const [question, allergies, religious] = buildSpotPhrase(profile, locale).split('\n');
      expect(question).toBe(strings[locale].spotPhrasePersonal);
      for (const ingredient of [egg, wheat, 'そば']) expect(allergies).toContain(ingredient);
      expect(religious).toContain(pork);
    }
  });

  it('uses the general question for absent and empty profiles', () => {
    for (const locale of Object.keys(strings) as Locale[]) {
      for (const profile of [null, createDefaultFoodProfile()]) {
        expect(buildSpotPhrase(profile, locale)).toBe(strings[locale].spotPhraseGeneral);
      }
    }
  });

  it('keeps saved categories and free text from older profiles', () => {
    const phrase = buildSpotPhrase({
      ...createDefaultFoodProfile(),
      dietary: ['allergy'],
      dietaryOther: 'そば',
      hasNoRestrictions: false,
    }, 'ja');
    expect(phrase).toContain(strings.ja.spotPhraseAllergies);
    expect(phrase).toContain('そば');
  });
});
