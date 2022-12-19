import { Link } from "react-router-dom";
import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import BlogArticleMetadata from "./BlogArticleMetadata.js";
import { usePageEffect } from "@/hooks/page.js";
import "./css/BlogArticle.css";
import ScrollProgressBar from "../../../components/ScrollProgressBar.js";
import Markdown from "@/components/Markdown.js";
import BlogArticleTags from "@/pages/Blog/ArticleTags.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import Comments from "../Comments.js";
import { formatDate } from "@/services/datetime.js";
import { useGetBlogArticleBySlug } from "@/hooks/api/useBlogApi.js";
import { useTheme } from "@/core/ui/mui/theme.js";

export default function BlogArticle() {
  const theme = useTheme();
  const { data } = useGetBlogArticleBySlug();
  const article = data!;

  usePageEffect({ title: article.title });

  return (
    <>
      <ScrollProgressBar
        sx={{
          "@media(min-width: 600px)": {
            height: "0.5rem",
          },
          height: "0.25rem",
          position: "sticky",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          maxWidth: "none",
          top: 0,
          overflow: "unset",
        }}
      />
      <Container
        className="article-container"
        maxWidth="md"
        disableGutters={true}
        sx={{
          padding: theme.spacing(2.5),
        }}
      >
        <article
          style={{
            display: "flex",
            flexDirection: "column",
            wordWrap: "break-word",
            justifyContent: "center",
          }}
        >
          <header>
            <Typography
              variant="h3"
              sx={{
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
              fontWeight="bold"
            >
              {article.title}
            </Typography>
            <BlogArticleMetadata article={article} showTags={false} />
            <CardMedia
              component="img"
              image={article.image}
              alt="article-image-preview"
              sx={{
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            />
          </header>
          <Markdown text={article.body} />
          <Box
            className="article-ending"
            sx={{
              marginTop: "0.5rem",
            }}
          >
            <Comments />
            <BlogArticleTags tags={article.tags} />
            {article.modified && (
              <Typography variant="body2" sx={{ mt: "1.5rem" }}>
                Last updated: {formatDate(article.created)}
              </Typography>
            )}

            <Button
              size="large"
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{
                padding: "1rem",
                fontWeight: "bold",
                marginTop: "2rem",
              }}
              component={Link}
              to="/blog"
            >
              RETURN TO ALL ARTICLES
            </Button>
          </Box>
        </article>
      </Container>
    </>
  );
}
