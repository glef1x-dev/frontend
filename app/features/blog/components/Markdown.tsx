import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { default as githubGistCodeStyle } from "react-syntax-highlighter/dist/esm/styles/hljs/github-gist";
import { default as srceryCodeStyle } from "react-syntax-highlighter/dist/esm/styles/hljs/srcery";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CoreOptions } from "react-markdown/lib/react-markdown.js";
import { withSuspense } from "@/utils/suspense-wrapper.js";
import {useTheme} from "@/lib/ui/mui/theme.js";

function Markdown({ children }: CoreOptions) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";


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
                // PreTag="div"
                style={isDarkTheme ? srceryCodeStyle: githubGistCodeStyle}
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
}

export default withSuspense(Markdown);
