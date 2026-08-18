import type { MapEntry } from './types';

/**
 * Machine-readable Figma surface → implementation → Issue map (Issue #233).
 *
 * This is the canonical tool data. The human-readable
 * `docs/design/figma-implementation-map.md` mirrors it, and
 * `map.test.ts` keeps the two in sync (node-id sets must match).
 *
 * Populated NOW from the acknowledged #234 audit baseline (main
 * 9948f714ba27aa60533cdaf6e641638026571a25). Statuses are the #233 enum.
 * Cross-cutting engineering deviations (no single Figma node) are listed with
 * `watched: false` and `nodeId: null`.
 */
export const IMPLEMENTATION_MAP: MapEntry[] = [
  {
    nodeId: '1:95',
    surface: 'Landing',
    journeyRole: 'Journey entry',
    implementation:
      'LandingPage + ReturningHome (src/pages/s0s3/LandingPage.tsx; mascot + 食旅をはじめる)',
    codeFiles: ['src/pages/s0s3/LandingPage.tsx'],
    issues: ['#201', '#217'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '2:245',
    surface: 'Food Profile welcome',
    journeyRole: 'Food-profile intro',
    implementation:
      'FoodProfilePage IntroCard (fpStartCta / fpBrowseCta)',
    codeFiles: ['src/pages/s0s3/FoodProfilePage.tsx'],
    issues: ['#201', '#217'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '2:312',
    surface: 'Nickname',
    journeyRole: 'Nickname step',
    implementation: 'FoodProfilePage NicknameStep',
    codeFiles: ['src/pages/s0s3/FoodProfilePage.tsx'],
    issues: ['#201', '#217'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '2:548',
    surface: 'Nickname',
    journeyRole: 'Nickname step',
    implementation: 'FoodProfilePage NicknameStep',
    codeFiles: ['src/pages/s0s3/FoodProfilePage.tsx'],
    issues: ['#201', '#217'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '2:623',
    surface: 'Food Profile interview Q1 (allergy)',
    journeyRole: 'Dietary interview step',
    implementation:
      'PHASE1_INTERVIEW (FoodProfilePage) + fpIvStep ({n}/{total}) + chips',
    codeFiles: ['src/pages/s0s3/FoodProfilePage.tsx', 'src/i18n/resources.ts'],
    issues: ['#201', '#217'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '3:854',
    surface: 'Food Profile interview Q2 (diet)',
    journeyRole: 'Dietary interview step',
    implementation:
      'PHASE1_INTERVIEW (FoodProfilePage) + fpIvStep ({n}/{total}) + chips',
    codeFiles: ['src/pages/s0s3/FoodProfilePage.tsx', 'src/i18n/resources.ts'],
    issues: ['#201', '#217'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '3:959',
    surface: 'Food Profile interview Q3 (religion)',
    journeyRole: 'Dietary interview step',
    implementation:
      'PHASE1_INTERVIEW (FoodProfilePage) + fpIvStep ({n}/{total}) + chips',
    codeFiles: ['src/pages/s0s3/FoodProfilePage.tsx', 'src/i18n/resources.ts'],
    issues: ['#201', '#217'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '3:1081',
    surface: 'Food Profile interview Q4 (dislikes)',
    journeyRole: 'Dietary interview step',
    implementation:
      'PHASE1_INTERVIEW (FoodProfilePage) + fpIvStep ({n}/{total}) + chips',
    codeFiles: ['src/pages/s0s3/FoodProfilePage.tsx', 'src/i18n/resources.ts'],
    issues: ['#201', '#217'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '3:1203',
    surface: 'Food Profile interview (additional node)',
    journeyRole: 'Dietary interview step',
    implementation:
      'PHASE1_INTERVIEW (FoodProfilePage) + fpIvStep ({n}/{total}) + chips',
    codeFiles: ['src/pages/s0s3/FoodProfilePage.tsx', 'src/i18n/resources.ts'],
    issues: ['#201', '#217'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '3:1702',
    surface: 'Food Profile summary',
    journeyRole: 'Summary + edit note',
    implementation: 'fpIvSummaryTitle + fpEditNote',
    codeFiles: ['src/pages/s0s3/FoodProfilePage.tsx'],
    issues: ['#201'],
    status: 'MATCH',
    watched: true,
    note: 'Minor copy delta B, non-blocking (#234 audit).',
  },
  {
    nodeId: '3:1835',
    surface: 'Post-profile fork',
    journeyRole: '食旅 fork',
    implementation: 'fpForkTitle / fpForkRecommend / fpForkBrowse',
    codeFiles: ['src/pages/s0s3/FoodProfilePage.tsx'],
    issues: ['#201'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '3:1952',
    surface: 'ReturningHome',
    journeyRole: 'Returning-visitor home + history',
    implementation:
      'ReturningHome (greeting + Let\'s Go! + HistorySection + bottom nav) — src/pages/s0s3/LandingPage.tsx, src/pages/s0s3/history-section.tsx',
    codeFiles: [
      'src/pages/s0s3/LandingPage.tsx',
      'src/pages/s0s3/history-section.tsx',
    ],
    issues: ['#201', '#92'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '4:2101',
    surface: 'Experience',
    journeyRole: 'Exploration Q1',
    implementation:
      'ExplorationWizardPage S2 Q1 (PHASE1_EXPERIENCES eat/buy/meet)',
    codeFiles: [
      'src/pages/s0s3/ExplorationWizardPage.tsx',
      'src/pages/s0s3/phase1-exploration.ts',
    ],
    issues: ['#201', '#217', '#230'],
    status: 'MATCH',
    watched: true,
    note: 'Flow convergence via #217.',
  },
  {
    nodeId: '8:2436',
    surface: 'Departure',
    journeyRole: 'Exploration Q2',
    implementation:
      'area chips + PHASE1_AREA_TRAVEL_PAIRS (search deferred)',
    codeFiles: [
      'src/pages/s0s3/ExplorationWizardPage.tsx',
      'src/pages/s0s3/phase1-exploration.ts',
    ],
    issues: ['#201', '#206', '#230'],
    status: 'MATCH',
    watched: true,
    note: 'Departure-point search deferred (#206).',
  },
  {
    nodeId: '23:3131',
    surface: 'Travel tolerance',
    journeyRole: 'Exploration Q3',
    implementation: 'ExplorationWizardPage S2 Q3',
    codeFiles: [
      'src/pages/s0s3/ExplorationWizardPage.tsx',
      'src/pages/s0s3/phase1-exploration.ts',
    ],
    issues: ['#201', '#206', '#230'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '23:3207',
    surface: 'Duration',
    journeyRole: 'Exploration Q4',
    implementation: 'ExplorationWizardPage S2 Q4',
    codeFiles: [
      'src/pages/s0s3/ExplorationWizardPage.tsx',
      'src/pages/s0s3/phase1-exploration.ts',
    ],
    issues: ['#201', '#206', '#230'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '23:3262',
    surface: 'Taste + Theme',
    journeyRole: 'Exploration Q5',
    implementation:
      'ExplorationWizardPage S2 Q5 (exSubStep 1/2・2/2, おまかせ)',
    codeFiles: [
      'src/pages/s0s3/ExplorationWizardPage.tsx',
      'src/pages/s0s3/phase1-exploration.ts',
    ],
    issues: ['#201', '#206', '#230'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '23:3380',
    surface: 'Result',
    journeyRole: 'Match result',
    implementation:
      'ResultPage (96%/91% + match + demo note + tags) — src/pages/s0s3/ResultPage.tsx',
    codeFiles: ['src/pages/s0s3/ResultPage.tsx'],
    issues: ['#201', '#217'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '52:3995',
    surface: 'Story',
    journeyRole: 'Story',
    implementation:
      'StoryPage (hero + sections 01-05 + MOGUMOGU ポイント + nearby) — src/pages/StoryPage.tsx',
    codeFiles: ['src/pages/StoryPage.tsx'],
    issues: ['#201', '#224'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '62:5023',
    surface: 'Story footer CTA',
    journeyRole: 'Story → Route CTA',
    implementation:
      's4CtaLabel ja/en/zh-TW (src/i18n/resources.ts) + StoryPage Section 7',
    codeFiles: ['src/i18n/resources.ts', 'src/pages/StoryPage.tsx'],
    issues: ['#235', '#236'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '52:4092',
    surface: 'Sticky story CTA',
    journeyRole: 'Demo convenience',
    implementation: 's4StickyCta わさびの旅を見る',
    codeFiles: ['src/i18n/resources.ts', 'src/pages/StoryPage.tsx'],
    issues: ['#232'],
    status: 'INTENTIONALLY_DIFFERENT',
    watched: true,
    note: 'PR #232 documented deviation 5.',
  },
  {
    nodeId: '55:4166',
    surface: 'Route',
    journeyRole: 'Route page',
    implementation: 'RoutePage (title + steps + bottom nav) — src/pages/RoutePage.tsx',
    codeFiles: ['src/pages/RoutePage.tsx'],
    issues: ['#201', '#92'],
    status: 'MATCH',
    watched: true,
  },
  {
    nodeId: '23:3621',
    surface: 'Route dialog CTA (reference)',
    journeyRole: 'Not implemented',
    implementation: '— (reference only, out of scope)',
    codeFiles: [],
    issues: [],
    status: 'INTENTIONALLY_DIFFERENT',
    watched: true,
    note: 'Out of scope for 8/23; kept as a watched reference node.',
  },
  {
    nodeId: '62:4620',
    surface: 'Spot category pills',
    journeyRole: 'Spot category treatment',
    implementation: 'SpotPage type pills/tag — src/pages/SpotPage.tsx',
    codeFiles: ['src/pages/SpotPage.tsx'],
    issues: ['#232', '#224'],
    status: 'INTENTIONALLY_DIFFERENT',
    watched: true,
    note: 'PR #232 documented deviation 4.',
  },
  {
    nodeId: null,
    surface: 'Prototype shell chrome',
    journeyRole: 'Prototype chrome',
    implementation: 'PrototypeShell compact header (locale + reset)',
    codeFiles: ['src/app/PrototypeShell.tsx'],
    issues: ['#232'],
    status: 'INTENTIONALLY_DIFFERENT',
    watched: false,
    note: 'PR #232 documented deviation 6.',
  },
  {
    nodeId: null,
    surface: 'Sequential chat model',
    journeyRole: 'Exploration / food-profile presentation',
    implementation:
      'LINE/ChatGPT sequential reveal + scroll — conversation.tsx scrollTurnIntoView',
    codeFiles: [
      'src/pages/s0s3/conversation.tsx',
      'src/pages/s0s3/ExplorationWizardPage.tsx',
      'src/pages/s0s3/FoodProfilePage.tsx',
    ],
    issues: ['#230', '#232'],
    status: 'INTENTIONALLY_DIFFERENT',
    watched: false,
    note: 'PR #232 documented deviation 1 (#230 contract).',
  },
  {
    nodeId: null,
    surface: 'No page-level 次へ',
    journeyRole: 'Exploration presentation',
    implementation: '#230 contract — exNext only on FP summary → fork',
    codeFiles: [
      'src/pages/s0s3/ExplorationWizardPage.tsx',
      'src/pages/s0s3/FoodProfilePage.tsx',
    ],
    issues: ['#230'],
    status: 'INTENTIONALLY_DIFFERENT',
    watched: false,
    note: 'PR #232 documented deviation 2.',
  },
  {
    nodeId: null,
    surface: 'Body font',
    journeyRole: 'Conversation typography',
    implementation: 'Zen Kaku Gothic New (CJK) — src/ui/tokens.css',
    codeFiles: ['src/ui/tokens.css'],
    issues: ['#232'],
    status: 'INTENTIONALLY_DIFFERENT',
    watched: false,
    note: 'PR #232 documented deviation 3.',
  },
  {
    nodeId: null,
    surface: 'Question text ink',
    journeyRole: 'FP / exploration question legibility',
    implementation: 'WCAG AA (ink, not white) — FoodProfilePage.css var(--tmm-color-ink)',
    codeFiles: ['src/pages/s0s3/FoodProfilePage.css'],
    issues: ['#232'],
    status: 'INTENTIONALLY_DIFFERENT',
    watched: false,
    note: 'PR #232 documented deviation 7 (accessibility).',
  },
  {
    nodeId: null,
    surface: 'Experience tile caption',
    journeyRole: 'Experience presentation',
    implementation: 'bottom caption (mobile legibility) — Experience tiles',
    codeFiles: [
      'src/pages/s0s3/ExplorationWizardPage.tsx',
      'src/pages/s0s3/figma-conversation-parity.css',
    ],
    issues: ['#232'],
    status: 'INTENTIONALLY_DIFFERENT',
    watched: false,
    note: 'PR #232 documented deviation 8.',
  },
];

const byNodeId = new Map<string, MapEntry>();
for (const entry of IMPLEMENTATION_MAP) {
  if (entry.nodeId !== null) {
    byNodeId.set(entry.nodeId, entry);
  }
}

/** Look up implementation/Issue metadata for a watched node id. */
export function lookupMapEntry(nodeId: string): MapEntry | null {
  return byNodeId.get(nodeId) ?? null;
}

/** All map entries that have a watched Figma node. */
export function watchedMapEntries(): MapEntry[] {
  return IMPLEMENTATION_MAP.filter((entry) => entry.watched && entry.nodeId !== null);
}
