import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { SlideDeck } from '../src/slide-deck';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/slides/1'),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

describe('SlideDeck', () => {
  const slides = [<div key="1">Slide 1</div>, <div key="2">Slide 2</div>];

  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/slides/1');
  });

  it('renders children', () => {
    render(
      <SlideDeck slides={slides}>
        <div>Current slide content</div>
      </SlideDeck>,
    );
    expect(screen.getByText('Current slide content')).toBeInTheDocument();
  });

  it('renders slide deck container with id', () => {
    const { container } = render(
      <SlideDeck slides={slides}>
        <div>Content</div>
      </SlideDeck>,
    );
    expect(container.querySelector('#slide-deck')).toBeInTheDocument();
  });

  it('shows progress dots when on slide route', () => {
    render(
      <SlideDeck slides={slides}>
        <div>Content</div>
      </SlideDeck>,
    );
    expect(screen.getByLabelText('Slide progress')).toBeInTheDocument();
  });

  it('shows slide counter when on slide route', () => {
    render(
      <SlideDeck slides={slides}>
        <div>Content</div>
      </SlideDeck>,
    );
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  it('hides progress when showProgress is false', () => {
    render(
      <SlideDeck slides={slides} showProgress={false}>
        <div>Content</div>
      </SlideDeck>,
    );
    expect(screen.queryByLabelText('Slide progress')).not.toBeInTheDocument();
  });

  it('hides counter when showCounter is false', () => {
    render(
      <SlideDeck slides={slides} showCounter={false}>
        <div>Content</div>
      </SlideDeck>,
    );
    expect(screen.queryByText('1 / 2')).not.toBeInTheDocument();
  });

  it('uses custom basePath for route matching', () => {
    vi.mocked(usePathname).mockReturnValue('/deck/1');
    render(
      <SlideDeck slides={slides} basePath="/deck">
        <div>Content</div>
      </SlideDeck>,
    );
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });
});
