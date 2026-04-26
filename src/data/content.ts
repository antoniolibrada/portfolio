export const BIO = {
  name: 'Nico Alvarez',
  role: 'Engineering Manager — Platform',
  location: 'Lisbon / Remote',
  tagline: 'I build calm teams that ship ambitious software.',
  about:
    "I've spent a decade moving between IC and leadership at companies small enough to feel the impact and large enough to feel the weight. I care about clarity, durable systems, and the people who maintain them.",
  email: 'nico@somewhere.dev',
  years: 11,
  reports: 14,
  teams: 3,
};

export const TIMELINE = [
  { year: '2024 — now',  org: 'Helio',     role: 'Engineering Manager, Platform',   note: 'Three squads, ~14 engineers. Infra, SDK, and DX.' },
  { year: '2022 — 2024', org: 'Helio',     role: 'Staff Engineer → EM',             note: 'Led the migration off the monolith. Then hired the team to maintain it.' },
  { year: '2019 — 2022', org: 'Kettle',    role: 'Senior Engineer, Core',           note: 'Built the routing layer that survived the Series C.' },
  { year: '2017 — 2019', org: 'Oddbird',   role: 'Full-stack Engineer',             note: 'First five engineers. Wore a lot of hats.' },
  { year: '2015 — 2017', org: 'Freelance', role: 'Frontend & Prototyping',          note: 'Shipped a new thing every six weeks.' },
];

export const PROJECTS = [
  {
    tag: 'Platform',
    title: 'The Quiet Rewrite',
    blurb: 'Migrated a 400k-LOC monolith to a modular runtime without freezing feature work. Two years, zero incidents attributable to the migration.',
    metric: '0 rollback',
    year: '2023',
  },
  {
    tag: 'Hiring',
    title: 'Fifteen in Eighteen',
    blurb: 'Grew the platform org from 4 to 19 engineers while keeping attrition below 4%. Designed the interview loop we still use.',
    metric: '4% attrition',
    year: '2022–24',
  },
  {
    tag: 'Developer experience',
    title: 'Minutes, not Mondays',
    blurb: 'Rebuilt local dev tooling: cold start 11m → 40s, CI p95 22m → 6m. The team noticed.',
    metric: '27× faster',
    year: '2024',
  },
  {
    tag: 'Open source',
    title: 'tilt-cli',
    blurb: 'A tiny CLI for managing long-running engineering rituals. 3.2k stars, mostly because it stays out of the way.',
    metric: '3.2k ★',
    year: 'ongoing',
  },
];

export const PRINCIPLES = [
  { k: '01', h: 'Calm is a feature',    p: 'On-call, review queues, and planning cycles are products. If they feel loud, I fix them before I ship anything else.' },
  { k: '02', h: 'Write the memo',        p: 'If a decision is worth making, it\'s worth a paragraph. If it\'s worth a paragraph, it\'s worth reading a week from now.' },
  { k: '03', h: 'Default to the boring', p: 'Postgres, plaintext, plain functions. Exciting technology is the kind you can reason about at 2am.' },
  { k: '04', h: 'People over process',   p: 'Process is scaffolding. Scaffolding comes down when the building stands.' },
  { k: '05', h: 'Keep the door open',    p: 'I work for the engineers who report to me — not the other way around.' },
];

export const STACK = [
  { g: 'Languages',  items: ['TypeScript', 'Go', 'Python', 'Rust (hobby)'] },
  { g: 'Runtime',    items: ['Postgres', 'Kafka', 'Redis', 'NATS'] },
  { g: 'Infra',      items: ['Kubernetes', 'Terraform', 'Pulumi', 'GitHub Actions'] },
  { g: 'Leadership', items: ['1:1s as ritual', 'Written decisions', 'Blameless post-mortems', 'Career ladders'] },
];

export const LINKS = [
  { label: 'Email',   value: 'nico@somewhere.dev' },
  { label: 'GitHub',  value: 'github.com/nico' },
  { label: 'LinkedIn',value: 'in/nico-alvarez' },
  { label: 'Writing', value: 'nico.place/notes' },
  { label: 'Résumé',  value: 'resume.pdf' },
];
