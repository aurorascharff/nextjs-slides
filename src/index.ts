// Provider
export { SlideDeck } from './slide-deck';

// Routing helpers
export { getSlide, generateSlideParams } from './get-slide';

// Primitives — Layout
export { Slide, SlideSplitLayout } from './primitives';

// Primitives — Typography
export {
  SlideTitle,
  SlideSubtitle,
  SlideBadge,
  SlideHeaderBadge,
  SlideNote,
} from './primitives';

// Primitives — Content
export { SlideCode, SlideList, SlideListItem, SlideDemo } from './primitives';

// Primitives — Statements
export { SlideStatementList, SlideStatement } from './primitives';

// Primitives — Speakers
export { SlideSpeaker, SlideSpeakerGrid, SlideSpeakerList } from './primitives';

// Navigation
export { SlideLink } from './slide-link';

// Utilities
export { parseSpeakerNotes } from './parse-speaker-notes';

// Speaker notes
export { SlideNotesView } from './slide-notes-view';

// Types
export type { SlideAlign, SlideLinkVariant, SlideDeckConfig } from './types';
