// @ts-ignore
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import {Box, Typography} from "@mui/material";
import useCalculateApproximateReadingTime from "../hooks/reading-time.js";
import {Article} from "@/features/blog/api/types.js";
import BlogArticleTags from "@/features/blog/components/BlogArticleTags.js";
import {formatDate} from "@/features/blog/utils.js";
import MiddleDot from "@/components/MiddleDot";

type BlogArticleMetadatProps = {
  article: Article;
  showTags?: boolean;
};

export default function BlogArticleMetadata({
                                              article,
                                              showTags = true
                                            }: BlogArticleMetadatProps) {
  const formattedDateOfCreation = formatDate(article.created)
  const readingTime = useCalculateApproximateReadingTime(article.body);

  return (
    <Box display="flex" sx={{
      flexDirection: "column",
    }}>
      <Box
        display="flex"
        sx={{
          alignItems: "center",
        }}
      >
        <CalendarMonthTwoToneIcon fontSize="small"/>
        <Typography
          sx={{wordWrap: "break-word"}}
          variant="caption"
          fontWeight="bold"
        >
          {formattedDateOfCreation}
        </Typography>
        <MiddleDot/>
        <Typography variant="caption">{readingTime}</Typography>
      </Box>
      {showTags && <BlogArticleTags tags={article.tags}/>}
    </Box>
  );
}
