import { Container } from "@mui/material";
import { usePageEffect } from "@/hooks/page.js";
import BlogArticlePreview from "./BlogArticlePreview.js";
import { useGetBlogArticles } from "@/hooks/api/useBlogApi.js";

export default function BlogArticlePreviewList(): JSX.Element | null {
  usePageEffect({ title: "Blog" });
  const { data: articles } = useGetBlogArticles();

  return (
    <Container
      className="Blog"
      maxWidth="xl"
      sx={{
        display: "grid",
        my: "1rem",
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: "large",
        rowGap: "2rem",
        columnGap: "2rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px,1fr))",
        "@media(max-width: 400px)": {
          gridTemplateColumns: "repeat(auto-fill, 1fr)",
          padding: 0,
        },
      }}
    >
      {articles.map((article) => (
        <BlogArticlePreview key={article.id} article={article} />
      ))}
    </Container>
  );
}
