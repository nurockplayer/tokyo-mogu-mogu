/**
 * S4 Food Culture Story screen (Issues #44, #79).
 *
 * A vertical-scroll editorial article for the recommended food culture. No
 * legacy Locked/Unlocked gating: the full story is readable directly from S3,
 * accountless and without geolocation.
 *
 * The story resolves the food culture named in the URL (the recommended
 * 東京わさび is the default when no id is given). Any culture that resolves a
 * complete story-content entry renders its own story; any other / unknown id
 * renders a graceful empty state instead of a 404 or a mislabeled article.
 * The selected candidate/journey identity (#123) is forwarded on to the Route
 * screen so the recorded journey stays stable through Result → Story → Route.
 *
 * Structure follows the approved S4 editorial rhythm (#79):
 *   hero (kicker, title, lead, read-time, origin tag, media)
 *   -> why (geography/history)
 *   -> maker (feature card with media + name + role)
 *   -> craft & wisdom
 *   -> challenge today
 *   -> tasting is succession
 *   -> support actions (shared SupportPanel — no standalone S7 page)
 *   -> route CTA.
 * Numbered editorial sections reuse the shared `StorySection` primitive with a
 * `number` label so the numbering stays consistent and reusable.
 *
 * Content provenance:
 *   - All story copy resolves through the per-culture S4 content map
 *     (`storyContent` in `src/i18n/data-content.ts`); each playable Region ×
 *     FoodCulture slice supplies its own story as data/config rather than
 *     editing this screen.
 *   - The challenge section and its "tasting is succession" framing are
 *     clearly-marked editorial composition (s4EditorialNote). The section
 *     names the succession challenge generically without fabricating specific
 *     statistics, and always resolves toward the user's action.
 *   - The municipality census context (#128) renders as a separate reference
 *     note after the editorial note, never as evidence for the succession
 *     claim, and surfaces its own provenance in the Sources block.
 *   - The compact Sources block preserves the record's provenance.
 *
 * Entry contexts (#79): the Story is a reusable component reached from the
 * personalized Result (#78/#94) or from Discover (#93). Back behavior is
 * caller-context-aware via a `backTo` query parameter (default: the current
 * Exploration result). The Route CTA carries that context forward and never
 * silently creates Saved Route state (the route page owns saving).
 */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  getFoodCultureById,
  getMunicipalityAgricultureById,
  getRelatedPlaces,
  getDisplayableStoryRegionalEvidence,
  MUNICIPALITY_INDICATOR_KEYS,
  municipalityIndicatorValue,
  resolveStoryJourney,
} from '../data';
import {
  FIELDWORK_GALLERY_COPY,
  OKUTAMA_STORY_MEDIA,
  fieldworkText,
} from '../data/fieldwork-media';
import { FoodCultureImage } from '../components/FoodCultureImage';
import { SupportPanel } from '../components/SupportPanel';
import { Card, StorySection, Tag } from '../ui';
import { useI18n, type Locale } from '../i18n';
import { placeNameKey, storyContent } from '../i18n/data-content';
import { deriveVerificationStatus, sourceDateLabel } from '../lib/verification';
import { readingMinutes, resolveBackTo, storyRouteHref } from './story-reading';
import storyHero from '../assets/figma/story-hero.png';
import './StoryPage.css';
import { journeyScrollRestoreState } from '../app/JourneyScrollManager';

