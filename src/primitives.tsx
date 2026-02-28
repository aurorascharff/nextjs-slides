import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { SlideDemoContent } from './slide-demo-content';
import { cn } from './cn';
import type { SlideAlign } from './types';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

function highlightCode(code: string, lang?: string): string {
  if (!lang) return hljs.highlight(code, { language: 'typescript' }).value;
  const language = lang === 'ts' || lang === 'tsx' ? 'typescript' : lang;
  const registered = hljs.getLanguage(language);
  if (!registered)
    return hljs.highlight(code, { language: 'typescript' }).value;
  return hljs.highlight(code, { language }).value;
}

/**
 * Full-viewport slide container with centered content and a decorative border.
 *
 * This is the primary slide primitive — use it as a top-level element in
 * the slides array. For a two-column layout that fills the whole viewport,
 * use {@link SlideSplitLayout} instead.
 *
 * @example
 * ```tsx
 * <Slide align="left">
 *   <SlideTitle>My Slide</SlideTitle>
 *   <SlideSubtitle>Supporting text</SlideSubtitle>
 * </Slide>
 * ```
 */
export function Slide({
  children,
  align = 'center',
  className,
}: {
  children: React.ReactNode;
  /** Content alignment. `"center"` centers both horizontally and text; `"left"` aligns to the start. */
  align?: SlideAlign;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'nxs-slide relative flex h-dvh w-dvw flex-col justify-center gap-8 px-12 py-20 sm:px-24 md:px-32 lg:px-40',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className
      )}
    >
      <div
        className="border-foreground/10 pointer-events-none absolute inset-4 border sm:inset-6"
        aria-hidden
      />
      <div
        className={cn(
          'relative z-10 flex max-w-4xl flex-col gap-6',
          align === 'center' && 'items-center',
          align === 'left' && 'items-start'
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Inline two-column grid for use **inside** a `Slide`.
 *
 * Use this when you need a title or other content above two columns.
 * For a full-viewport two-column slide, use `SlideSplitLayout` instead.
 */
export function SlideColumns({
  left,
  right,
  className,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('grid w-full grid-cols-2 gap-8', className)}>
      <div className="flex min-w-0 flex-col gap-4">{left}</div>
      <div className="flex min-w-0 flex-col gap-4">{right}</div>
    </div>
  );
}

/**
 * Full-viewport two-column slide — a **top-level** alternative to `Slide`.
 *
 * Do **not** nest this inside `Slide`; it renders its own `h-dvh w-dvw`
 * container, border, and padding. To combine a title with two columns,
 * use `SlideColumns` inside a `Slide` instead.
 */
export function SlideSplitLayout({
  left,
  right,
  className,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'nxs-slide nxs-slide-split relative flex h-dvh w-dvw',
        className
      )}
    >
      <div
        className="border-foreground/10 pointer-events-none absolute inset-4 border sm:inset-6"
        aria-hidden
      />
      <div className="nxs-slide-split-col relative z-10 flex w-1/2 flex-col justify-center gap-6 px-12 py-16 sm:px-16 md:px-20 lg:px-24">
        {left}
      </div>
      <div
        className="nxs-slide-split-divider bg-foreground/10 absolute top-4 bottom-4 left-1/2 z-10 w-px sm:top-6 sm:bottom-6"
        aria-hidden
      />
      <div className="nxs-slide-split-col relative z-10 flex w-1/2 flex-col justify-center gap-6 px-12 py-16 sm:px-16 md:px-20 lg:px-24">
        {right}
      </div>
    </div>
  );
}

/**
 * Primary heading for a slide. Renders an `<h1>` with responsive sizing
 * that scales from `text-4xl` to `text-7xl` across breakpoints.
 *
 * Override the default size with `className` (e.g. `className="text-3xl sm:text-4xl"`).
 */
export function SlideTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        'text-foreground text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl',
        className
      )}
      style={{ letterSpacing: '-0.04em' }}
    >
      {children}
    </h1>
  );
}

/**
 * Secondary text below a title. Renders a `<p>` in a muted foreground color
 * with responsive sizing (`text-lg` to `text-2xl`).
 */
export function SlideSubtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'text-muted-foreground text-lg sm:text-xl md:text-2xl',
        className
      )}
    >
      {children}
    </p>
  );
}

/**
 * Small pill-shaped label, typically placed above a title to categorise
 * the slide (e.g. component name, topic tag).
 */
export function SlideBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'bg-foreground text-background inline-block w-fit shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide',
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Italic accent text for slide headers — use for event names, series labels,
 * or other branding above the title.
 */
export function SlideHeaderBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="text-foreground text-xl font-semibold tracking-tight italic sm:text-2xl">
        {children}
      </span>
    </div>
  );
}

