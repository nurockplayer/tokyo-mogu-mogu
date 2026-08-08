/**
 * AuthControl — mounts the authenticated/unauthenticated UI in the app header.
 *
 * Auth sequence integration: uses the shared `useAuth()` surface (#22) to show
 * either a sign-in button (unauthenticated) or the SignOutButton wired to the
 * provider's sign-out (#23 seam). While restoring, renders nothing (avoids a
 * flash of the wrong state). Sign-in copy uses the #12 i18n layer.
 */
import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useI18n } from '../i18n';
import { SignOutButton } from './SignOutButton';
import './AuthControl.css';

export function AuthControl() {
  const { t } = useI18n();
  const { status, user, signIn, signOut } = useAuth();
  const [signingIn, setSigningIn] = useState(false);

  if (status === 'restoring') {
    return null;
  }

  if (status === 'authenticated' && user) {
    return (
      <div className="auth-control">
        {user.avatarUrl ? (
          <img className="auth-avatar" src={user.avatarUrl} alt="" referrerPolicy="no-referrer" />
        ) : null}
        <span className="auth-name">{user.displayName || user.email}</span>
        <SignOutButton onSignOut={signOut} />
      </div>
    );
  }

  return (
    <div className="auth-control">
      <button
        type="button"
        className="auth-signin"
        onClick={() => {
          setSigningIn(true);
          void signIn().finally(() => setSigningIn(false));
        }}
        disabled={signingIn}
      >
        {signingIn ? t('signingIn') : t('signIn')}
      </button>
    </div>
  );
}
