'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  addTransitionType,
  useCallback,
  useEffect,
  useMemo,
  useTransition,
  ViewTransition,
} from 'react';
import { cn } from './cn';
import { ExitIcon } from './icons';
import type { SlideDeckConfig } from './types';

const TRANSITION_FORWARD = 'slide-forward';
const TRANSITION_BACK = 'slide-back';

function getSlideIndex(pathname: string, pattern: RegExp): number {
  const match = pathname.match(pattern);
  return match ? Number(match[1]) - 1 : 0;
}

/**
 * Top-level slide deck provider that wraps the current slide's content.
 *
 * Place this in your slides layout (e.g. `app/slides/layout.tsx`). It provides:
 * - **Keyboard navigation** — Arrow keys and Space to navigate slides.
 * - **ViewTransition animations** — Slide-in/out with directional awareness.
 * - **Progress UI** — Dots and a counter at the bottom of the viewport.
 * - **Exit button** — When `exitUrl` is set, shows an × in the top-right corner.
 * - **Presenter sync** — When `syncEndpoint` is set, POSTs the current slide
 *   on navigation for `SlideNotesView` to poll.
 *
 * `SlideDeck` must be the **direct child** of the layout (no wrapper div)
 * for the deck-unveil exit animation to work correctly.
 *
 * @example
 * ```tsx
 * // app/slides/layout.tsx
 * import { SlideDeck } from 'nextjs-slides';
 * import { slides } from './slides';
 *
 * export default function SlidesLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <SlideDeck slides={slides} exitUrl="/" syncEndpoint="/api/nxs-sync">
 *       {children}
 *     </SlideDeck>
 *   );
 * }
 * ```
 */
export function SlideDeck({
  children,
  slides,
  basePath = '/slides',
  exitUrl,
  showProgress = true,
  showCounter = true,
  syncEndpoint,
  className,
  speakerNotes: _speakerNotes,
}: SlideDeckConfig & { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const total = slides.length;
  const slideRoutePattern = useMemo(
    () =>
      new RegExp(`^${basePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/(\\d+)$`),
    [basePath]
  );
  const isSlideRoute = slideRoutePattern.test(pathname);
  const current = useMemo(
    () => getSlideIndex(pathname, slideRoutePattern),
    [pathname, slideRoutePattern]
  );

  const syncSlide = useCallback(
    (slide: number) => {
      if (!syncEndpoint || !isSlideRoute) return;
      fetch(syncEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slide, total }),
      }).catch(() => {});
    },
    [isSlideRoute, syncEndpoint, total]
  );

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, total - 1));
      if (clamped === current) return;
      const targetSlide = clamped + 1; // 1-based for sync API
      syncSlide(targetSlide); // Immediate feedback for phone sync
      startTransition(() => {
        addTransitionType(
          clamped > current ? TRANSITION_FORWARD : TRANSITION_BACK
        );
        router.push(`${basePath}/${targetSlide}`);
      });
    },
    [basePath, current, router, startTransition, syncSlide, total]
  );

  useEffect(() => {
    if (!isSlideRoute) return;
    if (current > 0) router.prefetch(`${basePath}/${current}`);
    if (current < total - 1) router.prefetch(`${basePath}/${current + 2}`);
  }, [basePath, current, isSlideRoute, router, total]);

  useEffect(() => {
    if (!isSlideRoute) return;
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        target.closest('[data-slide-interactive]') ||
        target.matches('input, textarea, select, [contenteditable="true"]')
      ) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(current - 1);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [current, goTo, isSlideRoute]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (!isPending && isSlideRoute) {
      syncSlide(current + 1);
    }
  }, [current, isPending, isSlideRoute, syncSlide]);

  return (
    <ViewTransition default="none" exit="deck-unveil">
      <div
        id="slide-deck"
        className={cn(
          'bg-background text-foreground fixed inset-0 z-50 flex flex-col overflow-hidden font-sans select-none',
          className
        )}
        data-pending={isPending ? '' : undefined}
      >
        <div className="flex-1 overflow-hidden">
          <ViewTransition
            key={pathname}
            default="none"
            enter={{
              default: 'slide-from-right',
              [TRANSITION_BACK]: 'slide-from-left',
              [TRANSITION_FORWARD]: 'slide-from-right',
            }}
            exit={{
              default: 'slide-to-left',
              [TRANSITION_BACK]: 'slide-to-right',
              [TRANSITION_FORWARD]: 'slide-to-left',
            }}
          >
            <div>{children}</div>
          </ViewTransition>
        </div>

        {isSlideRoute && showProgress && (
          <div
            className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5"
            aria-label="Slide progress"
          >
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1 transition-all duration-300',
                  i === current ? 'bg-foreground w-6' : 'bg-foreground/20 w-1'
                )}
              />
            ))}
          </div>
        )}

        {isSlideRoute && showCounter && (
          <div className="text-foreground/30 fixed right-8 bottom-8 z-50 font-mono text-xs tracking-wider">
            {current + 1} / {total}
          </div>
        )}

        {isSlideRoute && exitUrl && (
          <Link
            href={exitUrl}
            className="text-foreground/50 hover:text-foreground fixed top-6 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-foreground/10"
            aria-label="Exit presentation"
          >
            <ExitIcon />
          </Link>
        )}
      </div>
    </ViewTransition>
  );
}
