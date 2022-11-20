import { Chip, Stack } from "@mui/material";
import { ArticleTag } from "@/features/blog/api/index.js";

type BlogArticleTagsProps = {
  tags: Array<ArticleTag>;
};

export default function BlogArticleTags({ tags }: BlogArticleTagsProps) {
  return (
    <Stack
      sx={{
        mt: "0.2rem",
      }}
      direction="row"
      spacing={1}
    >
      {tags.map((tag) => (
        <Chip key={tag.title} label={tag.title} size="small" />
      ))}
    </Stack>
  );
}
