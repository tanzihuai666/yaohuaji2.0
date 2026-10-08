---
name: Pastel Stationery Journal
colors:
  surface: '#f7faf5'
  surface-dim: '#d8dbd6'
  surface-bright: '#f7faf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f0'
  surface-container: '#ecefea'
  surface-container-high: '#e6e9e4'
  surface-container-highest: '#e0e3df'
  on-surface: '#191c1a'
  on-surface-variant: '#414944'
  inverse-surface: '#2d312e'
  inverse-on-surface: '#eff2ed'
  outline: '#717974'
  outline-variant: '#c0c8c3'
  surface-tint: '#396755'
  primary: '#235241'
  on-primary: '#ffffff'
  primary-container: '#3c6a58'
  on-primary-container: '#b6e8d1'
  inverse-primary: '#a0d1bb'
  secondary: '#a13e37'
  on-secondary: '#ffffff'
  secondary-container: '#ff857a'
  on-secondary-container: '#751d19'
  tertiary: '#685e38'
  on-tertiary: '#ffffff'
  tertiary-container: '#b8ab7e'
  on-tertiary-container: '#483f1c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bbedd7'
  primary-fixed-dim: '#a0d1bb'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#204f3e'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#822622'
  tertiary-fixed: '#f1e2b2'
  tertiary-fixed-dim: '#d4c697'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#4f4622'
  background: '#f7faf5'
  on-background: '#191c1a'
  surface-variant: '#e0e3df'
typography:
  display-lg:
    fontFamily: Nunito Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 22px
    fontWeight: '800'
    lineHeight: 30px
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 26px
  title-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 22px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-lg:
    fontFamily: Nunito Sans
    fontSize: 13px
    fontWeight: '700'
    lineHeight: 18px
  label-md:
    fontFamily: Nunito Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
  stat-counter:
    fontFamily: Nunito Sans
    fontSize: 26px
    fontWeight: '800'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system blends **Pastel Sticker Cartoon** with **Tactile Stationery Journaling (手账风)**, tailored specifically for mobile-first art creators, freelance illustrators, and character designers. The aesthetic moves away from sterile utility, instead creating an intimate creative sanctuary that feels like handling warm, creamy textured paper adorned with subtle die-cut stickers and smooth stamp markers.

Key brand tenets include:
- **Warmth and Softness:** Cream-toned paper surfaces with gentle micro-dots provide an organic, low-fatigue workspace for long hours of commission tracking and portfolio curation.
- **Playful Order:** Organic, oversized pill containers and plump rounded cards ground complex task management—such as calendar deadlines, revenue metrics, and art directories—into an inviting, stress-free canvas.
- **Craftsmanship & Tangibility:** Subtle layered card elevations, dashed outline containers (like cut-out stickers), and muted pastel status chips simulate tangible craft materials while retaining precise mobile touch targets.

## Colors

The color palette centers on earthy natural greens paired with soft, warm paper tones and macaron accents:

- **Primary (`#3C6A58`):** Deep Sage Green. Used for primary CTA buttons, floating action buttons (FAB), active tab highlights, and definitive calendar date selection.
- **Secondary (`#E06D63`):** Coral Poppy / Pastel Terracotta. Dedicated to deadline signals (截稿日), urgency highlights, and notification indicators.
- **Tertiary (`#E6D8A8` / `#82A795`):** Warm Buttercream and Soft Mint. Used for category tags, warm badge backgrounds, and secondary pill states.
- **Neutral & Surface:**
  - **Base Canvas (`#FBF9F1`):** Warm ivory journal backdrop, optionally rendered with an ultra-subtle 16px repeating dot grid (`#E7E4D8`).
  - **Surface Card (`#FFFFFF`):** High-clarity white card surface for content containers.
  - **Surface Subtle (`#FAF8F2`):** Tinted ivory for inactive states, inputs, and segmented tab tracks.
  - **Text Primary (`#2D312E`):** Charcoal Pine, softening black for optimal contrast against creamy backgrounds.
  - **Text Secondary (`#767D77`):** Warm sage grey for meta-data, unit labels, and inactive icons.
- **Functional Semantics:**
  - Commission Start / Accepting: `#4E9A68` (Mint Grass)
  - Deadline / Urgent: `#E06D63` (Coral Salmon)
  - Pending Review / In Progress: `#DE9842` (Honey Amber)
  - Archive / Completed: `#767D77` (Neutral Stone)

## Typography

The typography leverages rounded, humanist letterforms (`Nunito Sans` with balanced fallbacks for East Asian CJK typography including PingFang SC and Microsoft YaHei). It reinforces an approachable, bubbly editorial voice.

- **Numerics & Counters:** Bold, chubby figures (`800` weight) anchor dashboard cards (e.g., active orders, balance amounts) to provide instant visual legibility.
- **Headings:** Heavy weights (`700`-`800`) paired with generous line-heights prevent dense visual friction.
- **Labels & Microcopy:** Kept within medium to semi-bold weights (`600`-`700`) to retain clarity on tinted chip backgrounds and pill tabs.

