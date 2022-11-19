import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import Spinner from "../../../components/Spinner.js";
import { usePageEffect } from "@/hooks/page.js";
import { getArticles } from "../api/blog-api.js";
import BlogArticlePreview from "./BlogArticlePreview.js";

export default function BlogArticlePreviewList(): JSX.Element | null {
  usePageEffect({ title: "Blog" });
  const { enqueueSnackbar } = useSnackbar();
  const query = useQuery(["blog-posts"], getArticles);

  if (query.isLoading) {
    return <Spinner isOpen={query.isLoading} />;
  }

  if (query.error) {
    const queryError = query.error as string | null;

    enqueueSnackbar(
      `The blog posts can't be loaded because of error: ${
        queryError ?? "Unknown error"
      }`,
      {
        variant: "error",
        preventDuplicate: true,
      }
    );
    return null;
  }

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
      {query?.data?.results.map((post) => (
        <BlogArticlePreview key={post.id} article={post} />
      ))}
    </Container>
  );
}
