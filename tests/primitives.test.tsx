import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Slide,
  SlideSplitLayout,
  SlideTitle,
  SlideSubtitle,
  SlideBadge,
  SlideHeaderBadge,
  SlideCode,
  SlideList,
  SlideListItem,
  SlideNote,
  SlideDemo,
  SlideStatementList,
  SlideStatement,
  SlideSpeaker,
  SlideSpeakerGrid,
  SlideSpeakerList,
} from '../src/primitives';

describe('Slide', () => {
  it('renders children', () => {
    render(<Slide>Hello</Slide>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies center alignment by default', () => {
    const { container } = render(<Slide>Content</Slide>);
    const slide = container.querySelector('.nxs-slide');
    expect(slide).toHaveClass('items-center', 'text-center');
  });

  it('applies left alignment when specified', () => {
    const { container } = render(<Slide align="left">Content</Slide>);
    const slide = container.querySelector('.nxs-slide');
    expect(slide).toHaveClass('items-start', 'text-left');
  });

  it('merges custom className', () => {
    const { container } = render(<Slide className="custom">Content</Slide>);
    expect(container.querySelector('.nxs-slide')).toHaveClass('custom');
  });
});

describe('SlideSplitLayout', () => {
  it('renders left and right content', () => {
    render(
      <SlideSplitLayout left={<span>Left</span>} right={<span>Right</span>} />
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });
});

describe('SlideTitle', () => {
  it('renders as h1 with content', () => {
    render(<SlideTitle>My Title</SlideTitle>);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('My Title');
  });
});

describe('SlideSubtitle', () => {
  it('renders subtitle text', () => {
    render(<SlideSubtitle>Subtitle</SlideSubtitle>);
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });
});

describe('SlideBadge', () => {
  it('renders badge content', () => {
    render(<SlideBadge>Badge</SlideBadge>);
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });
});

describe('SlideHeaderBadge', () => {
  it('renders header badge', () => {
    render(<SlideHeaderBadge>Header</SlideHeaderBadge>);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});

describe('SlideCode', () => {
  it('renders code with syntax highlighting', () => {
    render(<SlideCode>const x = 1;</SlideCode>);
    const pre = document.querySelector('.nxs-code-block');
    expect(pre).toBeInTheDocument();
    expect(pre?.querySelector('code')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<SlideCode title="example.ts">code</SlideCode>);
    expect(screen.getByText('example.ts')).toBeInTheDocument();
  });
});

describe('SlideList', () => {
  it('renders list items', () => {
    render(
      <SlideList>
        <SlideListItem>Item 1</SlideListItem>
        <SlideListItem>Item 2</SlideListItem>
      </SlideList>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});

describe('SlideNote', () => {
  it('renders note text', () => {
    render(<SlideNote>Footnote</SlideNote>);
    expect(screen.getByText('Footnote')).toBeInTheDocument();
  });
});

describe('SlideDemo', () => {
  it('renders children with data-slide-interactive', () => {
    const { container } = render(
      <SlideDemo label="Demo">
        <button>Click</button>
      </SlideDemo>
    );
    expect(
      container.querySelector('[data-slide-interactive]')
    ).toBeInTheDocument();
    expect(screen.getByText('Click')).toBeInTheDocument();
    expect(screen.getByText('Demo')).toBeInTheDocument();
  });
});

describe('SlideStatementList', () => {
  it('renders children with border separators', () => {
    const { container } = render(
      <SlideStatementList>
        <SlideStatement title="A" description="Desc A" />
        <SlideStatement title="B" description="Desc B" />
      </SlideStatementList>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('Desc A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(container.querySelector('.border-t')).toBeInTheDocument();
  });
});

describe('SlideStatement', () => {
  it('renders title and optional description', () => {
    render(<SlideStatement title="Title" description="Desc" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('renders title only when no description', () => {
    render(<SlideStatement title="Title" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});

describe('SlideSpeaker', () => {
  it('renders name and title', () => {
    render(<SlideSpeaker name="Jane" title="Engineer" />);
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });
});

describe('SlideSpeakerGrid', () => {
  it('renders children in grid', () => {
    render(
      <SlideSpeakerGrid>
        <SlideSpeaker name="A" title="T1" />
        <SlideSpeaker name="B" title="T2" />
      </SlideSpeakerGrid>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});

describe('SlideSpeakerList', () => {
  it('renders children in list', () => {
    render(
      <SlideSpeakerList>
        <SlideSpeaker name="A" title="T1" />
      </SlideSpeakerList>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
