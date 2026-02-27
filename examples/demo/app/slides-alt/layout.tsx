import { SlideDeck } from 'nextjs-slides';
import { slides } from './slides';
import './slides-alt.css';

export default function SlidesAltLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SlideDeck
      slides={slides}
      basePath="/slides-alt"
      exitUrl="/"
      className="slides-alt-deck"
    >
      {children}
    </SlideDeck>
  );
}
