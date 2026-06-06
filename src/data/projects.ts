// projects.ts — Structured project data for the projects and home pages.
// Source: GitHub (github.com/oupadhyay) + Google Scholar + LinkedIn.

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
    description: 'AI-powered desktop assistant designed to complement your workflow. Native app with system-level integrations.',
    icon: '🔮',
    tags: ['Rust', 'Tauri', 'TypeScript'],
    href: 'https://github.com/oupadhyay/shard-v2',
    year: 2024,
  },
  {
    title: 'Stealth Project',
    description: 'Something new in the works. Details coming soon.',
    icon: '🤫',
    tags: ['Coming Soon'],
    year: 2026,
  },
];
