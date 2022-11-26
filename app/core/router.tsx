import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import { withSuspense } from "../utils/suspense.js";
import { ErrorPage } from "@/common/ErrorPage.js";

const Layout = withSuspense(React.lazy(() => import("../common/Layout.js")));
const About = withSuspense(
  React.lazy(() => import("../pages/AboutMe/AboutMe.js"))
);
const OpenSource = withSuspense(
  React.lazy(() => import("../pages/OpenSource/OpenSource.js"))
);
const Blog = withSuspense(
  React.lazy(() => import("../pages/Blog/BlogArticlePreviewList.js"))
);
const BlogArticle = withSuspense(
  React.lazy(() => import("../pages/Blog/BlogArticle.js"))
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
        element: <BlogArticle />,
      },
    ],
  },
]);
