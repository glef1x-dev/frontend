import { useTheme } from "@/core/ui/mui/theme.js";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  text: string;
};

function Markdown(props: MarkdownProps) {
  const text = props.text;
  const theme = useTheme();
  const isDarkThemeEnabled = theme.palette.mode === "dark";
  const syntaxHighlighterThemeModule = React.useMemo(async () => {
    return isDarkThemeEnabled
      ? await import("react-syntax-highlighter/dist/esm/styles/prism/one-dark")
      : await import(
          "react-syntax-highlighter/dist/esm/styles/prism/one-light"
        );
  }, [isDarkThemeEnabled]);

  return (
    <ReactMarkdown
      children={text}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      css={{fontSize: "16px"}}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return (
            match && (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                //@ts-expect-error
                style={syntaxHighlighterThemeModule}
                customStyle={{
                  borderRadius: "10px",
                  padding: "clamp(1rem, 0.96rem + 0.18vw, 1.125rem)",
                  fontFamily: "JetbrainsMonoNL, monospace",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                PreTag="div"
                codeTagProps={{
                  style: {
                    fontSize: "inherit",
                    letterSpacing: "inherit",
                    fontFamily: "inherit",
                    overscrollBehaviorX: "contain",
                  },
                }}
                {...props}
              />
            )
          );
        },
      }}
    />
  );
}

export default React.memo(Markdown);
