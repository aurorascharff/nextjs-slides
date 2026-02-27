import React from 'react';
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// ResizeObserver polyfill for jsdom
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock React's ViewTransition and addTransitionType (React 19 canary)
vi.mock('react', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react');
  const Fragment = actual.Fragment;
  return {
    ...actual,
    ViewTransition: ({ children }: { children: React.ReactNode }) =>
      actual.createElement(Fragment, null, children),
    addTransitionType: vi.fn(),
  };
});

// Mock next/navigation (can be overridden in individual test files)
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/slides/1'),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  })),
  notFound: vi.fn(() => {
    throw new Error('notFound');
  }),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => React.createElement('a', { href, className }, children),
}));
