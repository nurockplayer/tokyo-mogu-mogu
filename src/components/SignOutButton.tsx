/**
 * SignOutButton — sign-out control (Issue #23).
 *
 * Renders a sign-out button backed by the shared sign-out seam in
 * `src/auth/signout.ts`. Uses the same two-step confirmation pattern as
 * DemoResetButton: the first click arms the confirm label, the second performs
 * the sign-out.
 *
 * Seam note for #22 (AuthProvider in flight, not on main yet): this component
 * consumes `useAuth()` only if it exists; since `src/auth/AuthProvider.tsx`
 * does not exist on current main, it uses the minimal prop interface
 * `{ onSignOut?: () => void | Promise<void> }` instead. When no override is
 * passed it defaults to the module-level `signOut()` from `src/auth/signout`,
 * which clears session state (unauthenticated transition) and best-effort
 * signs out of Google. #22's provider should wire `onSignOut` to its own
 * sign-out so the real persisted session is cleared.
 *
 * Failure surface: if the seam rejects, the button shows a recoverable,
 * token-free error (`authErrorRecoverable`) and a retry affordance
 * (`authRetry`). The raw error is never rendered.
 */
import { useState, type ReactNode } from 'react';
import { useI18n } from '../i18n';
import { signOut } from '../auth/signout';
import './SignOutButton.css';

export interface SignOutButtonProps {
  /** Optional override for the sign-out seam (#22 provider). */
  onSignOut?: () => void | Promise<void>;
}

type ButtonStatus =
  | { kind: 'idle' }
  | { kind: 'confirming' }
  | { kind: 'signing-out' }
  | { kind: 'error' };

export function SignOutButton({ onSignOut }: SignOutButtonProps) {
  const { t } = useI18n();
  const [status, setStatus] = useState<ButtonStatus>({ kind: 'idle' });

  const runSignOut = async () => {
    setStatus({ kind: 'signing-out' });
    try {
      if (onSignOut) {
        await onSignOut();
      } else {
        await signOut();
      }
      // Signed out. The auth provider (#22) flips the UI to unauthenticated;
      // this button simply returns to idle.
      setStatus({ kind: 'idle' });
    } catch {
      setStatus({ kind: 'error' });
    }
  };

  const handleClick = () => {
    if (status.kind === 'idle') {
      setStatus({ kind: 'confirming' });
      return;
    }
    if (status.kind === 'confirming' || status.kind === 'error') {
      void runSignOut();
    }
  };

  const label = status.kind === 'confirming' ? t('signOutConfirm') : t('signOut');

  let statusText: ReactNode = null;
  if (status.kind === 'signing-out') {
    statusText = <span className="sign-out-status">{t('signingOut')}</span>;
  } else if (status.kind === 'error') {
    statusText = (
      <span className="sign-out-status error" role="status" aria-live="polite">
        {t('authErrorRecoverable')}
      </span>
    );
  }

  return (
    <div className="sign-out">
      {statusText}
      <button
        type="button"
        className={`sign-out-btn${status.kind === 'confirming' ? ' confirming' : ''}`}
        onClick={handleClick}
        onBlur={() => {
          if (status.kind === 'confirming') {
            setStatus({ kind: 'idle' });
          }
        }}
        disabled={status.kind === 'signing-out'}
        aria-label={t('signOut')}
      >
        {status.kind === 'error' ? t('authRetry') : label}
      </button>
    </div>
  );
}
