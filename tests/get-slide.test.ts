import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { getSlide, generateSlideParams } from '../src/get-slide';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('notFound');
  }),
}));

describe('getSlide', () => {
  const slides = [
    React.createElement('div', { key: '1' }, 'Slide 1'),
    React.createElement('div', { key: '2' }, 'Slide 2'),
    React.createElement('div', { key: '3' }, 'Slide 3'),
  ];

  it('returns the correct slide for valid page param', () => {
    expect(getSlide({ page: '1' }, slides)).toBe(slides[0]);
    expect(getSlide({ page: '2' }, slides)).toBe(slides[1]);
    expect(getSlide({ page: '3' }, slides)).toBe(slides[2]);
  });

  it('calls notFound for out-of-range index', () => {
    expect(() => getSlide({ page: '0' }, slides)).toThrow('notFound');
    expect(() => getSlide({ page: '4' }, slides)).toThrow('notFound');
    expect(() => getSlide({ page: '99' }, slides)).toThrow('notFound');
  });

  it('calls notFound for invalid page param', () => {
    expect(() => getSlide({ page: 'abc' }, slides)).toThrow('notFound');
    expect(() => getSlide({ page: '' }, slides)).toThrow('notFound');
    expect(() => getSlide({ page: '-1' }, slides)).toThrow('notFound');
  });

  it('calls notFound for non-integer page', () => {
    // '1.5' parses to 1.5, index 0.5 - valid but truncates to 0. 'x' produces NaN.
    expect(() => getSlide({ page: 'x' }, slides)).toThrow('notFound');
  });
});

describe('generateSlideParams', () => {
  it('returns params for each slide', () => {
    const slides = [
      React.createElement('div', { key: '1' }, 'A'),
      React.createElement('div', { key: '2' }, 'B'),
    ];
    expect(generateSlideParams(slides)).toEqual([{ page: '1' }, { page: '2' }]);
  });

  it('returns empty array for empty slides', () => {
    expect(generateSlideParams([])).toEqual([]);
  });

  it('returns correct page numbers for single slide', () => {
    expect(
      generateSlideParams([React.createElement('div', { key: '1' }, 'Only')])
    ).toEqual([{ page: '1' }]);
  });
});
