import { router } from "@/core/router";
import { useTheme } from "@/core/ui/mui/theme.js";
import { OctokitProvider } from "@/services/api/github";
import { ApiProvider } from "@/services/api";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import { lazy, Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Spinner from "./Spinner/Spinner.js";

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

export function App(): JSX.Element {
  const queryClient = new QueryClient({
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
  const theme = useTheme();
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-expect-error export global variable in order to give an opportunity
    // to enable devtools by calling this function
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <OctokitProvider>
            <ApiProvider>
              <CssBaseline />
              <RouterProvider router={router} fallbackElement={<Spinner />} />
              <ReactQueryDevtools initialIsOpen />
              {showDevtools && (
                <Suspense fallback={null}>
                  <ReactQueryDevtoolsProduction />
                </Suspense>
              )}
            </ApiProvider>
          </OctokitProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}
