import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { queryClient } from '@/utils/queryClient';
import GiveConsentPage from './GiveConsentPage';

function setup() {
  return render(
    <MemoryRouter>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <GiveConsentPage />
          </SnackbarProvider>
        </QueryClientProvider>
      </NuqsAdapter>
    </MemoryRouter>
  );
}

describe('GiveConsentPage', () => {
  it('submits a consent', async () => {
    setup();
    await userEvent.type(screen.getByLabelText(/name/i), 'Alice');
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'alice@example.com');
    const checkbox = screen.getByLabelText(/newsletter via email/i);
    await userEvent.click(checkbox);
    await userEvent.click(screen.getByRole('button', { name: /give consent/i }));
    await waitFor(() => expect((screen.getByLabelText(/name/i) as HTMLInputElement).value).toBe(''));
  });
  it('shows validation errors', async () => {
    setup();
    await userEvent.click(screen.getByRole('button', { name: /give consent/i }));
    await screen.findByText(/select at least one/i);
  });
});
