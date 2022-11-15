import { useLoaderData } from "react-router-dom";
import { Article } from "../../services/api/blogAPI.js";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import BlogArticleMetadata from "./BlogArticleMetadata.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import { default as atomDarkStyle } from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";
import { usePageEffect } from "../../core/page.js";
import { useMemo } from "react";
import "./css/BlogArticle.css";

export default function BlogArticle() {
  const article = useLoaderData() as Article;

  usePageEffect({ title: article.title });
  const renderedArticleBodyAsMarkdown = useMemo(() => {
    return (
      <ReactMarkdown
        children={article.body}
        className="markdown"
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <Box
                sx={{
                  "& code": {
                    fontFamily: "FantasqueSansMonoRegular",
                    fontSize: "1em",
                    letterSpacing: ".9px",
                    fontWeight: "bold",
                    "@media(max-width: 600px)": {
                      fontSize: "0.8em",
                      letterSpacing: "0",
                    },
                  },
                }}
              >
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  // PreTag="div"
                  style={atomDarkStyle}
                  wrapLines="true"
                  wrapLongLines="true"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  customStyle={{
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                  {...props}
                />
              </Box>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    );
  }, [article.body]);

  return (
    <div>
      {/*<ScrollProgressBar*/}
      {/*  sx={{*/}
      {/*    "@media(min-width: 600px)": {*/}
      {/*      height: "0.5rem",*/}
      {/*    },*/}
      {/*    height: "0.25rem",*/}
      {/*    position: "sticky",*/}
      {/*    width: "100vw",*/}
      {/*    top: 0,*/}
      {/*  }}*/}
      {/*/>*/}
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
            <BlogArticleMetadata article={article} />
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
    </div>
  );
}
