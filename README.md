# Portfolio — A.3 Constellation

Personal portfolio site built with **Vite + React + TypeScript**, implementing the A.3 Constellation design variant — a live node-network hero where dots drift, edges pulse, and the cursor pulls nearby nodes toward it.

## Stack

- [Vite](https://vite.dev/) — build tool and dev server
- [React 19](https://react.dev/) — UI
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [SCSS Modules](https://sass-lang.com/) — scoped styles per component

## Design

The visual language is the **Constellation** variant from the original design system:

- Animated canvas background — 36 nodes floating on a shared physics field, connected by proximity edges that fade with distance
- Cursor-reactive — nodes gently drift toward the pointer
- Typography pairing: **Bricolage Grotesque** (display) · **Instrument Serif** (italic accents) · **JetBrains Mono** (labels) · **Geist** (body)
- Color palette built on OKLCH: teal `195`, moss `155`, sky `225` against a near-white paper background

## Structure

```
src/
├── data/
│   └── content.ts                 # All portfolio data in one place
├── styles/
│   ├── variables.scss             # Design tokens ($ink, $paper, $teal, fonts)
│   └── global.scss                # CSS custom properties, reset, typography helpers
└── components/
    ├── ConstellationField/        # Animated canvas — nodes, edges, mouse physics
    ├── Nav/                       # Top navigation bar
    ├── Hero/                      # Hero section with stats strip
    ├── About/                     # Two-column about section
    ├── Timeline/                  # Work history grid
    ├── Projects/                  # Node-card project grid
    ├── Principles/                # Dark section — five leadership principles
    ├── Stack/                     # Four-column tools grid
    ├── Contact/                   # Contact links and footer
    └── shared/
        ├── Dot/                   # Colored dot marker
        ├── Pill/                  # Pill button
        ├── Placeholder/           # Hatched SVG placeholder
        └── Portrait/              # Photo with blob/arch/square backdrop
```

Each component ships with a colocated `.module.scss` file that imports tokens via `@use '../../styles/variables'`.

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```
