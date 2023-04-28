import { Head, Html, Main, NextScript } from "next/document";
import { useTheme } from "next-themes";

export default function Document(): JSX.Element {
  const { theme } = useTheme();

  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.jpeg" />
        <meta name="theme-color" content={theme} />
      </Head>
      <body className="antialiased font-sans bg-gray-50 text-gray-500 dark:bg-gray-900 selection:bg-gray-900 selection:dark:bg-white selection:text-white selection:dark:text-primary-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
