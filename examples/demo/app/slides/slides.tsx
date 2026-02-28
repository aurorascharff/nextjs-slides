import {
  Slide,
  SlideBadge,
  SlideCode,
  SlideColumns,
  SlideDemo,
  SlideHeaderBadge,
  SlideLink,
  SlideList,
  SlideListItem,
  SlideNote,
  SlideSpeaker,
  SlideSpeakerGrid,
  SlideSpeakerList,
  SlideSplitLayout,
  SlideStatement,
  SlideStatementList,
  SlideSubtitle,
  SlideTitle,
} from 'nextjs-slides';
import { Counter } from '@/app/slides/_components/Counter';
import { ThemeToggle } from '@/app/slides/_components/ThemeToggle';

export const slides: React.ReactNode[] = [
  // 1. Title slide
  <Slide key="title" align="left">
    <SlideHeaderBadge>nextjs-slides</SlideHeaderBadge>
    <SlideTitle>Composable Slide Primitives</SlideTitle>
    <SlideSubtitle>Build presentations with React components</SlideSubtitle>
    <SlideSpeakerGrid>
      <SlideSpeaker name="Your Name" title="Your Title" />
    </SlideSpeakerGrid>
  </Slide>,

  // 2. Slide — the base container
  <Slide key="slide-component">
    <SlideBadge>Slide</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
      The base container
    </SlideTitle>
    <SlideSubtitle>
      Full-viewport layout with vertical centering, responsive padding, and a
      decorative border frame
    </SlideSubtitle>
    <SlideNote>
      Props: align (&quot;center&quot; or &quot;left&quot;), className · This
      slide uses center alignment (default)
    </SlideNote>
  </Slide>,

  // 3. SlideSplitLayout — full-viewport two-column alternative to Slide
  <SlideSplitLayout
    key="split-layout"
    left={
      <>
        <SlideBadge>SlideSplitLayout</SlideBadge>
        <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
          Full-viewport split
        </SlideTitle>
        <SlideSubtitle>
          A top-level alternative to Slide. Renders its own viewport container
          with a vertical divider. Do not nest inside Slide.
        </SlideSubtitle>
      </>
    }
    right={
      <SlideStatementList>
        <SlideStatement
          title="left / right props"
          description="Each side is a flex column with vertical centering and consistent padding"
        />
        <SlideStatement
          title="Top-level only"
          description="Renders h-dvh w-dvw. Use it as a direct slide, not inside Slide"
        />
        <SlideStatement
          title="Need a title above columns?"
          description="Use SlideColumns inside a Slide instead"
        />
      </SlideStatementList>
    }
  />,

  // 4. SlideColumns — inline two-column grid inside Slide
  <Slide key="columns" align="left">
    <SlideBadge>SlideColumns</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
      Title + two columns
    </SlideTitle>
    <SlideSubtitle>
      Inline two-column grid for use inside Slide, when you need a spanning
      title above the columns
    </SlideSubtitle>
    <SlideColumns
      left={
        <SlideCode title="server.ts">{`export async function getData() {
  'use cache';
  return db.query('...');
}`}</SlideCode>
      }
      right={
        <SlideCode title="client.tsx">{`const { data } = useSWR(
  '/api/data',
  fetcher,
);`}</SlideCode>
      }
    />
    <SlideNote>
      Props: left, right, className · Unlike SlideSplitLayout, this is a child
      component, not a full-viewport slide
    </SlideNote>
  </Slide>,

  // 5. SlideCode — syntax-highlighted code blocks
  <Slide key="code">
    <SlideBadge>SlideCode</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
      Syntax highlighting
    </SlideTitle>
    <SlideCode title="example.tsx">{`export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="rounded-md bg-primary px-4 py-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
}`}</SlideCode>
    <SlideNote>
      Language inferred from title extension (.ts, .tsx, .js, .jsx) · Theme via
      --sh-* and --nxs-code-* CSS variables · Whitespace is auto-trimmed
    </SlideNote>
  </Slide>,

  // 6. SlideList — bullet points
  <Slide key="list" align="left">
    <SlideBadge>SlideList</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
      Bullet lists
    </SlideTitle>
    <SlideSubtitle>
      SlideList wraps SlideListItem children with consistent spacing and bullet
      dots
    </SlideSubtitle>
    <SlideList>
      <SlideListItem>Each item renders a dot and responsive text</SlideListItem>
      <SlideListItem>Supports any React content as children</SlideListItem>
      <SlideListItem>
        Override styling with className on either component
      </SlideListItem>
    </SlideList>
  </Slide>,

  // 7. Typography primitives
  <Slide key="typography" align="left">
    <SlideBadge>Typography</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
      Typography primitives
    </SlideTitle>
    <SlideSubtitle>
      SlideSubtitle: muted secondary text, responsive lg to 2xl
    </SlideSubtitle>
    <SlideHeaderBadge>
      SlideHeaderBadge: italic accent for event names or series labels
    </SlideHeaderBadge>
    <SlideNote>
      SlideNote: small faded footnote for annotations and caveats
    </SlideNote>
  </Slide>,

  // 8. SlideDemo — interactive component embed
  <Slide key="demo">
    <SlideBadge>SlideDemo</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
      Interactive components
    </SlideTitle>
    <SlideSubtitle>
      Embed live React components. Arrow keys and space are disabled inside so
      inputs work without advancing slides
    </SlideSubtitle>
    <SlideDemo label="Live counter">
      <Counter />
    </SlideDemo>
    <SlideNote>
      Props: label (uppercase header), className · Container tracks max height
      to prevent layout jumps on re-render
    </SlideNote>
  </Slide>,

  // 9. Theme toggle and inheritance
  <Slide key="theme">
    <SlideBadge>Theme inheritance</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
      Slides inherit your app theme
    </SlideTitle>
    <SlideSubtitle>
      The deck, code blocks, and all primitives use your app CSS variables:
      --foreground, --background, --muted-foreground, --nxs-code-*, --sh-*, etc.
      No scoping. Slides follow whatever theme your layout defines.
    </SlideSubtitle>
    <SlideDemo label="Toggle theme">
      <ThemeToggle />
    </SlideDemo>
  </Slide>,

  // 10. Pattern: demo + code side by side
  <SlideSplitLayout
    key="demo-code"
    left={
      <>
        <SlideBadge className="font-pixel">Pattern</SlideBadge>
        <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
          Demo + source
        </SlideTitle>
        <SlideSubtitle>
          Pair a live component with its source code using SlideSplitLayout
        </SlideSubtitle>
        <SlideDemo label="Try it">
          <Counter />
        </SlideDemo>
      </>
    }
    right={
      <SlideCode title="Counter.tsx">{`'use client';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`}</SlideCode>
    }
  />,

  // 10. SlideStatement — structured title + description blocks
  <SlideSplitLayout
    key="statements"
    left={
      <>
        <SlideBadge>SlideStatement</SlideBadge>
        <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
          Structured blocks
        </SlideTitle>
        <SlideSubtitle>
          Title + description pairs with border separators. Wrap in
          SlideStatementList for automatic dividers
        </SlideSubtitle>
      </>
    }
    right={
      <SlideStatementList>
        <SlideStatement
          title="title prop"
          description="Bold heading for the statement"
        />
        <SlideStatement
          title="description prop"
          description="Optional muted text below the title"
        />
        <SlideStatement
          title="SlideStatementList"
          description="Container that adds border-t on each item and border-b on the last"
        />
      </SlideStatementList>
    }
  />,

  // 11. SlideSpeaker — avatar + name + role
  <Slide key="speakers">
    <SlideBadge>SlideSpeaker</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
      Speaker components
    </SlideTitle>
    <SlideSubtitle>
      Avatar + name + role — use SlideSpeakerGrid for side-by-side or
      SlideSpeakerList for vertical stacking
    </SlideSubtitle>
    <div className="flex flex-wrap items-start justify-center gap-12">
      <div>
        <p className="text-muted-foreground mb-4 text-center text-xs font-medium uppercase tracking-wider">
          SlideSpeakerGrid
        </p>
        <SlideSpeakerGrid>
          <SlideSpeaker name="Speaker One" title="Role / Company" />
          <SlideSpeaker name="Speaker Two" title="Role / Company" />
        </SlideSpeakerGrid>
      </div>
      <div>
        <p className="text-muted-foreground mb-4 text-center text-xs font-medium uppercase tracking-wider">
          SlideSpeakerList
        </p>
        <SlideSpeakerList>
          <SlideSpeaker name="Speaker One" title="Role / Company" />
          <SlideSpeaker name="Speaker Two" title="Role / Company" />
        </SlideSpeakerList>
      </div>
    </div>
    <SlideNote>
      Props: name, title, avatar (optional image URL — placeholder circle when
      omitted)
    </SlideNote>
  </Slide>,

  // 12. Navigation — keyboard controls and deck chrome
  <SlideSplitLayout
    key="navigation"
    left={
      <>
        <SlideBadge className="font-pixel">SlideDeck</SlideBadge>
        <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
          Navigation and deck chrome
        </SlideTitle>
        <SlideSubtitle>
          SlideDeck wraps your layout — provides keyboard nav, progress dots,
          counter, exit button, and ViewTransition animations
        </SlideSubtitle>
      </>
    }
    right={
      <SlideStatementList>
        <SlideStatement title="→ or Space" description="Next slide" />
        <SlideStatement title="←" description="Previous slide" />
        <SlideStatement
          title="showProgress / showCounter"
          description="Toggle the dot indicator and slide counter"
        />
        <SlideStatement
          title="exitUrl"
          description="Shows an × button in the top-right corner"
        />
        <SlideStatement
          title="syncEndpoint"
          description="POST slide state for phone-based speaker notes"
        />
      </SlideStatementList>
    }
  />,

  // 13. SlideLink — styled navigation links
  <Slide key="links" align="left">
    <SlideBadge>SlideLink</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">
      Links and routing
    </SlideTitle>
    <SlideSubtitle>
      Styled Next.js Link for navigating between slides, to breakout pages, or
      external URLs
    </SlideSubtitle>
    <div className="flex flex-wrap items-center gap-4">
      <SlideLink href="/slides/demo1">Breakout page →</SlideLink>
      <SlideLink href="/" variant="ghost">
        Exit deck
      </SlideLink>
    </div>
    <SlideNote>
      Props: href, variant (&quot;primary&quot; solid or &quot;ghost&quot;
      bordered), className · Breakout routes render without deck chrome
    </SlideNote>
  </Slide>,

  // 14. Closing
  <Slide key="end">
    <SlideHeaderBadge>nextjs-slides</SlideHeaderBadge>
    <SlideTitle className="font-pixel">
      That&apos;s the slide system.
    </SlideTitle>
    <SlideSubtitle>
      Compose these primitives to build any presentation
    </SlideSubtitle>
    <div className="flex items-center gap-4">
      <SlideLink href="/">Back to app →</SlideLink>
    </div>
  </Slide>,
];
