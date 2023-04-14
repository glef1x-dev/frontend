import { Article } from '@/services/api/types/blog.js';
import { CleanData } from '@/services/api/types/parser.js';
import { formatDate } from '@/utils/datetime.js';
import { formatReadingTime } from '@/utils/formatting';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import { Box, Typography } from '@mui/material';
import MiddleDot from '@/components/MiddleDot';
import BlogArticleTags from '@/components/Blog/ArticleTags';

type BlogArticleMetadataProps = {
  article: CleanData<typeof Article>;
  showTags?: boolean;
};

export default function BlogArticleMetadata({
  article,
  showTags = true,
}: BlogArticleMetadataProps): JSX.Element {
  const formattedDateOfCreation = formatDate(article.created);
  const readingTime = formatReadingTime(article.readingTimeInMinutes);

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: 'column',
      }}
    >
      <Box
        display="flex"
        sx={{
          alignItems: 'center',
        }}
      >
        <CalendarMonthTwoToneIcon fontSize="small" />
        <Typography
          sx={{ wordWrap: 'break-word' }}
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
