import {
  Slide,
  SlideBadge,
  SlideCode,
  SlideLink,
  SlideList,
  SlideListItem,
  SlideNote,
  SlideSplitLayout,
  SlideStatement,
  SlideStatementList,
  SlideSubtitle,
  SlideTitle,
} from 'nextjs-slides';

export const slides: React.ReactNode[] = [
  <Slide key="title" align="left">
    <SlideBadge>Alternate Deck</SlideBadge>
    <SlideTitle>Different fonts & syntax theme</SlideTitle>
    <SlideSubtitle>
      Playfair Display · JetBrains Mono · Dracula-inspired palette
    </SlideSubtitle>
  </Slide>,

  <Slide key="typography" align="left">
    <SlideBadge>Typography</SlideBadge>
    <SlideTitle>Serif headings, monospace code</SlideTitle>
    <SlideSubtitle>
      This deck uses Playfair Display for titles and JetBrains Mono for code
      blocks
    </SlideSubtitle>
    <SlideNote>
      Override --font-sans and --font-mono via CSS to customize
    </SlideNote>
  </Slide>,

  <Slide key="code" align="left">
    <SlideBadge>SlideCode</SlideBadge>
    <SlideTitle>Custom syntax highlighting</SlideTitle>
    <SlideSubtitle>
      Dracula-inspired theme — purple, cyan, green, orange
    </SlideSubtitle>
    <SlideCode title="example.tsx">{`function Greeting({ name }: Props) {
  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      <button onClick={() => alert('Hi')}>
        Say hi
      </button>
    </div>
  );
}`}</SlideCode>
    <SlideNote>Syntax colors overridden in slides-alt.css</SlideNote>
  </Slide>,

  <SlideSplitLayout
    key="split"
    left={
      <>
        <SlideBadge>Split layout</SlideBadge>
        <SlideTitle className="mt-6">Same primitives</SlideTitle>
        <SlideSubtitle className="mt-4">
          SlideSplitLayout, SlideStatement — all work the same
        </SlideSubtitle>
      </>
    }
    right={
      <SlideStatementList>
        <SlideStatement
          title="Fonts"
          description="Playfair Display + JetBrains Mono"
        />
        <SlideStatement title="Syntax" description="Dracula-inspired palette" />
        <SlideStatement
          title="Routing"
          description="Separate /slides-alt route"
        />
      </SlideStatementList>
    }
  />,

  <Slide key="end">
    <SlideTitle>That&apos;s the alternate deck</SlideTitle>
    <SlideSubtitle>Compose your own fonts and themes</SlideSubtitle>
    <SlideList className="mt-6">
      <SlideListItem>Override --sh-* for syntax colors</SlideListItem>
      <SlideListItem>Override --nxs-code-* for block styling</SlideListItem>
      <SlideListItem>Use font-* classes or CSS variables</SlideListItem>
    </SlideList>
    <SlideLink href="/" className="mt-6 inline-block" variant="ghost">
      ← Back to home
    </SlideLink>
  </Slide>,
];
