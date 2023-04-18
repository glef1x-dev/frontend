import NProgress from "nprogress";
import splitbee from "@splitbee/web";
import { Analytics } from "@vercel/analytics/react";
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
import { ApiProvider } from "~/services/api";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

NProgress.configure({
  easing: "ease",
  minimum: 0.3,
  showSpinner: false,
  speed: 800,
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
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
  const { store, props: pageProps } = wrapper.useWrappedStore(rest);

  useEffectOnce(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());

    if (process.env.NODE_ENV === "production") {
      splitbee.init({
        disableCookie: true,
      });
    }
  });

  const getLayout = Component.getLayout ?? ((page): ReactElement => page);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.__persistor}>
        <ApiProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme={Theme.SYSTEM}
            themes={Object.values(Theme)}
          >
            <Init />
            <Analytics />
            <div className={`${inter.variable}`}>
              {getLayout(<Component {...pageProps} />, pageProps)}
            </div>
            <style jsx global>
              {`
                #nprogress .bar {
                  height: 0.25rem;
                  background-color: ${colors.primary[500]};
                }
              `}
            </style>
          </ThemeProvider>
        </ApiProvider>
      </PersistGate>
    </Provider>
  );
}