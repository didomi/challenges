import { Stack, Typography } from '@mui/material';
import GiveConsentForm from '../../components/GiveConsentForm/GiveConsentForm';

export default function GiveConsentPage() {
  return (
    <Stack spacing={2} maxWidth={480} margin='0 auto'>
      <Typography variant="h5">Give consent</Typography>
      <GiveConsentForm />
    </Stack>
  );
}