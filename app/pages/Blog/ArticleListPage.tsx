import { capitalizeFirstLetter } from '@/utils/strings.js';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ArticleCardsSkeleton from '@/components/Blog/ArticleCard/ArticleCardsSkeleton';
import ArticleList from '@/components/Blog/ArticleList';
import PageHeader from '@/components/PageHeader';
import SEO from '@/components/SEO';

function ArticleListPage(): JSX.Element {
  const { tagName } = useParams();
  const pageName = tagName ? capitalizeFirstLetter(tagName) : 'Blog';

  return (
    <>
      <SEO title={pageName} description="List of articles" />
      <PageHeader
        title={pageName}
        description="My latest news, updates, and stories for developers"
      />
      <React.Suspense fallback={<ArticleCardsSkeleton numberOfCards={2} />}>
        <ArticleList tagName={tagName} />
      </React.Suspense>
    </>
  );
}

export default React.memo(ArticleListPage);
