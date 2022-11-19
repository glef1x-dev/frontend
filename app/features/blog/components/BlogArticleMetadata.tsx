// @ts-ignore
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import { Box, Chip, Stack, Typography } from "@mui/material";
import moment from "moment";
import useCalculateApproximateReadingTime from "../hooks/reading-time.js";
import {Article} from "@/features/blog/api/types.js";

type BlogArticleMetadatProps = {
  article: Article;
  showTags?: boolean;
};

export default function BlogArticleMetadata({
                                              article,
                                              showTags = true
                                            }: BlogArticleMetadatProps) {
  const formattedDateOfCreation = moment(article.created, true).format(
    "MMM Do YYYY"
  );
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
          sx={{wordWrap: "break-word", mr: "1rem"}}
          variant="caption"
          fontWeight="bold"
        >
          {formattedDateOfCreation}
        </Typography>
        <Typography variant="caption">{readingTime}</Typography>
      </Box>
      {
        showTags && <Stack sx={{
          mt: "0.2rem"
        }} direction="row" spacing={1}>
          {article.tags.map(tag => (
            <Chip key={tag.title} label={tag.title} size="small"/>
          ))}
        </Stack>
      }
    </Box>
  );
}
