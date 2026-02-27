'use client';

import { useEffect, useRef, useState } from 'react';

export function SlideDemoContent({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize[0].blockSize;
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
