# Live KiKi Figma Engineering Design System

Status: **canonical engineering baseline for the inspected mobile journey**
Live source inspected: 2026-08-22
Issue: #263
Downstream implementation: #262

This document turns repeated visual decisions in the live KiKi Figma into an
engineering contract. It is not evidence that any current screen already
matches Figma, and it does not authorize the screen-by-screen convergence owned
by #262.

## 1. Authority and scope

Use this order when resolving Product, UI, interaction, and runtime questions:

1. the currently connected **live KiKi Figma**, inspected directly through the
   local Hopp `figma-bridge`;
2. current merged `main`;
3. `docs/specs/product/hackathon-product-contract.md`.

Figma establishes visible design and interaction intent; it cannot override
evidence/provenance, factual-verification, dietary/safety, or durable Product
scope constraints. This extracted cross-screen contract follows the three
sources above; `src/ui/tokens.css` and `src/ui/ui.css` are implementation roles,
`docs/specs/product/approved-ui-fidelity.md` is historical context only, and
existing runtime CSS is not design proof. Historical Issue #255 / Top-3
material is not current authority.

Issue #201 limits the inspected flow to proposal-prototype presentation. Issue
#208 permits responsive, i18n, accessibility, and technically safe adaptations
that preserve design intent. Product contracts always override presentation
fixtures: visual fidelity must not restore obsolete behavior or data.

The Product remains Tokyo-wide, multi-region × multi-food-culture, for both
Japanese and international travelers. Okutama × Tokyo Wasabi is the 8/23 demo
golden path, not a reusable component or schema boundary.

### Inspection evidence

The live file was read through the local Figma bridge after the hosted Starter
quota was exhausted. The inspection was read-only. The file exposes no local
paint, text, effect, grid styles, or variable collections; all values below were
therefore measured from nodes rather than inferred from named Figma tokens.

| Surface | Live nodes inspected | Source frame |
|---|---|---:|
| Landing | `1:95` `welcome(CTA)` | 390 × 844 |
| Food Profile | `2:245`, `2:312`, `2:383`, `2:548`, `2:623`, `3:854`, `3:959`, `3:1081`, `3:1203`, `3:1320`, `3:1500`, `3:1599`, `3:1702`, `3:1835`, `3:772` | 390 × 844 |
| Exploration | `4:2101`, `8:2436`, `23:3131`, `23:3207`, `23:3262` | 390 × 844–1039 |
| Result | `23:3380` | 390 × 1346 |
| Story | `52:3995` | 390 × 2089 |
| Route | `119:681`; saved-state strip `122:889` | 390 × 1716; 390 × 73 |
| Spot | `125:1752` | 390 × 1107 |
| Bottom navigation | `1:23` | 390 × 84 |

Nested shared-chrome evidence was inspected in addition to those roots. The six
journey trackers are `23:3706`, `128:2163`, `23:3630`, `23:3730`, `23:3778`,
and `23:3826`; the sticky Story, Route, and saved-state surfaces are `62:5021`,
`119:838`, and `122:889` respectively.

The intermediate Food Profile states are material evidence: they establish
completed versus active bubbles, user replies, chips, modal/input treatment,
action sizing, long-copy growth, and the transition into free exploration. The
system is not inferred from one showcase screen.

## 2. Color and interaction tokens

### Canonical roles

The `source` column records the live value. The `engineering` column is the
shipping value or rule after #208 accessibility adaptation.

