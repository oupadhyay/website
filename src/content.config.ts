// content.config.ts — Astro content collections configuration.
// Defines the 'writing' collection schema for MDX blog posts.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/thoughts' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    // External link (e.g. a published paper). When set, the entry links out
    // instead of rendering an internal /thoughts/<slug> page.
    url: z.string().optional(),
    // Display tags (e.g. "Paper", "Award", "New"). See Tag.astro for colors.
    tags: z.array(z.string()).optional(),
    // Optional per-tag tooltip text, keyed by tag label (e.g. { Paper: "…" }).
    // Overrides the default tooltips defined in Tag.astro.
    tagTooltips: z.record(z.string()).optional(),
  }),
});

export const collections = { thoughts };
