import { notFound } from 'next/navigation';

/**
 * Resolves the current slide from params and the slides array.
 * Use in your `[page]/page.tsx` dynamic route.
 *
 * @example
 * ```tsx
 * import { getSlide } from 'nextjs-slides';
 * import { slides } from '../slides';
 *
 * export default async function SlidePage({ params }: { params: Promise<{ page: string }> }) {
 *   return getSlide(await params, slides);
 * }
 * ```
 */
export function getSlide(
  params: { page: string },
  slides: React.ReactNode[]
): React.ReactNode {
  const index = Number(params.page) - 1;

  if (isNaN(index) || index < 0 || index >= slides.length) {
    notFound();
  }

  return slides[index];
}

/**
 * Generates static params for all slides. Use with `generateStaticParams`.
 *
 * @example
 * ```tsx
 * import { generateSlideParams } from 'nextjs-slides';
 * import { slides } from '../slides';
 *
 * export const generateStaticParams = () => generateSlideParams(slides);
 * ```
 */
export function generateSlideParams(slides: React.ReactNode[]) {
  return slides.map((_, i) => ({ page: String(i + 1) }));
}
