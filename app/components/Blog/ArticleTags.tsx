import { ArticleTag } from "@/services/api/types/blog.js";
import { CleanData } from "@/services/api/types/parser";
import { Chip, Link, Stack } from "@mui/material";
import { memo } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

type BlogArticleTagsProps = {
  tags: Array<CleanData<typeof ArticleTag>>;
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
            "&:visited": {
              color: "#6001ff",
            },
          }}
        >
          <Chip
            color="primary"
            variant="outlined"
            label={tag.title}
            size="medium"
            sx={{
              fontWeight: "bold",
              "&:hover": {
                borderColor: "#3740ff",
                background: "#3740ff",
                color: "#ffffff",
                cursor: "pointer",
              },
            }}
            aria-label={tag.title}
          />
        </Link>
      ))}
    </Stack>
  );
});
