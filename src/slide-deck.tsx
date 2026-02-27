'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  addTransitionType,
  useCallback,
  useEffect,
  useTransition,
  ViewTransition,
} from 'react';
import { cn } from './cn';
import type { SlideDeckConfig } from './types';

export function SlideDeck({
  children,
  slides,
  basePath = '/slides',
  exitUrl,
  showProgress = true,
  showCounter = true,
  syncEndpoint,
  className,
  ...rest
}: SlideDeckConfig & { children: React.ReactNode }) {
  void rest; // accepts speakerNotes and other optional config
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const total = slides.length;
  const slideRoutePattern = new RegExp(`^${basePath}/(\\d+)$`);
  const isSlideRoute = slideRoutePattern.test(pathname);
  const current = (() => {
    const match = pathname.match(slideRoutePattern);
    return match ? Number(match[1]) - 1 : 0;
  })();

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, total - 1));
      if (clamped === current) return;
      const targetSlide = clamped + 1; // 1-based for sync API
      if (syncEndpoint) {
        fetch(syncEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slide: targetSlide, total }),
        }).catch(() => {});
      }
      startTransition(() => {
        addTransitionType(clamped > current ? 'slide-forward' : 'slide-back');
        router.push(`${basePath}/${targetSlide}`);
      });
    },
    [basePath, current, router, startTransition, syncEndpoint, total]
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
    if (!syncEndpoint || !isSlideRoute || isPending) return;
    fetch(syncEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slide: current + 1, total }),
    }).catch(() => {});
  }, [syncEndpoint, current, total, isSlideRoute, isPending]);

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
              'slide-back': 'slide-from-left',
              'slide-forward': 'slide-from-right',
            }}
            exit={{
              default: 'slide-to-left',
              'slide-back': 'slide-to-right',
              'slide-forward': 'slide-to-left',
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Link>
        )}
      </div>
    </ViewTransition>
  );
}
