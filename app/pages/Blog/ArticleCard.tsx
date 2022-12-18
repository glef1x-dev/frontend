import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BlogArticleMetadata from "./BlogArticle/BlogArticleMetadata.js";
import { Article } from "@/services/api/types/blog.js";
import { memo } from "react";

interface ArticleCardProps {
  article: Article;
  createdDateFormat?: string;
}

export default memo(function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Box
      sx={{
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "rgb(11 43 158 / 35%) 0px 10px 20px",
        },
        transition: "box-shadow 0.4s ease 0s, transform 0.4s ease 0s",
        willChange: "box-shadow, transform",
        borderRadius: "12px",
      }}
      className="article-preview-card"
    >
      <Link
        to={`/blog/article/${article.slug}/`}
        style={{
          textDecoration: "none",
          color: "inherit",
          WebkitTapHighlightColor: "transparent",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          userSelect: "none",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            height: "100%",
            borderRadius: "12px",
          }}
        >
          <img
            height="205"
            alt={`${article.title} preview`}
            src={article.image}
            style={{
              width: "100%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              objectFit: "cover",
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Typography
              gutterBottom
              component="div"
              variant="h5"
              fontWeight="bold"
              sx={{
                flex: 1,
              }}
            >
              {article.title}
            </Typography>
            <Box
              sx={{
                marginTop: "1.5rem",
              }}
            >
              <BlogArticleMetadata article={article} />
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
});
