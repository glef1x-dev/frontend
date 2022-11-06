/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {CssBaseline, ThemeProvider} from "@mui/material";
import {useTheme} from "../core/theme.js";
import Spinner from "./Spinner.js";
import {RouterProvider} from "react-router-dom";
import {router} from "../routes/router.js";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {OctokitContext} from "../core/integrations/github.js";
import {Octokit} from "@octokit/rest";
import CustomCursor from "./CustomCursor.js";

export function App(): JSX.Element {
  const theme = useTheme();
  const queryClient = new QueryClient();
  const octokit = new Octokit({ auth: GITHUB_PERSONAL_TOKEN });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <OctokitContext.Provider value={octokit}>
          <CssBaseline />
          <CustomCursor
            thirdPartyLibProps={{
              smoothness: {
                movement: 0.4,
                scale: 0.2,
                opacity: 0.2,
              },
              targetOpacity: 0.3,
              dimensions: 80,
              targetScale: 1.5,
              strokeWidth: 0.5
            }}
          />
          <RouterProvider router={router} fallbackElement={<Spinner />} />
          <ReactQueryDevtools position="bottom-right" />
        </OctokitContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
