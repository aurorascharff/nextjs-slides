'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Phone-friendly speaker notes view that stays in sync with the presenter.
 *
 * Polls the sync endpoint to track the current slide and displays the
 * corresponding note. Notes beyond the slide count are treated as "demo notes"
 * — advance through them manually using the on-screen buttons.
 *
 * @example
 * ```tsx
 * // app/notes/page.tsx
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
  /** Speaker notes array. Indices 0…slides-1 match slides; extras are demo notes. */
  notes: (string | null)[];
  /** API endpoint created with the sync route handlers. */
  syncEndpoint: string;
  /** Polling interval in ms. Defaults to 500. */
  pollInterval?: number;
}) {
  const [noteIndex, setNoteIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(1);
  const [connected, setConnected] = useState(false);
  const manualOverride = useRef(false);

  const poll = useCallback(async () => {
    try {
      const res = await fetch(syncEndpoint, { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      const syncIndex = (data.slide as number) - 1;
      setTotalSlides(data.total);
      setConnected(true);

      setNoteIndex((prev) => {
        if (manualOverride.current && prev >= data.total) return prev;
        manualOverride.current = false;
        return syncIndex;
      });
    } catch {
      setConnected(false);
    }
  }, [syncEndpoint]);

  useEffect(() => {
    poll();
    const id = setInterval(poll, pollInterval);
    return () => clearInterval(id);
  }, [poll, pollInterval]);

  const goNext = useCallback(() => {
    setNoteIndex((prev) => {
      if (prev >= notes.length - 1) return prev;
      manualOverride.current = true;
      return prev + 1;
    });
  }, [notes.length]);

  const goPrev = useCallback(() => {
    setNoteIndex((prev) => {
      if (prev <= 0) return prev;
      manualOverride.current = true;
      return prev - 1;
    });
  }, []);

  const currentNote =
    noteIndex >= 0 && noteIndex < notes.length ? notes[noteIndex] : null;
  const inDemoNotes = noteIndex >= totalSlides;
  const displayNumber = noteIndex + 1;

  const label = inDemoNotes
    ? `Demo ${displayNumber - totalSlides} / ${notes.length - totalSlides}`
    : `Slide ${displayNumber} / ${totalSlides}`;

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
        <span>{label}</span>
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
          <p
            style={{ fontSize: '18px', color: '#525252', fontStyle: 'italic' }}
          >
            No notes for this slide.
          </p>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          padding: '16px 20px',
          borderTop: '1px solid #262626',
        }}
      >
        <button
          onClick={goPrev}
          disabled={noteIndex <= 0}
          style={{
            flex: 1,
            padding: '14px',
            fontSize: '16px',
            fontWeight: 500,
            border: '1px solid #333',
            borderRadius: '10px',
            backgroundColor: noteIndex <= 0 ? '#111' : '#1a1a1a',
            color: noteIndex <= 0 ? '#444' : '#e5e5e5',
            cursor: noteIndex <= 0 ? 'default' : 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          ← Prev
        </button>
        <button
          onClick={goNext}
          disabled={noteIndex >= notes.length - 1}
          style={{
            flex: 1,
            padding: '14px',
            fontSize: '16px',
            fontWeight: 500,
            border: '1px solid #333',
            borderRadius: '10px',
            backgroundColor: noteIndex >= notes.length - 1 ? '#111' : '#1a1a1a',
            color: noteIndex >= notes.length - 1 ? '#444' : '#e5e5e5',
            cursor: noteIndex >= notes.length - 1 ? 'default' : 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
