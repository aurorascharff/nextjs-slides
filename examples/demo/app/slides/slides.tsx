import {
  Slide,
  SlideBadge,
  SlideCode,
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

export const slides: React.ReactNode[] = [
  // 1. Title slide
  <Slide key="title" align="left">
    <SlideHeaderBadge className="font-pixel">Slide System</SlideHeaderBadge>
    <SlideTitle className="font-pixel">Composable Slide Primitives</SlideTitle>
    <SlideSubtitle>Build presentations with React components</SlideSubtitle>
    <SlideSpeakerGrid className="mt-8">
      <SlideSpeaker name="Your Name" title="Your Title" />
    </SlideSpeakerGrid>
  </Slide>,

  // 2. Slide component
  <Slide key="slide-component">
    <SlideBadge>Slide</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">The base container</SlideTitle>
    <SlideSubtitle>Full-screen layout with automatic centering and a decorative border frame</SlideSubtitle>
    <SlideNote>This slide uses align=&quot;center&quot; (default) · Set align=&quot;left&quot; for left-aligned content</SlideNote>
  </Slide>,

  // 3. SlideSplitLayout
  <SlideSplitLayout
    key="split-layout"
    left={
      <>
        <SlideBadge>SlideSplitLayout</SlideBadge>
        <SlideTitle className="mt-6 text-3xl sm:text-4xl md:text-5xl">Two-column layout</SlideTitle>
        <SlideSubtitle className="mt-4">Perfect for comparing concepts or pairing visuals with text</SlideSubtitle>
      </>
    }
    right={
      <SlideStatementList>
        <SlideStatement title="left prop" description="Content for the left column" />
        <SlideStatement title="right prop" description="Content for the right column" />
        <SlideStatement title="Divider" description="Automatic vertical separator" />
      </SlideStatementList>
    }
  />,

  // 4. SlideList
  <Slide key="list" align="left">
    <SlideBadge>SlideList</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">Bullet lists</SlideTitle>
    <SlideSubtitle>SlideList and SlideListItem for structured bullet points</SlideSubtitle>
    <SlideList className="mt-6">
      <SlideListItem>First item with consistent spacing</SlideListItem>
      <SlideListItem>Second item — supports any content</SlideListItem>
      <SlideListItem>Third item with custom styling via className</SlideListItem>
    </SlideList>
  </Slide>,

  // 5. Typography primitives
  <Slide key="typography" align="left">
    <SlideBadge>Typography</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">SlideTitle</SlideTitle>
    <SlideSubtitle>SlideSubtitle for secondary text with muted styling</SlideSubtitle>
    <SlideHeaderBadge>SlideHeaderBadge for italic accent text</SlideHeaderBadge>
    <SlideNote>SlideNote for small footnotes and annotations</SlideNote>
  </Slide>,

  // 6. SlideCode
  <Slide key="code">
    <SlideBadge>SlideCode</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">Syntax highlighting</SlideTitle>
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
    <SlideNote>Powered by sugar-high · Automatically adapts to light and dark themes</SlideNote>
  </Slide>,

  // 7. SlideDemo
  <Slide key="demo">
    <SlideBadge>SlideDemo</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">Interactive components</SlideTitle>
    <SlideSubtitle>Embed live React components — keyboard navigation is disabled inside</SlideSubtitle>
    <SlideDemo label="Live counter">
      <Counter />
    </SlideDemo>
  </Slide>,

  // 8. SlideStatement
  <SlideSplitLayout
    key="statements"
    left={
      <>
        <SlideBadge>SlideStatement</SlideBadge>
        <SlideTitle className="mt-6 text-3xl sm:text-4xl md:text-5xl">Structured content blocks</SlideTitle>
        <SlideSubtitle className="mt-4">Title and description pairs with consistent styling</SlideSubtitle>
      </>
    }
    right={
      <SlideStatementList>
        <SlideStatement title="title prop" description="Bold heading for the statement" />
        <SlideStatement title="description prop" description="Optional muted text below" />
        <SlideStatement title="SlideStatementList" description="Wrapper with border separators" />
      </SlideStatementList>
    }
  />,

  // 9. SlideSpeaker
  <Slide key="speakers">
    <SlideBadge>SlideSpeaker</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">Speaker components</SlideTitle>
    <SlideSubtitle>SlideSpeakerGrid for side-by-side · SlideSpeakerList for vertical stacking</SlideSubtitle>
    <div className="mt-8 flex flex-wrap items-start justify-center gap-12">
      <div>
        <p className="text-muted-foreground mb-4 text-center text-xs font-medium uppercase tracking-wider">SlideSpeakerGrid</p>
        <SlideSpeakerGrid>
          <SlideSpeaker name="Speaker One" title="Role / Company" />
          <SlideSpeaker name="Speaker Two" title="Role / Company" />
        </SlideSpeakerGrid>
      </div>
      <div>
        <p className="text-muted-foreground mb-4 text-center text-xs font-medium uppercase tracking-wider">SlideSpeakerList</p>
        <SlideSpeakerList>
          <SlideSpeaker name="Speaker One" title="Role / Company" />
          <SlideSpeaker name="Speaker Two" title="Role / Company" />
        </SlideSpeakerList>
      </div>
    </div>
  </Slide>,

  // 10. Navigation
  <SlideSplitLayout
    key="navigation"
    left={
      <>
        <SlideBadge>Navigation</SlideBadge>
        <SlideTitle className="mt-6 text-3xl sm:text-4xl md:text-5xl">Keyboard controls</SlideTitle>
        <SlideSubtitle className="mt-4">Built-in navigation with ViewTransition animations</SlideSubtitle>
      </>
    }
    right={
      <SlideStatementList>
        <SlideStatement title="→ or Space" description="Go to next slide" />
        <SlideStatement title="←" description="Go to previous slide" />
        <SlideStatement title="Progress dots" description="Visual indicator at the bottom" />
        <SlideStatement title="Slide counter" description="Current / total in bottom right" />
      </SlideStatementList>
    }
  />,

  // 11. SlideLink and routing
  <Slide key="links" align="left">
    <SlideBadge>SlideLink</SlideBadge>
    <SlideTitle className="text-3xl sm:text-4xl md:text-5xl">Links and routing</SlideTitle>
    <SlideSubtitle>Navigate between slides, to breakout pages, or external URLs</SlideSubtitle>
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <SlideLink href="/slides/demo1">Breakout page →</SlideLink>
      <SlideLink href="/" variant="ghost">Exit deck</SlideLink>
    </div>
    <SlideNote>Breakout routes live inside /slides but render without the deck chrome</SlideNote>
  </Slide>,

  // 12. Closing
  <Slide key="end">
    <SlideTitle className="font-pixel">That&apos;s the slide system.</SlideTitle>
    <SlideSubtitle>Compose these primitives to build any presentation</SlideSubtitle>
    <div className="mt-6 flex items-center gap-4">
      <SlideLink href="/">Back to app →</SlideLink>
    </div>
  </Slide>,
];
