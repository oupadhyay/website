// @ts-check
// astro.config.mjs — Astro v7 configuration for ojasw.dev
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMermaidPre from './src/lib/rehype-mermaid-pre.mjs';

export default defineConfig({
  site: 'https://ojasw.dev',
  integrations: [mdx()],
  // Preserve Astro 6's HTML-aware whitespace handling. Astro 7 defaults to
  // JSX whitespace, which would remove spaces around inline links.
  compressHTML: true,
  markdown: {
    // Skip Shiki highlighting for mermaid blocks so rehype-mermaid can
    // transform them into client-rendered diagrams.
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    // Keep the unified pipeline because this site uses remark/rehype plugins.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        // Rewrites mermaid code blocks to <pre class="mermaid"> for client-side
        // rendering — no headless browser needed at build time.
        rehypeMermaidPre,
      ],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Mermaid's parser is one indivisible ~594 kB generated module. It is
      // already lazy-loaded only on pages containing a Mermaid diagram.
      chunkSizeWarningLimit: 600,
    },
  },
});