/** Source-review label for the census context surfaced in this story (#128/#129). */
const CENSUS_STATUS_LABEL = {
  verified: 'verificationVerified',
  needs_confirmation: 'verificationNeedsConfirmation',
  stale: 'verificationStale',
  conflict: 'verificationConflict',
  demo: 'verificationDemo',
} as const;

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
  // The route param is `:foodCultureId` (AppRouter); reading it (instead of a
  // stale `id`) lets the documented "any other id → empty state" contract work.
  const { foodCultureId } = useParams<{ foodCultureId: string }>();
  const [searchParams] = useSearchParams();

  // Entry-context-aware back (#79). The Story is a reusable component reached
  // from the personalized Result (default) or from Discover (#93). Callers that
  // know their origin pass `?backTo=/discover`; anything else keeps the default
  // Result back behavior. An allowlist prevents crafted values from becoming
  // arbitrary or protocol-relative destinations.
  const backTo = resolveBackTo(searchParams.get('backTo'), '/explore/result');

  // The displayed culture is the URL `foodCultureId`; a journey is attached
  // only when it belongs to that same culture (a matching candidate, or an
  // unambiguous culture/config default such as the demo wasabi culture).
  // A candidate-less non-demo Story or a mismatched candidate keeps its culture
  // and represents the journey as absent — the pilot is never attached just
  // because a candidate id is missing.
  const identity = resolveStoryJourney(foodCultureId, searchParams.get('candidateId'));

  // No id defaults to the recommended 東京わさび story. Any culture that
  // resolves a complete story entry renders its own story; any other id —
  // whether it names a different seed culture or an unknown value — renders
  // the graceful empty state instead of a mislabeled article.
  const record = identity ? getFoodCultureById(identity.foodCultureId) : undefined;
  const content = record ? storyContent(record.id) : undefined;

  if (!record || !content) {
    return (
      <section className="s4-page">
        <div className="tmm-empty">
          <span className="tmm-empty__icon" aria-hidden="true">🍃</span>
          <div className="tmm-empty__title">{t('s4EmptyTitle')}</div>
          <p className="tmm-empty__desc">{t('s4EmptyBody')}</p>
          <div className="tmm-empty__action">
            <Link to={backTo} className="tmm-btn tmm-btn--secondary">
              {t('s4EmptyBack')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Issue #128: municipality agriculture context, resolved only for the story
  // that owns it (via the story's data/config `municipalityId`). This is shown
  // as separate municipal context with an explicit non-succession limitation;
  // when missing/suppressed the section falls back to the editorial text alone
  // (no fabricated statistic, and never another municipality's census).
  const municipalityAgri = content.municipalityId
    ? getMunicipalityAgricultureById(content.municipalityId)
    : undefined;
  const municipalityEntities = municipalityAgri
    ? municipalityIndicatorValue(
        municipalityAgri,
        MUNICIPALITY_INDICATOR_KEYS.agriculturalEntities,
      )
    : undefined;
  const regionalEvidence = getDisplayableStoryRegionalEvidence(record.id);
  const regionalEvidenceStatus = regionalEvidence
    ? deriveVerificationStatus(regionalEvidence.source, 'source')
    : undefined;

  const heroName = t(content.name);
  const lead = t(content.lead);
  const areaName = t(content.area);
  const readTime = bodyReadingMinutes(
    [
      t(content.history),
      t(content.story),
      t(content.makerRole),
      t(content.maker),
      t(content.craft),
      t(content.howToEnjoy),
      t(content.challenge),
      t(content.support),
    ],
    locale,
  );
  const routeHref = identity?.journeyId
    ? storyRouteHref(backTo, identity.candidateId)
    : undefined;

  // Issue #224: nearby-spots section uses the food culture's own verified
  // source-backed places; the Figma's illustrative place names are never used
  // as factual runtime content.
  const relatedPlaces = record ? getRelatedPlaces(record) : [];
  const localized = (key: ReturnType<typeof placeNameKey>, ja: string, en: string): string =>
    key ? t(key) : locale === 'ja' ? ja : en;
  const nearbySpotHref = (placeId: string): string => {
    const params = new URLSearchParams({ from: 'story', backTo });
    if (identity?.journeyId && identity.candidateId) {
      params.set('candidateId', identity.candidateId);
    }
    return `/spot/${placeId}?${params.toString()}`;
  };

  return (
    <article className="s4-page">
      {/* Section 1 — Hero (dark-green / media-forward) */}
      <header className="s4-hero">
        <Link
          to={backTo}
          state={journeyScrollRestoreState}
          className="s4-hero__back"
          aria-label={t('back')}
        >
          ‹
        </Link>
        <div className="s4-hero__media">
          {/* 8/23 demo: the wasabi story renders the exported Figma hero photo
              (Figma `52:3995`); other cultures keep the placeholder plate. */}
          {record.id === 'wasabi-okutama' ? (
            <img src={storyHero} alt={heroName} className="s4-hero__img" />
          ) : (
            <FoodCultureImage
              image={record.image}
              name={heroName}
              nameJa={record.nameJa}
              category={record.category}
              alt={heroName}
            />
          )}
          {/* Editorial photo-caption overlay on the placeholder media (the
              "※画像はイメージです" provenance note sits on the plate, not the body). */}
          <p className="s4-hero__caption">{t('s4MediaCaption')}</p>
        </div>
        <div className="s4-hero__body">
          <p className="s4-hero__kicker">{t(content.heroKicker)}</p>
          <h1 className="s4-hero__title">{heroName}</h1>
          <p className="s4-hero__lead">{lead}</p>
          <div className="s4-hero__meta">
            <span className="s4-hero__meta-item">
              <span className="s4-hero__meta-icon" aria-hidden="true">📍</span>
              {areaName}
            </span>
            <span className="s4-hero__meta-item">
              <span className="s4-hero__meta-icon" aria-hidden="true">⏱</span>
              {format(t('s4ReadTime'), { n: readTime })}
            </span>
            <span className="s4-hero__meta-item s4-hero__meta-item--tag">
              <Tag tone="success">{t('originEditorial')}</Tag>
            </span>
          </div>
        </div>
      </header>

      <div className="s4-story">
        {/* Section 2 — Why this region (geography / history) */}
        <StorySection number={1} kicker={t('s4KickerWhy')} title={format(t('s4TitleWhy'), { area: areaName })}>
          <p className="s4-p">{t(content.history)}</p>
          <p className="s4-p">{t(content.story)}</p>
          {regionalEvidence ? (
            <aside className="s4-evidence" aria-label={t('s4EvidenceLabel')}>
              <p className="s4-evidence__label">{t('s4EvidenceLabel')}</p>
              <p className="s4-evidence__summary">
                {format(t(regionalEvidence.summary), {
                  region: t(regionalEvidence.regionName),
                  value: regionalEvidence.value,
                })}
              </p>
              <div className="s4-evidence__metric">
                <span>{t(regionalEvidence.metricLabel)}</span>
                <strong>{regionalEvidence.value}{regionalEvidence.unit}</strong>
              </div>
              <p className="s4-evidence__context">
                {format(t(regionalEvidence.context), { year: regionalEvidence.sourceYear })}
              </p>
              <p className="s4-evidence__source">
                <span>{t('s4EvidenceSourceLabel')}: {regionalEvidence.source.name}</span>
                {regionalEvidence.source.url ? (
                  <a href={regionalEvidence.source.url} target="_blank" rel="noreferrer">
                    {t('sourceLink')}
                  </a>
                ) : null}
                {(() => {
                  const meta = sourceDateLabel(regionalEvidence.source, 'source');
                  return meta ? (
                    <span>{t(meta.label)}: {meta.date}</span>
                  ) : null;
                })()}
              </p>
            </aside>
          ) : null}
        </StorySection>

        {record.id === 'wasabi-okutama' ? (
          <section
            className="s4-fieldwork"
            aria-label={fieldworkText(FIELDWORK_GALLERY_COPY.storyLabel, locale)}
          >
            <div className="s4-fieldwork__heading">
              <span className="s4-fieldwork__rule" aria-hidden="true" />
              <p>{fieldworkText(FIELDWORK_GALLERY_COPY.swipeHint, locale)}</p>
              <span className="s4-fieldwork__arrow" aria-hidden="true">→</span>
            </div>
            <ul className="s4-fieldwork__rail">
              {OKUTAMA_STORY_MEDIA.map((media) => (
                <li key={media.id} className="s4-fieldwork__item">
                  <figure className="s4-fieldwork__figure">
                    <img
                      src={media.src}
                      alt={fieldworkText(media.alt, locale)}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>{fieldworkText(media.caption, locale)}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Section 3 — The maker (the maker is the visual lead of the section) */}
        <StorySection number={2} kicker={t('s4KickerMaker')} title={t('s4TitleMaker')}>
          <Card feature className="s4-maker-card">
            <div className="s4-maker-media">
              <FoodCultureImage
                image={record.image}
                name={t(content.makerName)}
                nameJa={record.nameJa}
                category={record.category}
                alt={t(content.makerName)}
              />
            </div>
            <div className="s4-maker-body">
              <h3 className="s4-maker-name">{t(content.makerName)}</h3>
              <p className="s4-maker-role">{t(content.makerRole)}</p>
            </div>
          </Card>
          <p className="s4-p">{t(content.maker)}</p>
          <p className="s4-note">{t('s4MakerNote')}</p>
        </StorySection>

        {/* Section 4 — Craft & wisdom (story + how to enjoy) */}
        <StorySection number={3} kicker={t('s4KickerCraft')} title={t('s4TitleCraft')}>
          <p className="s4-p">{t(content.craft)}</p>
          <div className="s4-inline-media">
            <FoodCultureImage
              image={record.image}
              name={t(content.craft)}
              nameJa={record.nameJa}
              category={record.category}
              alt={t(content.craftMediaAlt)}
            />
          </div>
          <p className="s4-media-caption">{t('s4MediaCaption')}</p>
          <p className="s4-p">{t(content.howToEnjoy)}</p>
        </StorySection>

        {/* Section 5 — The challenge today (never ends on pessimism) */}
        <StorySection number={4} kicker={t('s4KickerChallenge')} title={t('s4TitleChallenge')}>
          <p className="s4-p">{t(content.challenge)}</p>
          <p className="s4-note s4-note--editorial">{t('s4EditorialNote')}</p>
          {/* Issue #128: municipality census context shown as a separate
              reference note — after the editorial note, never as evidence for
              the succession claim above. The template is the story's own
              (never another municipality's name); missing/suppressed falls
              back to editorial only. */}
          {municipalityAgri && content.challengeEvidence && municipalityEntities !== undefined ? (
            <p className="s4-note s4-note--editorial">
              {format(t(content.challengeEvidence), { n: municipalityEntities })}
            </p>
          ) : null}
        </StorySection>

        {/* Section 6 — Tasting is passing it on */}
        <StorySection number={5} kicker={t('s4KickerSupport')} title={t('s4TitleSupport')}>
          {/* Pull-quote beat: the section's thesis as an editorial quote rather
              than a nested card — fewer card borders, restrained elevation. */}
          <blockquote className="s4-support-quote">
            <p className="s4-support-quote__text">{t(content.support)}</p>
          </blockquote>
        </StorySection>
      </div>

      {/* Issue #224: latest-Figma MOGUMOGU ポイント presentation callout.
          Wasabi-specific demo presentation detail (Figma 52:3995); only rendered
          on the wasabi demo journey so Ome/Sawai semantics stay isolated. */}
      {record.id === 'wasabi-okutama' ? (
        <details className="s4-point" open>
          <summary className="s4-point__summary">
            <span className="s4-point__badge">{t('s4PointTitle')}</span>
            <span className="s4-point__question">{t('s4PointQuestion')}</span>
          </summary>
          <p className="s4-point__body">{t('s4PointBody')}</p>
        </details>
      ) : null}

      {/* Issue #224: latest-Figma nearby-spots presentation, built from the
          food culture's own verified source-backed places (never unverified
          Figma place names). */}
      {relatedPlaces.length > 0 ? (
        <section className="s4-nearby" aria-labelledby="s4-nearby-title">
          <h2 id="s4-nearby-title" className="s4-nearby__title">
            {t('s4NearbySpots')}
          </h2>
          <ul className="s4-nearby__list">
            {relatedPlaces.map((place) => (
              <li key={place.id} className="s4-nearby__item">
                <Link to={nearbySpotHref(place.id)} className="s4-nearby__card">
                  <span className="s4-nearby__name">
                    {localized(placeNameKey(place.id), place.nameJa, place.nameEn)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Support actions (Issues #68/#79) — the story's "tasting is succession"
          beat made concrete: how to actually act on that interest. Shared
          SupportPanel; no standalone S7 destination is required. The save
          action persists this journey's route, never a hard-coded pilot id. */}
      <div className="s4-support-actions">
        <SupportPanel routeId={identity?.journeyId} />
      </div>

      {/* Section 7 — CTA to S5 route (only when the story's candidate has a
          journey; a culture without a Route renders no route CTA rather than
          attaching the pilot journey). */}
      <footer className="s4-cta">
        {routeHref ? (
          <>
            <Link to={routeHref} className="tmm-btn tmm-btn--primary tmm-btn--block">
              {t('s4CtaLabel')}
            </Link>
            <p className="s4-cta__sub">{t(content.ctaSub)}</p>
          </>
        ) : null}
        <Link to={backTo} state={journeyScrollRestoreState} className="s4-cta__back">
          {t('s4BackToResult')}
        </Link>
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
              {(() => {
                const meta = sourceDateLabel(source, record.origin);
                return meta ? (
                  <span className="s4-sources__meta">
                    {t(meta.label)}: {meta.date}
                  </span>
                ) : null;
              })()}
            </li>
          ))}
          {regionalEvidence ? (
            <li key="regional-evidence" className="s4-sources__item">
              <span className="s4-sources__name">{regionalEvidence.source.name}</span>
              {regionalEvidence.source.url ? (
                <a href={regionalEvidence.source.url} target="_blank" rel="noreferrer" className="s4-sources__link">
                  {t('sourceLink')}
                </a>
              ) : null}
              {regionalEvidenceStatus ? (
                <Tag tone={regionalEvidenceStatus === 'verified' ? 'success' : 'warning'}>
                  {t(CENSUS_STATUS_LABEL[regionalEvidenceStatus])}
                </Tag>
              ) : null}
              {(() => {
                const meta = sourceDateLabel(regionalEvidence.source, 'source');
                return meta ? (
                  <span className="s4-sources__meta">
                    {t(meta.label)}: {meta.date}
                  </span>
                ) : null;
              })()}
            </li>
          ) : null}
          {/* Issue #128: when the story's own municipality census context is
              shown, surface its provenance (e-Stat dataset / date / status). */}
          {municipalityAgri ? (
            <li key="municipality-census" className="s4-sources__item">
              <span className="s4-sources__name">{municipalityAgri.source.name}</span>
              {municipalityAgri.source.url ? (
                <a href={municipalityAgri.source.url} target="_blank" rel="noreferrer" className="s4-sources__link">
                  {t('sourceLink')}
                </a>
              ) : null}
              <Tag tone="warning">
                {t(CENSUS_STATUS_LABEL[
                  deriveVerificationStatus(municipalityAgri.source, municipalityAgri.origin)
                ])}
              </Tag>
              {(() => {
                const meta = sourceDateLabel(municipalityAgri.source, municipalityAgri.origin);
                return meta ? (
                  <span className="s4-sources__meta">
                    {t(meta.label)}: {meta.date}
                  </span>
                ) : null;
              })()}
            </li>
          ) : null}
        </ul>
      </details>

      {/* Mobile sticky/following CTA — only when the candidate has a journey. */}
      {routeHref ? (
        <div className="s4-sticky-cta">
          <Link to={routeHref} className="tmm-btn tmm-btn--orange tmm-btn--block">
            {t(content.stickyCta)}
          </Link>
        </div>
      ) : null}
    </article>
  );
}
