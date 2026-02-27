import { generateSlideParams, getSlide } from 'nextjs-slides';
import { slides } from '../slides';

export function generateStaticParams() {
  return generateSlideParams(slides);
}

export default async function SlideAltPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  return getSlide(await params, slides);
}
