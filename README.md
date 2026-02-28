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
@import 'tailwindcss';
@import 'nextjs-slides/styles.css';
```

The stylesheet includes an `@source` directive that tells Tailwind v4 to scan the library's component files for utility classes — no extra configuration needed.

### 2. Define your slides

```tsx
// app/slides/slides.tsx
import {
  Slide,
  SlideTitle,
  SlideSubtitle,
  SlideBadge,
  SlideCode,
} from 'nextjs-slides';

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
import { SlideDeck } from 'nextjs-slides';
import { slides } from './slides';

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
import { redirect } from 'next/navigation';

export default function SlidesPage() {
  redirect('/slides/1');
}
```

```tsx
// app/slides/[page]/page.tsx
import { getSlide, generateSlideParams } from 'nextjs-slides';
import { slides } from '../slides';

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

| Prop           | Type                              | Default      | Description                                            |
| -------------- | --------------------------------- | ------------ | ------------------------------------------------------ |
| `slides`       | `ReactNode[]`                     | **required** | Your slides array                                      |
| `speakerNotes` | `(string \| ReactNode \| null)[]` | —            | Notes per slide (same index). See Speaker Notes below. |
| `syncEndpoint` | `string`                          | —            | API route for presenter ↔ phone sync.                  |
| `basePath`     | `string`                          | `"/slides"`  | URL prefix for slide routes                            |
| `exitUrl`      | `string`                          | —            | URL for exit button (×). Shows in top-right when set.  |
| `showProgress` | `boolean`                         | `true`       | Show dot progress indicator                            |
| `showCounter`  | `boolean`                         | `true`       | Show "3 / 10" counter                                  |
| `className`    | `string`                          | —            | Additional class for the deck container                |
| `children`     | `React.ReactNode`                 | **required** | Route content (from Next.js)                           |

## Primitives

### Layout

- **`<Slide>`** — Full-screen slide container with decorative border. Props: `align` (`"center"` | `"left"`), `className`.
- **`<SlideColumns>`** — Inline two-column grid for use **inside** `<Slide>` when you need a spanning title above two columns. Props: `left`, `right`, `className`.
- **`<SlideSplitLayout>`** — Full-viewport two-column layout with vertical divider — a **top-level** alternative to `<Slide>` (do not nest inside `<Slide>`). Props: `left`, `right`, `className`.

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

## Speaker Notes

Write notes in a markdown file — one section per slide, separated by `---` on its own line. Sections are matched to slides by **position**: the first section = slide 1, the second = slide 2, and so on. Empty sections mean no notes for that slide.

```md
Welcome everyone. This is the opening slide.

---

Talk about the base container here.

---

---

Slide 4 notes. Slide 3 had none.
```

**Keep the number of sections in sync with your slides** — if you have 12 slides, you need 12 sections (empty is fine). Don't start the file with `---`; the first block of text (before any `---`) is for slide 1.

**Leading document title:** If the file starts with `# My Title` (a single heading line), use `stripLeadingTitle: true` so that block isn't treated as slide 1:

```ts
parseSpeakerNotes(markdown, { stripLeadingTitle: true });
```

Parse the file and pass it to `SlideDeck`. Include `syncEndpoint` so the phone can follow along:

```tsx
// app/slides/layout.tsx
import fs from 'fs';
import path from 'path';
import { SlideDeck, parseSpeakerNotes } from 'nextjs-slides';
import { slides } from './slides';

const notes = parseSpeakerNotes(
  fs.readFileSync(path.join(process.cwd(), 'app/slides/notes.md'), 'utf-8')
);

export default function SlidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SlideDeck
      slides={slides}
      speakerNotes={notes}
      syncEndpoint="/api/nxs-sync"
    >
      {children}
    </SlideDeck>
  );
}
```

Without `syncEndpoint`, the deck won't broadcast slide changes and the phone will stay on the first note.

### Phone sync (presenter notes on your phone)

Open `/notes` on your phone while presenting on your laptop. The phone shows the current slide's notes and follows along as you navigate with the keyboard.

**How sync works:** When you navigate with arrow keys or spacebar, the deck POSTs `{ slide, total }` to the sync endpoint. The notes page polls that endpoint every 500ms and displays `notes[slide - 1]` — so the notes array index must match slide order. Use the same `notes.md` file in both the layout and the notes page.

**1. Create the sync API route:**

```ts
// app/api/nxs-sync/route.ts
export { GET, POST } from 'nextjs-slides/sync';
```

