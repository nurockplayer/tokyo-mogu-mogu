import type { Locale } from '../../../i18n';
import type { FoodProfile } from '../../../lib/food-profile';
import { referenceAssets, type JourneyPresentation, type ReferenceCopy } from '../content';
import { discoveryJourney, matchJourneys, type DiscoveryFilters, type DiscoveryOptions } from '../discovery';
import { describeFilters } from '../exploration/DiscoveryFields';
import { factRetrievalNote } from '../journey-publication';
import { JourneyResultCard } from './JourneyResultCard';

const resultCopy = {
  ja: {
    title: '食旅の検索結果', empty: '条件に合う食旅が見つかりませんでした。',
    clear: '条件をクリア', published: '公開中の食旅',
    edit: '条件を変更', reason: '表示理由',
    ask: '食事の希望や制限がある場合は、食材や調理方法をお店にご確認ください。',
    allergy: 'アレルギーについては、食材に加え、調理中の混入についてもお店にご確認ください。',
    religious: '宗教上の制限については、食材や調理方法をお店にご確認ください。',
  },
  en: {
    title: 'Food journey results', empty: 'No journeys match these preferences.',
    clear: 'Clear filters', published: 'In the published catalog',
    edit: 'Change filters', reason: 'Why it appears',
    ask: 'Ask the venue about ingredients and preparation if you have dietary needs.',
    allergy: 'For allergies, ask the venue about ingredients and cross-contact during preparation.',
    religious: 'For religious dietary needs, ask the venue about ingredients and preparation practices.',
  },
  'zh-TW': {
    title: '美食之旅搜尋結果', empty: '找不到符合這些條件的旅程。',
    clear: '清除條件', published: '收錄於已公開的目錄',
    edit: '更改條件', reason: '顯示原因',
    ask: '如有飲食需求，請向店家詢問食材與烹調方式。',
    allergy: '如有食物過敏，請向店家詢問食材及烹調過程中的交叉接觸。',
    religious: '如有宗教飲食限制，請向店家詢問食材與處理方式。',
  },
};

interface ResultScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  catalog: ReturnType<typeof discoveryJourney>[];
  options: DiscoveryOptions;
  filters: DiscoveryFilters;
  foodProfile: FoodProfile | null;
  onRepeatSearch: () => void;
  onClear: () => void;
  onBrowse: () => void;
  onOpenJourney: (journey: JourneyPresentation) => void;
}

export function ResultScreen({
  active, copy, locale, catalog, options, filters, foodProfile, onRepeatSearch, onClear, onBrowse, onOpenJourney,
}: ResultScreenProps) {
  const labels = resultCopy[locale];
  const matches = active ? matchJourneys(catalog, filters) : [];
  const activeFilters = describeFilters(locale, options, filters);
  const guidance = foodProfile?.dietary.includes('allergy')
    ? labels.allergy
    : foodProfile?.dietary.includes('religious')
      ? labels.religious
      : (foodProfile?.dietary.length || foodProfile?.dietaryOther) && labels.ask;

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="result"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <header className="ghead">
        <button className="back" onClick={onRepeatSearch} type="button" aria-label={copy.actions.back}>‹</button>
        {copy.exploration.title}
      </header>
      <div className="scroll">
        <h1 className="res-head"><em>{labels.title}</em></h1>
        <div className="res-sub">
          <button onClick={onRepeatSearch} type="button">{labels.edit}</button>
          {activeFilters && <button onClick={onClear} type="button">{labels.clear}</button>}
        </div>
        {guidance && <div className="res-sub"><p>{guidance}</p></div>}
        {matches.length === 0 ? (
          <div className="empty">
            <p>{labels.empty}</p>
            {activeFilters && <p>{activeFilters}</p>}
            <button className="wide-btn" onClick={onBrowse} type="button">{copy.actions.openMogu}</button>
          </div>
        ) : matches.map(({ journey, record, reason, minutes }) => (
          <JourneyResultCard
            active={active}
            copy={copy}
            journey={journey}
            key={journey.id}
            locale={locale}
            onOpen={onOpenJourney}
            reason={`${labels.reason} · ${describeFilters(locale, options, reason, minutes) || labels.published}`}
            sourceNote={factRetrievalNote(record, locale, `journey.copy.${locale}`, `location.${locale}`)}
          />
        ))}
      </div>
      <div className="progress result-progress" role="progressbar" aria-label={copy.exploration.title}
        aria-valuemin={0} aria-valuemax={5} aria-valuenow={5}>
        <div className="rail">
          {[0, 1, 2, 3, 4].map((index) => <i className="dot" key={index} />)}
        </div>
        <div className="plateware">
          <div className="plate" />
          <img className="fork" src={referenceAssets.forkIllustration} alt="" />
        </div>
      </div>
    </section>
  );
}
