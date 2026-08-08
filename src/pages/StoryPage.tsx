/**
 * S4 Food Culture Story screen (Issue #44).
 *
 * A vertical-scroll editorial article for the recommended food culture
 * (東京わさび / wasabi-okutama). No legacy Locked/Unlocked gating: the full
 * story is readable directly from S3, accountless and without geolocation.
 *
 * The story is scoped to the 東京わさび record: `wasabi-okutama` is the default
 * when no id is given, and any other / unknown id renders a graceful empty
 * state instead of a 404 or a mislabeled article.
 *
 * Structure follows the approved S4 editorial rhythm:
 *   hero -> why (geography/history) -> maker -> craft -> challenge -> tasting
 *   as succession -> route CTA.
 *
 * Content provenance:
 *   - Geography/history, maker, craft and how-to-enjoy sections draw on the
 *     FoodCulture record's {Ja,En} fields (origin: 'editorial').
 *   - The challenge section and its "tasting is succession" framing are
 *     clearly-marked editorial composition (s4EditorialNote). The section
 *     names the succession challenge generically without fabricating specific
 *     statistics, and always resolves toward the user's action.
 *   - The compact Sources block preserves the record's provenance.
 */
import { Link, useParams } from 'react-router-dom';
import { getFoodCultureById } from '../data';
import { FoodCultureImage } from '../components/FoodCultureImage';
import { Card, StorySection, Tag } from '../ui';
import { useI18n, type Locale } from '../i18n';
import { foodCultureKey } from '../i18n/data-content';
import { readingMinutes } from './story-reading';
import './StoryPage.css';

/** The recommended food culture rendered by this screen (MVP scope: 東京わさび). */
const STORY_ID = 'wasabi-okutama';

/**
 * Replace `{name}` placeholders in a localized template, mirroring the
 * interpolation helper used elsewhere in the app (CheckInPanel).
 */
function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** Localized reading-time estimate over all resolved body copy. */
function bodyReadingMinutes(body: string[], locale: Locale): number {
  return readingMinutes(body.filter(Boolean).join(' '), locale);
}

