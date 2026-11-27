import { strings, type Locale } from '../../i18n/resources';
import type { FoodProfile } from '../../lib/food-profile';
import { CATEGORY_BY_QUESTION, FOOD_PROFILE_QUESTIONS } from './chat/foodProfileMachine';
import { referenceCopy } from './content';

const categoryLabels = {
  allergy: 'spotPhraseAllergies',
  'vegetarian-vegan': 'spotPhraseDiet',
  religious: 'spotPhraseReligious',
  dislike: 'spotPhraseDislikes',
} as const;

const sesameNames = new Set([strings.en.spotPhraseSesame, 'sesame seed', 'sesame seeds', strings['zh-TW'].spotPhraseSesame]);

function staffIngredientName(name: string, locale: Locale): string {
  return locale === 'ja' && sesameNames.has(name.trim().toLowerCase()) ? strings.ja.spotPhraseSesame : name;
}

export function buildSpotPhrase(profile: FoodProfile | null, locale: Locale): string {
  const copy = strings[locale];
  const lines: string[] = [];
  for (const { key } of FOOD_PROFILE_QUESTIONS) {
    const category = CATEGORY_BY_QUESTION[key];
    if (!profile?.dietary.includes(category)) continue;
    const heading = copy[categoryLabels[category]];
    const selections = profile.dietarySelections?.[category];
    if (!selections?.length) {
      lines.push(heading);
      continue;
    }

    const options = referenceCopy(locale).profile.questions[key].options as Record<string, string>;
    const names = selections.map((value) => {
      if (value.startsWith('custom:')) {
        return staffIngredientName(value.slice('custom:'.length), locale);
      }
      const label = options[value];
      return label.slice(label.indexOf(' ') + 1);
    });
    const list = new Intl.ListFormat(locale, { type: 'unit' }).format(names);
    lines.push(locale === 'en' ? `${heading}: ${list}` : `${heading}：${list}`);
  }
  const note = profile?.dietarySelections ? '' : profile?.dietaryOther.trim();
  if (note) {
    const name = staffIngredientName(note, locale);
    lines.push(locale === 'en' ? `${copy.spotPhraseOther}: ${name}` : `${copy.spotPhraseOther}：${name}`);
  }
  const hasRestrictions = note || profile?.dietary.some((category) => category !== 'dislike');
  const questions = hasRestrictions
    ? [copy.spotPhrasePersonal, copy.spotPhraseSharedEquipment]
    : [copy.spotPhraseGeneral];
  return [...questions, ...lines].join('\n');
}
