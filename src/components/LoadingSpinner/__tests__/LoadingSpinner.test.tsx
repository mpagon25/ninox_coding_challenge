import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LoadingSpinner } from '../index.';

describe('LoadingSpinner Accessibility', () => {
  it('should have correct ARIA attributes', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-live', 'polite');
  });

  it('should have accessible loading text', () => {
    render(<LoadingSpinner />);

    expect(screen.getByText('Loading content...')).toBeInTheDocument();
  });
});
