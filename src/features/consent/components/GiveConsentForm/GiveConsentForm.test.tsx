import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import GiveConsentForm from './GiveConsentForm';
import { ConsentType } from '@/features/consent/types';
import * as hooks from '../../hooks';

vi.mock('../../hooks', () => ({
  useConsentTypesQuery: vi.fn(),
  useCreateConsentMutation: vi.fn(),
}));

describe('GiveConsentForm', () => {
  const mutate = vi.fn();
  const types: ConsentType[] = [
    { name: 'email', label: 'Receive newsletter via email' },
    { name: 'sms', label: 'Receive newsletter via SMS' },
    { name: 'ads', label: 'Targeted ads' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (hooks as any).useConsentTypesQuery.mockReturnValue({ data: types, isLoading: false });
    (hooks as any).useCreateConsentMutation.mockReturnValue({ mutate, isPending: false });
  });

  function renderForm(props?: { onSubmitted?: () => void }) {
    return render(
      <MemoryRouter>
        <SnackbarProvider>
          <GiveConsentForm {...props} />
        </SnackbarProvider>
      </MemoryRouter>
    );
  }

  it('submits when valid and calls mutate with form data', async () => {
    renderForm();
    await userEvent.type(screen.getByRole('textbox', { name: /name/i }), 'Alice');
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'alice@example.com');
    await userEvent.click(screen.getByLabelText(/receive newsletter via email/i));
    await userEvent.click(screen.getByRole('button', { name: /give consent/i }));

    expect(mutate).toHaveBeenCalled();
    const payload = (mutate.mock.calls[0][0]) as any;
    expect(payload).toMatchObject({ name: 'Alice', email: 'alice@example.com', consentTypes: ['email'] });
  });

  it('does not submit when no consent type selected (validation error)', async () => {
    renderForm();
    await userEvent.type(screen.getByRole('textbox', { name: /name/i }), 'Bob');
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'bob@example.com');
    await userEvent.click(screen.getByRole('button', { name: /give consent/i }));
    expect(mutate).not.toHaveBeenCalled();
  });

  it('disables submit while pending', async () => {
    (hooks as any).useCreateConsentMutation.mockReturnValue({ mutate, isPending: true });
    renderForm();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onSubmitted after successful mutation', async () => {
    const onSubmitted = vi.fn();
    (hooks as any).useCreateConsentMutation.mockReturnValue({
      mutate: (_: unknown, opts: { onSuccess?: () => void }) => opts.onSuccess?.(),
      isPending: false,
    });

    renderForm({ onSubmitted });

    await userEvent.type(screen.getByRole('textbox', { name: /name/i }), 'Zoe');
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'zoe@example.com');
    await userEvent.click(screen.getByLabelText(/receive newsletter via email/i));
    await userEvent.click(screen.getByRole('button', { name: /give consent/i }));

    expect(onSubmitted).toHaveBeenCalled();
  });
});
