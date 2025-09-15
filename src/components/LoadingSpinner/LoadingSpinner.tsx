import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps { label?: string }
export default function LoadingSpinner({ label = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6} gap={2}>
      <CircularProgress />
      {label && <Typography variant="body2" color="text.secondary">{label}</Typography>}
    </Box>
  );
}
