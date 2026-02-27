import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SlideDemoContent } from '../src/slide-demo-content';

describe('SlideDemoContent', () => {
  it('renders children', () => {
    render(
      <SlideDemoContent>
        <span>Demo content</span>
      </SlideDemoContent>
    );
    expect(screen.getByText('Demo content')).toBeInTheDocument();
  });

  it('renders a div wrapper', () => {
    const { container } = render(
      <SlideDemoContent>
        <span>Content</span>
      </SlideDemoContent>
    );
    const wrapper = container.firstChild as HTMLDivElement;
    expect(wrapper.tagName).toBe('DIV');
  });
});
