import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./routingErrorPage.js";
import { withSuspense } from "./utils.js";
import { getPostArticleBySlug } from "../services/api/blogAPI.js";

const Layout = withSuspense(React.lazy(() => import("../common/Layout.js")));
const About = withSuspense(React.lazy(() => import("./About/About.js")));
const OpenSource = withSuspense(
  React.lazy(() => import("./OpenSource/OpenSource.js"))
);
const Blog = withSuspense(
  React.lazy(() => import("./Blog/BlogArticlePreviewList.js"))
);
const BlogArticle = withSuspense(
  React.lazy(() => import("./Blog/BlogArticle.js"))
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
