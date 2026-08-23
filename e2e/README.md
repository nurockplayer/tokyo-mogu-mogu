# Browser validation

The current browser merge gate is `current-mvp-smoke.spec.ts`.

It performs a small 375px Japanese smoke walk against current merged
Figma-complete behavior:

- Result → Story → Route → Spot;
- current Story/Route content and loading state;
- route save and Spot favorite controls;
- the 食旅を見つけ / モグモグる / お気に入り / マイ Dock destinations.

The smoke test validates the Product; it does not define Product behavior.
Current live KiKi Figma and current merged `main` remain the authorities.

`issue-276-netlify-parity.spec.ts` is a historical, non-gating record of the
superseded Netlify-era choreography. Do not update it or restore its selectors,
timing, accessible names, IA, or screen composition to satisfy current work.
