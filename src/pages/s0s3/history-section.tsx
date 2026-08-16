/**
 * Returning-home history section (Figma `3:1952` `私の食旅 (過去の旅)`).
 *
 * Fixture-backed / prototype-only (Issue #226): renders the system-managed
 * MOGU Recent contract (which the demo actually generates after a Result) as up
 * to three media cards, plus a `すべて見る` action that is presentational
 * (MOGU's full list stays a Phase 2 surface). Reopen links reuse the existing
 * MOGU reopen contract so a tapped card restores the same Result experience.
 */
import { useNavigate } from 'react-router-dom';
import { Tag } from '../../ui';
import { useI18n, type LocaleKey } from '../../i18n';
import { loadMoguRecent, type MoguRecentEntry } from '../../lib/mogu-recent';
import { type MatchTagKey } from '../../lib/exploration';
import { reopenHref, restoreReopenSession } from '../MoguPage';
import './history-section.css';

/** Match-tag key → i18n label key (kept in sync with ResultPage / MoguPage). */
const TAG_LABEL_KEY: Record<MatchTagKey, LocaleKey> = {
  'grate-fresh': 's3TagGrateFresh',
  'stream-fresh': 's3TagStreamFresh',
  'meet-maker': 's3TagMeetMaker',
  'buy-gift': 's3TagBuyGift',
  'make-craft': 's3TagMakeCraft',
  'nature-valley': 's3TagNature',
  'tradition-edo': 's3TagTradition',
  'daily-life': 's3TagDaily',
  'half-day': 's3TagHalfDay',
  'full-day': 's3TagFullDay',
};

const HISTORY_MAX_CARDS = 3;

export function HistorySection() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const entries = loadMoguRecent().slice(0, HISTORY_MAX_CARDS);

  const handleReopen = (entry: MoguRecentEntry) => {
    restoreReopenSession(entry);
    navigate(reopenHref(entry));
  };

  return (
    <section className="tmm-history" aria-labelledby="tmm-history-title">
      <h2 id="tmm-history-title" className="tmm-history__title">
        {t('homeHistoryTitle')}
      </h2>

      {entries.length === 0 ? (
        <p className="tmm-history__empty">{t('homeHistoryEmpty')}</p>
      ) : (
        <ul className="tmm-history__list">
          {entries.map((entry) => (
            <li key={`${entry.candidateId ?? entry.resultId}-${entry.createdAt}`}>
              <button
                type="button"
                className="tmm-history-card"
                onClick={() => handleReopen(entry)}
              >
                <span className="tmm-history-card__media" aria-hidden="true">
                  <span className="tmm-history-card__bookmark">🔖</span>
                  <span className="tmm-history-card__glyph">🌿</span>
                </span>
                <span className="tmm-history-card__body">
                  <span className="tmm-history-card__title">
                    {t(entry.titleKey as LocaleKey)}
                  </span>
                  {entry.summary.slice(0, 2).map((key) =>
                    key in TAG_LABEL_KEY ? (
                      <Tag key={key} tone="info">
                        {t(TAG_LABEL_KEY[key as MatchTagKey])}
                      </Tag>
                    ) : null,
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className="tmm-history__all"
        aria-disabled="true"
      >
        {t('homeHistoryAll')}
      </button>
    </section>
  );
}
