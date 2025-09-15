import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import { NuqsAdapter } from 'nuqs/adapters/react'
import { router } from './router';
import { queryClient } from '@/utils/queryClient';

// Define a custom MUI theme
const theme = createTheme({
  palette: { mode: 'light', primary: { main: '#2e62d6' } }
});

// Snackbar configuration
const snackbar: SnackbarProviderProps = {
  maxSnack: 3,
  anchorOrigin: { vertical: 'top', horizontal: 'right' }
};

// Render the application with necessary providers
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider {...snackbar}>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  </React.StrictMode>
);
