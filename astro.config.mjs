// @ts-check
// astro.config.mjs — Astro v6.4 configuration for ojasw.dev
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ojasw.dev',
  vite: {
    plugins: [tailwindcss()],
  },
});