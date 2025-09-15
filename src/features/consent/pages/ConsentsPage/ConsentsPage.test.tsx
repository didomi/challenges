import { render, screen, waitFor } from '@testing-library/react';
import ConsentsPage from './ConsentsPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConsent, __resetStore } from '.././../api/data-access';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as api from '.././../api/data-access';
import { NuqsAdapter } from 'nuqs/adapters/react';

function setup(qc?: QueryClient) {
  const client =
    qc ||
    new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });
  return render(
    <MemoryRouter>
      <NuqsAdapter>
        <QueryClientProvider client={client}>
          <ConsentsPage />
        </QueryClientProvider>
      </NuqsAdapter>
    </MemoryRouter>
  );
}

describe('ConsentsPage', () => {
  beforeEach(() => (api as any).__resetStore?.());
  it('renders empty state then updates when data present', async () => {
    setup();
    expect(await screen.findByText(/no consents/i)).toBeInTheDocument();
    await createConsent({ name: 'Later', email: 'later@e.com', consentTypes: ['ads'] });
    expect(screen.getByText(/no consents/i)).toBeInTheDocument();
  });
  it('paginates results (2 per page)', async () => {
    // Seed > 4 consents
    for (let i = 0; i < 5; i++) {
      await api.createConsent({ name: `User${i}`, email: `u${i}@e.com`, consentTypes: ['email'] });
    }
    setup();
    // Page 1 should show the two most recent (User4, User3)
    await waitFor(() => screen.getByText('User4'));
    expect(screen.getByText('User3')).toBeInTheDocument();
    expect(screen.queryByText('User2')).not.toBeInTheDocument();
  });

  it('renders error state and retries successfully', async () => {
    const spy = vi.spyOn(api, 'listConsents');
    spy.mockRejectedValueOnce(new Error('Network down'));
    // After retry return empty dataset
    spy.mockResolvedValueOnce({ data: [], total: 0, page: 1, pageSize: 2 });

    setup();
    await waitFor(() => screen.getByText(/failed to load/i));
    expect(screen.getByText(/network down/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /retry/i }));
    await waitFor(() => screen.getByText(/no consents yet/i));
  });
});
