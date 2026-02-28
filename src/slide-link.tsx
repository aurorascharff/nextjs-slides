import Link from 'next/link';
import { cn } from './cn';
import type { SlideLinkVariant } from './types';

/**
 * Styled Next.js `<Link>` for navigating between slides, to breakout pages,
 * or to external URLs.
 *
 * @example
 * ```tsx
 * <SlideLink href="/slides/demo1">Breakout page →</SlideLink>
 * <SlideLink href="/" variant="ghost">Exit deck</SlideLink>
 * ```
 */
export function SlideLink({
  href,
  children,
  className,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Visual style. `"primary"` is a solid button; `"ghost"` is a bordered transparent button. */
  variant?: SlideLinkVariant;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'nxs-slide-link inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium tracking-wide transition-all',
        variant === 'primary' &&
          'bg-primary text-primary-foreground hover:bg-primary/80',
        variant === 'ghost' &&
          'border-border border bg-transparent hover:bg-muted',
        'mt-2',
        className
      )}
    >
      {children}
    </Link>
  );
}
