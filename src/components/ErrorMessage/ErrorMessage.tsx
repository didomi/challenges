import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  retry?: () => void;
  actions?: ReactNode;
}

export default function ErrorMessage({ title = 'Error', message = 'Something went wrong', retry, actions }: ErrorMessageProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6} gap={2}>
      <Alert
        severity="error"
        sx={{ width: '100%', maxWidth: 480 }}
        action={
          (retry || actions) && (
            <Box display="flex" gap={2}>
              {retry && <Button color="inherit" size="small" onClick={retry}>Retry</Button>}
              {actions}
            </Box>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}
