'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={() => setCount(c => c - 1)}
        className="bg-muted hover:bg-muted/80 flex h-10 w-10 items-center justify-center rounded-lg text-lg font-medium transition-colors"
      >
        −
      </button>
      <span className="text-foreground w-12 text-center font-mono text-3xl font-bold tabular-nums">{count}</span>
      <button
        onClick={() => setCount(c => c + 1)}
        className="bg-muted hover:bg-muted/80 flex h-10 w-10 items-center justify-center rounded-lg text-lg font-medium transition-colors"
      >
        +
      </button>
    </div>
  );
}