**2. Create the notes page** (same `notes.md`, same `parseSpeakerNotes` — indices must match slides):

```tsx
// app/notes/page.tsx
import fs from 'fs';
import path from 'path';
import { parseSpeakerNotes, SlideNotesView } from 'nextjs-slides';

const notes = parseSpeakerNotes(
  fs.readFileSync(path.join(process.cwd(), 'app/slides/notes.md'), 'utf-8')
);

export default function NotesPage() {
  return <SlideNotesView notes={notes} syncEndpoint="/api/nxs-sync" />;
}
```

Open your phone on `http://<your-ip>:3000/notes` (same network).

### Demo notes (extra sections after the slides)

Add more `---` sections after the last slide's notes — these become demo notes you can step through on your phone after the presentation ends:

```md
...last slide notes

---

Open the counter demo. Show how useState drives the count.

---

Switch to the editor. Walk through adding a new slide.
```

The notes view auto-follows the deck during slides. Once you tap "Next" past the last slide, you enter demo notes territory (the header switches to "Demo 1 / 2") and the phone stops auto-syncing so you control it manually.

> **Note:** The sync state lives in server memory — designed for `next dev` or single-server deployments. It won't persist across serverless function invocations.

## Custom Base Path & Multiple Decks

Use `basePath` for a different URL, `exitUrl` for an exit button (×), and `className` for scoped font/syntax overrides:

```tsx
<SlideDeck
  slides={slides}
  basePath="/slides-alt"
  exitUrl="/"
  className="slides-alt-deck"
>
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
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { GeistPixelSquare } from 'geist/font/pixel';

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
    >
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
```

```css
/* globals.css @theme inline */
--font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-geist-mono), ui-monospace, monospace;
--font-pixel:
  var(--font-geist-pixel-square), var(--font-geist-sans), ui-sans-serif,
  system-ui, sans-serif;
```

Use `className="font-pixel"` on primitives where you want the pixel display font.

## Animations

Slide transitions use the React 19 `<ViewTransition>` component with `addTransitionType()`. The CSS in `nextjs-slides/styles.css` defines the `::view-transition-*` animations. Override them in your own CSS to customize.

## Troubleshooting

**SlideCode syntax highlighting looks broken or colorless** — Ensure you import `nextjs-slides/styles.css` in your root layout or global CSS (see Quick Start). The `--sh-*` variables must be in scope for highlight.js tokens to display correctly.

**Split layout not stacking on small screens** — Import `nextjs-slides/styles.css` without a layer: `@import "nextjs-slides/styles.css"` (not `layer(base)`). Layered imports can be overridden by Tailwind utilities. Also ensure the library CSS loads after Tailwind.

**Slide utility classes not applying** — The library's stylesheet includes `@source "./*.js"` so Tailwind v4 automatically scans the library's component files. If styles still don't apply, make sure `nextjs-slides/styles.css` is imported _after_ `tailwindcss` in your CSS. As a fallback, you can manually add `@source "../node_modules/nextjs-slides/dist"` (path relative to your CSS file) in your global CSS.

**SlideCode error "Could not find the language '…'"** — Only JavaScript, TypeScript, and HTML/XML are registered. Unrecognized file extensions in the `title` prop (e.g. `.terminal`, `.sh`, `.py`) will fall back to TypeScript highlighting. If you previously saw this error, update the package — the fix gracefully handles unknown languages instead of throwing.

**`SlideSplitLayout` nested inside `Slide` breaks layout** — `SlideSplitLayout` is a full-viewport component (`h-dvh w-dvw`) that replaces `Slide`, not a child of it. Nesting it inside `Slide` creates a viewport-sized container inside another viewport-sized container with padding, which overflows. If you need a title above two columns, use `<SlideColumns>` inside `<Slide>` instead.

**Exit animation (deck-unveil) not running** — Ensure `SlideDeck` is the direct child of the layout. Wrapping it in a `<div>` can prevent the ViewTransition exit from firing. Use the `className` prop for scoped styling instead.

**Notes out of sync** — Ensure `syncEndpoint` is set and both layout and notes page use the same `notes.md`. On serverless (Vercel), in-memory sync can hit different instances; use a shared store for production.

**Notes show a document title instead of slide 1** — If the file starts with `# My Title` before the first `---`, use `parseSpeakerNotes(markdown, { stripLeadingTitle: true })`.

## For maintainers

See [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel deployment and release workflow.

## License

MIT
