'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Client wrapper for {@link SlideDemo} content that tracks the maximum
 * rendered height via `ResizeObserver`, preventing layout jumps when
 * the child re-renders with different content sizes.
 *
 * @internal Used by `SlideDemo` — not exported from the public API.
 */
export function SlideDemoContent({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const blockSize = entry.borderBoxSize?.[0]?.blockSize;
        const height = blockSize ?? entry.contentRect?.height ?? 0;
        setMinHeight((prev) =>
          prev === undefined ? height : Math.max(prev, height)
        );
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={minHeight !== undefined ? { minHeight } : undefined}>
      {children}
    </div>
  );
}
