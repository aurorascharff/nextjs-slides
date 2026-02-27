/**
 * Parse speaker notes from a markdown string.
 *
 * Format: one section per slide, separated by `---` on its own line.
 * Sections map to slides by position: notes[0] = slide 1, notes[1] = slide 2, etc.
 * Empty sections produce `null` (no notes for that slide).
 *
 * @param stripLeadingTitle - If true, removes a leading section that is a single
 *   markdown heading (# Title). Use when the file starts with a document title.
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
 * const notes = parseSpeakerNotes(markdown, { stripLeadingTitle: true });
 * ```
 */
export function parseSpeakerNotes(
  markdown: string,
  options?: { stripLeadingTitle?: boolean }
): (string | null)[] {
  let sections = markdown.split(/^---$/m).map((section) => {
    const trimmed = section.trim();
    return trimmed.length > 0 ? trimmed : null;
  });

  if (
    options?.stripLeadingTitle &&
    sections[0] &&
    /^#+\s+.+$/.test(sections[0].replace(/\n.*/s, ''))
  ) {
    sections = sections.slice(1);
  }

  return sections;
}
