import { render, screen, fireEvent } from '@testing-library/react';
import { GIFObject } from 'giphy-api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GifModal } from '../index';

const mockGif: GIFObject = {
  id: '1',
  title: 'Test GIF',
  images: {
    original: { url: 'https://example.com/gif.gif' },
  },
} as GIFObject;

describe('GifModal Accessibility', () => {
  const onClose = vi.fn();
  let previousActiveElement: HTMLElement;

  beforeEach(() => {
    onClose.mockClear();
    previousActiveElement = document.createElement('button');
    document.body.appendChild(previousActiveElement);
    previousActiveElement.focus();
  });

  afterEach(() => {
    document.body.removeChild(previousActiveElement);
  });

  it('should have correct ARIA attributes', () => {
    render(<GifModal gif={mockGif} onClose={onClose} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('should set initial focus on modal', () => {
    render(<GifModal gif={mockGif} onClose={onClose} />);

    const modal = screen.getByRole('dialog').querySelector('[tabindex="-1"]');
    expect(modal).toHaveFocus();
  });

  it('should restore focus when modal closes', () => {
    const { unmount } = render(<GifModal gif={mockGif} onClose={onClose} />);
    unmount();
    expect(document.activeElement).toBe(previousActiveElement);
  });

  it('should trap focus within modal using Tab key', () => {
    render(<GifModal gif={mockGif} onClose={onClose} />);

    const modal = screen.getByRole('dialog');
    const closeButton = screen.getByRole('button', { name: /close modal/i });

    closeButton.focus();
    fireEvent.keyDown(modal, { key: 'Tab' });
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(modal, { key: 'Tab', shiftKey: true });
    expect(closeButton).toHaveFocus();
  });

  it('should close on Escape key', () => {
    render(<GifModal gif={mockGif} onClose={onClose} />);

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('should have accessible close button', () => {
    render(<GifModal gif={mockGif} onClose={onClose} />);

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
