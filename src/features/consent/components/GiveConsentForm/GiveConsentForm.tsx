import { Box, Button, Stack, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { consentSchema, type ConsentFormValues } from '../../validation/consentSchema';
import ConsentTypesFormGroup from '../ConsentTypesFormGroup/ConsentTypesFormGroup';
import { useCreateConsentMutation, useConsentTypesQuery } from '../../hooks';
import { useNavigate } from 'react-router-dom';

interface GiveConsentFormProps { onSubmitted?: () => void }

export default function GiveConsentForm({ onSubmitted }: GiveConsentFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, reset, formState } = useForm<ConsentFormValues>({
    defaultValues: { name: '', email: '', consentTypes: [] },
    resolver: zodResolver(consentSchema)
  });
  const { data: consentTypes = [], isLoading: isConsentTypesLoading } = useConsentTypesQuery();
  const { mutate: createConsent, isPending: isCreatingConsent } = useCreateConsentMutation();

  const submit = (data: ConsentFormValues) =>
    createConsent(data, {
      onSuccess: () => {
        reset();
        onSubmitted?.();
        enqueueSnackbar('Consent Added Successfully', { variant: 'success' });
        navigate('/consents');
      },
      onError: (error: Error) => {
        enqueueSnackbar(`Failed to add consent: ${error.message}`, { variant: 'error' });
      }
    });

  return (
    <Box component="form" onSubmit={handleSubmit(submit)} noValidate>
      <Stack spacing={3}>
        <Controller name="name" control={control} render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            required
            error={!!formState.errors.name}
            helperText={formState.errors.name?.message}
          />
        )} />
        <Controller name="email" control={control} render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            required
            error={!!formState.errors.email}
            helperText={formState.errors.email?.message}
          />
        )} />
        <ConsentTypesFormGroup
          control={control}
          isLoading={isConsentTypesLoading}
          consentTypes={consentTypes}
          errors={formState.errors.consentTypes}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          loading={isCreatingConsent}
          disabled={isCreatingConsent}
        >
          {isCreatingConsent ? 'Saving...' : 'Give consent'}
        </Button>
      </Stack>
    </Box>
  );
}
