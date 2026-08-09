/**
 * Shared UI foundation — component primitives (Issue #42).
 *
 * S0–S9 screens (child Issues #43–#49) import these primitives instead of
 * building their own visual system. All styles are class-based (`tmm-*`), so a
 * screen can use the CSS directly or the small React wrappers below.
 *
 * Import the stylesheet once at the app root: `import '../ui/ui.css'` and
 * `import '../ui/tokens.css'` (or import this module).
 */
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

/* ---------- Buttons ---------- */

export type ButtonVariant = 'primary' | 'secondary' | 'orange';

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  return (
    <button
      type={type}
      className={`tmm-btn tmm-btn--${variant} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
}) {
  return (
    <a className={`tmm-btn tmm-btn--${variant} ${className}`.trim()} {...rest}>
      {children}
    </a>
  );
}

/* ---------- Selection chips ---------- */

export function Chip({
  selected = false,
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`tmm-chip ${selected ? '' : 'tmm-chip--muted'} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------- Progress indicator ---------- */

export function ProgressBar({
  value,
  label,
  max = 100,
}: {
  /** 0..max progress value. */
  value: number;
  /** Optional text label shown before the bar. */
  label?: string;
  max?: number;
}) {
  const clamped = Math.max(0, Math.min(value, max));
  const pct = max === 0 ? 0 : Math.round((clamped / max) * 100);
  return (
    <div className="tmm-progress">
      {label ? <span className="tmm-progress__label">{label}</span> : null}
      <div
        className="tmm-progress__bar"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className="tmm-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function StepDots({
  total,
  current,
  label,
}: {
  total: number;
  /** 0-indexed current step. */
  current: number;
  /** Accessible label for the progress group; pass the localized string. */
  label?: string;
}) {
  return (
    <div className="tmm-steps" role={label ? 'group' : undefined} aria-label={label}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`tmm-steps__dot ${
            i < current ? 'tmm-steps__dot--done' : i === current ? 'tmm-steps__dot--current' : ''
          }`}
        />
      ))}
    </div>
  );
}

/* ---------- Cards ---------- */