| Role / CSS token | Live source | Engineering contract | Use |
|---|---:|---:|---|
| Warm canvas `--tmm-color-warm` | `#FFF4E4` | `#FFF4E4` | Conversation and exploration ground |
| Card/surface `--tmm-color-card` | `#FFFFFF` | `#FFFFFF` | Cards, user bubbles, modal, nav |
| Primary ink `--tmm-color-ink` | `#222222` | `#222222` | Default text |
| Secondary ink `--tmm-color-ink-soft` | `#5D5D5D` | `#5D5D5D` | Story/route supporting copy on white |
| Forest visual `--tmm-color-forest-visual` | `#667A47` / `#667A48` | `#667A47` | Exact header/fill/active-nav source role |
| Semantic forest `--tmm-color-forest` / `--tmm-color-forest-ink` | `#667A47` | `#61733F` | Safe shared default, including normal text on `#FFF4E4` |
| Selected `--tmm-color-selection` | `#667F37` | `#667F37` | Selected chips/options; retain a non-color indicator |
| Leaf surface `--tmm-color-leaf` | `#9DBC64` | `#9DBC64` + dark text | Dominant assistant bubble, journey tracker, sticky action/footer |
| Multi-select panel `--tmm-color-multi-select-panel` | `#B1CF7A` | `#B1CF7A` + dark text | Large Food Profile allergy/religion/dislikes panel with embedded choices/send |
| Experience field `--tmm-color-feature-field` | `#B2D083` | `#B2D083` | Lower illustration field on five experience cards |
| Taste/Theme panel `--tmm-color-choice-panel` | `#F5EEDB` at 80% | `rgb(245 238 219 / 80%)` | Group surface behind each chip set |
| Raw orange `--tmm-color-orange-visual` | `#E9811D` | same fill + dark ink | Food Profile action/source-orange role |
| Strong raw orange `--tmm-color-orange-strong-visual` | `#FF8313` | same fill + dark ink | Story/Route high-emphasis action source role |
| Compatibility orange `--tmm-color-orange` | absent | `#C44A2C` | Existing white-text/focus fallback; not canonical live action fill |
| Route secondary `--tmm-color-route-secondary-visual` | `#85A053` | same fill + dark ink | Route-regenerate control only; do not generalize |
| Danger visual `--tmm-color-danger-visual` | `#FF5A5A` | graphical accent; accessible semantic danger for text | Warning/location icons and short warning label |
| Input surface `--tmm-color-input` | `#ECECEC` | `#ECECEC` | Modal/text-input well |
| Info surface `--tmm-color-info-surface` | `#F4FAEA` | `#F4FAEA` | Quiet information/warning panel |
| Modal scrim `--tmm-color-modal-scrim` | `#888888` at 69% | `rgb(136 136 136 / 69%)` | Blocking Food Profile modal overlay |
| Nav rule `--tmm-color-nav-line` | `#EFEFEF` | `#EFEFEF` | Bottom-nav top border |
| Nav inactive source `--tmm-color-nav-inactive-source` | `#CEE3A8` | `--tmm-color-ink-faint` (`#6B6350`) | Source-only color; do not use for essential text on white |

`#F2F2F7` and SF Pro in the 48px status bar belong to iOS prototype chrome,
not the Product palette. `#E07D23` is embedded in the MOGU artwork and is not a
general UI-action token. Spot tag colors (`#A6C477`, `#FFA14C`, `#65A4FF`, and
`#FF8A8A`) are semantic content variants; keep their labels and do not promote
them into unlabeled global states.

Representative role evidence includes Taste/Theme panels `23:3375` and
`23:3376`, Route-regenerate control `125:1421`, and repeated `#FF5A5A`
warning/location marks. Their proximity to the main green/orange families is
not sufficient reason to merge roles that differ by component and semantics.

### Contrast and interaction states

- White on the exact Figma forest is 4.73:1 and passes WCAG AA. The shared
  semantic forest is the slightly darker `#61733F` so the same token also stays
  AA on the cream canvas (4.79:1); use `--tmm-color-forest-visual` only where
  the measured fill is explicitly required.
- White on leaf is 2.14:1 and white on the multi-select green is 1.74:1.
  Shipping assistant/multi-select panels use dark ink, or an equivalently
  verified accessible treatment, while retaining their source fills.
- White on the live oranges ranges from 2.31:1 to 2.75:1, while dark ink on
  those same fills ranges from 5.78:1 to 6.88:1. The smallest supported #208
  adaptation is therefore the live fill plus dark text. `#C44A2C` remains an
  existing AA fallback when white text is required, not an extracted or
  mandatory KiKi action color; a broader fill change needs Design approval.
- White on the Route secondary green is 2.94:1; dark ink is 5.42:1. `#FF5A5A`
  is 3.06:1 on white and may mark a sufficiently large graphical object, but
  normal-size warning text uses the accessible semantic danger role.
- The Figma inactive-nav green is 1.38:1 on white. Use accessible muted ink for
  labels/icons and keep active state distinguishable by more than color.
- Unselected controls use white surfaces. Selected controls use the selection
  green plus a check, outline, weight, or `aria-pressed` state. Disabled state
  must not rely on opacity alone when its availability matters.
- Hover, keyboard focus, validation error, loading, and disabled states are not
  authored comprehensively in Figma. Existing visible focus (`3px`, 2px offset),
  minimum targets, and semantic labels are required #208 adaptations.

## 3. Typography

Roboto is the dominant live family (277 inspected text nodes across 26 source
frames). SF Pro appears only in iOS status bars. `Rounded Mplus 1c Bold` appears
only on the Landing tagline/CTA and Exploration experience-card titles, so it is
an accent family rather than the default display family. Serif headings in the
old repository abstraction are not supported by this live Figma.

