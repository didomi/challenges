import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ConsentTypesFormGroup from './ConsentTypesFormGroup';
import type { ConsentType } from '../../types';
import { useForm } from 'react-hook-form';
import type { ConsentFormValues } from '../../validation/consentSchema';

function renderWithForm(ui: (args: { control: any }) => JSX.Element) {
  function Wrapper() {
    const { control } = useForm<ConsentFormValues>({
      defaultValues: { name: '', email: '', consentTypes: [] }
    });
    return ui({ control });
  }
  return render(<Wrapper />);
}

describe('ConsentTypesFormGroup', () => {
  const types: ConsentType[] = [
    { name: 'email', label: 'Receive newsletter via email' },
    { name: 'sms', label: 'Receive newsletter via SMS' },
    { name: 'ads', label: 'Targeted ads' }
  ];

  it('renders provided consent types with default title', () => {
    renderWithForm(({ control }) => (
      <ConsentTypesFormGroup control={control} isLoading={false} consentTypes={types} />
    ));
    expect(screen.getByText(/i agree to:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/receive newsletter via email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/receive newsletter via sms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/targeted ads/i)).toBeInTheDocument();
  });

  it('shows loading spinner when isLoading is true', () => {
    renderWithForm(({ control }) => (
      <ConsentTypesFormGroup control={control} isLoading={true} consentTypes={types} />
    ));
    expect(screen.getByText(/loading consent types/i)).toBeInTheDocument();
  });

  it('toggles checkbox selections and reflects state', async () => {
    renderWithForm(({ control }) => (
      <ConsentTypesFormGroup control={control} isLoading={false} consentTypes={types} />
    ));
    const emailCb = screen.getByRole('checkbox', { name: /receive newsletter via email/i });
    expect(emailCb).not.toBeChecked();
    await userEvent.click(emailCb);
    expect(emailCb).toBeChecked();
    await userEvent.click(emailCb);
    expect(emailCb).not.toBeChecked();
  });

  it('renders error message when provided', () => {
    renderWithForm(({ control }) => (
      <ConsentTypesFormGroup control={control} isLoading={false} consentTypes={types} errors={{ message: 'Select at least one' } as any} />
    ));
    expect(screen.getByText(/select at least one/i)).toBeInTheDocument();
  });
});
