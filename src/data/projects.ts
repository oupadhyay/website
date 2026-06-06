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
    description: 'AI-powered desktop assistant designed to complement user workflows. Native app with system-level integrations.',
    icon: '🔮',
    tags: ['Rust', 'Tauri', 'TypeScript'],
    href: 'https://github.com/oupadhyay/shard-v2',
    year: 2024,
  },
  {
    title: 'AI PI',
    description: 'RAG-based conversational AI for the Georgia Tech Invention Studio. Uses Gemma 3 + Pinecone for context-aware Q&A.',
    icon: '🧠',
    tags: ['Python', 'RAG', 'Gemma 3', 'Pinecone'],
    href: 'https://github.com/oupadhyay',
    year: 2025,
  },
  {
    title: 'LOTUS',
    description: 'Improving transformer efficiency with sparsity pruning and data lottery tickets. Published at AAAI 2025 Workshop.',
    icon: '⚡',
    tags: ['PyTorch', 'Transformers', 'Pruning'],
    href: 'https://arxiv.org/abs/2405.00906',
    year: 2024,
  },
  {
    title: 'SynLexLM',
    description: 'Scaling legal LLMs with synthetic data and curriculum learning for legal question answering.',
    icon: '⚖️',
    tags: ['Python', 'LLM', 'Curriculum Learning'],
    href: 'https://arxiv.org/abs/2504.18762',
    year: 2025,
  },
];
