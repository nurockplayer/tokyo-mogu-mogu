# Experimental badge-grid visual evidence

This folder records visual-prototype evidence only. The flattened source image
does not define current Product behavior, badge acquisition, persistence, QR,
reward, recommendation, or backend semantics. The current `/badges` binder
remains authoritative and unchanged.

## Live Figma export

- Connected file: `tokyo-mogu-mogu`, resolved through the local Hopp
  `figma-bridge` with `list_files`
- Node: `269:1394`, `Asset/Source/Image-23`
- Live node type/bounds: flattened image rectangle, 514×1083
- Export: 4× clipped PNG, 2056×4332, 3,356,502 bytes
- SHA-256:
  `b22a64c71042a4b5651a4c2efb58336e6da0db6c72c00cbc6596bbe739576688`
- File: `figma-reference-4x.png`

## Reconstruction and visual validation

- Preview route: `/_preview/badge-grid`
- Runtime capture: `runtime-390.png`, 390×844
- Side-by-side: `comparison-390.png`; the 514px Figma source is scaled to
  390px wide and top-aligned on the left, with the 390×844 runtime capture on
  the right.
- A first comparison showed compressed badge art/card rows and an oversized
  intro heading. The final pass increased the mascot, chips, artwork, and grid
  rhythm, allowed long labels to wrap, and reduced the heading scale.
- The current 53px app header and current four-destination Dock are deliberate
  runtime substitutions for the flattened image's device status bar and older
  navigation chrome.
- Existing #296/#360 artwork is reused decoratively. The visible names, counts,
  category chips, and earned/locked states are isolated fixture data copied
  from the flattened reference; they do not award or persist badges.
- Focused Playwright verification checks the 390px composition, nine-card grid,
  locked states, isolation from `/badges`, and exact 375px document/phone/screen
  widths with no horizontal overflow.
