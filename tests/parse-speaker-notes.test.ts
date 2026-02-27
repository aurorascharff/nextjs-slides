import { describe, it, expect } from 'vitest';
import { parseSpeakerNotes } from '../src/parse-speaker-notes';

describe('parseSpeakerNotes', () => {
  it('splits on --- separator', () => {
    const md = `Note one\n\n---\n\nNote two\n\n---\n\nNote three`;
    expect(parseSpeakerNotes(md)).toEqual(['Note one', 'Note two', 'Note three']);
  });

  it('returns null for empty sections', () => {
    const md = `First note\n\n---\n\n---\n\nThird note`;
    expect(parseSpeakerNotes(md)).toEqual(['First note', null, 'Third note']);
  });

  it('handles single note with no separators', () => {
    expect(parseSpeakerNotes('Only one note')).toEqual(['Only one note']);
  });

  it('trims whitespace from each section', () => {
    const md = `  padded  \n\n---\n\n  also padded  `;
    expect(parseSpeakerNotes(md)).toEqual(['padded', 'also padded']);
  });

  it('returns [null] for empty string', () => {
    expect(parseSpeakerNotes('')).toEqual([null]);
  });

  it('returns [null] for whitespace-only string', () => {
    expect(parseSpeakerNotes('   \n\n  ')).toEqual([null]);
  });

  it('handles all-empty sections', () => {
    const md = `---\n\n---\n\n---`;
    expect(parseSpeakerNotes(md)).toEqual([null, null, null, null]);
  });

  it('preserves multiline content within a section', () => {
    const md = `Line one\nLine two\nLine three\n\n---\n\nSecond note`;
    const result = parseSpeakerNotes(md);
    expect(result[0]).toBe('Line one\nLine two\nLine three');
    expect(result[1]).toBe('Second note');
  });

  it('does not split on --- inside content (requires own line)', () => {
    const md = `Some text with --- inline dashes\n\n---\n\nNext note`;
    const result = parseSpeakerNotes(md);
    expect(result).toEqual(['Some text with --- inline dashes', 'Next note']);
  });

  it('handles trailing separator', () => {
    const md = `Note one\n\n---\n\nNote two\n\n---`;
    expect(parseSpeakerNotes(md)).toEqual(['Note one', 'Note two', null]);
  });
});
