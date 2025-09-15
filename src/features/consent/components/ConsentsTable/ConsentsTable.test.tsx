import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ConsentsTable from './ConsentsTable';
import type { Consent, ConsentType } from '../../types';
import * as hooks from '../../hooks';

const makeConsent = (over: Partial<Consent> = {}): Consent => ({
  id: globalThis.crypto?.randomUUID?.() ?? `id-${Math.random().toString(36).slice(2)}`,
  name: 'Alice',
  email: 'alice@example.com',
  consentTypes: ['email', 'ads'],
  createdAt: new Date().toISOString(),
  ...over,
});

vi.mock('../../hooks', () => ({
  useConsentTypesQuery: vi.fn(),
}));

describe('ConsentsTable', () => {
  const types: ConsentType[] = [
    { name: 'email', label: 'Receive newsletter via email' },
    { name: 'sms', label: 'Receive newsletter via SMS' },
    { name: 'ads', label: 'Targeted ads' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (hooks as any).useConsentTypesQuery.mockReturnValue({ data: types, isLoading: false });
  });

  it('renders empty state and disables pagination on single page', () => {
    const onPageChange = vi.fn();
    render(
      <ConsentsTable consents={[]} page={1} pageSize={2} totalItems={0} onPageChange={onPageChange} />
    );
    expect(screen.getByText(/no consents yet/i)).toBeInTheDocument();
    const prev = screen.getByLabelText(/go to previous page/i);
    const next = screen.getByLabelText(/go to next page/i);
    expect(prev).toBeDisabled();
    expect(next).toBeDisabled();
  });

  it('renders rows for provided consents', () => {
    const rows = [
      makeConsent({ name: 'Bojack Horseman', email: 'bojack@horseman.com', consentTypes: ['email', 'ads'] }),
      makeConsent({ name: 'Princess Carolyn', email: 'princess@manager.com', consentTypes: ['email'] })
    ];
    render(
      <ConsentsTable consents={rows} page={1} pageSize={2} totalItems={2} onPageChange={() => { }} />
    );
    expect(screen.getByText('Bojack Horseman')).toBeInTheDocument();
    expect(screen.getByText('bojack@horseman.com')).toBeInTheDocument();
    expect(screen.getByText('Princess Carolyn')).toBeInTheDocument();
    expect(screen.getByText('princess@manager.com')).toBeInTheDocument();
  });

  it('triggers onPageChange when clicking a page number', async () => {
    const onPageChange = vi.fn();
    render(
      <ConsentsTable consents={[makeConsent()]} page={2} pageSize={2} totalItems={4} onPageChange={onPageChange} />
    );
    await userEvent.click(screen.getByLabelText(/go to page 1/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('navigates with next/previous controls', async () => {
    const onPageChange = vi.fn();
    const { unmount } = render(
      <ConsentsTable consents={[makeConsent()]} page={1} pageSize={2} totalItems={4} onPageChange={onPageChange} />
    );
    await userEvent.click(screen.getByLabelText(/go to next page/i));
    expect(onPageChange).toHaveBeenCalledWith(2);

    onPageChange.mockClear();
    unmount();
    render(
      <ConsentsTable consents={[makeConsent()]} page={2} pageSize={2} totalItems={4} onPageChange={onPageChange} />
    );
    await userEvent.click(screen.getByLabelText(/go to previous page/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
