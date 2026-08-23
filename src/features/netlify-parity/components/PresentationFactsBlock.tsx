import type { Locale } from '../../../i18n';
import type { PresentationFacts } from '../content';

export function PresentationFactsBlock({
  facts,
  locale,
  className = '',
}: {
  facts: PresentationFacts;
  locale: Locale;
  className?: string;
}) {
  const verificationStatus = facts.sources.some(
    (source) => source.verificationStatus === 'needs_confirmation',
  ) ? 'needs_confirmation' : 'demo';
  const retrievalDates = [...new Set(facts.sources.map((source) => source.retrievedAt))];
  const retrievedAt = retrievalDates.length === 1 ? retrievalDates[0] : undefined;

  return (
    <aside
      className={`presentation-facts${className ? ` ${className}` : ''}`}
      data-presentation-facts
      data-verification-status={verificationStatus}
      data-source-retrieved-at={retrievedAt}
    >
      <p>{facts.disclosure[locale]}</p>
      {facts.sources.length > 0 ? (
        <div className="presentation-source-links">
          {facts.sources.map((source) => (
            <a
              data-source-retrieved-at={source.retrievedAt}
              data-verification-status={source.verificationStatus}
              href={source.url}
              key={source.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {source.label[locale]}
            </a>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
