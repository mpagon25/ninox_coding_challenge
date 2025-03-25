import { render, screen, fireEvent } from '@testing-library/react';
import { GIFObject } from 'giphy-api';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { GifModal } from '../index';
import { MemoryRouter } from 'react-router';

const mockGif: GIFObject = {
  id: '1',
  title: 'Test GIF',
  images: {
    original: { url: 'https://example.com/gif.gif' },
  },
} as GIFObject;

const renderWithRouter = (component: React.ReactNode) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('GifModal Accessibility', () => {
  let previousActiveElement: HTMLElement;

  beforeEach(() => {
    previousActiveElement = document.createElement('button');
    document.body.appendChild(previousActiveElement);
    previousActiveElement.focus();
  });

  afterEach(() => {
    document.body.removeChild(previousActiveElement);
  });

  it('should have correct ARIA attributes', () => {
    renderWithRouter(<GifModal gif={mockGif} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('should set initial focus on modal', () => {
    renderWithRouter(<GifModal gif={mockGif} />);

    const modal = screen.getByRole('dialog').querySelector('[tabindex="-1"]');
    expect(modal).toHaveFocus();
  });

  it('should restore focus when modal closes', () => {
    const { unmount } = renderWithRouter(<GifModal gif={mockGif} />);
    unmount();
    expect(document.activeElement).toBe(previousActiveElement);
  });

  it('should trap focus within modal using Tab key', () => {
    renderWithRouter(<GifModal gif={mockGif} />);

    const modal = screen.getByRole('dialog');
    const closeButton = screen.getByRole('button', { name: /close modal/i });

    closeButton.focus();
    fireEvent.keyDown(modal, { key: 'Tab' });
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(modal, { key: 'Tab', shiftKey: true });
    expect(closeButton).toHaveFocus();
  });

  it('should close on Escape key', () => {
    renderWithRouter(<GifModal gif={mockGif} />);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(window.location.pathname).toBe('/');
  });

  it('should have accessible close button', () => {
    renderWithRouter(<GifModal gif={mockGif} />);

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(window.location.pathname).toBe('/');
  });
});
