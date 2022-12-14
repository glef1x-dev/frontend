import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10 * 60 * 1000,
      staleTime: 0,
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
      useErrorBoundary: true,
    },
  },
});
