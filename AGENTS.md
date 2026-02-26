# AGENTS.md

## Project overview

**nextjs-slides** — npm package providing composable slide deck primitives for Next.js. Uses React 19 ViewTransitions, Tailwind CSS v4, and sugar-high syntax highlighting. The library lives in `src/`; a demo app lives in `examples/demo`.

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

Open http://localhost:3000 and click "Open slides".

**Demo build** (used by Vercel): The demo's `build` script builds the library first (`cd ../.. && npm install --include=dev && npm run build`), then runs `next build`. This is required because `dist/` is gitignored and the library must be built before the demo can use it.

## Vercel deployment

- **Root directory**: `examples/demo` (type manually; the picker may not show it)
- **Output directory**: `.next` (default)
- **Build command**: Uses the demo's `build` script (builds library, then Next.js)

## Release workflow

Publishing goes to two registries: **npm** (manual, local) and **GitHub Packages** (automated on release).

### 1. Publish to npm (run locally from project root)

```bash
# Bump version in package.json, then:
npm run build && npm run test
npm publish
```

**Auth**: npm uses your terminal login (`npm login`) by default. Alternatively, use an **Automation** or **Granular** token with "Bypass 2FA" at [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens) — add to `.npmrc` as `//registry.npmjs.org/:_authToken=YOUR_TOKEN` (`.npmrc` is gitignored).

### 2. Tag and create GitHub release (triggers GitHub Packages)

```bash
git add -A && git commit -m "Release v0.1.4" && git push
git tag v0.1.4 && git push origin v0.1.4
```

Then create a release at [github.com/aurorascharff/nextjs-slides/releases/new](https://github.com/aurorascharff/nextjs-slides/releases/new) — choose the tag, add notes, publish. The workflow publishes `@aurorascharff/nextjs-slides` to GitHub Packages. Repository URL in `package.json` links npm to the repo automatically.

## Code style

- TypeScript strict mode
- ESLint: library uses `@eslint/js` + `typescript-eslint`; demo uses `eslint-config-next`
- Test files: add `import React from 'react'` when using JSX (avoids "React refers to a UMD global" error)
- All primitives should be featured in the demo slides (`examples/demo/app/slides/slides.tsx`)

## Key implementation details

- **SlideCode**: Uses sugar-high `highlight()` output directly. No DOMPurify — sugar-high only outputs safe HTML (`<span>`, `<code>` with `class` and `style`). DOMPurify was removed because isomorphic-dompurify pulled in jsdom, which triggered Next.js 16's strict Date detection during prerendering.
- **Geist fonts**: Optional. Use `font-pixel` via `className` only on specific slides (e.g. title, closing). Body uses Geist Sans; apply `GeistSans.className` to `<body>` in layout.
- **Breakout pages**: "Back to slides" from breakout pages (e.g. `demo1`) should link to the slide that links to the breakout (e.g. `/slides/11` for the SlideLink slide).

## Before committing

Run `npm run lint` and `npm run test` in the library root. If editing the demo, run `cd examples/demo && npm run lint` as well.
