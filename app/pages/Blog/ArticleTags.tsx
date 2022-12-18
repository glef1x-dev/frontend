import { ArticleTag } from "@/services/api/types/blog.js";
import { Chip, Stack, Link } from "@mui/material";
import { memo } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

type BlogArticleTagsProps = {
  tags: Array<ArticleTag>;
};

export default memo(function BlogArticleTags({ tags }: BlogArticleTagsProps) {
  return (
    <Stack
      sx={{
        mt: "0.2rem",
        flexWrap: "wrap",
        gap: "0.3rem",
      }}
      direction="row"
    >
      {tags.map((tag) => (
        <Link
          to={`/blog/${tag.title}/`}
          component={ReactRouterLink}
          key={tag.id}
          sx={{
            textDecoration: "none",
          }}
        >
          <Chip
            color="primary"
            variant="outlined"
            label={tag.title}
            size="medium"
            sx={{
              fontWeight: "bold",
            }}
            aria-label={tag.title}
          />
        </Link>
      ))}
    </Stack>
  );
});
