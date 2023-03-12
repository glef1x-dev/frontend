import ArticleCardsSkeleton from "@/components/Blog/ArticleCard/ArticleCardsSkeleton.js";
import ArticleList from "@/components/Blog/ArticleList.js";
import PageHeader from "@/components/PageHeader.js";
import SEO from "@/components/SEO.js";
import { capitalizeFirstLetter } from "@/utils/strings.js";
import * as React from "react";
import { useParams } from "react-router-dom";

export default React.memo(function ArticleListPage(): JSX.Element {
  const { tagName } = useParams();
  const pageName = tagName ? capitalizeFirstLetter(tagName) : "Blog";

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
});
