import { SlideDeck } from 'nextjs-slides';
import { slides } from './slides';

export default function SlidesLayout({ children }: { children: React.ReactNode }) {
  return <SlideDeck slides={slides}>{children}</SlideDeck>;
}