Engineering stacks:

```css
--tmm-font-body: 'Roboto', 'Zen Kaku Gothic New', 'Hiragino Sans', system-ui, sans-serif;
--tmm-font-display: var(--tmm-font-body);
--tmm-font-accent-rounded: 'M PLUS Rounded 1c', var(--tmm-font-body);
```

Roboto provides the Latin metrics; the CJK fallback must remain loaded for
Japanese and Traditional Chinese glyph coverage. Do not force a substitute
font to imitate Figma by squeezing or scaling text.

| Role | Family / weight | Size / line height | Evidence and rule |
|---|---|---:|---|
| Body, controls, chat | Roboto 400 | 16 / 22 | Dominant live combination (104 nodes) |
| Screen/header title | Roboto 600 | 20 / 29 | Green app header and screen titles |
| Hero/question | Roboto 800 | 20 / 29 | Exploration prompts |
| Choice label | Roboto 500 | 16 / 29 | Exploration option cards |
| Story section heading | Roboto 800 | 22 / 26 | Long-form Story hierarchy |
| Route/Spot item title | Roboto 600 | 18 / 29 | Dense content hierarchy |
| Spot page title | Roboto 600 | 24 / 29 | Single highest text title |
| Compact body | Roboto 400/500 | 14 / 20–22 | Story and practical information |
| Metadata / nav label | Roboto 400/500 | 12 / 16–18 | Cards, chips, nav |
| Accent title | M PLUS Rounded 1c 700 | 16 or 20 / 29 | Landing and experience cards only |
| Device status | SF Pro 590 | 17 / 22 | Prototype chrome; do not reproduce in app UI |

Canonical shared sizes are 12, 14, 16, 18, 20, 22, and 24px. A 29px line box
is intentional for prominent mobile controls/headings, not evidence that every
16px label needs that line height. Mixed-weight text nodes may preserve emphasis
inside one sentence.

## 4. Spacing, gutters, and vertical rhythm

The underlying rhythm is primarily a 4px grid with repeated 8, 12, 16, 20, 24,
32, and 40px steps. A repeated 10px chip-wrap/input gap is a deliberate named
exception rather than a new general scale step. Figma uses 12px internal padding
on bubbles/cards most often, 8px for compact groups, 16px for shell edges, and
24/32px for section separation.

- **Base shell gutter:** 16px. At 390px it leaves a 358px content span; at the
  engineering 375px baseline it leaves 343px.
- **Conversation alignment:** avatar starts at x=18 and is 50 × 50; assistant
  content begins around x=86/87. User bubbles align to the right. Transcript
  rows normally separate by 24–29px and grow with copy.
- **Centered choice columns:** Experience uses about 279px; Duration/Tolerance
  use 280px. Center these with fluid max-width, never fixed page offsets.
- **Surface-specific insets:** Result cards use x=20 (350px at 390), Story main
  content x=18 (354px), Route map/info x=14 (362px), Spot sections x=22
  (347px), and Taste + Theme x=17 (356px). These are intentional composition
  insets, not five competing global gutters.
- **Vertical layout:** use content-driven height and the repeated spacing scale.
  The 844/944/1039/etc. Figma heights are captured scroll states, not fixed CSS
  heights.

Shared spacing tokens use 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40px plus the named
10px chip gap. One-off asset alignment and optical offsets may differ, but new
component gaps should not introduce near-duplicates without a measured reason.

## 5. Borders, radii, and shadows

### Radius roles

| Role | Radius | Examples |
|---|---:|---|
| Utility/small | 8px | Modal, map info, compact service CTA, gallery tiles |
| Standard surface | 12px | Buttons, cards, inputs, choices, Story CTA |
| Feature choice | 18px | Illustrated Exploration experience cards |
| Pill | 100px in Figma; `999px` in CSS | Chips, Landing CTA, paired Back/Next controls |
| Bubble tail | asymmetric 0/10/10/10 or 10/0/10/10 | Assistant/user conversation bubbles |

The many 2.5/4.3px radii belong to vector icon geometry and are not reusable UI
tokens. Default cards are predominantly flat white; do not apply the legacy
generic card shadow to every live-Figma surface.

### Border roles

- Default flat cards generally have no visible border.
- Unselected choice cards use a 2px white border over the illustrated ground;
  selected experience cards use a 2px forest border.
- Secondary action buttons use a 1px forest border.
- Result metadata pills use a 0.5px forest border and are informational, not
  22px-tall interactive targets.
