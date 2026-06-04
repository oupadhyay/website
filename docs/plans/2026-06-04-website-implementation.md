# Personal Website Implementation Plan

> **For Gemini:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build Ojasw Upadhyay's personal website as a multi-page dark-mode digital garden using Astro v6.4 + Tailwind CSS v4, implementing the full design system from the [design doc](file:///Users/oupadhyay/Downloads/projects/website/docs/plans/2026-06-04-design-system-design.md).

**Architecture:** Static multi-page site with content collections (MDX writing, JSON projects). Monochromatic OKLCH color palette with chester.how-style decoration colors for inline links. Tactile card interactions adapted from jakub.kr. Timeline writing layout adapted from perrera.com. Zero JS shipped except for a theme toggle island (~2KB).

**Tech Stack:** Astro v6.4, Tailwind CSS v4, OKLCH color tokens, Instrument Serif + Geist + Ioskeley Mono fonts, View Transitions API.

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json` (via CLI)
- Create: `src/styles/global.css`
- Modify: `astro.config.mjs` (add Tailwind + view transitions)

**Step 1: Scaffold Astro project**

```bash
# Must run in EMPTY directory — move existing files first
cd /Users/oupadhyay/Downloads/projects/website
mkdir -p /tmp/website-docs-backup
cp -r docs /tmp/website-docs-backup/ 2>/dev/null || true
cp lessons_learned.md /tmp/website-docs-backup/ 2>/dev/null || true

# Scaffold
pnpm create astro@latest ./ -- --template minimal --no-install --no-git
```

> **Note:** `create-astro` requires an empty directory. We back up docs first, scaffold, then restore.

**Step 2: Restore docs and install dependencies**

```bash
cp -r /tmp/website-docs-backup/docs ./
cp /tmp/website-docs-backup/lessons_learned.md ./
pnpm install
pnpm astro add tailwind --yes
```

**Step 3: Download and install fonts**

```bash
mkdir -p public/fonts

# Geist — from Vercel's official CDN
curl -L -o public/fonts/geist-regular.woff2 "https://cdn.jsdelivr.net/npm/geist@1/dist/fonts/geist-sans/Geist-Regular.woff2"
curl -L -o public/fonts/geist-medium.woff2 "https://cdn.jsdelivr.net/npm/geist@1/dist/fonts/geist-sans/Geist-Medium.woff2"

# Instrument Serif — from Google Fonts
curl -L -o public/fonts/instrument-serif-regular.woff2 "https://fonts.gstatic.com/s/instrumentserif/v4/jizBRFtNs2ka5fCjOQ3a.woff2"

# Ioskeley Mono — from GitHub releases
curl -L -o /tmp/ioskeley-mono.zip "https://github.com/ahatem/IoskeleyMono/releases/latest/download/IoskeleyMono.zip"
unzip -o /tmp/ioskeley-mono.zip -d /tmp/ioskeley-mono/
# Find and copy the TTF/WOFF2 files — exact paths may vary by release structure
find /tmp/ioskeley-mono -name "*.woff2" | head -5
```

> **Note:** Font file URLs may change. If downloads fail, fall back to manual download from the respective repos. The Ioskeley Mono release structure may vary — inspect the zip contents and copy the Regular and Bold woff2 files to `public/fonts/`.

**Step 4: Create `src/styles/global.css`**

```css
/* ==========================================================================
   global.css — Base resets, @font-face declarations, OKLCH color tokens,
   and prose styles for the Ojasw Upadhyay personal website.
   ========================================================================== */

