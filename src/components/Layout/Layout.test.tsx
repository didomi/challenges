import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Layout from './Layout';
import { MemoryRouter } from 'react-router-dom';

describe('Layout', () => {
  it('renders title and links text', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Consent Manager/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Give consent/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Collected Consents/i).length).toBeGreaterThan(0);
  });

  it('toggles mobile drawer via hamburger', async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Count occurrences (permanent drawer content is always in DOM in JSDOM)
    const initialCount = screen.getAllByText(/Collected Consents/i).length;

    // Open mobile drawer
    await userEvent.click(screen.getByLabelText(/open navigation/i));
    const openedCount = (await screen.findAllByText(/Collected Consents/i)).length;
    expect(openedCount).toBeGreaterThanOrEqual(initialCount);

    // Clicking a nav item closes the temporary drawer (count returns to initial)
    await userEvent.click(screen.getAllByText(/Give consent/i)[-1]);
    await waitFor(() => {
      const afterCloseCount = screen.getAllByText(/Collected Consents/i).length;
      expect(afterCloseCount).toBe(initialCount);
    });
  });
});
