import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./routing-error-page.js";
import { getPostArticleBySlug } from "@/features/blog/api/index.js";
import { withSuspense } from "../utils/suspense-wrapper.js";

const Layout = withSuspense(React.lazy(() => import("../components/Layout.js")));
const About = withSuspense(React.lazy(() => import("../features/about-me/components/About.js")));
const OpenSource = withSuspense(
  React.lazy(() => import("../features/opensource-projects/components/OpenSource.js"))
);
const Blog = withSuspense(
  React.lazy(() => import("../features/blog/components/BlogArticlePreviewList.js"))
);
const BlogArticle = withSuspense(
  React.lazy(() => import("../features/blog/components/BlogArticle.js"))
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <About />,
      },
      {
        path: "/opensource",
        element: <OpenSource />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/article/:slug",
        loader: getPostArticleBySlug,
        element: <BlogArticle />,
      },
    ],
  },
]);
