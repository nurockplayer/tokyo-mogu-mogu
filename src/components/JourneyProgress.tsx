import mascot from '../assets/figma/mascot.svg';
import { useI18n } from '../i18n';
import { fillTemplate } from '../lib/exploration';
import './JourneyProgress.css';

interface JourneyProgressProps {
  current: number;
  total?: number;
  abovePrimaryNav?: boolean;
}

/**
 * The measured six-stage journey rail from the approved 375px Figma flow.
 * It reports real navigation state only; it is never a loading indicator and
 * never invents completion time or confidence.
 */
export function JourneyProgress({
  current,
  total = 6,
  abovePrimaryNav = false,
}: JourneyProgressProps) {
  const { t } = useI18n();
  const boundedCurrent = Math.min(Math.max(current, 1), total);
  const percentage = total <= 1 ? 100 : ((boundedCurrent - 1) / (total - 1)) * 100;
  const label = fillTemplate(t('journeyProgressAria'), {
    n: String(boundedCurrent),
    total: String(total),
  });

  return (
    <div
      className={`tmm-journey-progress${abovePrimaryNav ? ' tmm-journey-progress--with-nav' : ''}`}
    >
      <div
        className="tmm-journey-progress__inner"
        data-testid="journey-progress"
        role="progressbar"
        aria-label={label}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={boundedCurrent}
        aria-valuetext={label}
      >
        <span className="tmm-journey-progress__count" aria-hidden="true">
          {boundedCurrent} / {total}
        </span>
        <div className="tmm-journey-progress__rail" aria-hidden="true">
          <span
            className="tmm-journey-progress__fill"
            style={{ width: `${percentage}%` }}
          />
          {Array.from({ length: total }, (_, index) => (
            <span
              key={index}
              className={`tmm-journey-progress__milestone${
                index + 1 <= boundedCurrent ? ' tmm-journey-progress__milestone--reached' : ''
              }`}
              data-journey-milestone
              style={{ left: `${total <= 1 ? 0 : (index / (total - 1)) * 100}%` }}
            />
          ))}
          <img
            className="tmm-journey-progress__mascot"
            src={mascot}
            alt=""
            style={{ left: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
