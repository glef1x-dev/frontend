import { ArticleTag } from "@/services/api/types/blog.js";
import { Chip, Stack } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

type BlogArticleTagsProps = {
  tags: Array<ArticleTag>;
};

export default memo(function BlogArticleTags({ tags }: BlogArticleTagsProps) {
  const navigate = useNavigate();

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
        <Chip
          color="primary"
          variant="outlined"
          label={tag.title}
          size="medium"
          key={tag.id}
          onClick={() => navigate({ pathname: `/blog/tags/${tag.title}/` })}
          sx={{
            fontWeight: "bold",
            "&:hover": {
              borderColor: "#3740ff",
              background: "#3740ff",
              color: "#ffffff",
              cursor: "pointer",
            },
            "&:visited": {
              color: "#6001ff",
            },
          }}
          aria-label={tag.title}
        />
      ))}
    </Stack>
  );
});
