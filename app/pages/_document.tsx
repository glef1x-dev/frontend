import {
  Head, Html, Main, NextScript,
} from 'next/document';

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.jpeg" />
      </Head>
      <body className="antialiased font-sans bg-gray-50 text-gray-500 dark:bg-gray-900 selection:bg-gray-900 selection:dark:bg-white selection:text-white selection:dark:text-primary-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
