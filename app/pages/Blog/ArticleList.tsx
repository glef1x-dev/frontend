import { Container } from "@mui/material";
import { usePageEffect } from "@/hooks/page.js";
import ArticleCard from "./ArticleCard.js";
import PageHeader from "@/components/PageHeader.js";
import * as React from "react";
import { useTheme } from "@/core/ui/mui/theme.js";
import { useInView } from "react-intersection-observer";
import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "@/utils/strings.js";
import { useInfiniteArticlesList } from "@/hooks/api/useBlogApi.js";

export default React.memo(function ArticleList(): JSX.Element {
  const { tagName } = useParams();
  const pageName = tagName ? capitalizeFirstLetter(tagName) : "Blog";
  usePageEffect({
    title: pageName,
  });
  const { ref, inView } = useInView();
  const theme = useTheme();
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteArticlesList();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <PageHeader
        title={pageName}
        description="My latest news, updates, and stories for developers"
      />
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
        {data?.pages.map((page) => (
          <React.Fragment key={page.next}>
            {page.results.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </React.Fragment>
        ))}
      </Container>
      {isFetchingNextPage ? (
        <UseAnimations
          animation={infinity}
          size={50}
          wrapperStyle={{ margin: "0 auto" }}
        />
      ) : null}
      <div id="fetch-new-results-infinite-pagination" ref={ref} />
    </>
  );
});