## Layout & Spacing

The layout model is crafted for dedicated single-column handheld ergonomics:

- **App Shell Structure:**
  - **Top Navigation Bar:** Height of `56px` excluding system safe areas. Centered title with playful icon glyphs.
  - **Bottom Dock:** Fixed `64px` height with a floating pill container floating above the bottom home indicator. Active tab switches invoke an expanded tinted capsule background.
  - **Floating Action Button (FAB):** Offset `24px` from the bottom navigation bar and `16px` from the right edge.
- **Grid & Content Flow:**
  - Standard edge margin of `16px` (`margin`) accommodates thumb comfort on standard mobile widths (360px - 430px).
  - Metric blocks utilize a balanced 2x2 grid layout separated by `12px` (`gutter`).
  - Spacing between consecutive sections maintains `16px` to `24px` gaps, preventing visual clutter while preserving the feel of separate stationery sheets.

## Elevation & Depth

Visual hierarchy rejects harsh digital drop shadows in favor of a tactile, layered craft surface technique:

- **Base Paper Texture:** Flat `#FBF9F1` canvas adorned with an optional micro-dot grid (opacity 0.4).
- **Sticker Card Elevation:** Floating cards use an ultra-diffused, warm ambient glow:
  - `box-shadow: 0 4px 18px rgba(74, 90, 80, 0.05), 0 1px 3px rgba(74, 90, 80, 0.03)`
- **Interactive Stamp Elevation:** Focused interactive states (selected dates, active chips, and FABs) introduce slightly deeper ground shadows:
  - `box-shadow: 0 6px 16px rgba(60, 106, 88, 0.22)`
- **Dashed Cut-Out Borders:** Action containers such as photo capture or image imports apply a 1.5px dashed border (`#4A7A66` with 60% opacity) on a crisp white backdrop, reminiscent of perforated cut-out stationery stickers.

## Shapes

The shape system is defined by soft, organic curves that emphasize safety, friendliness, and tactile comfort:

- **Standard Cards:** Curvature set to `20px` to `24px`, ensuring an organic handheld appearance.
- **Search Bars & Input Fields:** Continuous pill contour (`9999px` / `rounded-full`) for quick thumb-tappable entries.
- **Action Chips & Badges:** Full-radius pill shapes (`radius: 9999px`) with generous horizontal padding (`14px`) to create physical sticker-like elements.
- **Icon Containers & Calendar Date Tiles:** Smooth rounded squircle tiles (`12px` to `16px` radius).

## Components

### Buttons & Floating Action Controls
- **Primary Buttons:** High-contrast solid Deep Sage Green (`#3C6A58`) with crisp white typography. Height: `44px` to `48px`, shape: `9999px` pill or `14px` squircle.
- **Secondary / Sticker Buttons:** Pure white background with a 1.5px dashed border (`#3C6A58`) and matching primary text and icon.
- **Floating Action Button (FAB):** `56px` circular container in `#3C6A58` elevated with a soft tinted ambient shadow. Houses an off-white `+` glyph.

### Search Fields & Filters
- **Search Bar:** Pill-shaped (`rounded-full`), height `44px`, background `#FFFFFF` or `#FAF8F2`, subtle 1px border (`#ECE8DA`). Accompanied by a muted magnifying glass icon and friendly placeholder phrasing.
- **Filter Chips:** Pill shape with `8px 14px` padding. Active state renders solid `#3C6A58` with white text; inactive state features a `#FAF8F2` or white fill, subtle `#E3DFD2` border, and Charcoal Pine text.

### Metric Cards & Grids
- **2x2 Stats Grid:** Equal-height square cards (`20px` roundedness) in pure white. Includes a top-row icon badge (e.g., box, wallet, ribbon, paper) in soft sage tints, a large bold number (`stat-counter`), and a muted two-line status subtitle below.

### Calendar View
- **Header:** Month switch encapsulated in a pill dropdown between two circular chevron arrow pads.
- **Date Grid:** Weekday letters aligned across 7 columns. Inactive month dates in washed grey (`#D3CEC4`); active dates in bold Charcoal Pine. The selected/current day is enclosed in a rounded squircle in `#3C6A58` with white text.
- **Event Indicators:** Petite colored indicator dots below dates (`#4E9A68` for start/accepting dates, `#E06D63` for deadlines).

### Bottom Navigation Bar
- A full-width base panel elevated with soft top lighting.
- Four core destinations: Home (首页), Commissions (稿单), Gallery (画库), Profile (我的).
- Inactive tabs show line icons and label in `#767D77`. Active tabs trigger a pale sage green pill background (`#E6EFEA`) with solid green icon and label.