export function Card({
  flat = false,
  feature = false,
  button = false,
  className = '',
  children,
}: {
  flat?: boolean;
  feature?: boolean;
  /** Clickable card variant (e.g. navigating to a detail screen). */
  button?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = [
    'tmm-card',
    flat ? 'tmm-card--flat' : '',
    feature ? 'tmm-card--feature' : '',
    button ? 'tmm-card--button' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <div className={cls}>{children}</div>;
}

/* ---------- Story section ---------- */

export function StorySection({
  kicker,
  title,
  number,
  children,
}: {
  kicker?: string;
  title?: string;
  /** Optional editorial sequence marker (for numbered long-form stories). */
  number?: number;
  children: ReactNode;
}) {
  return (
    <section className="tmm-story-section">
      {kicker ? <p className="tmm-story-section__kicker">{kicker}</p> : null}
      {title ? (
        <h2 className="tmm-story-section__title">
          {number !== undefined ? (
            <span className="tmm-story-section__num" aria-hidden="true">
              {number}
            </span>
          ) : null}
          {title}
        </h2>
      ) : null}
      <div className="tmm-story-section__body">{children}</div>
    </section>
  );
}

/* ---------- Route step card / mobility ---------- */

export function RouteStep({
  number,
  name,
  role,
  children,
}: {
  number: number;
  name: string;
  role?: string;
  children?: ReactNode;
}) {
  return (
    <div className="tmm-route-step">
      <span className="tmm-route-step__num" aria-hidden="true">
        {number}
      </span>
      <div className="tmm-route-step__body">
        <div className="tmm-route-step__name">{name}</div>
        {role ? <p className="tmm-route-step__role">{role}</p> : null}
        {children}
      </div>
    </div>
  );
}

export function Mobility({
  mode,
  duration,
  label,
}: {
  /** Transport mode: train / bus / walk. */
  mode: 'train' | 'bus' | 'walk';
  duration?: string;
  /** Fallback text label when a mode has no icon (accessibility). */
  label?: string;
}) {
  const icons = { train: '🚃', bus: '🚌', walk: '🚶' } as const;
  return (
    <div className="tmm-mobility">
      <span className="tmm-mobility__icon" role="img" aria-label={label ?? mode}>
        {icons[mode]}
      </span>
      <span className="tmm-mobility__badge">
        {label ?? mode}
        {duration ? ` · ${duration}` : ''}
      </span>
    </div>
  );
}

/* ---------- Practical information list ---------- */

export function InfoList({ items }: { items: { label: string; value: string }[] }) {
  return (
    <ul className="tmm-info-list">
      {items.map((item) => (
        <li key={item.label} className="tmm-info-list__item">
          <span className="tmm-info-list__label">{item.label}</span>
          <span className="tmm-info-list__value">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Support action card ---------- */

export function SupportAction({
  icon,
  title,
  description,
  disabled = false,
  href,
  children,
}: {
  icon: string;
  title: string;
  description: string;
  disabled?: boolean;
  /** External destination when the action has a real link; omit for demo/disabled states. */
  href?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`tmm-support ${disabled ? 'tmm-support--disabled' : ''}`.trim()}>
      <span className="tmm-support__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="tmm-support__body">
        <div className="tmm-support__title">{title}</div>
        <p className="tmm-support__desc">{description}</p>
        {disabled ? (
          <span className="tmm-btn tmm-btn--sm tmm-btn--secondary" aria-disabled="true">
            {children}
          </span>
        ) : href ? (
          <a href={href} target="_blank" rel="noreferrer" className="tmm-btn tmm-btn--sm tmm-btn--secondary">
            {children}
          </a>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

/* ---------- Status / compatibility tags ---------- */

export type TagTone = 'success' | 'warning' | 'danger' | 'info';

export function Tag({ tone = 'info', children }: { tone?: TagTone; children: ReactNode }) {
  return <span className={`tmm-tag tmm-tag--${tone}`}>{children}</span>;
}

/* ---------- Toast ---------- */

export function Toast({
  message,
  onClose,
  closeLabel,
}: {
  message: string;
  onClose?: () => void;
  /** Accessible label for the close button; pass the localized string. */
  closeLabel?: string;
}) {
  return (
    <div className="tmm-toast" role="status">
      <span>{message}</span>
      {onClose ? (
        <button
          type="button"
          className="tmm-toast__close"
          onClick={onClose}
          aria-label={closeLabel}
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}

/* ---------- Modal ---------- */

export function Modal({
  open,
  title,
  onClose,
  actions,
  children,
}: {
  open: boolean;
  title?: string;
  onClose?: () => void;
  actions?: ReactNode;
  children: ReactNode;
}) {
  if (!open) {
    return null;
  }
  return (
    <div className="tmm-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="tmm-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        {title ? <h2 className="tmm-modal__title">{title}</h2> : null}
        <div className="tmm-modal__body">{children}</div>
        {actions ? <div className="tmm-modal__actions">{actions}</div> : null}
      </div>
    </div>
  );
}

/* ---------- Empty state ---------- */

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="tmm-empty">
      {icon ? (
        <span className="tmm-empty__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <div className="tmm-empty__title">{title}</div>
      {description ? <p className="tmm-empty__desc">{description}</p> : null}
      {action ? <div className="tmm-empty__action">{action}</div> : null}
    </div>
  );
}

/* ---------- Shared header ---------- */

export function Header({
  logo,
  onLogoClick,
  tagline,
  children,
  demoControls,
}: {
  logo: string;
  onLogoClick?: () => void;
  /** Optional tagline line shown under the brand row (approved header hierarchy). */
  tagline?: string;
  /** Language switch and any header controls (right slot of the brand row). */
  children?: ReactNode;
  /** Demo controls row (reset etc.), kept below the brand row. */
  demoControls?: ReactNode;
}) {
  return (
    <header className="tmm-header">
      <div className="tmm-header__top">
        <a
          className="tmm-header__logo"
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            onLogoClick?.();
          }}
        >
          {logo}
        </a>
        <div className="tmm-header__actions">{children}</div>
      </div>
      {tagline ? <p className="tmm-header__tagline">{tagline}</p> : null}
      {demoControls ? <div className="tmm-header__demo">{demoControls}</div> : null}
    </header>
  );
}

/* ---------- Segmented control (from the tmm-chip primitive) ---------- */

export function Segmented({
  label,
  selected,
  onChange,
  options,
}: {
  /** Accessible label for the group; pass the localized string. */
  label: string;
  /** Index of the currently selected option. */
  selected: number;
  onChange: (index: number) => void;
  options: { key: string; label: string }[];
}) {
  return (
    <div className="tmm-segmented" role="group" aria-label={label}>
      {options.map((option, i) => (
        <Chip key={option.key} selected={i === selected} onClick={() => onChange(i)}>
          {option.label}
        </Chip>
      ))}
    </div>
  );
}
