/** Content alignment for {@link Slide}. */
export type SlideAlign = 'center' | 'left';

/** Visual style for {@link SlideLink}. */
export type SlideLinkVariant = 'primary' | 'ghost';

/** Configuration for the {@link SlideDeck} provider. */
export interface SlideDeckConfig {
  slides: React.ReactNode[];
  /** Speaker notes per slide (same index as slides). Use `parseSpeakerNotes()` to load from a markdown file. */
  speakerNotes?: (string | React.ReactNode | null)[];
  /** Base path for slide URLs. Defaults to "/slides" */
  basePath?: string;
  /** URL to navigate to when exiting the deck. When set, shows an exit button. */
  exitUrl?: string;
  /** Show progress dots at the bottom. Defaults to true */
  showProgress?: boolean;
  /** Show slide counter (e.g. "3 / 10"). Defaults to true */
  showCounter?: boolean;
  /** API endpoint for presenter ↔ phone sync. See `SlideNotesView` and the sync route handlers. */
  syncEndpoint?: string;
  /** Additional className for the deck container */
  className?: string;
}
