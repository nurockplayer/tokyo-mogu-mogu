# Google Login — Spec / Google ログイン仕様

Status: adopted (SDD foundation: #20).
Enables: #11 Google authentication and user identity foundation.

## Goal / 目的

Fix the durable product and system contract for Google authentication in Tokyo
Mogu Mogu before any auth implementation. The contract lets the child
implementation Issues (#21, #22, #23) build one consistent identity foundation
without repeating durable behavior.

## Contract / 契約

1. One Google identity maps to exactly one application user.
2. Inside the application, a stable internal `userId` is the canonical
   identifier for a user.
3. Email address and Google provider ID are **not** foreign keys for domain
   data (collections, favorites, stories, etc.). Domain data references users
   only by internal `userId`.
4. First login creates the required user identity (including the internal
   `userId`) when it does not already exist.
5. Repeated login of the same Google identity never creates a duplicate
   application user; it resolves to the existing identity.
6. A successful login provides a reusable authenticated state that any feature
   can consume.
7. A valid session restores after a page reload; authenticated state is
   reconstructed from the persisted session, not lost.
8. Sign-out returns the application to an unauthenticated state.
9. The current-user surface exposes at minimum: email, display name, and avatar.

## Failure Behavior / 障害時動作

- OAuth cancellation or failure leaves **no partial user**: no user record and
  no half-created identity state is persisted, and the application returns to a
  safe unauthenticated state.
- Auth failures are recoverable: the user can attempt sign-in again without
  manual cleanup.

## Out of Scope / 対象外

- Google OAuth implementation
- Auth UI implementation
- User database implementation
- Apple / LINE / GitHub or other OAuth providers
- Account linking / merge
- Profile editing, roles, permissions, account settings
- Collection / favorites data synchronization logic

## Verification / 検証

Durable behavior defined here is verified at the feature level (see #11
"Feature Closure Criteria") and in each implementation Issue:

- One Google identity ↔ one internal `userId`; repeat login creates no duplicate.
- A valid session survives reload; sign-out returns to an unauthenticated state.
- OAuth cancel / failure leaves no partial user and recovers to a safe
  unauthenticated state.
- The current-user surface exposes email / displayName / avatar.
- No implementation silently expands or contradicts this Spec.
