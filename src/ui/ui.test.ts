/**
 * Shared UI foundation — contract tests (Issue #42).
 *
 * Vitest runs in a node environment (no DOM), so these tests assert the
 * foundation's durable contract from source rather than rendering:
 *   - every design token variable referenced by ui.css is defined in tokens.css
 *   - every `tmm-*` class used by the React primitives is defined in ui.css
 *   - the component surface exports the expected primitive names
 *
 * This guards against a child Issue adding a primitive or token that silently
 * references an undefined class / variable.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as ui from './index';

const here = dirname(fileURLToPath(import.meta.url));
const tokensCss = readFileSync(resolve(here, 'tokens.css'), 'utf8');
const uiCss = readFileSync(resolve(here, 'ui.css'), 'utf8');
const uiSource = readFileSync(resolve(here, 'index.tsx'), 'utf8');

describe('design tokens (#42)', () => {
  it('defines the required palette, spacing, and layout tokens', () => {
    const required = [
      '--tmm-color-forest',
      '--tmm-color-leaf',
      '--tmm-color-warm',
      '--tmm-color-ink',
      '--tmm-color-orange',
      '--tmm-font-display',
      '--tmm-font-body',
      '--tmm-tap-min',
      '--tmm-content-max',
      '--tmm-radius-md',
      '--tmm-radius-pill',
    ];
    for (const token of required) {
      expect(tokensCss, `missing token ${token}`).toContain(token);
    }
  });

  it('defines every token variable referenced by ui.css', () => {
    const referenced = new Set<string>();
    const varRe = /var\((--tmm-[a-z0-9-]+)/g;
    for (const match of uiCss.matchAll(varRe)) {
      referenced.add(match[1]);
    }
    for (const token of referenced) {
      expect(tokensCss, `ui.css references undefined token ${token}`).toContain(token);
    }
    // Sanity: ui.css actually references tokens.
    expect(referenced.size).toBeGreaterThan(20);
  });
});

describe('shared UI classes (#42)', () => {
  it('defines every tmm-* class used by the component primitives', () => {
    // Collect every className value (string or template literal), then strip
    // interpolations so `tmm-btn--${variant}` reduces to the base `tmm-btn`.
    const rawValues = [...uiSource.matchAll(/className=(?:"([^"]*)"|`([^`]*)`)/g)]
      .map((m) => m[1] ?? m[2])
      .join(' ');
    const cleaned = rawValues.replace(/\$\{[^}]*\}/g, ' ');
    const used = new Set<string>(
      (cleaned.match(/\btmm-[a-z0-9-_]+/g) ?? []).map((t) => t.replace(/-+$/, '')),
    );
    for (const cls of used) {
      expect(uiCss, `component uses undefined class .${cls}`).toContain(`.${cls}`);
    }
    expect(used.size).toBeGreaterThan(15);
  });

  it('includes the header and interactive primitive classes', () => {
    for (const cls of [
      '.tmm-header',
      '.tmm-header__logo',
      '.tmm-header__tagline',
      '.tmm-header__demo',
      '.tmm-locale-toggle',
      '.tmm-nav__link',
      '.tmm-segmented',
      '.tmm-btn',
      '.tmm-chip',
      '.tmm-progress__bar',
      '.tmm-route-step',
      '.tmm-info-list',
      '.tmm-support',
      '.tmm-tag',
      '.tmm-toast',
      '.tmm-modal',
      '.tmm-empty',
    ]) {
      expect(uiCss).toContain(cls);
    }
  });
});

describe('interactive tap-target contract (#82)', () => {
  it('keeps every interactive control height >= the 44px tap minimum', () => {
    // All interactive min-height declarations must be at least 44px
    // (--tmm-tap-min). No button/control may regress below it.
    const minHeights = [...uiCss.matchAll(/\.([a-z0-9-_]+)\s*\{[^}]*min-height:\s*([0-9.]+)px/g)]
      .map((m) => ({ cls: m[1], px: Number(m[2]) }))
      .filter(({ cls }) => /btn|chip|nav|link|toggle/.test(cls));
    for (const { cls, px } of minHeights) {
      expect(px, `control .${cls} below 44px tap target`).toBeGreaterThanOrEqual(44);
    }
  });

  it('defines tmm-btn--sm with min-height >= 44px', () => {
    const start = uiCss.indexOf('.tmm-btn--sm');
    const smBlock = uiCss.slice(start, start + 260);
    expect(smBlock).toMatch(/min-height:\s*(var\(--tmm-tap-min\)|4[4-9]px|[5-9][0-9]px)/);
    expect(smBlock).not.toMatch(/min-height:\s*3[0-9]px/);
  });
});

describe('component surface (#42)', () => {
  it('exports the expected primitive components', () => {
    const expected = [
      'Button',
      'ButtonLink',
      'Chip',
      'ProgressBar',
      'StepDots',
      'Card',
      'StorySection',
      'RouteStep',
      'Mobility',
      'InfoList',
      'SupportAction',
      'Tag',
      'Toast',
      'Modal',
      'EmptyState',
      'Header',
      'Segmented',
    ];
    for (const name of expected) {
      expect(ui, `missing export ${name}`).toHaveProperty(name);
    }
  });

  it('supports optional numbering through the shared StorySection primitive', () => {
    expect(uiSource).toContain('number?: number');
    expect(uiSource).toContain('tmm-story-section__num');
    expect(uiCss).toContain('.tmm-story-section__num');
  });
});
