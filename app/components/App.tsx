import { CssBaseline, ThemeProvider } from "@mui/material";
import { useTheme } from "../lib/ui/mui/theme.js";
import Spinner from "./Spinner.js";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes/router.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OctokitContext } from "../features/opensource-projects/api/github.js";
import { Octokit } from "@octokit/rest";
import {SnackbarProvider} from "notistack";

export function App(): JSX.Element {
  const theme = useTheme();
  const queryClient = new QueryClient();
  const octokit = new Octokit({ auth: GITHUB_PERSONAL_TOKEN });

  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <OctokitContext.Provider value={octokit}>
            <CssBaseline />
            <RouterProvider router={router} fallbackElement={<Spinner />} />
            <ReactQueryDevtools position="bottom-right" />
          </OctokitContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}