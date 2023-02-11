import { useTheme } from "@/core/ui/mui/theme.js";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  text: string;
};

function Markdown(props: MarkdownProps) {
  const text = props.text;
  const theme = useTheme();
  const isDarkThemeEnabled = theme.palette.mode === "dark";
  const syntaxHighlighterThemeStyle = isDarkThemeEnabled ? oneDark : oneLight;

  return (
    <ReactMarkdown
      children={text}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      css={{ fontSize: "16px" }}
      components={{
        code({ className, children, ...other }) {
          const match = /language-(\w+)/.exec(className || "");
          return (
            match && (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                //@ts-expect-error
                style={syntaxHighlighterThemeStyle}
                customStyle={{
                  borderRadius: "10px",
                  padding: "clamp(1rem, 0.96rem + 0.18vw, 1.125rem)",
                  fontFamily: "JetbrainsMonoNL, monospace",
                  lineHeight: "1.5em",
                  letterSpacing: ".9px"
                }}
                codeTagProps={{
                  style: {
                    letterSpacing: "inherit",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    overscrollBehaviorX: "contain",
                    overflow: "auto"
                  },
                }}
                {...other}
              />
            )
          );
        },
      }}
    />
  );
}

export default React.memo(Markdown);
