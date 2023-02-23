import { router } from "@/core/router";
import { useTheme } from "@/core/ui/mui/theme.js";
import { OctokitProvider } from "@/services/api/github.js";
import { ApiProvider } from "@/services/api/index.js";
import { queryClient } from "@/services/queryClient/queryClient.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import {lazy, Suspense, useEffect, useState} from "react";
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
  const theme = useTheme();
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-expect-error
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
