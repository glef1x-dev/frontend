import { withSuspense } from "@/utils/HOC/withSuspense";
import * as Sentry from "@sentry/react";
import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import { config } from "@/core/config.js";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

const Layout = withSuspense(
  React.lazy(() => import("../components/Layout.js")),
);
const About = withSuspense(
  React.lazy(() => import("../pages/AboutMe/AboutMe.js")),
);
const OpenSource = withSuspense(
  React.lazy(() => import("../pages/OpenSource/OpenSource.js")),
);
const ArticleList = withSuspense(
  React.lazy(() => import("../pages/Blog/ArticleListPage.js")),
);
const BlogArticle = withSuspense(
  React.lazy(() => import("../pages/Blog/BlogArticle/BlogArticlePage.js")),
);

let createBrowserRouter1: typeof createBrowserRouter;
if (config.app.env === "production") {
  createBrowserRouter1 = Sentry.wrapCreateBrowserRouter(createBrowserRouter);
} else {
  createBrowserRouter1 = createBrowserRouter;
}

export const router = createBrowserRouter1([
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
