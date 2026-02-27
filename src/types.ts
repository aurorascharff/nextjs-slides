export type SlideAlign = 'center' | 'left';

export type SlideLinkVariant = 'primary' | 'ghost';

export interface SlideDeckConfig {
  slides: React.ReactNode[];
  /** Base path for slide URLs. Defaults to "/slides" */
  basePath?: string;
  /** URL to navigate to when exiting the deck. When set, shows an exit button. */
  exitUrl?: string;
  /** Show progress dots at the bottom. Defaults to true */
  showProgress?: boolean;
  /** Show slide counter (e.g. "3 / 10"). Defaults to true */
  showCounter?: boolean;
  /** Additional className for the deck container */
  className?: string;
}
