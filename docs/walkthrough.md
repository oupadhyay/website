# Website Walkthrough

Ojasw Upadhyay's personal website — a static, dark-mode-first digital garden built
with **Astro v6.4** and **Tailwind CSS v4**. Ships zero JS except a ~1KB theme-toggle
island and Astro's view-transition router.

## Pages

| Route | Source | Description |
| :--- | :--- | :--- |
| `/` | [src/pages/index.astro](file:///Users/oupadhyay/Downloads/projects/website/src/pages/index.astro) | Bio, featured projects, recent writing, elsewhere links, footer |
| `/projects` | [src/pages/projects.astro](file:///Users/oupadhyay/Downloads/projects/website/src/pages/projects.astro) | Responsive 2-col card grid (1-col on mobile) |
| `/writing` | [src/pages/writing/index.astro](file:///Users/oupadhyay/Downloads/projects/website/src/pages/writing/index.astro) | Year-grouped timeline of posts |
| `/writing/[slug]` | [src/pages/writing/[...slug].astro](file:///Users/oupadhyay/Downloads/projects/website/src/pages/writing/%5B...slug%5D.astro) | Individual post via [Post.astro](file:///Users/oupadhyay/Downloads/projects/website/src/layouts/Post.astro) prose layout |

Content comes from [content collections](file:///Users/oupadhyay/Downloads/projects/website/src/content.config.ts)
(Markdown under `src/content/writing/`) and a typed
[projects data module](file:///Users/oupadhyay/Downloads/projects/website/src/data/projects.ts).

## Design system

- **Color**: monochromatic OKLCH tokens with per-link decoration accents
  (chester.how pattern); dark default with a light theme via `[data-theme="light"]`.
- **Type**: Instrument Serif (headings), Geist (body), Ioskeley Mono (labels/meta).
- **Layout**: 680px reading column; sticky [Nav](file:///Users/oupadhyay/Downloads/projects/website/src/components/Nav.astro).
- **Tokens & resets**: [global.css](file:///Users/oupadhyay/Downloads/projects/website/src/styles/global.css).

## Interactions verified

- **Theme toggle** — persists to `localStorage`, FOUC-prevention inline script in
  [Base.astro](file:///Users/oupadhyay/Downloads/projects/website/src/layouts/Base.astro);
  handler uses event delegation so it survives view-transition body swaps.
- **Inline links** — colored underlines that brighten on hover.
- **Cards** — hover elevation + `active:scale(0.97)` tactile press.
- **Writing rows** — connector line glows on hover.
- **Footer links** — arrow micro-shift on hover.
- **View transitions** — fade/slide page navigation via `ClientRouter`.
- **Accessibility** — `prefers-reduced-motion` disables animations.

## Bug fixes during verification

1. **Theme toggle broke after in-app navigation** — `ClientRouter` swaps the `<body>`,
   orphaning the button's click listener. Fixed with one-time document-level event
   delegation guarded by a window flag.
2. **Post dates off by one day** — `"2025-06-01"` parses as UTC midnight but was
   formatted in the build machine's local timezone, rendering as "May '25". Dates
   are now formatted/grouped in UTC.

## Build & preview

```bash
pnpm build      # static output in dist/ (4 routes)
pnpm preview    # serve the production build at http://localhost:4321
```

## Lighthouse (run on the preview server)

With `pnpm preview` running, open Chrome DevTools → Lighthouse on
`http://localhost:4321/` and audit Performance, Accessibility, Best Practices, SEO.
Targets: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO ≥ 95.
