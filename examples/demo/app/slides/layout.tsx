import fs from 'fs';
import path from 'path';
import { SlideDeck, parseSpeakerNotes } from 'nextjs-slides';
import { slides } from './slides';

const notes = parseSpeakerNotes(
  fs.readFileSync(path.join(process.cwd(), 'app/slides/notes.md'), 'utf-8'),
);

export default function SlidesLayout({ children }: { children: React.ReactNode }) {
  return <SlideDeck slides={slides} speakerNotes={notes} syncEndpoint="/api/nxs-sync" exitUrl="/">{children}</SlideDeck>;
}
