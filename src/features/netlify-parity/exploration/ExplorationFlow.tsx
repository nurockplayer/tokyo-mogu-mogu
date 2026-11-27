import type { Locale } from '../../../i18n';
import { referenceAssets, type ReferenceCopy } from '../content';
import type { DiscoveryFilters, DiscoveryOptions } from '../discovery';
import { DiscoveryFields, discoveryFields } from './DiscoveryFields';

interface ExplorationFlowProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  options: DiscoveryOptions;
  filters: DiscoveryFilters;
  step: number;
  onChange: (filters: DiscoveryFilters) => void;
  onStep: (step: number) => void;
  onBackFromFirst: () => void;
  onComplete: () => void;
}

export function ExplorationFlow({
  active, copy, locale, options, filters, step, onChange, onStep, onBackFromFirst, onComplete,
}: ExplorationFlowProps) {
  const goBack = () => step === 0 ? onBackFromFirst() : onStep(step - 1);

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="explore"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <div className="ghead">
        <button className="back" onClick={goBack} type="button" aria-label={copy.actions.back}>‹</button>
        {copy.exploration.title}
      </div>
      <div className="wiz-body">
        <div data-exploration-step={step}>
          {active && <DiscoveryFields locale={locale} options={options} value={filters} onChange={onChange} field={discoveryFields[step]} />}
          <div className="wiz-nav">
            <button
              className="next glow"
              id="wiz-next"
              onClick={() => step === discoveryFields.length - 1 ? onComplete() : onStep(step + 1)}
              type="button"
              aria-label={copy.actions.next.replace(/[\s\u3000]*⟶$/, '')}
            >
              {copy.actions.next}
            </button>
            {step > 0 && <button className="prev" onClick={goBack} type="button">{copy.actions.previous}</button>}
          </div>
        </div>
      </div>
      <div className="progress" aria-label={`${step + 1} / ${discoveryFields.length}`}>
        <div className="rail">
          {discoveryFields.map((field, index) => (
            <i className={`dot${index === step ? ' hide' : ''}`} key={field} />
          ))}
          <img className="fork" src={referenceAssets.forkIllustration} alt="" style={{ left: `${step * 25}%` }} />
        </div>
        <div className="plate" />
      </div>
    </section>
  );
}
