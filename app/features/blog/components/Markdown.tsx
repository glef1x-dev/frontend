import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { default as materialDark } from "react-syntax-highlighter/dist/esm/styles/prism/material-dark";
import { CoreOptions } from "react-markdown/lib/react-markdown.js";
import { memo } from "react";

function Markdown({ children }: CoreOptions) {
  return (
    <ReactMarkdown
      children={children}
      className="markdown"
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <Box
              sx={{
                "& code": {
                  fontFamily: "JetbrainsMonoNL, monospace",
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
                style={materialDark}
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
}

export default memo(Markdown);
