import ReactMarkdown from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
import { memo } from "react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useTheme } from "@/core/ui/mui/theme.js";

type MarkdownProps = {
  text: string;
  prismCodeStyles?: {
    dark: { [key: string]: React.CSSProperties };
    light: { [key: string]: React.CSSProperties };
  };
};

function Markdown(props: MarkdownProps) {
  const text = props.text;
  const prismCodeStyles = props.prismCodeStyles ?? {
    dark: oneDark,
    light: oneLight,
  };
  const theme = useTheme();
  const isDarkThemeEnabled = theme.palette.mode === "dark";

  return (
    <ReactMarkdown
      children={text}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return (
            match && (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                // @ts-expect-error
                style={
                  isDarkThemeEnabled
                    ? prismCodeStyles.dark
                    : prismCodeStyles.light
                }
                customStyle={{
                  borderRadius: "10px",
                  padding: "clamp(1rem, 0.96rem + 0.18vw, 1.125rem)",
                  fontFamily: "JetbrainsMonoNL, monospace",
                  fontWeight: "bold",
                  fontSize: "0.9em",
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

export default memo(Markdown);
