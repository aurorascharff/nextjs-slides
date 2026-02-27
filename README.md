# nextjs-slides

[![npm version](https://img.shields.io/npm/v/nextjs-slides.svg)](https://www.npmjs.com/package/nextjs-slides)

Composable slide deck primitives for Next.js — powered by React 19 ViewTransitions, Tailwind CSS v4, and highlight.js syntax highlighting.

Build full presentations from React components with URL-based routing, keyboard navigation, progress indicators, and smooth slide transitions — all declarative.

> **Note:** I'm not experienced with publishing libraries — I built this for my own presentations. That said, feel free to try it out!

## Install

```bash
npm install nextjs-slides
```

## Demo

**[Live demo →](https://nextjs-slides.vercel.app/)**

A minimal demo app lives in `examples/demo`. From the repo root:

```bash
npm run build && cd examples/demo && npm install && npm run dev
```

Open http://localhost:3000 — choose "Geist deck" or "Alternate deck" (Playfair + Dracula theme).

Peer dependencies: `next >=15`, `react >=19`, `tailwindcss >=4`.


## Quick Start

### 1. Import the stylesheet

In your root layout or global CSS:

```css
@import "tailwindcss";
@import "nextjs-slides/styles.css";

@source "../node_modules/nextjs-slides/dist";
```

The `@source` directive tells Tailwind v4 to scan the library for class names — without it, slide styles won't apply.

### 2. Define your slides

```tsx
// app/slides/slides.tsx
import {
  Slide,
  SlideTitle,
  SlideSubtitle,
  SlideBadge,
  SlideCode,
} from "nextjs-slides";

export const slides = [
  <Slide key="intro">
    <SlideBadge>Welcome</SlideBadge>
    <SlideTitle>My Presentation</SlideTitle>
    <SlideSubtitle>Built with nextjs-slides</SlideSubtitle>
  </Slide>,

  <Slide key="code" align="left">
    <SlideTitle>Code Example</SlideTitle>
    <SlideCode title="hello.ts">{`const greeting = "Hello, world!";
console.log(greeting);`}</SlideCode>
  </Slide>,
];
```

### 3. Create the layout (provider)

```tsx
// app/slides/layout.tsx
import { SlideDeck } from "nextjs-slides";
import { slides } from "./slides";

export default function SlidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SlideDeck slides={slides}>{children}</SlideDeck>;
}
```

`SlideDeck` is a client component, so your layout can stay a server component — no `"use client"` needed.

### 4. Add the routes

```tsx
// app/slides/page.tsx
import { redirect } from "next/navigation";

export default function SlidesPage() {
  redirect("/slides/1");
}
```

```tsx
// app/slides/[page]/page.tsx
import { getSlide, generateSlideParams } from "nextjs-slides";
import { slides } from "../slides";

export const generateStaticParams = () => generateSlideParams(slides);

export default async function SlidePage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  return getSlide(await params, slides);
}
```

That's it. Navigate to `/slides` and you have a full slide deck.

## `<SlideDeck>` Props

| Prop           | Type              | Default      | Description                                             |
| -------------- | ----------------- | ------------ | ------------------------------------------------------- |
| `slides`       | `ReactNode[]`     | **required** | Your slides array                                       |
| `basePath`     | `string`          | `"/slides"`  | URL prefix for slide routes                             |
| `exitUrl`      | `string`          | —            | URL for exit button (×). Shows in top-right when set.   |
| `showProgress` | `boolean`         | `true`       | Show dot progress indicator                             |
| `showCounter`  | `boolean`         | `true`       | Show "3 / 10" counter                                   |
| `className`    | `string`          | —            | Additional class for the deck container                 |
| `children`     | `React.ReactNode` | **required** | Route content (from Next.js)                            |

## Primitives

### Layout

- **`<Slide>`** — Full-screen slide container with decorative border. Props: `align` (`"center"` | `"left"`), `className`.
- **`<SlideSplitLayout>`** — Two-column layout with vertical divider. Props: `left`, `right`, `className`.

### Typography

- **`<SlideTitle>`** — Large bold heading (responsive h1).
- **`<SlideSubtitle>`** — Muted secondary text.
- **`<SlideBadge>`** — Inverted pill badge.
- **`<SlideHeaderBadge>`** — Italic accent label.
- **`<SlideNote>`** — Small muted footnote.

### Content

- **`<SlideCode>`** — Syntax-highlighted code block (highlight.js). Props: `title`, `className`. Pass code as `children` string. Language is inferred from the file extension in `title` (e.g. `example.tsx`). Supported languages: **JavaScript** (`.js`, `.jsx`), **TypeScript** (`.ts`, `.tsx`), **HTML/XML** (`.html`, `.xml`). Unrecognized extensions fall back to TypeScript highlighting.
- **`<SlideList>`** / **`<SlideListItem>`** — Bullet list.
- **`<SlideDemo>`** — Interactive component container. Keyboard navigation is disabled inside so you can use inputs and buttons. Props: `label`, `className`.

### Structured

- **`<SlideStatementList>`** / **`<SlideStatement>`** — Title + description pairs with border separators.
- **`<SlideSpeaker>`** — Avatar + name + title row. Props: `name`, `title`, `avatar` (optional image URL).
- **`<SlideSpeakerGrid>`** — 2-column speaker grid.
- **`<SlideSpeakerList>`** — Vertical speaker stack.

### Navigation

- **`<SlideLink>`** — Styled link for navigation. Props: `href`, `variant` (`"primary"` | `"ghost"`), `className`.

## Keyboard Navigation

| Key          | Action         |
| ------------ | -------------- |
| `→` or Space | Next slide     |
| `←`          | Previous slide |

Keyboard events are ignored inside `<SlideDemo>`, inputs, and textareas so you can interact without advancing slides.

## Custom Base Path & Multiple Decks

Use `basePath` for a different URL, `exitUrl` for an exit button (×), and `className` for scoped font/syntax overrides:

```tsx
<SlideDeck slides={slides} basePath="/slides-alt" exitUrl="/" className="slides-alt-deck">
  {children}
</SlideDeck>
```

Route at `/slides-alt/[page]/page.tsx`. Keep `SlideDeck` as the direct layout child (no wrapper div) so the exit animation works.

## Breakout Pages

Pages inside the slides folder but outside the `[page]` route render without deck navigation — useful for live demos:

```
app/slides/
  layout.tsx          ← SlideDeck provider
  [page]/page.tsx     ← Slide routes
  demo/page.tsx       ← Breakout page (no deck chrome)
```

## Styling & CSS

The library **inherits** your app's theme. Primitives use Tailwind utilities that resolve to CSS variables: `--foreground`, `--background`, `--muted-foreground`, `--primary`, `--primary-foreground`, `--border`, `--muted`. Compatible with shadcn/ui and any Tailwind v4 setup that defines these.

`nextjs-slides/styles.css` adds the Vercel-inspired code theme (`--nxs-code-*`, `--sh-*`) and slide transition animations. No scoping — slides inherit your global styles.

**Customize code block:** Override `--nxs-code-bg`, `--nxs-code-border`, `--nxs-code-text` for block styling. Override `--sh-*` for syntax highlighting: `--sh-keyword`, `--sh-string`, `--sh-property`, `--sh-entity`, `--sh-class`, `--sh-tag` (JSX/HTML tags), `--sh-identifier`, `--sh-literal`, `--sh-comment`, `--sh-sign`.

### Geist fonts (optional)

Install `geist`, wire the fonts in your layout, and add the theme variables:

```tsx
// app/layout.tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
```

```css
/* globals.css @theme inline */
--font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-geist-mono), ui-monospace, monospace;
--font-pixel: var(--font-geist-pixel-square), var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
```

Use `className="font-pixel"` on primitives where you want the pixel display font.

## Animations

Slide transitions use the React 19 `<ViewTransition>` component with `addTransitionType()`. The CSS in `nextjs-slides/styles.css` defines the `::view-transition-*` animations. Override them in your own CSS to customize.


## Troubleshooting

**SlideCode syntax highlighting looks broken or colorless** — Ensure you import `nextjs-slides/styles.css` in your root layout or global CSS (see Quick Start). The `--sh-*` variables must be in scope for highlight.js tokens to display correctly.

**`@source` path not found** — The `@source "../node_modules/nextjs-slides/dist"` path is relative to your CSS file. If your `globals.css` lives in `app/`, use `../node_modules/...`. If it lives in the project root, use `./node_modules/nextjs-slides/dist`.

**SlideCode error "Could not find the language '…'"** — Only JavaScript, TypeScript, and HTML/XML are registered. Unrecognized file extensions in the `title` prop (e.g. `.terminal`, `.sh`, `.py`) will fall back to TypeScript highlighting. If you previously saw this error, update the package — the fix gracefully handles unknown languages instead of throwing.

**Exit animation (deck-unveil) not running** — Ensure `SlideDeck` is the direct child of the layout. Wrapping it in a `<div>` can prevent the ViewTransition exit from firing. Use the `className` prop for scoped styling instead.

## For maintainers

See [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel deployment and release workflow.

## License

MIT