- Bottom navigation uses a 1px `#EFEFEF` top rule.

### Elevation roles

| Token / role | Live shadow |
|---|---|
| Landing tactile CTA | `0 4px 0 #3A5509` |
| Green Back / secondary tactile action | `0 4px 0 #667A47` |
| Orange Next tactile action | `0 4px 0 #AF7034` |
| Selected compact choice | `0 2px 4px #BCBAB5` |
| Selected experience card | `0 3px 7px #A7A190` |
| Modal | `0 4px 10px rgb(0 0 0 / 25%)` |
| Map information overlay | `0 2px 6px rgb(0 0 0 / 14%)` |
| Sticky Story/Route/saved footer | `0 -1px 4px #888B85` |

Use these by component role. They are not interchangeable `card` and `lift`
levels. A hard zero-blur shadow is part of the tactile-button language; a soft
shadow is reserved for selected/overlaid surfaces.

## 6. Component visual contracts

### Buttons

- Minimum interactive target is 44 × 44px. Figma button heights cluster at 45,
  46, 49, and 54px; wrapped copy may increase height (the Food Profile fork
  primary reaches 76px).
- Landing CTA: 180 × 54, pill, forest fill, hard green shadow, rounded accent
  label at 20px.
- Food Profile send/confirm: fluid 249–264px × 46px, 12px radius, orange role.
  Welcome/modal primary actions are 54px high.
- Exploration navigation: a centered 156 × 114 vertical stack: Next (156 × 45)
  first, then a 24px gap, then Back (156 × 45). Back is leaf green with a green
  hard shadow; Next is strong orange with a brown hard shadow. Preserve this
  composition at 375px; cap width to available space instead of making a row.
- Story CTA: 280 × 49, 12px radius. Route/Spot actions use the denser 8/12px
  contextual radius where shown.
- Labels wrap naturally in ja/en/zh-TW; no fixed height may clip a second line.

### Chips and choice cards

- Selection chips are content-width, approximately 46px high, and pill-shaped.
  Unselected is white/dark ink; selected is `#667F37`/white in Figma, with an
  engineering non-color indicator.
- Duration/Tolerance choices are centered 280px surfaces with 12px radius.
  Unselected is translucent white with a 2px white edge; selected is forest,
  about 45px high, with the compact selected shadow.
- Experience choices are roughly 133 × 166px, radius 18, with a title area and
  a clipped `#B2D083` lower illustration field. The selected state adds a 2px
  forest border and the selected-experience shadow.
- Taste and Theme each sit in a 356px, radius-12 `#F5EEDB`/80% panel with 12px
  padding/gaps. At 375px the panel becomes the available `viewport - 34px`.
- Small category/match pills (22–35px high in Figma) are display tags. If they
  become actionable, their hit area must expand to at least 44px.

### Inputs and modal

- Food Profile modal: width 307px capped by `viewport - 32px`, radius 8,
  26px vertical / 22px horizontal padding, 20px main gap, and the modal shadow.
- Scrim: `rgb(136 136 136 / 69%)`.
- Input well: full-width, 46px minimum height, 12px radius, `#ECECEC`, 12px
  inline padding, 16/22 text. Visible focus and programmatic label are required.
- Modal action: full-width, 54px minimum height, 12px radius.
- Error/help text must add layout height; it must not overlay the field.

### Cards

- Standard cards use a white surface and 12px radius. Border and shadow are
  opt-in roles, not defaults.
- Result source card: 350px wide at 390, 12px radius, clipped media, and a
  content stack below. Its visible structure is current live-Figma presentation
  evidence; the displayed 96/91 indicators remain non-semantic fixtures.
- Story carousel card: 220 × 316 with 196 × 196 visible square media. Long
  Story chapter cards are about 325 × 438 with a 1px leaf border.
- Route stop card: about 340 × 110, 12px radius, with a 78 × 78 circular crop.
- Map overlay: 362 × 66, 8px radius, white with the map-overlay shadow.

### Conversation bubbles

- Assistant bubble: left aligned after the 50px avatar; 12px padding; radius
  `0 10px 10px 10px`; regular 16/22 text. `#9DBC64` is the standard assistant
  surface, including current nickname (`2:380`) and Diet (`3:1062`)
  interactions; it is not a completed/current lifecycle code.
- `#B1CF7A` is limited to the large active Food Profile allergy, religion, and
  dislikes panels (`2:727`, `3:1262`, `3:1559`) that embed multi-select chips
  plus a send action. Preserve it as a component variant, not a generic
  current-question color.
