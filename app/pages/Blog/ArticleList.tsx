import { Container } from "@mui/material";
import { useTagNameAsTitle } from "@/hooks/page.js";
import ArticleCard from "./ArticleCard.js";
import { useGetBlogArticles } from "@/hooks/api/useBlogApi.js";
import PageHeader from "@/components/PageHeader.js";
import { memo } from "react";
import { useTheme } from "@/core/ui/mui/theme.js";

export default memo(function ArticleList(): JSX.Element {
  const pageName = useTagNameAsTitle({
    defaultPageName: "Blog",
  });
  const { data: articles } = useGetBlogArticles();
  const theme = useTheme();

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
          gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))",
          "@media(max-width: 400px)": {
            gridTemplateColumns: "repeat(auto-fill, 1fr)",
            padding: 0,
          },
          maxWidth: "90vw !important",
          marginTop: theme.spacing(5),
        }}
      >
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </Container>
    </>
  );
});
