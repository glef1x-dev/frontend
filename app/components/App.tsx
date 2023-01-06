import { router } from "@/core/router";
import { useTheme } from "@/core/ui/mui/theme.js";
import { OctokitProvider } from "@/services/api/github.js";
import { ApiProvider } from "@/services/api/index.js";
import { queryClient } from "@/services/queryClient/queryClient.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import Spinner from "./Spinner/Spinner.js";

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
            </ApiProvider>
          </OctokitProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}
