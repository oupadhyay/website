# Ojasw Upadhyay — Personal Website Design System

> **Stack:** Astro v6.4 + Tailwind CSS v4
> **Architecture:** Multi-page static site (Home, Writing, Projects)
> **Visual DNA:** Dark Swiss structural grid × tactile card interactions × high-contrast editorial typography

---

## 1. Design Philosophy

The site merges three design lineages discovered in the portfolio audit:

1. **Swiss Structural Precision** (perrera.com) — OKLCH color tokens, 4-column grids, border-defined sections, timeline connectors with hover glow.
2. **Tactile Card Affordances** (chester.how / jakub.kr) — Skeuomorphic inset shadows on badges, `active:scale-[0.97]` press feedback on cards, concentric border radii, physical drawer-slide reveals.
3. **Dark Editorial Contrast** (poolside.ai) — Anthracite canvas, high-contrast sans-serif typography, monospace accents for metadata, adaptive accent color shifts between light/dark modes.

**Core Feeling:** Precise, warm-dark, engineered. Like a well-organized workshop notebook rendered on a matte charcoal desk.

---

## 2. Color System (OKLCH-native)

All colors defined in OKLCH for perceptual uniformity. Tailwind v4's native OKLCH support means no hex fallback gymnastics.

### Dark Mode (Primary)

| Token | OKLCH Value | Role |
| :--- | :--- | :--- |
| `--color-surface-0` | `oklch(15% 0.005 260)` | Page background (deep slate-blue black) |
| `--color-surface-1` | `oklch(20% 0.008 260)` | Card backgrounds, elevated surfaces |
| `--color-surface-2` | `oklch(25% 0.010 260)` | Hover states, active surfaces |
| `--color-text-primary` | `oklch(95% 0.005 90)` | High-contrast headings (warm off-white) |
| `--color-text-secondary` | `oklch(70% 0.005 90)` | Body copy, descriptions |
| `--color-text-muted` | `oklch(45% 0.005 90)` | Dates, metadata, labels |
| `--color-border` | `oklch(25% 0.005 260)` | Section dividers, card borders |
| `--color-border-hover` | `oklch(35% 0.008 260)` | Border hover glow |

### Light Mode (Alternate)

| Token | OKLCH Value | Role |
| :--- | :--- | :--- |
| `--color-surface-0` | `oklch(97% 0.005 90)` | Page background (warm off-white) |
| `--color-surface-1` | `oklch(94% 0.005 90)` | Card backgrounds |
| `--color-surface-2` | `oklch(90% 0.008 90)` | Hover states |
| `--color-text-primary` | `oklch(15% 0.005 260)` | Headings |
| `--color-text-secondary` | `oklch(35% 0.005 260)` | Body copy |
| `--color-text-muted` | `oklch(55% 0.005 260)` | Metadata |
| `--color-border` | `oklch(88% 0.005 90)` | Section dividers |

> **Design Decision — No Primary Accent Color:** The base palette is intentionally achromatic. There is no `--color-accent`. Surfaces differentiate through lightness steps only. This forces typography, layout structure, and tactile interactions to carry all visual weight — closer to perrera.com's stone palette and alexanderobenauer.com's restrained warmth than a typical tech portfolio.

### Decoration Colors (Inline Link Underlines)

Color is reserved exclusively for **inline text decoration** on links — never as backgrounds, UI chrome, or brand identity. Each link in the bio or content gets a unique colored underline, directly adapted from chester.how's `decoration-*` pattern.

This creates moments of unexpected vibrancy against the monochromatic canvas without compromising the structural restraint.

| Token | OKLCH Value | Usage |
| :--- | :--- | :--- |
| `--deco-orange` | `oklch(75% 0.16 55)` | Projects, work links (e.g. "YouTube") |
| `--deco-sky` | `oklch(75% 0.14 230)` | Product links (e.g. "Shard", "Mobbin") |
| `--deco-rose` | `oklch(70% 0.17 15)` | Personal interests, hobbies |
| `--deco-lime` | `oklch(80% 0.18 140)` | Research, publications |
| `--deco-purple` | `oklch(70% 0.15 300)` | Side projects, experiments |
| `--deco-teal` | `oklch(75% 0.12 185)` | Writing, blog posts |

**Implementation:**
```css
/* Base inline link — no underline by default */
.inline-link {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  text-decoration-color: var(--deco-color, var(--color-border));
  transition: text-decoration-color 200ms ease;
}

/* Each link passes its own --deco-color */
<a class="inline-link" style="--deco-color: var(--deco-sky)">Shard</a>
<a class="inline-link" style="--deco-orange: var(--deco-orange)">YouTube</a>
```

