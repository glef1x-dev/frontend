import ArticleComments from "@/components/Blog/ArticleComments";
import BlogArticleTags from "@/components/Blog/ArticleTags";
import Markdown from "@/components/Markdown/Markdown";
import SEO from "@/components/SEO.js";
import { useTheme } from "@/core/ui/mui/theme.js";
import { useGetBlogArticleBySlug } from "@/hooks/api/useBlogApi.js";
import { formatDate } from "@/utils/datetime.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import {
  Box,
  Breadcrumbs,
  Button,
  CardMedia,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ScrollProgressBar from "../../../components/ScrollProgressBar.js";
import BlogArticleMetadata from "./BlogArticleMetadata.js";
import "./css/BlogArticle.css";
import * as React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function BlogArticlePage() {
  const theme = useTheme();

  const { slug } = useParams();
  if (!slug) {
    throw new Error(
      "Something went wrong: slug in path is empty. Contact developer if you see this message in console.",
    );
  }

  const { data } = useGetBlogArticleBySlug(slug);
  const article = data!;

  return (
    <>
      <ScrollProgressBar
        sx={{
          height: "0.15rem",
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
          [theme.breakpoints.down("md")]: {
            padding: theme.spacing(1),
          },
          [theme.breakpoints.up("md")]: {
            padding: theme.spacing(2.5),
          },
          mt: theme.spacing(2.5),
        }}
      >
        <SEO
          title={article.title}
          description={article.description}
          imageUrl={article.image}
        />
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/"
          >
            Home
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/blog"
          >
            All articles
          </Link>
        </Breadcrumbs>
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
            <ArticleComments />
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
