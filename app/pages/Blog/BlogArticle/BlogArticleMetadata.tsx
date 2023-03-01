import BlogArticleTags from "@/components/Blog/ArticleTags.js";
import MiddleDot from "@/components/MiddleDot.js";
import useCalculateApproximateReadingTime from "@/hooks/reading-time.js";
import { Article } from "@/services/api/types/blog.js";
import { CleanData } from "@/services/api/types/parser.js";
import { formatDate } from "@/utils/datetime.js";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import { Box, Typography } from "@mui/material";

type BlogArticleMetadataProps = {
  article: CleanData<typeof Article>;
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
