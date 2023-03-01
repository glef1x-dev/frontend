import PageHeader from "@/components/PageHeader.js";
import { usePageEffect } from "@/hooks/page.js";
import { capitalizeFirstLetter } from "@/utils/strings.js";
import * as React from "react";
import { useParams } from "react-router-dom";
import ArticleList from "@/components/Blog/ArticleList.js";
import ArticleCardsSkeleton from "@/components/Blog/ArticleCard/ArticleCardsSkeleton.js";

export default React.memo(function ArticleListPage(): JSX.Element {
  const { tagName } = useParams();
  const pageName = tagName ? capitalizeFirstLetter(tagName) : "Blog";
  usePageEffect({
    title: pageName,
  });

  return (
    <>
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
