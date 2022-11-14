import { Box, Card, CardContent, Typography } from "@mui/material";
import { Article } from "../../services/api/blogAPI.js";
import { Link } from "react-router-dom";
import BlogArticleMetadata from "./BlogArticleMetadata.js";
import {LazyLoadImage} from "react-lazy-load-image-component";

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
          boxShadow: "rgb(0 44 155 / 15%)",
        },
        transition: "box-shadow 0.4s ease 0s, transform 0.4s ease 0s",
        borderRadius: "0px 0px 16px 16px",
        willChange: "box-shadow, transform",
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
          }}
        >
          <LazyLoadImage
            height="140"
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
              variant="body1"
              fontWeight="bold"
              sx={{
                flex: 1,
              }}
            >
              {article.title}
            </Typography>
            <Box
              sx={{
                marginTop: "1rem",
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
