import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { App } from "./components/App.js";
import "./index.css";

const container = document.getElementById("root") as HTMLElement;

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
  ],
  tracesSampleRate: 0.5,
  // TODO: add release parameter
});

// TODO: Initialize local store (Relay, Apollo, Redux, etc.)
// const store = createRelay({ data: JSON.parse(data) });

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
