import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import { Box, Typography } from "@mui/material";
import { type Article } from "@/services/api/types/blog.js";
import MiddleDot from "@/components/MiddleDot.js";
import useCalculateApproximateReadingTime from "@/hooks/reading-time.js";
import BlogArticleTags from "@/pages/Blog/ArticleTags.js";
import { formatDate } from "@/services/datetime.js";

type BlogArticleMetadataProps = {
  article: Article;
  showTags?: boolean;
};

export default function BlogArticleMetadata({
  article,
  showTags = true,
}: BlogArticleMetadataProps) {
  const formattedDateOfCreation = formatDate(article.created);
  const readingTime = useCalculateApproximateReadingTime(article.body);

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        sx={{
          alignItems: "center",
        }}
      >
        <CalendarMonthTwoToneIcon fontSize="small" />
        <Typography
          sx={{ wordWrap: "break-word" }}
          variant="caption"
          fontWeight="bold"
        >
          {formattedDateOfCreation}
        </Typography>
        <MiddleDot />
        <Typography variant="caption">{readingTime}</Typography>
      </Box>
      {showTags && <BlogArticleTags tags={article.tags} />}
    </Box>
  );
}
