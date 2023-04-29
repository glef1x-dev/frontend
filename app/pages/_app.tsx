import NProgress from "nprogress";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { useEffectOnce } from "react-use";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

import "inter-ui/inter.css";
import "nprogress/nprogress.css";
import "windi.css";

import { NextPage } from "next";
import React, { ReactElement } from "react";
import { Inter } from "next/font/google";
import { Theme } from "~/types";
import { colors } from "~/lib";
import { wrapper } from "~/lib/state/store";
import Init from "~/components/Init.component";
import { PersistGate } from "redux-persist/integration/react";
import { Analytics } from "@vercel/analytics/react";
import { Donate } from "~/components";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

NProgress.configure({
  easing: "ease",
  minimum: 0.3,
  showSpinner: false,
  speed: 800,
});

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement, pageProps: P) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  ...rest
}: AppPropsWithLayout): JSX.Element {
  const router = useRouter();
  const { store, props } = wrapper.useWrappedStore(rest);

  useEffectOnce(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());

    document.body.classList.add(inter.variable);
  });

  const getLayout = Component.getLayout ?? ((page): ReactElement => page);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store["__persistor"]}>
        <ThemeProvider
          attribute="class"
          defaultTheme={Theme.SYSTEM}
          themes={Object.values(Theme)}
        >
          <Analytics />
          <Init />
          <Donate.Modal />

          {getLayout(<Component {...props.pageProps} />, props.pageProps)}
          <style jsx global>
            {`
              #nprogress .bar {
                height: 0.25rem;
                background-color: ${colors.primary[500]};
              }
            `}
          </style>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
