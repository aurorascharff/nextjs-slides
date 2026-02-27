# AGENTS.md

## Project overview

**nextjs-slides** — npm package providing composable slide deck primitives for Next.js. Uses React 19 ViewTransitions, Tailwind CSS v4, and highlight.js syntax highlighting. The library lives in `src/`; a demo app lives in `examples/demo`.

## Setup commands

- Install deps: `npm install`
- Build library: `npm run build`
- Run tests: `npm run test`
- Lint: `npm run lint` (or `npm run lint:fix`)

## Demo app

The demo in `examples/demo` uses the library via `file:../..`. To run it:

```bash
npm run build && cd examples/demo && npm install && npm run dev
```

Open http://localhost:3000 — choose "Geist deck" or "Alternate deck" (Playfair + Dracula theme).

**Demo build** (used by Vercel): The demo's `build` script builds the library first (`cd ../.. && npm install --include=dev && npm run build`), then runs `next build`. This is required because `dist/` is gitignored and the library must be built before the demo can use it.

## Deployment & release

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for Vercel deployment, release workflow (semantic-release), conventional commits, manual release trigger, and `NPM_TOKEN` setup.

## Code style

- TypeScript strict mode
- ESLint: library uses `@eslint/js` + `typescript-eslint`; demo uses `eslint-config-next`
- Test files: add `import React from 'react'` when using JSX (avoids "React refers to a UMD global" error)
- All primitives should be featured in the demo slides (`examples/demo/app/slides/slides.tsx`)

## Key implementation details

- **SlideCode**: Uses highlight.js for syntax highlighting. Supports JavaScript, TypeScript, JSX, TSX (xml sublanguage for tags/attributes). Output is safe HTML (`<span>` with `class`).
- **Geist fonts**: Optional. Use `font-pixel` via `className` only on specific slides (e.g. title, closing). Body uses Geist Sans; apply `GeistSans.className` to `<body>` in layout.
- **Breakout pages**: "Back to slides" from breakout pages (e.g. `demo1`) should link to the slide that links to the breakout (e.g. `/slides/11` for the SlideLink slide).
- **Alternate deck** (`/slides-alt`): Demonstrates multiple decks with different fonts and syntax themes. Uses `basePath`, `exitUrl`, `className` for scoped overrides. `SlideDeck` must be the direct layout child (no wrapper div) for the deck-unveil exit animation to work.

## Before committing

Run `npm run lint` and `npm run test` in the library root. If editing the demo, run `cd examples/demo && npm run lint` as well.
