import ArticleCard from "@/components/Blog/ArticleCard/ArticleCard";
import { useTheme } from "@/core/ui/mui/theme";
import { useInfiniteArticlesList } from "@/hooks/api/useBlogApi";
import { Container } from "@mui/material";
import * as React from "react";
import { useInView } from "react-intersection-observer";
import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";

export default React.memo(function ArticleList({
  tagName,
}: {
  tagName?: string;
}) {
  const theme = useTheme();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage } =
    useInfiniteArticlesList(tagName);

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <Container
        className="blog"
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
