import { ArticleTag } from "@/services/api/types/blog.js";
import { Chip, Stack } from "@mui/material";

type BlogArticleTagsProps = {
  tags: Array<ArticleTag>;
};

export default function BlogArticleTags({ tags }: BlogArticleTagsProps) {
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
        <Chip key={tag.title} label={tag.title} size="small" />
      ))}
    </Stack>
  );
}
