// projects.ts — Structured project data for the projects and home pages.
// Source: GitHub (github.com/oupadhyay) + Google Scholar + LinkedIn.

export interface Project {
  title: string;
  description: string;
  tags: string[];
  visual: 'point-cloud' | 'orbit';
  href?: string;
  year: number;
}

export const projects: Project[] = [
  {
    title: 'Shard',
    description:
      'Privacy-first AI desktop assistant with tiered memory, autonomous tool calling, and multimodal vision — built natively in Rust.',
    tags: ['Rust', 'Tauri', 'TypeScript'],
    visual: 'point-cloud',
    href: 'https://github.com/oupadhyay/shard-v2',
    year: 2024,
  },
  {
    title: 'Stealth',
    description: 'Details coming when ready.',
    tags: [],
    visual: 'orbit',
    year: 2026,
  },
];
