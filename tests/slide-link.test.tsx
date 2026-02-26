import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SlideLink } from '../src/slide-link';

describe('SlideLink', () => {
  it('renders link with href and children', () => {
    render(<SlideLink href="/slides/2">Next slide</SlideLink>);
    const link = screen.getByRole('link', { name: 'Next slide' });
    expect(link).toHaveAttribute('href', '/slides/2');
  });

  it('applies primary variant by default', () => {
    render(<SlideLink href="/">Link</SlideLink>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('bg-primary');
  });

  it('applies ghost variant when specified', () => {
    render(
      <SlideLink href="/" variant="ghost">
        Link
      </SlideLink>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('border', 'bg-transparent');
  });

  it('merges custom className', () => {
    render(
      <SlideLink href="/" className="custom-class">
        Link
      </SlideLink>,
    );
    expect(screen.getByRole('link')).toHaveClass('custom-class');
  });
});
