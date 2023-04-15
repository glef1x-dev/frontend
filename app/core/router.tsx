import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { config } from '@/core/config.js';
import * as Sentry from '@sentry/react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AboutMe from '@/pages/AboutMe/AboutMe';
import Layout from '@/components/Layout';
import OpenSource from '@/pages/OpenSource/OpenSource';
import ArticleListPage from '@/pages/Blog/ArticleListPage';
import { withSuspense } from '@/utils/HOC/withSuspense';

const BlogArticlePage = withSuspense(
  lazy(() => import('../pages/Blog/BlogArticle/BlogArticlePage.js')),
);

let createBrowserRouter1: typeof createBrowserRouter;
if (config.app.env === 'production') {
  createBrowserRouter1 = Sentry.wrapCreateBrowserRouter(createBrowserRouter);
} else {
  createBrowserRouter1 = createBrowserRouter;
}

export const router = createBrowserRouter1([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <AboutMe />,
      },
      {
        path: '/opensource/',
        element: <OpenSource />,
      },
      {
        path: '/blog/',
        element: <ArticleListPage />,
      },
      {
        path: '/blog/article/:slug/',
        element: <BlogArticlePage />,
      },
      {
        path: '/blog/:tagName/',
        element: <ArticleListPage />,
      },
    ],
  },
]);
