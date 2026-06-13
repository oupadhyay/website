// projects.ts — Structured project data for the projects and home pages.
// Source: GitHub (github.com/oupadhyay) + Google Scholar + LinkedIn.

export interface Project {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  year: number;
}

export const projects: Project[] = [
  {
    title: 'Shard v2',
    description:
      'Privacy-first AI assistant with a 5-tier memory system, autonomous tool calling, and multimodal vision — built as a native desktop app in Rust. Supports multiple LLM providers with automatic fallback, deep research mode, and on-demand persona loading.',
    tags: ['Rust', 'Tauri', 'TypeScript'],
    href: 'https://github.com/oupadhyay/shard-v2',
    year: 2024,
  },
  {
    title: 'Stealth Project',
    description: 'Something new in the works. Details coming soon.',
    tags: ['Coming Soon'],
    year: 2026,
  },
];