- User bubble: right aligned; white; radius `10px 0 10px 10px`; 12px padding;
  dark 16/22 text.
- Action bubble: white with the user-tail radius; approximately 20px vertical /
  29px horizontal padding and a 16px internal stack gap.
- Bubbles size to content within available width. Preserve the tail side in RTL
  only if RTL becomes a supported locale; ja/en/zh-TW remain LTR.

### Header, journey progress, sticky actions, and bottom navigation

- The iOS 48px status bar is prototype chrome and is not rendered by the app.
- Exploration, Result, and Route use a 53px forest app header immediately below
  the status area, with a left control around x=12 and a 20/29 semibold white
  title around x=43.
- Story and Spot intentionally omit the green band and place a 34px orange back
  control over the hero image. Its engineering hit area still reaches 44px.
- Food Profile conversation frames use focused journey chrome; a generic
  logo/locale toolbar is demo infrastructure, not a canonical in-product header.
- Six inspected Exploration/Result states (`23:3706`, `128:2163`, `23:3630`,
  `23:3730`, `23:3778`, `23:3826`) use the same bottom journey tracker: 390 ×
  84, leaf fill, padding `8px 16px 16px`, and a 358 × 60 inner region.
  Its 274px forest rail is 9px thick and carries six milestone positions with a
  32px rhythm. Exploration states show four 18 × 18 dots, one 28 × 44 current
  MOGU marker, and one 44 × 44 terminal marker; Result shows five 18 × 18 dots
  plus the terminal marker. Progress meaning must also be exposed
  programmatically, not by marker color/mascot position alone.
- Story (`62:5021`) uses a leaf sticky action footer at 390 × 73 with 12px
  padding and a centered 280 × 49 CTA. Route (`119:838`) uses the same
  surface/shadow language at 390 × 155 for its summary/actions. The separate
  saved state `122:889` is
  390 × 73 with 12px padding, a 10px gap, and 180px/152px actions. All three use
  the upward `0 -1px 4px #888B85` separator shadow.
- Bottom nav source node `1:23` is 390 × 84: solid white, 1px top rule, padding
  8px 16px 16px, four equal 89.5 × 60px slots, 4px icon/label gap, approximately
  24px icons, and 12px medium labels. The content height is 68px plus a 16px
  illustrated safe-area allowance.
- The current shipped Figma-visible Dock is `食旅を見つけ / モグモグる / お気に入り /
  マイ`, localized at runtime. It is current presentation evidence; Issues
  #203/#204 leave durable navigation and state/lifecycle ownership unresolved,
  so the Dock must not be used to settle those decisions.

## 7. Imagery and crop behavior

Never stretch imagery. Containers clip their media; `object-fit: cover` is the
default unless the table identifies a contained decorative illustration.

| Surface | Live visible/container geometry | Contract |
|---|---:|---|
| Landing/background | asset 414 × 896 over 390 × 844 | Full-bleed cover; preserve the authored focal composition |
| Exploration background | 408–454 × 881–981 behind 390px frames | Shared asset hash; cover and clip, not a page background tile |
| Experience illustration | mostly square inside fixed card field | Decorative; center/contain only when the full drawing must remain visible |
| Result card hero | 350 × 240.56 (≈1.455:1) | Cover; do not replace with generic 16:9 |
| Story hero | source layer 427 × 294 cropped to 390 × 294 | Cover/crop with subject-safe focal point |
| Story carousel media | 196 × 196 visible | Square crop regardless of source-photo ratio |
| Route map | 389 × 313 (≈1.243:1) | Crop as a map composition; do not treat as decorative photo |
| Route stop thumbnail | 78 × 78 circle | Cover/crop |
| Spot hero | 391 × 231 (≈1.693:1) | Cover; preserve focal point |
| Spot gallery tile | about 83 × 67, radius 8 | Cover/crop |

Every meaningful image needs localized alt text or an explicit decorative
empty alt. Asset/source permission and provenance remain data requirements;
Figma presence alone is not reuse authorization.

## 8. Canonical 375px and responsive behavior

The live source frames are 390px wide. The Product contract and #208 require a
375px engineering baseline. The canonical translation is **fluid reflow, not a
375/390 transform scale**:

- Keep a 16px shell gutter, yielding 343px at 375.
- Express full-width elements as `width: 100%` within their container and use
  measured `max-width` for centered 280px choice columns.
- A 350px Result card becomes the available `viewport - 40px` width (335px at
  375); its internal media ratio and padding remain stable.
