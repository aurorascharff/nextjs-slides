'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function SunIcon() {
  return (
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
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2" />
      <path d="M12 21v2" />
      <path d="m4.22 4.22 1.42 1.42" />
      <path d="m18.36 18.36 1.42 1.42" />
      <path d="M1 12h2" />
      <path d="M21 12h2" />
      <path d="m4.22 19.78 1.42-1.42" />
      <path d="m18.36 5.64 1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
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
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mounted check for theme hydration
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="border-foreground/20 bg-foreground/5 flex h-14 w-32 items-center justify-center rounded-xl border opacity-50">
        <span className="text-muted-foreground text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="border-foreground/20 bg-foreground/5 inline-flex rounded-xl border p-1">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`rounded-lg p-2 transition-colors ${
            theme === 'light'
              ? 'bg-foreground/10 text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-label="Light mode"
        >
          <SunIcon />
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`rounded-lg p-2 transition-colors ${
            theme === 'dark'
              ? 'bg-foreground/10 text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-label="Dark mode"
        >
          <MoonIcon />
        </button>
        <button
          type="button"
          onClick={() => setTheme('system')}
          className={`rounded-lg p-2 transition-colors ${
            theme === 'system'
              ? 'bg-foreground/10 text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-label="System theme"
        >
          <MonitorIcon />
        </button>
      </div>
      <p className="text-muted-foreground text-center text-sm">
        {resolvedTheme === 'dark' ? 'Dark' : 'Light'} mode
        {theme === 'system' && ' (system)'}
      </p>
    </div>
  );
}