/* --- Font Faces --- */
@font-face {
  font-family: 'Geist';
  src: url('/fonts/geist-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Geist';
  src: url('/fonts/geist-medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: 'Instrument Serif';
  src: url('/fonts/instrument-serif-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Ioskeley Mono';
  src: url('/fonts/ioskeley-mono-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Ioskeley Mono';
  src: url('/fonts/ioskeley-mono-bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

/* --- OKLCH Color Tokens --- */
:root {
  /* Dark mode (default) */
  --color-surface-0: oklch(15% 0.005 260);
  --color-surface-1: oklch(20% 0.008 260);
  --color-surface-2: oklch(25% 0.010 260);
  --color-text-primary: oklch(95% 0.005 90);
  --color-text-secondary: oklch(70% 0.005 90);
  --color-text-muted: oklch(45% 0.005 90);
  --color-border: oklch(25% 0.005 260);
  --color-border-hover: oklch(35% 0.008 260);

  /* Decoration colors — inline link underlines only */
  --deco-orange: oklch(75% 0.16 55);
  --deco-sky: oklch(75% 0.14 230);
  --deco-rose: oklch(70% 0.17 15);
  --deco-lime: oklch(80% 0.18 140);
  --deco-purple: oklch(70% 0.15 300);
  --deco-teal: oklch(75% 0.12 185);

  /* Typography tokens */
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-sans: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Ioskeley Mono', 'SF Mono', Consolas, monospace;

  /* Layout tokens */
  --content-width: 680px;
  --section-gap: 4rem;
  --card-gap: 1rem;

  color-scheme: dark;
}

/* Light mode */
[data-theme="light"] {
  --color-surface-0: oklch(97% 0.005 90);
  --color-surface-1: oklch(94% 0.005 90);
  --color-surface-2: oklch(90% 0.008 90);
  --color-text-primary: oklch(15% 0.005 260);
  --color-text-secondary: oklch(35% 0.005 260);
  --color-text-muted: oklch(55% 0.005 260);
  --color-border: oklch(88% 0.005 90);
  --color-border-hover: oklch(80% 0.008 90);

  color-scheme: light;
}

/* Respect system preference when no manual toggle */
@media (prefers-color-scheme: light) {
  :root:not([data-theme]) {
    --color-surface-0: oklch(97% 0.005 90);
    --color-surface-1: oklch(94% 0.005 90);
    --color-surface-2: oklch(90% 0.008 90);
    --color-text-primary: oklch(15% 0.005 260);
    --color-text-secondary: oklch(35% 0.005 260);
    --color-text-muted: oklch(55% 0.005 260);
    --color-border: oklch(88% 0.005 90);
    --color-border-hover: oklch(80% 0.008 90);

    color-scheme: light;
  }
}

/* --- Base Reset --- */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.75;
  color: var(--color-text-secondary);
  background-color: var(--color-surface-0);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100dvh;
}

/* --- Inline Link Decoration (chester.how pattern) --- */
.inline-link {
  color: var(--color-text-primary);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  text-decoration-color: var(--deco-color, var(--color-border));
  transition: text-decoration-color 200ms ease;
}
.inline-link:hover {
  text-decoration-color: var(--deco-color-hover, var(--color-text-muted));
}

/* --- Reduced Motion --- */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Step 5: Configure Astro + Tailwind**

Update `astro.config.mjs`:
```javascript
// astro.config.mjs — Astro v6.4 configuration for ojasw.dev
import { defineConfig } from 'astro/config';
import tailwindcss from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwindcss()],
  site: 'https://ojasw.dev', // Update with actual domain
});
```

**Step 6: Verify dev server starts**

```bash
pnpm dev
```

Expected: Dev server starts at `localhost:4321` without errors.

**Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Astro v6.4 project with Tailwind v4 and OKLCH design tokens

- Astro minimal template with Tailwind CSS integration
- Self-hosted fonts: Instrument Serif, Geist, Ioskeley Mono
- Full OKLCH color token system with dark/light mode support
- Chester.how-style decoration color tokens for inline links
- Base reset, reduced motion support, inline link component"
```

---

## Task 2: Base Layout + Navigation

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/ThemeToggle.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create `src/layouts/Base.astro`**

```astro
---
// Base.astro — HTML shell with head metadata, font loading, and theme initialization.
// All pages extend this layout.

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Software Engineer building at the intersection of AI, design, and intuitive interfaces.' } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Theme initialization — runs before paint to prevent flash -->
    <script is:inline>
      (function() {
        const stored = localStorage.getItem('theme');
        if (stored) {
          document.documentElement.setAttribute('data-theme', stored);
        }
      })();
    </script>
  </head>
  <body>
    <Nav />
    <main class="mx-auto px-6 md:px-8 pt-12 pb-8" style={`max-width: var(--content-width)`}>
      <slot />
    </main>
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

> **Note:** The theme script runs inline before paint to read `localStorage` and set `data-theme`, preventing FOUC (Flash of Unstyled Content). This is the same technique used by every dark-mode site in the audit.

**Step 2: Create `src/components/Nav.astro`**

```astro
---
// Nav.astro — Sticky top navigation with wordmark and minimal links.
// Desktop: horizontal bar. Mobile: same layout, links visible.

const currentPath = Astro.url.pathname;

const links = [
  { href: '/writing', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
];
---
<nav class="sticky top-0 z-50 border-b" style={`border-color: var(--color-border); background: var(--color-surface-0)`}>
  <div class="mx-auto flex items-center justify-between px-6 md:px-8 py-3" style={`max-width: var(--content-width)`}>
    <a href="/" class="text-lg no-underline" style={`font-family: var(--font-serif); color: var(--color-text-primary)`}>
      Ojasw Upadhyay
    </a>
    <div class="flex items-center gap-6">
      {links.map(link => (
        <a
          href={link.href}
          class:list={[
            'nav-link text-sm no-underline transition-colors duration-200',
            currentPath.startsWith(link.href) ? 'active' : ''
          ]}
        >
          {link.label}
        </a>
      ))}
      <ThemeToggle />
    </div>
  </div>
</nav>

<style>
  .nav-link {
    font-family: var(--font-sans);
    color: var(--color-text-muted);
  }
  .nav-link:hover,
  .nav-link.active {
    color: var(--color-text-primary);
  }
</style>
```

**Step 3: Create `src/components/ThemeToggle.astro`**

```astro
---
// ThemeToggle.astro — Client-side island for dark/light mode switching.
// Uses localStorage for persistence, respects prefers-color-scheme as default.
---
<button
  id="theme-toggle"
  aria-label="Toggle dark/light mode"
  class="theme-toggle"
  type="button"
>
  <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
  <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
</button>

<style>
  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text-muted);
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 200ms ease;
  }
  .theme-toggle:hover {
    color: var(--color-text-primary);
  }

  /* Show/hide icons based on current theme */
  :root[data-theme="light"] .icon-sun { display: none; }
  :root[data-theme="light"] .icon-moon { display: block; }
  :root:not([data-theme="light"]) .icon-sun { display: block; }
  :root:not([data-theme="light"]) .icon-moon { display: none; }
</style>

<script>
  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
</script>
```

**Step 4: Update `src/pages/index.astro` with minimal content**

```astro
---
// index.astro — Home page with bio, featured projects, recent writing, and social links.
import Base from '../layouts/Base.astro';
---
<Base title="Ojasw Upadhyay">
  <section>
    <h1 class="text-2xl mb-1" style="font-family: var(--font-serif); color: var(--color-text-primary); letter-spacing: -0.025em; line-height: 1.3">
      Ojasw Upadhyay
    </h1>
    <p class="text-sm mb-6" style="font-family: var(--font-mono); color: var(--color-text-muted)">
      Software Engineer at YouTube · Georgia Tech '25
    </p>
    <p>
      I build things at the intersection of AI, design, and intuitive interfaces.
      Currently working on AI Dubbing at
      <a class="inline-link" style="--deco-color: var(--deco-orange)">YouTube</a>.
      Previously: two internships at
      <a class="inline-link" style="--deco-color: var(--deco-orange)">Google</a>,
      makerspace AI safety research at
      <a class="inline-link" style="--deco-color: var(--deco-lime)">Georgia Tech</a>.
    </p>
  </section>
</Base>
```

**Step 5: Verify dev server renders correctly**

```bash
pnpm dev
```

Visit `localhost:4321`. Expected: dark background, Instrument Serif heading, Geist body, monochrome palette, colored underlines on inline links, sticky nav with theme toggle.

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add Base layout, Nav, ThemeToggle, and home page skeleton

- Base layout with FOUC-preventing theme init script
- Sticky nav with serif wordmark and sans-serif links
- Theme toggle island with sun/moon SVG icons and localStorage persistence
- Home page bio section with chester.how-style decoration link underlines"
```

---

## Task 3: Reusable Components

**Files:**
- Create: `src/components/SectionHeader.astro`
- Create: `src/components/Card.astro`
- Create: `src/components/Badge.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/WritingEntry.astro`
- Create: `src/components/Footer.astro`

**Step 1: Create `src/components/SectionHeader.astro`**

```astro
---
// SectionHeader.astro — Uppercase monospace label with horizontal rule.
// Adapted from alexanderobenauer.com's category markers.
interface Props {
  label: string;
}
const { label } = Astro.props;
---
<div class="section-header">
  <span class="section-label">{label}</span>
  <div class="section-rule"></div>
</div>

<style>
  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .section-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    white-space: nowrap;
  }
  .section-rule {
    flex: 1;
    height: 1px;
    background: var(--color-border);
  }
</style>
```

**Step 2: Create `src/components/Card.astro`**

```astro
---
// Card.astro — Tactile interactive card surface.
// Adapted from chester.how's skeuomorphic shadows + jakub.kr's scale feedback.
interface Props {
  href?: string;
  class?: string;
}
const { href, class: className } = Astro.props;
const Tag = href ? 'a' : 'div';
---
<Tag href={href} class:list={['card', className]}>
  <slot />
</Tag>

<style>
  .card {
    display: block;
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 1.25rem;
    transition: background 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out, scale 100ms ease-out;
    text-decoration: none;
    color: inherit;
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
  }
</style>
```

**Step 3: Create `src/components/Badge.astro`**

```astro
---
// Badge.astro — Debossed pill badge for tech stack labels and tags.
// Adapted from chester.how's .shadow-inset-skeuo for dark mode.
interface Props {
  label: string;
}
const { label } = Astro.props;
---
<span class="badge">{label}</span>

<style>
  .badge {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.02em;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    background: var(--color-surface-2);
    color: var(--color-text-secondary);
    box-shadow:
      inset 0 0 0 1px oklch(100% 0 0 / 0.05),
      inset 0 -1px 0 0 oklch(0% 0 0 / 0.15);
  }
</style>
```

**Step 4: Create `src/components/ProjectCard.astro`**

```astro
---
// ProjectCard.astro — Extended card for the Projects page.
// Icon + title + description + tech stack badges.
import Card from './Card.astro';
import Badge from './Badge.astro';

interface Props {
  title: string;
  description: string;
  href?: string;
  icon?: string;
  tags?: string[];
}
const { title, description, href, icon = '📦', tags = [] } = Astro.props;
---
<Card href={href}>
  <div class="project-icon">{icon}</div>
  <h3 class="project-title">{title}</h3>
  <p class="project-desc">{description}</p>
  {tags.length > 0 && (
    <div class="project-tags">
      {tags.map(tag => <Badge label={tag} />)}
    </div>
  )}
</Card>

<style>
  .project-icon {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
  .project-title {
    font-family: var(--font-sans);
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.6;
    letter-spacing: -0.01em;
    color: var(--color-text-primary);
    margin-bottom: 0.25rem;
  }
  .project-desc {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
    margin-bottom: 0.75rem;
  }
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }
</style>
```

**Step 5: Create `src/components/WritingEntry.astro`**

```astro
---
// WritingEntry.astro — Timeline row for writing/research entries.
// Adapted from perrera.com's timeline connector pattern.
interface Props {
  title: string;
  date: string;
  href: string;
  isNew?: boolean;
}
const { title, date, href, isNew = false } = Astro.props;
---
<a href={href} class="writing-entry group">
  <span class="entry-title">{title}</span>
  <span class="entry-connector"></span>
  {isNew && <span class="entry-new">NEW</span>}
  <span class="entry-date">{date}</span>
</a>

<style>
  .writing-entry {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    text-decoration: none;
    color: inherit;
    transition: background 200ms ease;
    border-radius: 6px;
    margin: 0 -0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .writing-entry:hover {
    background: var(--color-surface-1);
  }
  .entry-title {
    font-family: var(--font-sans);
    font-weight: 500;
    font-size: 0.875rem;
    color: var(--color-text-primary);
    white-space: nowrap;
  }
  .entry-connector {
    flex: 1;
    height: 1px;
    background: var(--color-border);
    opacity: 0.15;
    transition: opacity 500ms ease;
  }
  .writing-entry:hover .entry-connector {
    opacity: 0.5;
  }
  .entry-new {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    letter-spacing: 0.05em;
    padding: 0.1rem 0.35rem;
    border-radius: 3px;
    border: 1px solid var(--deco-rose);
    color: var(--deco-rose);
  }
  .entry-date {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    white-space: nowrap;
  }
</style>
```

**Step 6: Create `src/components/Footer.astro`**

```astro
---
// Footer.astro — Minimal footer with social links and colophon.
const links = [
  { href: 'https://github.com/oupadhyay', label: 'GitHub' },
  { href: 'https://scholar.google.com/citations?user=nPogjt0AAAAJ', label: 'Scholar' },
  { href: 'https://linkedin.com/in/ojasw', label: 'LinkedIn' },
];
---
<footer class="footer">
  <div class="footer-links">
    {links.map((link, i) => (
      <>
        <a href={link.href} target="_blank" rel="noopener noreferrer" class="footer-link">
          {link.label}<span class="arrow">↗</span>
        </a>
        {i < links.length - 1 && <span class="footer-sep">·</span>}
      </>
    ))}
  </div>
  <p class="colophon">Built with Astro. Set in Instrument Serif, Geist & Ioskeley Mono.</p>
</footer>

<style>
  .footer {
    margin-top: var(--section-gap);
    padding: 2rem 0;
    border-top: 1px solid var(--color-border);
    text-align: center;
  }
  .footer-links {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  .footer-link {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color 200ms ease;
  }
  .footer-link:hover {
    color: var(--color-text-primary);
  }
  .footer-link .arrow {
    display: inline-block;
    font-size: 0.7em;
    margin-left: 0.15em;
    transition: transform 200ms ease;
  }
  .footer-link:hover .arrow {
    transform: translate(2px, -2px);
  }
  .footer-sep {
    color: var(--color-text-muted);
    opacity: 0.3;
  }
  .colophon {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    opacity: 0.5;
  }
</style>
```

**Step 7: Verify all components render**

Add temporary test content to `index.astro` importing SectionHeader, ProjectCard, WritingEntry, and Footer. Verify at `localhost:4321`.

**Step 8: Commit**

```bash
git add .
git commit -m "feat: add reusable component library

- SectionHeader: uppercase mono label with horizontal rule
- Card: tactile surface with hover elevation and active scale-down
- Badge: debossed pill with inset shadows
- ProjectCard: icon + title + description + tech stack badges
- WritingEntry: timeline row with connector line glow on hover
- Footer: social links with arrow micro-shift and colophon"
```

---

## Task 4: Home Page Assembly

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Assemble the full home page**

Wire up all components with real content from the research:

- **Bio section**: Name, subtitle, paragraph with colored inline links
- **Projects section**: SectionHeader + 2-column grid of 4 ProjectCards (Shard v2, AI PI, LOTUS, SynLexLM)
- **Writing section**: SectionHeader + year-grouped WritingEntry rows
- **Elsewhere section**: SectionHeader + inline social links
- **Footer**

Use the exact content from the profile research (Google SWE, YouTube AI Dubbing, GT '25, publications, repos).

**Step 2: Verify layout at desktop and mobile widths**

Expected: content stays within 680px column, project grid collapses to 1-col on mobile, all sections have correct spacing.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: assemble home page with real content

- Bio with chester.how-style decoration links (YouTube=orange, GT=lime)
- 4 project cards: Shard v2, AI PI, LOTUS, SynLexLM
- Year-grouped writing timeline with perrera.com connector pattern
- Elsewhere section with external links
- Footer with colophon"
```

---

## Task 5: Projects Page

**Files:**
- Create: `src/pages/projects.astro`
- Create: `src/content/projects/` directory with JSON data files

**Step 1: Create project data**

Create `src/data/projects.ts` with typed project data:

```typescript
// projects.ts — Structured project data for the projects page.
export interface Project {
  title: string;
  description: string;
  icon: string;
  tags: string[];
  href?: string;
  year: number;
}

export const projects: Project[] = [
  {
    title: 'Shard v2',
    description: 'AI assistant designed to complement user workflows. Built with Rust and Tauri.',
    icon: '🔮',
    tags: ['Rust', 'Tauri', 'TypeScript'],
    href: 'https://github.com/oupadhyay/shard-v2',
    year: 2024,
  },
  {
    title: 'AI PI',
    description: 'RAG-based conversational AI for the Georgia Tech Invention Studio. Uses Gemma 3 + Pinecone.',
    icon: '🧠',
    tags: ['Python', 'RAG', 'Gemma 3'],
    href: '#',
    year: 2025,
  },
  {
    title: 'LOTUS',
    description: 'Improving transformer efficiency with sparsity pruning and data lottery tickets.',
    icon: '⚡',
    tags: ['PyTorch', 'Transformers', 'Pruning'],
    href: 'https://arxiv.org/abs/2405.00906',
    year: 2024,
  },
  {
    title: 'SynLexLM',
    description: 'Scaling legal LLMs with synthetic data and curriculum learning for legal QA.',
    icon: '⚖️',
    tags: ['Python', 'LLM', 'Curriculum Learning'],
    href: 'https://arxiv.org/abs/2504.18762',
    year: 2025,
  },
];
```

**Step 2: Create `src/pages/projects.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import ProjectCard from '../components/ProjectCard.astro';
import Footer from '../components/Footer.astro';
import { projects } from '../data/projects';
---
<Base title="Projects — Ojasw Upadhyay">
  <h1 class="page-title">Projects</h1>
  <div class="project-grid">
    {projects.map(project => (
      <ProjectCard
        title={project.title}
        description={project.description}
        href={project.href}
        icon={project.icon}
        tags={project.tags}
      />
    ))}
  </div>
  <Footer />
</Base>

<style>
  .page-title {
    font-family: var(--font-serif);
    font-size: 1.875rem;
    font-weight: 400;
    letter-spacing: -0.025em;
    line-height: 1.3;
    color: var(--color-text-primary);
    margin-bottom: 2rem;
  }
  .project-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--card-gap);
  }
  @media (min-width: 640px) {
    .project-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
```

**Step 3: Verify at `localhost:4321/projects`**

Expected: 2-column grid on desktop, 1-column on mobile, tactile card hover effects, debossed tech stack badges.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add projects page with responsive card grid

- Project data module with typed interface
- 4 projects: Shard v2, AI PI, LOTUS, SynLexLM
- 2-column responsive grid (1-col on mobile)
- Tactile card interactions with badge tech stack labels"
```

---

## Task 6: Writing Page + Content Collections

**Files:**
- Create: `src/pages/writing/index.astro`
- Create: `src/content/writing/` directory with sample MDX posts
- Create: `src/content.config.ts` (Astro content collections config)
- Create: `src/layouts/Post.astro`
- Create: `src/pages/writing/[...slug].astro`

**Step 1: Configure Astro content collections**

Create `src/content.config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { writing };
```

**Step 2: Create sample MDX posts**

Create `src/content/writing/hello-world.mdx`:
```mdx
---
title: "Hello, World"
date: "2025-06-01"
description: "First post on the new site."
---

This is the first post on the new site. More to come.
```

**Step 3: Create writing index page with year-grouped timeline**

Create `src/pages/writing/index.astro` that:
- Fetches all writing entries via `getCollection('writing')`
- Groups by year
- Renders using WritingEntry component with year labels in Ioskeley Mono

**Step 4: Create `src/layouts/Post.astro`**

Post layout with prose styling — inherits from Base, adds a back link, title, date, and styled `<slot />` for MDX content.

**Step 5: Create `src/pages/writing/[...slug].astro`**

Dynamic route that renders individual MDX posts using the Post layout.

**Step 6: Verify**

- `localhost:4321/writing` shows year-grouped timeline
- `localhost:4321/writing/hello-world` renders the MDX content with prose styling

**Step 7: Commit**

```bash
git add .
git commit -m "feat: add writing page with content collections and MDX support

- Astro content collections config for MDX writing posts
- Writing index with year-grouped timeline layout (perrera.com pattern)
- Post layout with prose styling for MDX content
- Dynamic [...slug] routing for individual posts
- Sample hello-world.mdx post"
```

---

## Task 7: View Transitions + Polish

**Files:**
- Modify: `src/layouts/Base.astro` (add View Transitions)
- Modify: `src/components/Nav.astro` (add active link underline animation)
- Create: `public/favicon.svg`

**Step 1: Add Astro View Transitions**

Add `<ViewTransitions />` to Base.astro head. This gives us fade + slide-up page transitions for free.

**Step 2: Add nav link underline animation**

CSS pseudo-element that slides in from left on hover (`scaleX(0) → scaleX(1)`).

**Step 3: Create favicon**

Simple SVG favicon — the letter "O" in Instrument Serif style.

**Step 4: Final visual QA**

Run `pnpm dev` and check:
- [ ] Dark mode default
- [ ] Theme toggle works and persists
- [ ] Nav links highlight current page
- [ ] Page transitions animate smoothly
- [ ] All inline links have colored underlines
- [ ] Project cards have tactile hover/press
- [ ] Writing timeline connector lines glow on hover
- [ ] External link arrows shift on hover
- [ ] Mobile layout collapses correctly
- [ ] `prefers-reduced-motion` disables all animations

**Step 5: Commit**

```bash
git add .
git commit -m "feat: add view transitions, nav animation, and favicon

- Astro View Transitions API for smooth page navigation
- Nav link underline slide-in animation on hover
- SVG favicon with serif 'O' letterform
- Final visual QA pass for all interaction states"
```

---

## Task 8: Build + Verification

**Step 1: Production build**

```bash
pnpm build
```

Expected: Clean build with no errors, static output in `dist/`.

**Step 2: Preview production build**

```bash
pnpm preview
```

Verify at `localhost:4321` that the production build matches dev.

**Step 3: Lighthouse audit**

Run Lighthouse in Chrome DevTools on the preview server:
- Performance: ≥ 95
- Accessibility: 100
- Best Practices: ≥ 95
- SEO: ≥ 95

**Step 4: Final commit**

```bash
git add .
git commit -m "chore: verify production build and lighthouse scores"
```

---

## Execution Notes

- **Font downloads may need adjustment**: The exact CDN/GitHub URLs for font files may change. If a `curl` fails, manually download from the source repo and place in `public/fonts/`.
- **Astro v6.4 API changes**: If any Astro APIs have changed since the design doc was written, consult the [Astro v6 migration guide](https://docs.astro.build/en/guides/upgrade-to/v6/).
- **Tailwind v4 integration**: Astro's `@astrojs/tailwind` should handle v4 natively. If not, use PostCSS with `@tailwindcss/postcss` directly.
- **Content collections**: Astro v6 may have updated the content collections API (e.g., `content.config.ts` location). Check current docs.
