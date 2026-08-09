/**
 * AppShell auth entry — contract test for the #77 regression fix.
 *
 * Vitest runs in a node environment (no DOM), so these tests assert the shell's
 * contract from source, following the same approach as `src/ui/ui.test.ts`:
 *   - the optional Google Auth entry stays mounted in the shell, so the existing
 *     sign-in / sign-out flow (AuthControl → useAuth) remains reachable
 *   - AuthControl is mounted only in the secondary demo controls row
 *     (`tmm-header__demo`), never in the approved brand + locale core header
 *     row (`tmm-header__top` / `tmm-header__actions`)
 *
 * This guards the two invariants that must both hold (Issue #77 / product
 * contract "Account / Persistence"): auth stays reachable, and auth controls
 * are not forced into the approved core header.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const shellSource = readFileSync(resolve(here, 'AppShell.tsx'), 'utf8');
const authControlSource = readFileSync(resolve(here, '..', 'components', 'AuthControl.tsx'), 'utf8');

describe('AppShell auth entry (Issue #77 regression fix)', () => {
  it('mounts AuthControl so sign-in / sign-out stay reachable', () => {
    expect(shellSource).toMatch(
      /import\s*\{[^}]*\bAuthControl\b[^}]*\}\s*from\s*'\.\.\/components\/AuthControl'/,
    );
    expect(shellSource).toMatch(/<AuthControl\s*\/>/);
  });

  it('keeps AuthControl out of the approved brand + locale core header row', () => {
    // The core header is the `tmm-header__top` region ending before the tagline.
    const coreHeaderRegion = shellSource.slice(
      shellSource.indexOf('tmm-header__top'),
      shellSource.indexOf('tmm-header__tagline'),
    );
    expect(coreHeaderRegion).not.toMatch(/<AuthControl/);
    // AuthControl mounts in the secondary demo controls row instead.
    expect(shellSource).toMatch(/tmm-header__demo[\s\S]*?<AuthControl\s*\/>/);
  });

  it('AuthControl exposes both sign-in and sign-out surfaces', () => {
    // Unauthenticated → sign-in button; authenticated → SignOutButton.
    expect(authControlSource).toMatch(/t\('signIn'\)/);
    expect(authControlSource).toMatch(/<SignOutButton/);
    expect(authControlSource).toMatch(/useAuth\(\)/);
  });
});
