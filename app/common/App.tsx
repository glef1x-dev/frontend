import { CssBaseline, ThemeProvider } from "@mui/material";
import Spinner from "./Spinner.js";
import { RouterProvider } from "react-router-dom";
import { router } from "../core/router.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import { useTheme } from "@/core/ui/mui/theme.js";
import { OctokitProvider } from "@/services/api/github.js";
import { queryClient } from "@/services/queryClient/queryClient.js";
import { ApiProvider } from "@/services/api/index.js";

export function App(): JSX.Element {
  const theme = useTheme();

  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <OctokitProvider>
            <ApiProvider>
              <CssBaseline />
              <RouterProvider router={router} fallbackElement={<Spinner />} />
              <ReactQueryDevtools position="bottom-right" />
            </ApiProvider>
          </OctokitProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}
