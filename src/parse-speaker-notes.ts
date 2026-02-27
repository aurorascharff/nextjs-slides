/**
 * Parse speaker notes from a markdown string.
 *
 * Format: one section per slide, separated by `---` on its own line.
 * Empty sections produce `null` (no notes for that slide).
 *
 * @example
 * ```md
 * Welcome everyone. This is the opening slide.
 *
 * ---
 *
 * Talk about the base container here.
 *
 * ---
 *
 * ---
 *
 * Slide 4 notes. Slide 3 had none.
 * ```
 *
 * @example
 * ```tsx
 * // slides/layout.tsx (server component — can use fs)
 * import fs from 'fs';
 * import path from 'path';
 * import { SlideDeck, parseSpeakerNotes } from 'nextjs-slides';
 * import { slides } from './slides';
 *
 * const notes = parseSpeakerNotes(
 *   fs.readFileSync(path.join(process.cwd(), 'app/slides/notes.md'), 'utf-8'),
 * );
 *
 * export default function SlidesLayout({ children }: { children: React.ReactNode }) {
 *   return <SlideDeck slides={slides} speakerNotes={notes}>{children}</SlideDeck>;
 * }
 * ```
 */
export function parseSpeakerNotes(markdown: string): (string | null)[] {
  return markdown.split(/^---$/m).map((section) => {
    const trimmed = section.trim();
    return trimmed.length > 0 ? trimmed : null;
  });
}