- Preserve the live centered vertical Exploration action stack: 156px-wide
  Next, 24px gap, then Back. Convert fixed heights to minimums if translated
  labels wrap, but do not turn the stack into a row.
- Use `min-height: 100dvh`, content-driven document height, and normal vertical
  scrolling. Never pin a screen to 844px or clip a transcript because the
  source capture stops there.
- Fixed/sticky regions include `env(safe-area-inset-bottom)` without conflating
  their source geometries. Journey tracker and bottom nav each use a 68px
  content zone plus the illustrated 16px allowance; Story/saved actions are
  73px and the Route summary/action footer is 155px before device adaptation.
- Horizontal Story carousels may intentionally extend beyond the content
  column, but must be a contained scroll region and must not create document
  horizontal overflow.
- At wider widths, center the existing app shell. The live file does not define
  tablet/desktop rearrangement; current 480/520px fallbacks are implementation
  defaults, not live-Figma standards.

Verification for #262 must compare each implemented surface at 375px against
the corresponding live node plus this reflow contract.

## 9. i18n and accessibility adaptations

- Japanese remains the demo default; ja/en/zh-TW preserve information and
  interaction structure with natural wording.
- Text containers grow vertically. Use `overflow-wrap: anywhere` only for
  otherwise unbreakable names/URLs; do not fragment ordinary Japanese text.
- Buttons and chips may widen, wrap, or stack. Fixed source heights become
  `min-height` when localized copy can wrap.
- All interactive hit areas are at least 44 × 44px, including Figma's 34px
  hero back control. Informational tags may remain visually smaller.
- Keyboard focus is visible. Selected, current, warning, error, and disabled
  states have text, icon, shape, or ARIA support rather than color alone.
- Maintain WCAG AA using the color adaptations above. Prefer dark ink on the
  live leaf/multi-select/orange/route-secondary fills; inactive-nav text also
  needs its accessible mapping.
- Honor `prefers-reduced-motion`; no information may depend on animation.
- Sticky/fixed controls must not cover focused content at 200% zoom or with
  enlarged text.

## 10. Figma consistency ledger

