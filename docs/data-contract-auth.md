# Shared Data Contract — Auth Sequence (Issues #21, #22, #23)

> **Status note (Issue #41, superseded by #112 / #92)**: Google Auth is
> **reusable infrastructure**, not a requirement of the current hackathon core
> journey. The current product contract
> (Issue #112 Product/MVP framing + Issue #92 App IA) lives at
> `docs/specs/product/hackathon-product-contract.md`. Keep this auth
> implementation working, but do not force auth controls into the approved
> header UI.

Google authentication built on the merged SDD/Auth spec (#20), app shell (#14),
i18n (#12), and config (#13). Read the spec FIRST:
`docs/specs/authentication/google-login.md` — it is the durable behavior
contract. Do NOT implement behavior outside it.

## Repo state / relevant merged foundations

- `src/config` (#13): `config.googleClientId` (public Google OAuth client id,
  empty string when unset). Do not create a competing env system.
- `src/app` (#14): `AppProviders` mounts `I18nProvider`, `CollectionProvider`,
  and an `AuthProvider` SLOT (currently identity wrapper). #22 should integrate
  auth state here via `AppProviders`.
- `src/i18n` (#12): public entry `src/i18n` — `useI18n`, `t(key)` with fallback,
  `formatDate`/`formatNumber`. Append new keys to BOTH locale blocks in
  `src/i18n/resources.ts`.
- Existing `src/lib/*` modules are pure helpers (geo, checkin, progression,
  map-links, gtfs) — follow that pattern for auth logic.

## Dependency order (sequential, NOT parallel)

- **#21 first.** It owns the Google identity → application-user mapping,
  provisioning, and canonical `userId`.
- **#22 after #21.** Restores the session on reload and exposes the shared
  auth-state surface; consumes #21's identity mapping and #14's provider mount.
- **#23 after #21** (may run in parallel with #22 only after #21 merges).
  Sign-out + OAuth failure recovery.

Do NOT dispatch #22/#23 until #21 is merged and its public API is known.

## #21 file ownership (create/edit ONLY these)

- `src/auth/` (new) — auth domain module:
  - `src/auth/model.ts` — types: `AppUser { userId: string; email: string;
    displayName: string; avatarUrl: string }`, `AuthStatus` (unauthenticated /
    authenticating / authenticated / error), and a `GoogleIdentity`
    { email, googleId, displayName, avatarUrl } carrier.
  - `src/auth/identity.ts` — pure functions: `hashGoogleIdentity` or
    deterministic `userId` derivation, `provisionUser(store, googleIdentity)`
    (first-login creates exactly one user; repeat login reuses the same
    `userId` — NO duplicates), `findOrCreateUser`. Unit-testable, no DOM.
  - `src/auth/identity.test.ts` — first-login / repeat-login / identity
    mapping tests (acceptance-criteria tests live here).
  - `src/auth/oauth.ts` — thin Google Sign-In adapter: `initGoogleOAuth()`,
    `signInWithGoogle()` (returns `GoogleIdentity` or a typed
    `{ cancelled } | { error }`). Use the Google Identity Services GIS
    (`https://accounts.google.com/gsi/client`) or `@react-oauth/google` —
    your choice, keep it minimal. Reads client id from `config.googleClientId`.
  - `src/auth/index.ts` — public entry re-exporting model/identity/oauth.
- `src/config/env.ts` + `.env.example` — ADD `VITE_GOOGLE_CLIENT_ID` to the
  env keys + example (you own the config file only for this addition; #13
  already defined the pattern).
- `package.json`/`pnpm-lock.yaml` — only to add the GIS adapter dependency if
  you choose a package (prefer the plain GIS script to avoid deps).

NEVER touch: `src/app/*` (owned by #22 for auth), `src/i18n/*`, `src/store/*`,
`src/pages/*`, `src/lib/*`, `src/data/*`, `src/styles.css`, `.github/`,
`AGENTS.md`, `CLAUDE.md`, `docs/specs/*`.

### Key contract for #21

- `userId` is the canonical domain identifier. Derive it deterministically from
  the Google identity (e.g. hash of googleId) so repeat login resolves to the
  same `userId`. Email/googleId are NEVER foreign keys for domain data — they
  are lookup keys for provisioning only.
- In-memory user store is fine for the MVP (no backend): a module-level Map
  keyed by googleId → AppUser, with `findOrCreateUser(identity)` guaranteeing
  one user per Google identity. Persistence across reloads is #22's job.
- `signInWithGoogle()` returns the identity WITHOUT leaking raw tokens/credentials
  to feature code.
- OAuth cancel/failure returns a typed result — no partial user created
  (provisioning only happens AFTER a successful OAuth response).

## #22 file ownership (dispatch AFTER #21 merged)

- `src/auth/session.ts` — session persistence (localStorage), restore logic.
- `src/auth/AuthProvider.tsx` — real auth state provider; exposes `useAuth()`
  → `{ status, user, signIn, signOut }`. signOut delegate may be a stub that
  calls into #23's API if present, or a minimal local clear — do NOT implement
  the full sign-out lifecycle here.
- `src/app/AppProviders.tsx` — mount `AuthProvider` (replaces the identity slot).
- You may READ `src/auth/oauth.ts` but must NOT edit it (owned by #23).
- Do NOT create a second app root/router.
- Requires #21's `src/auth/index.ts` public entry: `signInWithGoogle`,
  `deriveUserId`, `findOrCreateUser`, `findUser`, `UserStore`, `AppUser`,
  `GoogleIdentity`.

## #23 file ownership (dispatch AFTER #21 merged; may run parallel with #22)

- `src/auth/signout.ts` — sign-out logic + state teardown.
- `src/auth/oauth.ts` — EXTEND (you own it alongside #21's base) with
  cancellation/failure recovery helpers; keep existing exports intact.
- `src/auth/signout.test.ts` — sign-out / cancel / partial-user-prevention tests.
- `src/components/SignOutButton.tsx` + `.css` — sign-out UI (new).
- `src/i18n/resources.ts` — append sign-out / auth-error keys to both blocks.
- Do NOT touch `src/auth/session.ts` or `src/auth/AuthProvider.tsx` (owned by #22).
- Requires #21's `src/auth/index.ts` public entry (same as above).

## i18n

Append user-facing auth copy to BOTH `ja` and `en` blocks in
`src/i18n/resources.ts` (e.g. sign-in / sign-out / auth-error keys). #21's
OAuth UI copy belongs to the feature that renders it — keep the auth module
itself free of UI strings.

## Validation (required before finishing)

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test        # existing 86 tests + new auth tests stay green
pnpm build
```

Report each tail.

## Git & PR

- Isolated worktree; verify branch. Commit `feat: ... (#21|#22|#23)` +
  Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>. Push `-u origin`.
- PR: `gh pr create --base main --head <branch> --title "..." --body $'Closes #<n>\n...'`
  + Co-Authored-By trailer. Never push to main, never force-push.
- #21's PR body must note that #22/#23 build on its public API.

## Report back

Branch, PR URL, files changed, validation tails, residual risks.
