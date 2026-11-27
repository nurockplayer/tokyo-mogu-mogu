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
      if (value.startsWith('custom:')) return value.slice('custom:'.length);
      const label = options[value];
      return label.slice(label.indexOf(' ') + 1);
    });
    const list = new Intl.ListFormat(locale, { type: 'unit' }).format(names);
    lines.push(locale === 'en' ? `${heading}: ${list}` : `${heading}：${list}`);
  }
  const note = profile?.dietaryOther.trim();
  if (!profile?.dietarySelections && note) {
    lines.push(locale === 'en' ? `${copy.spotPhraseOther}: ${note}` : `${copy.spotPhraseOther}：${note}`);
  }
  return lines.length ? [copy.spotPhrasePersonal, ...lines].join('\n') : copy.spotPhraseGeneral;
}
