// @ts-check
// astro.config.mjs — Astro v6.4 configuration for ojasw.dev
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMermaidPre from './src/lib/rehype-mermaid-pre.mjs';

export default defineConfig({
  site: 'https://www.ojasw.dev',
  integrations: [mdx()],
  markdown: {
    // Skip Shiki highlighting for mermaid blocks so rehype-mermaid can
    // transform them into client-rendered diagrams.
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      // Rewrites mermaid code blocks to <pre class="mermaid"> for client-side
      // rendering — no headless browser needed at build time.
      rehypeMermaidPre,
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
