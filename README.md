# ojasw.dev

Ojasw Upadhyay's personal website — a static, dark-mode-first digital garden.
Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com),
typeset in Instrument Serif, Geist, and Ioskeley Mono. Ships zero JS except a tiny
theme-toggle island and Astro's view-transition router (Mermaid loads only on pages
that contain a diagram).

See [`docs/walkthrough.md`](docs/walkthrough.md) for an architecture overview.

## Tech stack

- **Astro v6** — static site generation, content collections, view transitions
- **Tailwind CSS v4** — via `@tailwindcss/vite`
- **OKLCH** design tokens with dark/light themes (see `src/styles/global.css`)
- **MDX** content with **KaTeX** math and client-rendered **Mermaid** diagrams

## Project structure

```text
src/
├── components/      # Tag, Card, Badge, ProjectCard, WritingEntry, Nav, Footer, …
├── content/
│   └── writing/     # .md / .mdx posts + papers (the "writing" collection)
├── data/projects.ts # typed project list (home Projects section)
├── layouts/         # Base.astro (shell), Post.astro (prose + math/mermaid)
├── lib/             # rehype-mermaid-pre.mjs (mermaid → <pre class="mermaid">)
├── pages/           # index.astro, writing/index.astro, writing/[...slug].astro
└── styles/global.css
public/               # fonts, favicon, CNAME
```

## Commands

Run from the project root (package manager: **pnpm**):

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `pnpm install`  | Install dependencies                         |
| `pnpm dev`      | Start the dev server at `localhost:4321`     |
| `pnpm build`    | Build the production site to `./dist/`       |
| `pnpm preview`  | Preview the production build locally         |
| `pnpm astro ...`| Run Astro CLI commands (e.g. `astro check`)  |

## Authoring content

### Writing & papers

Each entry is a Markdown/MDX file in `src/content/writing/` with frontmatter:

```yaml
---
title: "Post title"
date: "2026-06-01"          # YYYY-MM-DD (rendered in UTC)
description: "Optional summary."
url: "https://…"            # optional — external link (e.g. a paper);
                            # such entries link out and get no internal page
tags: ["Paper", "Award"]    # optional — see the tag system below
---
```

### Tag system

`src/components/Tag.astro` maps tag labels to decoration colors (override with `color`):

| Label | Color |
| :--- | :--- |
| `Paper` | sky |
| `Award` / `Honorable Mention` | lime |
| `New` | rose |
| `Note` | teal |
| `Coming Soon` / `Stealth` | purple |

### Math & diagrams (MDX)

In `.mdx` posts (and `.md`), use KaTeX math and Mermaid diagrams:

````markdown
Inline $e^{i\pi} + 1 = 0$ and display:

$$
\int_0^\infty e^{-x}\,dx = 1
$$

```mermaid
flowchart LR
  A --> B
```
````

Math renders to static HTML at build time. Mermaid is rendered on the client and the
library is lazy-loaded only on pages that contain a diagram.

## Deployment

The site is static (`pnpm build` → `dist/`) and host-agnostic.

### GitHub Pages (configured)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

1. Push to `github.com/oupadhyay/website`.
2. Repo **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.
3. **Custom domain:** `public/CNAME` contains `ojasw.dev`. Point DNS at GitHub Pages:
   - Apex `ojasw.dev`: `A` records → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153` (and the matching `AAAA` records).
   - `www`: `CNAME` → `oupadhyay.github.io`.
   - Then enable **Enforce HTTPS** in Settings → Pages.

> Without a custom domain the site would live at `oupadhyay.github.io/website/`,
> which requires setting `base: '/website'` in `astro.config.mjs` (and would change
> all root-absolute links). The apex domain keeps `base: '/'`.

### Vercel (alternative)

Import the repo at [vercel.com](https://vercel.com) — Astro and pnpm are auto-detected
(build `pnpm build`, output `dist/`). Add the custom domain in the Vercel dashboard and
point DNS at Vercel. The GitHub Pages workflow and `CNAME` file are harmless here.
