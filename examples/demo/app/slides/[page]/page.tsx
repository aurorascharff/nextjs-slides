import { generateSlideParams, getSlide } from 'nextjs-slides';
import { slides } from '../slides';

export function generateStaticParams() {
  return generateSlideParams(slides);
}

export default async function SlidePage({ params }: { params: Promise<{ page: string }> }) {
  return getSlide(await params, slides);
}
