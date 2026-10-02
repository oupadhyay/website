// projects.ts — Structured project data for the projects and home pages.
// Source: GitHub (github.com/oupadhyay) + Google Scholar + LinkedIn.

export interface Project {
  title: string;
  description: string;
  status?: string;
  tags: string[];
  visual: 'point-cloud' | 'orbit' | 'trace';
  href?: string;
  year: number;
}

export const projects: Project[] = [
  {
    title: 'Shard',
    description:
      'A desktop AI prototype exploring ambient interaction, persistent memory, multimodal context, and tool execution.',
    status: 'Completed · Harness exploration',
    tags: ['Rust', 'Tauri', 'TypeScript'],
    visual: 'point-cloud',
    href: 'https://github.com/oupadhyay/shard-v2',
    year: 2024,
  },
  {
    title: 'Serein',
    description: 'Details coming when ready.',
    status: 'Project · Stealth',
    tags: [],
    visual: 'orbit',
    year: 2026,
  },
  {
    title: 'Trace',
    description: 'A home for eclectic interests and rediscovery.',
    status: 'Design study · Stealth',
    tags: [],
    visual: 'trace',
    year: 2026,
  },
];