| Classification | Finding | Resolution |
|---|---|---|
| `CONSISTENT_STANDARD` | 390px source frames; 16px shell edge; cream conversation canvas; white surfaces; forest/leaf system | Adopt the roles above and translate to 375 by reflow |
| `CONSISTENT_STANDARD` | Roboto 16/22 dominates body/control/chat; 20/29 anchors headers/questions; 12/14px supports dense content | Adopt the role-based type table |
| `INTENTIONAL_VARIANT` | 16px text uses 22px for body/chat and 29px for spacious choices/navigation | Preserve line height by role; do not collapse all 16px text into one style |
| `CONSISTENT_STANDARD` | Radius families 8 / 12 / 18 / pill and asymmetric 10px bubble tails repeat by component role | Canonicalize these roles; ignore vector-icon micro-radii |
| `CONSISTENT_STANDARD` | 12px internal padding, 8/12/16px component gaps, 24/32px section rhythm | Use the shared 4px spacing scale |
| `LIKELY_ACCIDENTAL_DRIFT` | `#667A47` and `#667A48` are visually indistinguishable duplicates | Canonical `#667A47`, the dominant value |
| `INTENTIONAL_VARIANT` | Selected controls use `#667F37`, distinct from forest across five inspected states | Preserve as `--tmm-color-selection`; do not merge silently |
| `INTENTIONAL_VARIANT` | `#9DBC64` is the standard assistant/footer surface; `#B1CF7A` is limited to three large embedded multi-select/send panels | Preserve the component distinction; do not encode it as completed/current lifecycle |
| `INTENTIONAL_VARIANT` | `#B2D083` is the repeated experience illustration field next to near-duplicate `#B1CF7A` | Preserve because the roles and repeated nodes differ; do not merge silently |
| `INTENTIONAL_VARIANT` | `#F5EEDB` at 80% groups Taste/Theme chip sets | Preserve as the choice-panel surface rather than mapping to legacy warm-deep |
| `INTENTIONAL_VARIANT` | Route regenerate alone uses `#85A053`; warning/location accents use `#FF5A5A` | Keep component/semantic roles local and apply accessible text rules; do not expand them into the primary green/orange ramps |
| `LIKELY_ACCIDENTAL_DRIFT` | `#E9811D` and `#EA811E` differ by one channel and serve the same muted-orange family | Canonical raw reference `#E9811D` |
| `LIKELY_ACCIDENTAL_DRIFT` | Bright actions use `#FF8313` and `#FF8D20` without a stable semantic difference | Canonical raw strong-orange reference `#FF8313`; retain live fill with dark text pending Design approval of any fill change |
| `INTENTIONAL_VARIANT` | Hard zero-blur button shadows versus soft selected/modal/map shadows | Preserve by component role, not a generic elevation scale |
| `CONSISTENT_STANDARD` | Six journey trackers repeat 390 × 84 leaf/16px-edge geometry; Story/Route/saved footers repeat leaf plus the upward separator shadow | Implement tracker and sticky-action roles explicitly; do not substitute generic progress/nav geometry |
| `INTENTIONAL_VARIANT` | 45/46/49/54px actions and 76px wrapped fork action | Treat 44px as minimum; preserve emphasis/content-driven growth |
| `INTENTIONAL_VARIANT` | 10px repeats in chip-wrap/input groups while the main rhythm follows 4px steps | Preserve as the named chip gap; do not generalize it into a second spacing scale |
| `INTENTIONAL_VARIANT` | Main insets vary 14/18/20/22px around a 16px shell rhythm | Preserve measured surface composition; do not mint global gutter tokens for each |
| `LIKELY_ACCIDENTAL_DRIFT` | Bottom-nav first slot is 60px high at y=8 while the other three are 58px at y=9 | Canonicalize four 60px slots aligned at y=8 within the 68px content zone |
| `INTENTIONAL_VARIANT` | Green app header on Exploration/Result/Route; hero-overlay back control on Story/Spot | Implement the two header modes explicitly |
| `LIKELY_ACCIDENTAL_DRIFT` | Top-level frames commonly carry opacity ≈0.99 | Engineering root opacity is 1; do not reproduce the export artifact |
| `CURRENT_PRESENTATION` | Result `23:3380` shows two fixture cards with 96/91 indicators | The two cards and indicators are live-Figma presentation fixtures only. `96` / `91` are not calculated scores, confidence, accuracy, dietary compatibility, or safety semantics; durable semantics are deferred to #206/#207. Historical #255 / Top-3 direction is superseded. |
| `PRODUCT_OVERRIDE` | Live frames allow several choices simultaneously | #257 first run exposes exactly one actionable highlighted target; returning/free exploration restores normal choice behavior |
| `CURRENT_PRESENTATION` | Figma-visible Dock labels/roles | Current shipped Dock is `食旅を見つけ / モグモグる / お気に入り / マイ`, localized at runtime. Issues #203/#204 leave durable navigation and state/lifecycle ownership unresolved; do not infer or decide them from the visible Dock. |
| `PRODUCT_OVERRIDE` | Demo imagery/copy centers Okutama × Tokyo Wasabi | #112 keeps shared Product contracts Tokyo-wide and multi-region × multi-food-culture |
| `ACCESSIBILITY_ADAPTATION` | White text on leaf/multi-select/route-secondary/live-orange fills fails AA | Preserve source fills and use dark ink; treat the darker compatibility orange as optional pending Design approval |
| `ACCESSIBILITY_ADAPTATION` | `#CEE3A8` inactive nav content fails contrast on white | Use accessible muted ink and a redundant active indicator |
| `ACCESSIBILITY_ADAPTATION` | 34px hero back control and small tags are below the touch target | Expand interactive hit area to 44px; small noninteractive tags may remain visual-only |
| `ACCESSIBILITY_ADAPTATION` | Fixed source dimensions cannot guarantee ja/en/zh-TW or zoom fit | Convert heights to minimums and permit wrapping/stacking |
| `UNRESOLVED` | The live file publishes no variables, component variants, or local styles | This document is the canonical extracted contract until KiKi publishes structured tokens |
| `UNRESOLVED` | Hover, focus, disabled, loading, validation-error, and reduced-motion states are incomplete in Figma | Use #208/shared accessible states; Design may later replace them explicitly |
| `UNRESOLVED` | Tablet/desktop layouts are absent | Keep centered mobile fallback; do not invent a new wide composition |
| `UNRESOLVED` | Exact focal points for Result journey imagery are not authored | Set `object-position` per approved asset during visual comparison |

## 11. Product overrides that implementation must preserve

### Result — current presentation; historical #255 / Top-3 superseded

`23:3380` is current visual evidence for header, background, card, chip, image,
spacing, CTA treatment, and the two visible journey-card fixtures. The 96/91
indicators are presentation copy only: they do not express a calculated score,
confidence, recommendation accuracy, dietary compatibility, or safety. Do not
derive production selection, ranking, reasons, or score semantics from the
fixtures; those are deferred to #206/#207.