export function StoryPage() {
  const { locale, t } = useI18n();
  const { id } = useParams<{ id: string }>();

  // No id defaults to the recommended 東京わさび story. Any other id — whether
  // it names a different seed culture or an unknown value — renders the graceful
  // empty state instead of a mislabeled article.
  const record = getFoodCultureById(id ?? STORY_ID);
  const isStoryRecord = record?.id === STORY_ID;

  if (!record || !isStoryRecord) {
    return (
      <section className="s4-page">
        <div className="tmm-empty">
          <span className="tmm-empty__icon" aria-hidden="true">🍃</span>
          <div className="tmm-empty__title">{t('s4EmptyTitle')}</div>
          <p className="tmm-empty__desc">{t('s4EmptyBody')}</p>
          <div className="tmm-empty__action">
            <Link to="/" className="tmm-btn tmm-btn--secondary">
              {t('s4EmptyBack')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const heroName = t(foodCultureKey('wasabi-okutama', 'name') ?? 'dataWasabiName');
  const lead = t('dataStoryLead');
  const areaName = t('areaOkutama');
  const fcKey = (field: 'history' | 'story' | 'maker' | 'howToEnjoy') =>
    foodCultureKey('wasabi-okutama', field) ?? 'dataWasabiDescription';
  const readTime = bodyReadingMinutes(
    [
      t(fcKey('history')),
      t(fcKey('story')),
      t('dataStoryMakerRole'),
      t(fcKey('maker')),
      t('dataStoryCraft'),
      t(fcKey('howToEnjoy')),
      t('dataStoryChallenge'),
      t('dataStorySupport'),
    ],
    locale,
  );

  return (
    <article className="s4-page">
      {/* Section 1 — Hero */}
      <header className="s4-hero">
        <p className="s4-hero__kicker">{t('s4HeroKicker')}</p>
        <h1 className="s4-hero__title">{heroName}</h1>
        <p className="s4-hero__lead">{lead}</p>
        <div className="s4-hero__meta">
          <Tag tone="success">{t('originEditorial')}</Tag>
          <span className="s4-read-time">{format(t('s4ReadTime'), { n: readTime })}</span>
        </div>
        <div className="s4-hero__media">
          <FoodCultureImage
            image={record.image}
            name={heroName}
            nameJa={record.nameJa}
            category={record.category}
            alt={heroName}
          />
          <span className="s4-media-caption">{t('s4MediaCaption')}</span>
        </div>
      </header>

      <div className="s4-story">
        {/* Section 2 — Why Okutama (geography / history) */}
        <StorySection kicker={t('s4KickerWhy')} title={format(t('s4TitleWhy'), { area: areaName })}>
          <p className="s4-p">{t(fcKey('history'))}</p>
          <p className="s4-p">{t(fcKey('story'))}</p>
        </StorySection>

        {/* Section 3 — The maker (the maker is the visual lead of the section) */}
        <StorySection kicker={t('s4KickerMaker')} title={t('s4TitleMaker')}>
          <Card feature className="s4-maker-card">
            <div className="s4-maker-media">
              <FoodCultureImage
                image={record.image}
                name={t('dataStoryMakerName')}
                nameJa={record.nameJa}
                category={record.category}
                alt={t('dataStoryMakerName')}
              />
            </div>
            <div className="s4-maker-body">
              <h3 className="s4-maker-name">{t('dataStoryMakerName')}</h3>
              <p className="s4-maker-role">{t('dataStoryMakerRole')}</p>
            </div>
          </Card>
          <p className="s4-p">{t(fcKey('maker'))}</p>
          <p className="s4-note">{t('s4MakerNote')}</p>
        </StorySection>

        {/* Section 4 — Craft & wisdom (story + how to enjoy) */}
        <StorySection kicker={t('s4KickerCraft')} title={t('s4TitleCraft')}>
          <p className="s4-p">{t('dataStoryCraft')}</p>
          <p className="s4-p">{t(fcKey('howToEnjoy'))}</p>
        </StorySection>

        {/* Section 5 — The challenge today (never ends on pessimism) */}
        <StorySection kicker={t('s4KickerChallenge')} title={t('s4TitleChallenge')}>
          <p className="s4-p">{t('dataStoryChallenge')}</p>
          <p className="s4-note s4-note--editorial">{t('s4EditorialNote')}</p>
        </StorySection>

        {/* Section 6 — Tasting is passing it on */}
        <StorySection kicker={t('s4KickerSupport')} title={t('s4TitleSupport')}>
          <Card className="s4-support-card">
            <p className="s4-p">{t('dataStorySupport')}</p>
          </Card>
        </StorySection>
      </div>

      {/* Section 7 — CTA to S5 route */}
      <footer className="s4-cta">
        <Link to="/route" className="tmm-btn tmm-btn--primary tmm-btn--block">
          {t('s4CtaLabel')}
        </Link>
        <p className="s4-cta__sub">{t('s4CtaSub')}</p>
        <Link to="/" className="s4-cta__back">{t('s4BackToResult')}</Link>
      </footer>

      {/* Compact provenance — preserves the record's sources without breaking the editorial UI */}
      <details className="s4-sources">
        <summary className="s4-sources__summary">
          <span>{t('sources')}</span>
          <Tag tone="success">{t('originEditorial')}</Tag>
        </summary>
        <ul className="s4-sources__list">
          {record.sources.map((source, index) => (
            <li key={index} className="s4-sources__item">
              <span className="s4-sources__name">{source.name}</span>
              {source.url ? (
                <a href={source.url} target="_blank" rel="noreferrer" className="s4-sources__link">
                  {t('sourceLink')}
                </a>
              ) : null}
              {source.lastVerified ? (
                <span className="s4-sources__meta">
                  {t('detailLastVerified')}: {source.lastVerified}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </details>

      {/* Mobile sticky/following CTA — does not conflict with the approved editorial layout */}
      <div className="s4-sticky-cta">
        <Link to="/route" className="tmm-btn tmm-btn--orange tmm-btn--block">
          {t('s4StickyCta')}
        </Link>
      </div>
    </article>
  );
}
