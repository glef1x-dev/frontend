import { Container } from "@mui/material";
import { usePageEffect } from "@/hooks/page.js";
import ArticleCard from "./ArticleCard.js";
import PageHeader from "@/components/PageHeader.js";
import { memo, useCallback, useEffect, useState } from "react";
import { useTheme } from "@/core/ui/mui/theme.js";
import InfiniteScroll from "react-infinite-scroll-component";
import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";
import { Article } from "@/services/api/types/blog.js";
import { useApiClient } from "@/services/api/index.js";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "@/utils/strings.js";

export default memo(function ArticleList(): JSX.Element {
  const { tagName } = useParams();
  const pageName = tagName ? capitalizeFirstLetter(tagName) : "Blog";
  usePageEffect({
    title: pageName,
  });
  const apiClient = useApiClient();
  const theme = useTheme();
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = useCallback(() => {
    apiClient.blog
      .getArticles({ nextResultsUrl: nextPageUrl, tagName: tagName })
      .then((paginatedResult) => {
        setArticles(articles.concat(paginatedResult.results));
        setNextPageUrl(paginatedResult.next ?? null);
      });
  }, [apiClient, nextPageUrl]);

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <PageHeader
        title={pageName}
        description="My latest news, updates, and stories for developers"
      />
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchArticles}
        hasMore={!!nextPageUrl}
        loader={
          <UseAnimations
            animation={infinity}
            size={50}
            wrapperStyle={{ margin: "0 auto" }}
          />
        }
      >
        <Container
          className="Blog"
          sx={{
            display: "grid",
            my: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "large",
            rowGap: "2rem",
            columnGap: "2rem",
            gridTemplateColumns: "repeat(auto-fill, 1fr)",
            "@media screen and (min-width: 450px)": {
              gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))",
            },
            padding: theme.spacing(2),
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Container>
      </InfiniteScroll>
    </>
  );
});