### #257 — guided first run

The first run adds a behavioral/accessibility layer over the visible Figma:
exactly one choice is actionable and highlighted at each decision point. The
highlight needs a non-color cue and correct disabled semantics. This is not a
new permanent single-choice design; returning/free exploration retains the
normal controls.

### Current Dock / deferred durable ownership

Bottom-nav geometry comes from `1:23`. The current shipped Figma-visible Dock
is `食旅を見つけ / モグモグる / お気に入り / マイ`, localized at runtime. Issues #203/#204
have not decided durable navigation or state/lifecycle ownership; this design
system records the visible presentation and must not settle those decisions.
Shared naming, content contracts, and components remain reusable for another
Tokyo Region × FoodCulture without redesign.

## 12. Mapping to current code

| Figma standard | Current code | Status / migration owner |
|---|---|---|
| Canonical colors, fonts, type/space/radius roles | `src/ui/tokens.css` | Source roles and clear AA adaptations are canonicalized by #263 |
| Shared buttons, chips, cards, tags, modal, shell | `src/ui/ui.css` | Reusable behavior remains; component-specific visual convergence belongs to #262 |
| Legacy aliases | `src/styles.css` | Aliased to `--tmm-*` by #263; old grain, generic header/nav, and legacy component rules are not design authority |
| Exact conversation source roles | `src/pages/s0s3/figma-conversation-parity.css` | Scoped aliases point to shared tokens, but the current broad pale-panel selectors overgeneralize `#B1CF7A`; selector/contrast convergence remains #262 |
| Rounded accent family | `src/pages/s0s3/onboarding.css` | Existing M PLUS usage matches its limited live role |
| Generic `.tmm-result-card__media` | `src/ui/ui.css` | Current 16:9 abstraction conflicts with ≈1.455:1 Result media; change with Result convergence in #262 |
| Generic `.tmm-card` shadow/border | `src/ui/ui.css` | Live default is flat white; apply border/elevation by role during #262, not globally here |
| Generic `.tmm-modal` | `src/ui/ui.css` | Generic 18px modal differs; scoped Food Profile `.fp-modal` already carries the live 8px/307px geometry |
| Generic `.tmm-header` | `src/ui/ui.css` / app shells | Fallback/demo chrome only; live surfaces use green-band or hero-overlay modes |
| `.tmm-nav` | `src/ui/ui.css` | Content height/four-slot structure is close; translucent warm fill, blur, and active background are not live-node proof |
| Journey tracker / sticky action footer | generic progress and page-local footers | No shared class yet captures the measured tracker, 73/155px action surfaces, or upward separator shadow; #262 owns implementation |
| Historical presentation record | `docs/specs/product/approved-ui-fidelity.md` | Historical only; it must not override current Figma/current-main behavior |

## 13. Migration notes for #262

These are downstream convergence tasks, not changes made by #263:

1. Compare each surface at 375px to its live node using the reflow rules above;
   do not claim `MATCH` from tests or old coverage files.
2. Remove unsupported serif/editorial and washi-grain assumptions only where
   the inspected live surface is being converged.
3. Implement the two live header modes and the solid-white nav while preserving
   #92 destinations and safe-area behavior.
4. Replace generic 16:9 media and universal card elevation with the measured
   per-component crop/elevation roles.
5. Add the measured journey tracker and Story/Route/saved sticky-footer roles;
   do not reuse the generic progress bar or 68px nav for the 73/155px actions.
6. Adapt low-contrast bubble, orange-button, route-secondary, warning-text, and
   inactive-nav combinations before visual sign-off, preserving live fills when
   dark ink is sufficient.
7. Preserve the two current Result presentation fixtures and #257 tutorial
   behavior throughout screenshot convergence; do not restore historical #255 /
   Top-3 behavior.
8. Record any new live-Figma divergence in this ledger instead of silently
   inventing a token or component variant.

## References

- Live KiKi Figma:
  `https://www.figma.com/design/fHqhA3d26OdXqm0cQxfK31/tokyo-mogu-mogu?node-id=0-1`
- Issue #201 — proposal-prototype boundary
- Issue #208 — design intent plus safe engineering adaptations
- Issue #255 — historical Top-3 direction; superseded for the current MVP
- Issue #257 — guided first-run behavior
- Issue #262 — downstream visual convergence
- `docs/specs/product/product-scope-invariant.md`
- `docs/specs/product/approved-ui-fidelity.md`
- `src/ui/tokens.css`
- `src/ui/ui.css`
- `src/styles.css`
