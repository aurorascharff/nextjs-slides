# nextjs-slides

Composable slide deck primitives for Next.js — powered by React 19 ViewTransitions, Tailwind CSS v4, and sugar-high syntax highlighting.

Build full presentations from React components with URL-based routing, keyboard navigation, progress indicators, and smooth slide transitions — all declarative.

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

Open http://localhost:3000 and click "Open slides".

Peer dependencies: `next >=15`, `react >=19`, `tailwindcss >=4`.

### Enable View Transitions

Add to your `next.config.ts` (merge with existing config) for slide transition animations:

```ts
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
};
```

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

| Prop           | Type              | Default      | Description                             |
| -------------- | ----------------- | ------------ | --------------------------------------- |
| `slides`       | `ReactNode[]`     | **required** | Your slides array                       |
| `basePath`     | `string`          | `"/slides"`  | URL prefix for slide routes             |
| `showProgress` | `boolean`         | `true`       | Show dot progress indicator             |
| `showCounter`  | `boolean`         | `true`       | Show "3 / 10" counter                   |
| `className`    | `string`          | —            | Additional class for the deck container |
| `children`     | `React.ReactNode` | **required** | Route content (from Next.js)            |

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

- **`<SlideCode>`** — Syntax-highlighted code block (sugar-high). Props: `title`, `className`. Pass code as `children` string.
- **`<SlideList>`** / **`<SlideListItem>`** — Bullet list.
- **`<SlideDemo>`** — Interactive component container. Keyboard/click navigation is disabled inside. Props: `label`, `className`.

### Structured

- **`<SlideStatementList>`** / **`<SlideStatement>`** — Title + description pairs with border separators.
- **`<SlideSpeaker>`** — Avatar + name + title row.
- **`<SlideSpeakerGrid>`** — 2-column speaker grid.
- **`<SlideSpeakerList>`** — Vertical speaker stack.

### Navigation

- **`<SlideLink>`** — Styled link for navigation. Props: `href`, `variant` (`"primary"` | `"ghost"`), `className`.

## Keyboard Navigation

| Key          | Action         |
| ------------ | -------------- |
| `→` or Space | Next slide     |
| `←`          | Previous slide |

Interactive areas (`<SlideDemo>`, inputs, textareas) don't trigger navigation.

## Custom Base Path

Host slides at a different URL:

```tsx
<SlideDeck slides={slides} basePath="/deck">
  {children}
</SlideDeck>
```

Then route at `/deck/[page]/page.tsx`.

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

`nextjs-slides/styles.css` adds only code syntax highlighting (`--sh-*`) and slide transition animations. No scoping — slides inherit your global styles.

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

**Required:** Enable `experimental.viewTransition: true` in your Next.js config (see Install section above). Without it, transitions may not animate correctly.

## License

MIT
