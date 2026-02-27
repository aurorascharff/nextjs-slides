'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Phone-friendly speaker notes view that stays in sync with the presenter.
 *
 * Polls the sync endpoint to track the current slide and displays the
 * corresponding note. Open this page on your phone while presenting.
 *
 * @example
 * ```tsx
 * // app/slides/notes/page.tsx
 * import fs from 'fs';
 * import path from 'path';
 * import { parseSpeakerNotes, SlideNotesView } from 'nextjs-slides';
 *
 * const notes = parseSpeakerNotes(
 *   fs.readFileSync(path.join(process.cwd(), 'app/slides/notes.md'), 'utf-8'),
 * );
 *
 * export default function NotesPage() {
 *   return <SlideNotesView notes={notes} syncEndpoint="/api/nxs-sync" />;
 * }
 * ```
 */
export function SlideNotesView({
  notes,
  syncEndpoint,
  pollInterval = 500,
}: {
  /** Speaker notes array (same index as slides). Typically from `parseSpeakerNotes()`. */
  notes: (string | null)[];
  /** API endpoint created with the sync route handlers. */
  syncEndpoint: string;
  /** Polling interval in ms. Defaults to 500. */
  pollInterval?: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(1);
  const [connected, setConnected] = useState(false);

  const poll = useCallback(async () => {
    try {
      const res = await fetch(syncEndpoint, { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      setCurrentSlide(data.slide);
      setTotalSlides(data.total);
      setConnected(true);
    } catch {
      setConnected(false);
    }
  }, [syncEndpoint]);

  useEffect(() => {
    poll();
    const id = setInterval(poll, pollInterval);
    return () => clearInterval(id);
  }, [poll, pollInterval]);

  const noteIndex = currentSlide - 1;
  const currentNote = noteIndex >= 0 && noteIndex < notes.length ? notes[noteIndex] : null;

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0a0a0a',
        color: '#e5e5e5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          borderBottom: '1px solid #262626',
          fontSize: '13px',
          color: '#737373',
        }}
      >
        <span>
          Slide {currentSlide} / {totalSlides}
        </span>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: connected ? '#22c55e' : '#ef4444',
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 20px',
        }}
      >
        {currentNote ? (
          <p
            style={{
              fontSize: 'clamp(18px, 4vw, 28px)',
              lineHeight: 1.6,
              maxWidth: '640px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {currentNote}
          </p>
        ) : (
          <p style={{ fontSize: '18px', color: '#525252', fontStyle: 'italic' }}>
            No notes for this slide.
          </p>
        )}
      </div>
    </div>
  );
}
