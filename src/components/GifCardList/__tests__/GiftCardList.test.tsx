import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GifCardList } from '../index';
import { GIFObject } from 'giphy-api';

const mockGifs: GIFObject[] = [
  {
    id: '1',
    title: 'First GIF',
    images: {
      original: { url: 'https://example.com/gif1.gif' },
    },
  } as GIFObject,
  {
    id: '2',
    title: 'Second GIF',
    images: {
      original: { url: 'https://example.com/gif2.gif' },
    },
  } as GIFObject,
];

describe('GifCardList Accessibility', () => {
  const onGifSelect = vi.fn();

  beforeEach(() => {
    onGifSelect.mockClear();
  });

  it('should have correct ARIA attributes', () => {
    render(<GifCardList gifs={mockGifs} onGifSelect={onGifSelect} />);

    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-label', 'Grid of GIF images');
  });

  it('should focus first card when using arrow keys with no initial selection', () => {
    render(<GifCardList gifs={mockGifs} onGifSelect={onGifSelect} />);

    const grid = screen.getByRole('grid');
    fireEvent.keyDown(grid, { key: 'ArrowRight' });

    const firstCard = screen.getAllByRole('gridcell')[0];
    expect(firstCard).toHaveFocus();
  });

  it('should navigate through cards using arrow keys', () => {
    render(<GifCardList gifs={mockGifs} onGifSelect={onGifSelect} />);

    const grid = screen.getByRole('grid');
    const cards = screen.getAllByRole('gridcell');

    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    expect(cards[0]).toHaveFocus();

    fireEvent.keyDown(cards[0], { key: 'ArrowRight' });
    expect(cards[1]).toHaveFocus();
  });

  it('should select card with Enter key', () => {
    render(<GifCardList gifs={mockGifs} onGifSelect={onGifSelect} />);

    const grid = screen.getByRole('grid');
    fireEvent.keyDown(grid, { key: 'ArrowRight' });

    const firstCard = screen.getAllByRole('gridcell')[0];
    fireEvent.keyDown(firstCard, { key: 'Enter' });

    expect(onGifSelect).toHaveBeenCalledWith(mockGifs[0]);
  });

  it('should handle mouse interactions accessibly', () => {
    render(<GifCardList gifs={mockGifs} onGifSelect={onGifSelect} />);

    const cards = screen.getAllByRole('gridcell');
    fireEvent.mouseEnter(cards[0]);
    expect(cards[0]).toHaveFocus();
  });
});
