import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('ErrorMessage', () => {
  it('renders default text', () => {
    render(<ErrorMessage />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
  it('renders custom message and retry', async () => {
    const fn = vi.fn();
    render(<ErrorMessage title="Load failed" message="Network" retry={fn} />);
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(fn).toHaveBeenCalled();
  });
});