/**
 * Syntax-highlighted code block powered by highlight.js.
 *
 * Pass code as a **string** child. The language is auto-detected from the
 * `title` file extension (e.g. `"example.tsx"` → TypeScript); falls back
 * to TypeScript when unspecified. Supports JS, TS, JSX, and TSX.
 *
 * Theme colours are controlled by CSS custom properties (`--sh-*` / `--nxs-code-*`)
 * defined in `nextjs-slides/styles.css`. Override them in `:root` or `.dark`.
 *
 * @example
 * ```tsx
 * <SlideCode title="api.ts">{`export async function fetchData() {
 *   return fetch('/api/data');
 * }`}</SlideCode>
 * ```
 */
export function SlideCode({
  children,
  className,
  title,
}: {
  /** Code string to highlight. Leading/trailing whitespace is trimmed automatically. */
  children: string;
  className?: string;
  /** File name shown above the code block. Its extension determines the highlight language. */
  title?: string;
}) {
  const lang = title?.split('.').pop();
  const html = highlightCode(children.trim(), lang);

  return (
    <div className={cn('nxs-code-wrapper', className)}>
      {title && (
        <div className="text-muted-foreground mb-2 text-sm font-medium tracking-wider uppercase">
          {title}
        </div>
      )}
      <pre className="nxs-code-block">
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

/**
 * Bullet-point list container. Wrap {@link SlideListItem} children inside this.
 */
export function SlideList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-col gap-4 text-left', className)}>
      {children}
    </ul>
  );
}

/**
 * Single bullet item inside a {@link SlideList}. Renders a small dot
 * followed by the content.
 */
export function SlideListItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        'text-foreground/70 flex items-start gap-3 text-lg sm:text-xl',
        className
      )}
    >
      <span
        className="bg-foreground/40 mt-2 block h-1.5 w-1.5 shrink-0 rounded-full"
        aria-hidden
      />
      <span>{children}</span>
    </li>
  );
}

/**
 * Small footnote text in a faded colour, typically placed at the bottom
 * of a slide for annotations or caveats.
 */
export function SlideNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('text-muted-foreground text-base sm:text-lg', className)}>
      {children}
    </p>
  );
}

/**
 * Live interactive component embed. Keyboard navigation (arrow keys, space)
 * is disabled while focus is inside the demo area so the embedded component
 * can handle its own input.
 *
 * The container tracks its maximum height to prevent layout jumps when the
 * child re-renders with different content sizes.
 *
 * @example
 * ```tsx
 * <SlideDemo label="Live counter">
 *   <Counter />
 * </SlideDemo>
 * ```
 */
export function SlideDemo({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  /** Optional uppercase label shown above the demo area. */
  label?: string;
}) {
  return (
    <div
      data-slide-interactive
      className={cn('min-w-0 w-full max-w-2xl', className)}
    >
      {label && (
        <div className="text-muted-foreground mb-2 text-sm font-medium tracking-wider uppercase">
          {label}
        </div>
      )}
      <div className="border-foreground/10 bg-foreground/[0.03] min-w-0 w-full max-w-full border p-4 sm:p-6">
        <SlideDemoContent>{children}</SlideDemoContent>
      </div>
    </div>
  );
}

/**
 * Container for {@link SlideStatement} items. Adds border separators between
 * statements automatically.
 */
export function SlideStatementList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex min-w-0 w-full flex-col', className)}>
      {children}
    </div>
  );
}

/**
 * Title + description pair for structured content blocks.
 * Use inside a {@link SlideStatementList} for automatic border separators.
 */
export function SlideStatement({
  title,
  description,
  className,
}: {
  /** Bold heading text. */
  title: string;
  /** Optional muted description below the title. */
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border-foreground/10 border-t px-8 py-6 last:border-b sm:px-12 md:px-16',
        className
      )}
    >
      <h3 className="text-foreground text-lg font-bold sm:text-xl md:text-2xl">
        {title}
      </h3>
      {description && (
        <p className="text-muted-foreground mt-1 text-base sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * Speaker card with an avatar circle, name, and role/title.
 * When `avatar` is omitted a placeholder circle is shown.
 *
 * Use inside {@link SlideSpeakerGrid} or {@link SlideSpeakerList} to
 * lay out multiple speakers.
 */
export function SlideSpeaker({
  name,
  title,
  avatar,
  className,
}: {
  name: string;
  title: string;
  /** Image URL or path for the speaker avatar. Falls back to placeholder when omitted. */
  avatar?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div
        className={cn(
          'h-12 w-12 shrink-0 overflow-hidden rounded-full',
          avatar ? 'relative' : 'bg-foreground/15 border-foreground/20 border'
        )}
        aria-hidden
      >
        {avatar ? (
          <img src={avatar} alt="" className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div>
        <p className="text-foreground/90 text-sm font-medium tracking-widest uppercase">
          {name}
        </p>
        <p className="text-muted-foreground text-sm tracking-wider uppercase">
          {title}
        </p>
      </div>
    </div>
  );
}

/**
 * Two-column responsive grid for laying out {@link SlideSpeaker} cards
 * side by side (stacks to one column on small screens).
 */
export function SlideSpeakerGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2', className)}>
      {children}
    </div>
  );
}

/**
 * Vertical stack layout for {@link SlideSpeaker} cards.
 */
export function SlideSpeakerList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex flex-col gap-6', className)}>{children}</div>;
}
