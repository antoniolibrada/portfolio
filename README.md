# Portfolio — A.3 Constellation

Personal portfolio site built with **Vite + React + TypeScript**, implementing the A.3 Constellation design variant — a live node-network hero where dots drift, edges pulse, and the cursor pulls nearby nodes toward it.

## Stack

- [Vite](https://vite.dev/) — build tool and dev server
- [React 19](https://react.dev/) — UI
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [SCSS Modules](https://sass-lang.com/) — scoped styles per component, BEM naming convention
- [PostCSS](https://postcss.org/) — CSS post-processing (autoprefixer, modern color conversion)
- [Autoprefixer](https://github.com/postcss/autoprefixer) — vendor prefix injection
- [postcss-preset-env](https://preset-env.cssdb.org/) — OKLCH → `color(display-p3)` + hex fallbacks

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

Each component ships with a colocated `.module.scss` file. Class names follow **BEM** (`block__element--modifier`) and are accessed in TSX via bracket notation — e.g. `styles['hero__stat-key']` — so the same names work as plain CSS class strings in a future vanilla JS build.

### CSS preprocessing pipeline

The full pipeline for every `.module.scss` file is:

```
SCSS source → Sass compiler → PostCSS → output CSS
```

| Stage | Tool | What it does |
|---|---|---|
| 1 | **Sass** | Compiles SCSS, resolves `@use 'variables'` via `loadPaths` |
| 2 | **postcss-preset-env** (stage 2) | Converts `oklch()` to `color(display-p3)` with hex fallbacks for older browsers |
| 3 | **Autoprefixer** | Injects `-webkit-`/`-moz-` vendor prefixes where needed |

SCSS variables (`$ink`, `$teal`, `$font-mono`, etc.) are available in any component stylesheet via `@use 'variables' as *` — the `src/styles` directory is on the Sass load path, so no relative paths are needed.

### CSS Modules scoping

CSS Modules class names are scoped at build time using `generateScopedName`:

| Environment | Format | Example output |
|---|---|---|
| Development | `[name]_[local]` | `Hero_hero__content` — readable in DevTools |
| Production | `[hash:base64:5]` | `_3xK9a` — short and collision-free |

## Vanilla TypeScript usage

The constellation animation lives in `src-vanilla/constellation.ts` as a plain class with zero framework dependencies. It can be dropped into any HTML page or bundled without React.

```ts
import { ConstellationField } from './src/vanilla/constellation';

const canvas = document.querySelector<HTMLCanvasElement>('#bg')!;
const field = new ConstellationField();
field.mount(canvas);

// Tear down when done (removes listeners, cancels rAF, disconnects ResizeObserver)
// field.destroy();
```

The canvas element must already be in the DOM and have non-zero CSS dimensions before `mount()` is called. `destroy()` is safe to call at any time and is idempotent.

### Static / reduced-motion mode

When `prefers-reduced-motion: reduce` is active in the OS or browser, the class detects it automatically and switches to static mode: nodes are placed with a seeded PRNG (deterministic layout), the canvas is rendered once, and no animation loop or mouse listeners are started. This makes it safe for accessibility and for pixel-stable regression screenshots.

You can also force static mode explicitly — useful in tests:

```ts
// Explicit static with the default seed (always the same layout)
field.mount(canvas, { static: true });

// Custom seed — different deterministic layout
field.mount(canvas, { static: true, seed: 0xdeadbeef });
```

### API

| Method / export | Description |
|---|---|
| `mount(canvas, options?)` | Initialises nodes, starts the animation loop (or renders once in static mode), attaches resize listener |
| `destroy()` | Cancels `requestAnimationFrame`, disconnects `ResizeObserver`, removes all event listeners |
| `ConstellationOptions.static` | `boolean` — force static mode (default `false`) |
| `ConstellationOptions.seed` | `number` — PRNG seed for static mode (default `DEFAULT_SEED`) |
| `DEFAULT_SEED` | Exported constant — the seed used when none is supplied |

Type-check the vanilla module in isolation:

```bash
npx tsc --project tsconfig.vanilla.json --noEmit
```

Run unit tests:

```bash
npm run test:unit
```

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