> **Rationale:** chester.how uses Tailwind's `decoration-*-400` utilities for this exact pattern. We use OKLCH-defined tokens instead to maintain perceptual brightness parity across all decoration hues — the lime and sky underlines appear equally vivid because their lightness (`L`) values are matched.

---

## 3. Typography System

### Font Stack

| Role | Font | Weight(s) | Source | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Headings** | **Instrument Serif** | 400 (Regular) | Google Fonts | Warm, contemporary serif with subtle optical sizing. Less formal than Crimson Pro, more character than Newsreader. Pairs beautifully with geometric sans. |
| **Body / UI** | **Geist** | 400, 500 | Vercel CDN / self-hosted | Clean geometric sans-serif optimized for screens. Used by benji.org. Superior legibility at small sizes. |
| **Monospace / Code / Meta** | **Ioskeley Mono** | 400, 700 | Self-hosted (OFL) | Open-source Iosevka build mimicking Berkeley Mono's aesthetic. SIL OFL-licensed via `ahatem/IoskeleyMono`. Ideal for dates, tags, code, and metadata. |

### Typographic Scale

Built on a `1.250` (Major Third) modular scale rooted at `16px`:

| Token | Size | Line Height | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--text-xs` | `0.75rem` (12px) | `1.4` | `0.02em` | Badges, tags, micro-labels |
| `--text-sm` | `0.875rem` (14px) | `1.5` | `0em` | Metadata, dates, nav links |
| `--text-base` | `1rem` (16px) | `1.75` | `-0.005em` | Body copy |
| `--text-lg` | `1.25rem` (20px) | `1.6` | `-0.01em` | Subheadings, card titles |
| `--text-xl` | `1.5rem` (24px) | `1.4` | `-0.02em` | Section headings |
| `--text-2xl` | `1.875rem` (30px) | `1.3` | `-0.025em` | Page titles |
| `--text-3xl` | `2.5rem` (40px) | `1.2` | `-0.03em` | Hero display text |

> **Design Decision — Body Line Height:** `1.75` follows benji.org's generous vertical rhythm (their `1.9em` was slightly excessive). This creates comfortable reading cadence in the narrow column without feeling loose.

---

## 4. Layout & Grid System

### Page Structure

```
┌─────────────────────────────────────────────────┐
│  ┌─ nav ─────────────────────────────────────┐  │
│  │  [O] Ojasw Upadhyay    Writing  Projects  │  │
│  └────────────────────────────────────────────┘  │
│                                                   │
│  ┌─ content column (max-w: 680px) ────────────┐  │
│  │                                             │  │
│  │  [page content]                             │  │
│  │                                             │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  ┌─ footer ───────────────────────────────────┐  │
│  │  links · colophon · theme toggle           │  │
│  └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Key Measurements

| Token | Value | Rationale |
| :--- | :--- | :--- |
| `--content-width` | `680px` | Between benji's 582px and jakub's 692px. Optimized for ~65-75 characters per line at 16px body. |
| `--page-padding-x` | `1.5rem` (mobile) / `2rem` (desktop) | Comfortable thumb margins on mobile. |
| `--page-padding-y` | `3rem` (top) / `2rem` (bottom) | Ample breathing room from nav. |
| `--section-gap` | `4rem` | Vertical spacing between major sections. |
| `--card-gap` | `1rem` | Gap between grid cards. |

### Navigation

- **Desktop**: Sticky top bar, left-aligned name as wordmark (Instrument Serif, `--text-lg`), right-aligned nav links (Geist, `--text-sm`). No glassmorphism — clean `surface-1` background with bottom border. Theme toggle (sun/moon icon) at far right.
- **Mobile**: Same layout, but nav links collapse to a minimal "menu" text toggle that reveals a full-screen overlay.

### Responsive Grid (Projects Page)

Projects page uses a responsive grid that expands from the content column:

- **Mobile**: `grid-cols-1`
- **Tablet (≥640px)**: `grid-cols-2`
- **Desktop (≥1024px)**: `grid-cols-2` (capped, following the narrow column principle)

### Writing Page — Timeline Layout (perrera.com Pattern)

Writing entries are organized in a year-grouped vertical timeline:

```
2026  ─── Liveline                              16/02
      ─── Agentation                            21/01
2025  ─── Honkish                               23/05
```

