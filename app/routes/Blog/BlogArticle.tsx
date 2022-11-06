import { useLoaderData } from "react-router-dom";
import { Article } from "../../services/api/blogAPI.js";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import BlogArticleMetadata from "./BlogArticleMetadata.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import { default as atomDarkStyle } from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";

export default function BlogArticle() {
  const article = useLoaderData() as Article;

  return (
    <Container
      className="Blog"
      maxWidth="md"
      sx={{
        padding: "0 11.4%",
        margin: "0 auto",
        width: "100%",
        "@media(max-width: 600px)": {
          padding: "0 0.5rem",
        },
      }}
    >
      <article>
        <header>
          <Typography
            variant="h4"
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
            image="https://wallpapercave.com/wp/wp4293324.jpg"
            alt="article-image-preview"
            sx={{
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          />
        </header>
        <ReactMarkdown
          children={article.body}
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
      </article>
    </Container>
  );
}
