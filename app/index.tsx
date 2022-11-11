/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { App } from "./common/App.js";
import { SnackbarProvider } from "notistack";

const container = document.getElementById("root") as HTMLElement;

// TODO: Initialize local store (Relay, Apollo, Redux, etc.)
// const store = createRelay({ data: JSON.parse(data) });

// Render the top-level React component
ReactDOM.createRoot(container).render(
  <RecoilRoot>
    <React.StrictMode>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </React.StrictMode>
  </RecoilRoot>
);