- Year labels in Ioskeley Mono (`--text-xs`, `--color-text-muted`)
- Title in Geist (`--text-sm`, `--color-text-primary`)
- Date in Ioskeley Mono (`--text-xs`, `--color-text-muted`), right-aligned
- Timeline connector lines between year groups (1px `--color-border`, `opacity: 0.1` → `0.5` on group hover — directly from perrera.com)

---

## 5. Component Library

### 5.1 Tactile Card

The primary interactive surface. Inspired by chester.how's skeuomorphic shadows and jakub.kr's concentric radii.

```css
.card {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 200ms ease-out;
}
.card:hover {
  background: var(--color-surface-2);
  border-color: var(--color-border-hover);
  box-shadow:
    0 0 0 1px var(--color-border-hover),
    0 4px 12px oklch(0% 0 0 / 0.2);
}
.card:active {
  scale: 0.97;
  transition: scale 100ms ease-out;
}
```

**Concentric Border Radii** (jakub.kr pattern): Inner elements use `border-radius: 8px` (12px outer - 4px padding gap) to maintain visually perfect nesting.

### 5.2 Badge / Tag

Debossed pill badges (chester.how's `.shadow-inset-skeuo` adapted for dark mode):

```css
.badge {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.02em;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  background: var(--color-surface-2);
  color: var(--color-text-secondary);
  box-shadow:
    inset 0 0 0 1px oklch(100% 0 0 / 0.05),
    inset 0 -1px 0 0 oklch(0% 0 0 / 0.15);
}
```

### 5.3 Project Card (Extended)

For the Projects page — combines the tactile card base with structured content:

```
┌─────────────────────────────────┐
│ [icon/emoji]                    │
│                                 │
│ Project Title          [badge]  │
│ One-line description            │
│                                 │
│ Rust · TypeScript · PyTorch     │
└─────────────────────────────────┘
```

- Icon/emoji at top-left (e.g., 🧠 for AI PI, ⚡ for LOTUS, 🔮 for Shard)
- Tech stack pills at bottom using monospace badges
- Full card is a link — hover triggers the tactile elevation + border glow

### 5.4 Writing Entry Row

```
┌─────────────────────────────────────────────────┐
│  Title of the Post              [NEW]    16/02  │
│  ─── connector line ───────────────────         │
└─────────────────────────────────────────────────┘
```

- Title: Geist 500, `--text-sm`
- Date: Ioskeley Mono 400, `--text-xs`, `--color-text-muted`
- "NEW" badge: uses `--deco-rose` colored border, hand-drawn style (benji.org pattern)
- Hover: full row background shifts to `surface-2`, connector line opacity pulses from `0.1` → `0.5` (perrera.com pattern)

### 5.5 Section Header

Inspired by alexanderobenauer.com's vertical gutter titles but adapted to the narrow-column layout:

```
┌──────────────────────────────────┐
│  WRITING                         │
│  ────────────────────────────── │
└──────────────────────────────────┘
```

- Label: Ioskeley Mono, uppercase, `--text-xs`, `--color-text-muted`, `letter-spacing: 0.1em`
- Underline: 1px `--color-border`, full width
- No vertical rotation (doesn't apply to single-column layouts)

### 5.6 Theme Toggle

Minimal sun/moon icon toggle in the nav bar:

- Icon transition: smooth morph between sun and moon SVG paths (CSS `clip-path` animation)
- `prefers-color-scheme` respected by default, manual toggle persisted to `localStorage`

---

## 6. Micro-Interactions & Animation

| Interaction | Implementation | Inspiration |
| :--- | :--- | :--- |
| Card hover elevation | `box-shadow` transition + `border-color` shift, 200ms ease-out | chester.how `.shadow-skeuo` |
| Card press | `scale: 0.97` on `:active`, 100ms ease-out | jakub.kr `active:scale-[0.97]` |
| Timeline connector glow | `opacity: 0.1 → 0.5` on parent group hover, 500ms duration | perrera.com timeline dividers |
| Nav link highlight | Subtle underline slide-in from left (pseudo-element `scaleX(0) → scaleX(1)`) | — |
| Page transitions | Astro View Transitions API — fade + slight `translateY(4px)` slide-up | benji.org stagger-in |
| Badge press | Inset shadow deepens on `:active` | chester.how `.shadow-inset-skeuo` |
| External link indicator | Small `↗` arrow that `translateX(2px)` and `translateY(-2px)` on hover | jakub.kr arrow micro-shift |

**Animation Constraints:**
- All transitions capped at `200ms` for interactive elements (hover, press)
- Page transitions capped at `300ms`
- `prefers-reduced-motion` respected — all animations disabled when set

---

## 7. Content Structure

### Pages

| Route | Content | Layout |
| :--- | :--- | :--- |
| `/` (Home) | Bio/intro paragraphs, featured projects (2-3 cards), recent writing (3-5 entries), social links | Single column, stacked sections |
| `/writing` | Year-grouped timeline of all writing/research entries | Timeline layout |
| `/projects` | Grid of all project cards | 2-column responsive grid |
| `/writing/[slug]` | Individual writing post (MDX content) | Prose column (inherits `--content-width`) |

### Home Page Structure

```
[Nav]

Ojasw Upadhyay                              ← Instrument Serif, --text-2xl
Software Engineer at YouTube · Georgia Tech '25

I build things at the intersection of         ← Geist, --text-base
AI, design, and intuitive interfaces.
Currently working on AI Dubbing at YouTube.
Previously: Google internships (2x),
makerspace AI safety research at GT.

PROJECTS                                      ← Section header
────────────────────────────────────
[Shard v2 card]  [AI PI card]                 ← 2-col grid
[LOTUS card]     [SynLexLM card]

WRITING                                       ← Section header
────────────────────────────────────
2026  Title                          16/02    ← Timeline rows
      Title                          21/01
2025  Title                          23/05

ELSEWHERE                                     ← Section header
────────────────────────────────────
GitHub · Scholar · LinkedIn · X

[Footer]
```

---

## 8. File Structure

```
website/
├── astro.config.mjs
├── tailwind.config.ts          ← OKLCH tokens, font configs
├── package.json
├── public/
│   └── fonts/                  ← Self-hosted woff2 files
│       ├── geist-regular.woff2
│       ├── geist-medium.woff2
│       ├── ioskeley-mono-regular.woff2
│       ├── ioskeley-mono-bold.woff2
│       └── instrument-serif-regular.woff2
├── src/
│   ├── layouts/
│   │   ├── Base.astro          ← HTML shell, fonts, meta, theme script
│   │   └── Post.astro          ← Writing post layout (prose styling)
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Card.astro          ← Tactile card component
│   │   ├── Badge.astro         ← Debossed pill badge
│   │   ├── ProjectCard.astro   ← Extended card for projects
│   │   ├── WritingEntry.astro  ← Timeline row for writing
│   │   ├── SectionHeader.astro ← Uppercase mono label + rule
│   │   └── ThemeToggle.astro   ← Sun/moon toggle (island)
│   ├── pages/
│   │   ├── index.astro         ← Home
│   │   ├── writing/
│   │   │   ├── index.astro     ← Writing timeline
│   │   │   └── [...slug].astro ← Dynamic post routes
│   │   └── projects.astro      ← Projects grid
│   ├── content/
│   │   ├── writing/            ← MDX writing posts
│   │   └── projects/           ← Project data (YAML/JSON)
│   └── styles/
│       └── global.css          ← @font-face, base resets, prose styles
└── docs/
    └── plans/
```

---

## 9. Accessibility & Performance Targets

| Metric | Target |
| :--- | :--- |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| First Contentful Paint | < 1.0s |
| Total JS shipped | < 5KB (theme toggle island only) |
| WCAG Contrast | AA minimum, AAA preferred |
| `prefers-reduced-motion` | Respected globally |
| `prefers-color-scheme` | Respected, with manual override |

---

## 10. Design Decisions Log

| Decision | Rationale |
| :--- | :--- |
| OKLCH over HEX/HSL | Perceptual uniformity, native Tailwind v4 support, no muddy dark-mode transitions |
| No primary accent color | Monochromatic base forces typography and layout to carry visual weight; color reserved for inline link decorations only |
| Decoration colors (chester.how pattern) | Unique colored underlines per link category inject vibrancy without compromising structural restraint; OKLCH lightness-matched for perceptual parity |
| 680px content column | Sweet spot between benji's 582px and jakub's 692px for ~65-75 char line length |
| Ioskeley Mono for metadata | Open-source Berkeley Mono alternative (Iosevka-based, OFL-licensed); same aesthetic at small sizes, no licensing friction |
| Instrument Serif for display | Warm and contemporary — avoids the cold formality of Crimson Pro while being more characterful than Newsreader |
| Astro v6.4 + Tailwind v4 | Latest stable Astro with Fonts API + CSP support; content-first with zero JS by default, native OKLCH |
| Dark mode primary | Matches the user's stated preference; light mode exists as accessible alternative |
| `active:scale-[0.97]` | Proven tactile feedback pattern from jakub.kr; subtle but physically grounding |
| Timeline connector glow | Directly adapted from perrera.com; guides the eye across temporal data |
