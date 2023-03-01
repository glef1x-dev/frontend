import ErrorBoundary from "@/components/ErrorPage/ErrorBoundary";
import { withSuspense } from "@/utils/HOC/withSuspense";
import * as Sentry from "@sentry/react";
import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

const Layout = withSuspense(
  React.lazy(() => import("../components/Layout.js"))
);
const About = withSuspense(
  React.lazy(() => import("../pages/AboutMe/AboutMe.js"))
);
const OpenSource = withSuspense(
  React.lazy(() => import("../pages/OpenSource/OpenSource.js"))
);
const ArticleList = withSuspense(
  React.lazy(() => import("../pages/Blog/ArticleListPage.js"))
);
const BlogArticle = withSuspense(
  React.lazy(() => import("../pages/Blog/BlogArticle/BlogArticlePage.js"))
);

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

export const router = sentryCreateBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <About />,
      },
      {
        path: "/opensource/",
        element: <OpenSource />,
      },
      {
        path: "/blog/",
        element: <ArticleList />,
      },
      {
        path: "/blog/article/:slug/",
        element: <BlogArticle />,
      },
      {
        path: "/blog/:tagName/",
        element: <ArticleList />,
      },
    ],
  },
]);
