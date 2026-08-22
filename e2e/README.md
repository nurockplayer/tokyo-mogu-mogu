# Browser acceptance authority

Issue #276 replaced the previous frontend choreography with the deployed
Netlify experience as the visible UX authority. The browser gate is therefore
`issue-276-netlify-parity.spec.ts`, which covers:

- the complete progressive Food Profile conversation and its exact delays;
- the reference Food Profile edit conversation and retained browser history;
- the authoritative five-step Exploration sequence;
- Result → Story → 2.2-second route generation → Route → Spot;
- named primary-action, focus, contrast, hit-target, and 375px overflow checks
  for Food Profile, every Exploration state, and the major screens in ja, en,
  and zh-TW;
- saved-route reload behavior and non-demo route delegation to the established
  Tokyo-wide data-backed pages;
- trace/video output and opt-in sequential screenshot evidence.

The removed pre-#276 browser specs asserted superseded question orders,
automatic-advance behavior, route identities, modal interaction models, and
screen composition. Durable data, persistence, i18n, and reusable Product
scope contracts continue to be covered by the Vitest suite.
