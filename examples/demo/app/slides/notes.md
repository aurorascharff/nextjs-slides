Welcome everyone! This talk covers composable slide primitives built with React and Next.js.

---

The Slide component is the base container. It supports align="center" (default) and align="left".

---

SlideSplitLayout divides the slide into two columns with an automatic vertical divider. Top-level only: do not nest inside Slide.

---

SlideColumns is the inline two-column grid for use inside Slide when you need a spanning title above the columns. Unlike SlideSplitLayout, it is a child component.

---

SlideCode uses highlight.js. Language is inferred from the title extension. Theme via --sh-* and --nxs-code-* CSS variables.

---

SlideList and SlideListItem give you consistent bullet-point spacing. Any content works inside items.

---

Typography primitives: SlideTitle, SlideSubtitle, SlideHeaderBadge, SlideNote. Mix and match freely.

---

SlideDemo wraps interactive components. Keyboard navigation is disabled inside the demo boundary.

---

Theme toggle demo. Toggle and watch the whole deck update. Slides inherit your app CSS variables. No scoping.

---

A common pattern: show the live component on the left and its source code on the right using SlideSplitLayout.

---

SlideStatement pairs a bold title with a muted description. Use SlideStatementList for automatic border separators.

---

SlideSpeakerGrid for horizontal layout, SlideSpeakerList for vertical. Pass an avatar prop for images.

---

Arrow keys and spacebar for navigation. Progress dots and counter are optional. SlideDeck provides exitUrl and syncEndpoint for speaker notes.

---

SlideLink for internal navigation, breakout pages, and external URLs. Breakout routes render without deck chrome.

---

Thanks for watching! Compose these primitives however you like.

---

Open the counter demo. Show how useState drives the count and how the button re-renders.

---

Switch to the code editor. Walk through adding a new slide with SlideSplitLayout.

---

Show the notes.md file. Explain the --- separator format and how parseSpeakerNotes works.
