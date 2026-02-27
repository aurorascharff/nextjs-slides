import fs from 'fs';
import path from 'path';
import { parseSpeakerNotes, SlideNotesView } from 'nextjs-slides';

const notes = parseSpeakerNotes(
  fs.readFileSync(path.join(process.cwd(), 'app/slides/notes.md'), 'utf-8'),
);

export default function NotesPage() {
  return <SlideNotesView notes={notes} syncEndpoint="/api/nxs-sync" />;
}
