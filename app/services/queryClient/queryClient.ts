import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10 * 60 * 1000,
      staleTime: 1000 * 20, // 20 seconds
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      suspense: true,
      useErrorBoundary: true,
    },
  },
});
