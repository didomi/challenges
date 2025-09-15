import { QueryClient } from '@tanstack/react-query';

// Create a single QueryClient instance to be used throughout the app
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: true,
      retry: 1
    }
  }
});
