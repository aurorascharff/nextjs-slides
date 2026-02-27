/**
 * In-memory slide state for presenter ↔ notes-viewer sync.
 *
 * Re-export these as your API route handlers:
 *
 * @example
 * ```ts
 * // app/api/nxs-sync/route.ts
 * export { GET, POST } from 'nextjs-slides/sync';
 * ```
 *
 * Works with `syncEndpoint="/api/nxs-sync"` on `SlideDeck` and `SlideNotesView`.
 * State lives in server memory — designed for `next dev` / single-server deployments.
 */

let currentSlide = 1;
let totalSlides = 1;

export async function GET() {
  return Response.json({ slide: currentSlide, total: totalSlides });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (typeof body.slide === 'number') currentSlide = body.slide;
  if (typeof body.total === 'number') totalSlides = body.total;
  return Response.json({ slide: currentSlide, total: totalSlides });
}
