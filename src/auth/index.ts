/**
 * Public auth entry (Issue #21).
 *
 * Re-exports the shared model and the identity mapping / OAuth adapter so
 * downstream features (#22 session state, #23 sign-out) can consume one stable
 * surface: `import { AppUser, signInWithGoogle } from '../auth'`.
 */
export type { AppUser, AuthStatus, GoogleIdentity } from './model';
export {
  deriveUserId,
  findOrCreateUser,
  findUser,
  type UserStore,
} from './identity';
export { signInWithGoogle, type GoogleSignInResult } from './oauth';
