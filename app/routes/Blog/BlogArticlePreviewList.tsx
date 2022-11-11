import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import Spinner from "../../common/Spinner.js";
import { usePageEffect } from "../../core/page.js";
import { getArticles } from "../../services/api/blogAPI.js";
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
    <Box
      className="Blog"
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(350px,1fr))"
      sx={{
        my: "1rem",
        maxWidth: "80rem",
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: "large",
        gap: "2rem",
        padding: "1rem",
      }}
    >
      {query?.data?.results.map((post) => (
        <BlogArticlePreview key={post.id} article={post} />
      ))}
    </Box>
  );
}
