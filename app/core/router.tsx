import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import { withSuspense } from "../utils/HOC/withSuspense.js";
import ErrorBoundary from "@/components/ErrorPage/ErrorBoundary.js";

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
  React.lazy(() => import("../pages/Blog/ArticleList.js"))
);
const BlogArticle = withSuspense(
  React.lazy(() => import("../pages/Blog/BlogArticle/BlogArticle.js"))
);

export const router = createBrowserRouter([
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
