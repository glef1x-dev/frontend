import { useLoaderData } from "react-router-dom";
import { CardMedia, Container, Typography } from "@mui/material";
import BlogArticleMetadata from "./BlogArticleMetadata.js";
import { usePageEffect } from "@/hooks/page.js";
import { useMemo } from "react";
import "./css/BlogArticle.css";
import ScrollProgressBar from "../../../components/ScrollProgressBar.js";
import { Article } from "@/features/blog/api/types.js";
import Markdown from "@/features/blog/components/Markdown.js";

export default function BlogArticle() {
  const article = useLoaderData() as Article;

  usePageEffect({ title: article.title });
  const renderedArticleBodyAsMarkdown = useMemo(() => {
    return <Markdown children={article.body} />;
  }, [article.body]);

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
      <Container className="article-container" maxWidth="md">
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
              variant="h1"
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
          {renderedArticleBodyAsMarkdown}
        </article>
      </Container>
    </>
  );
}
