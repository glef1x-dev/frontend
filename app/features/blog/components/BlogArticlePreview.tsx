import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BlogArticleMetadata from "./BlogArticleMetadata.js";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Article} from "@/features/blog/api/types.js";

interface BlogPostProps {
  article: Article;
  createdDateFormat?: string;
}

export default function BlogArticlePreview({ article }: BlogPostProps) {
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
          KhtmlUserSelect: "none",
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
          <LazyLoadImage
            height="205"
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
              variant="h2"
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
}
