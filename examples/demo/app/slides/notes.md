Welcome everyone! This talk covers composable slide primitives built with React and Next.js.

---

The Slide component is the base container. It supports `align="center"` (default) and `align="left"`.

---

SlideSplitLayout divides the slide into two columns with an automatic vertical divider.

---

SlideList and SlideListItem give you consistent bullet-point spacing. Any content works inside items.

---

These are all the typography primitives. Mix and match them freely on any slide.

---

SlideCode uses highlight.js under the hood. The theme adapts to light/dark mode and is fully customizable via CSS variables.

---

SlideDemo wraps interactive components. Keyboard navigation is automatically disabled inside the `data-slide-interactive` boundary.

---

A common pattern: show the live component on the left and its source code on the right.

---

SlideStatement pairs a bold title with a muted description. Use SlideStatementList for automatic border separators.

---

SlideSpeakerGrid for horizontal layout, SlideSpeakerList for vertical. Pass an `avatar` prop for images.

---

Arrow keys and spacebar are the primary navigation. Progress dots and the counter are optional.

---

SlideLink works for internal slide navigation, breakout pages, and external URLs. Breakout routes render without the deck chrome.

---

Thanks for watching! Compose these primitives however you like.
