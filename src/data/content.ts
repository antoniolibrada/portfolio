export type Bio = {
  name: string;
  role: string;
  location: string;
  tagline: string;
  about: string;
  email: string;
  years: number;
  reports: number;
  teams: number;
};

export type TimelineEntry = {
  year: string;
  org: string;
  role: string;
  note: string;
};

export type Project = {
  tag: string;
  title: string;
  blurb: string;
  metric: string;
  year: string;
};

export type Principle = {
  k: string;
  h: string;
  p: string;
};

export type StackGroup = {
  g: string;
  items: string[];
};

export type Link = {
  label: string;
  value: string;
};

export const BIO: Bio = {
  name: 'Antonio Librada',
  role: 'Engineering Manager',
  location: 'Salzburg, Austria',
  tagline: 'I build safe environments where engineers grow and teams ship ambitious software.',
  about:
    'Accomplished engineer with 10 years of experience in software development, including over 5 years of experience managing, leading and building engineering teams with strong focus on creating safe environments for developers to grow, reach their potential and improve their skills. Successfully delivered projects keeping an agile mindset to adapt to changing requirements.',
  email: 'me@antoniolibrada.com',
  years: 10,
  reports: 6,
  teams: 3,
};

export const TIMELINE: TimelineEntry[] = [
  { year: '2020 — now',  org: 'Red Bull Media House', role: 'Engineering Manager',    note: 'Cross-functional team of 6 engineers. Cloud architecture, talent management tools, and product development using Domain Driven Design.' },
  { year: '2017 — 2020', org: 'Red Bull Media House', role: 'Lead Software Engineer', note: 'Led brand products (Cartoons, Energydrink, Organics). Improved architecture, logging, and metrics. Streamlined workflows and stakeholder management.' },
  { year: '2016 — 2017', org: 'Red Bull Media House', role: 'Developer Advocate',     note: 'Technical advisor for global web campaigns. Led complex CMS projects including Red Bull Racing and Red Bull Cliff Diving.' },
  { year: '2015 — 2016', org: 'Red Bull Media House', role: 'Full Stack Developer',   note: 'Built RedBull.com — millions of daily users across 30+ languages and 170+ countries. Co-built the CMS from scratch.' },
  { year: '2013 — 2015', org: '3 Banken EDV',         role: 'Lead Frontend Developer', note: 'Banking front-end applications. Established JavaScript standards and led internal front-end workshops.' },
  { year: '2012 — 2013', org: 'Playence',             role: 'Software Developer',     note: 'Java/Spring enterprise search engine. First deep dive into JavaScript for UI-heavy interfaces.' },
];

export const PROJECTS: Project[] = [
  {
    tag: 'Editorial platform',
    title: 'RedBull.com',
    blurb: 'Contributed as frontend engineer and co-architected the full editorial stack — from the editors\' CMS backend through to the end-user experience — serving millions of daily users across 30+ languages and 170+ countries.',
    metric: '170+ countries',
    year: '2015',
  },
  {
    tag: 'Refactor',
    title: 'jobs.redbull.com',
    blurb: 'Complete architectural overhaul of the recruitment platform with zero downtime throughout. Redesigned the cloud setup, improved performance, cut infrastructure costs, and accelerated time to market.',
    metric: '0 downtime',
    year: '2019',
  },
  {
    tag: 'Rewrite',
    title: 'Wingfinder',
    blurb: 'Full rewrite with no agency handover or usable requirements. Reverse-engineered the product, then designed and built the frontend and cloud architecture from scratch to support millions of users a month.',
    metric: 'M+ users/month',
    year: '2022',
  },
];

export const PRINCIPLES: Principle[] = [
  { k: '01', h: 'Safety is a feature',       p: 'Engineers do their best work when they feel safe to experiment, fail, and grow. I build that environment before optimising for anything else.' },
  { k: '02', h: 'Grow your people',           p: 'A manager\'s output is the output of their team. I invest in each engineer\'s growth because it compounds across everything we build.' },
  { k: '03', h: 'Agile over rigid',           p: 'Requirements change — plans should too. An agile mindset means delivering value continuously, not waiting for the perfect spec.' },
  { k: '04', h: 'Quality and speed together', p: 'Meeting deadlines and keeping quality are not in opposition. I push for both, and when they conflict, we talk about it openly.' },
  { k: '05', h: 'Cross-functional by default', p: 'The best solutions come from engineers, designers, and product working shoulder to shoulder — not from handoffs across silos.' },
];

export const STACK: StackGroup[] = [
  { g: 'Back-end',   items: ['Java', 'Kotlin', 'Node.js', 'Spring'] },
  { g: 'Front-end',  items: ['React', 'Svelte', 'TypeScript'] },
  { g: 'Cloud',      items: ['Terraform', 'AWS'] },
  { g: 'Leadership', items: ['Cross-functional teams', 'Domain Driven Design', 'Agile / Scrum', 'Career development'] },
];

export const LINKS: Link[] = [
  { label: 'Email',    value: 'me@antoniolibrada.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/antoniolibrada' },
  { label: 'GitHub',   value: 'github.com/antoniolibrada' },
];
