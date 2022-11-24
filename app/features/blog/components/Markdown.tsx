import ReactMarkdown from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { default as oneDark } from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import { default as oneLight } from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
import { memo } from "react";
import { useTheme } from "@/lib/ui/mui/theme.js";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
      className="markdown-text"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const guessedLanguageName = /language-(\w+)/
            .exec(className || "")
            ?.at(1);
          return !inline && guessedLanguageName ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={guessedLanguageName}
              style={
                isDarkThemeEnabled
                  ? prismCodeStyles.dark
                  : prismCodeStyles.light
              }
              customStyle={{
                borderRadius: "10px",
                padding: "20px",
                fontFamily: "JetbrainsMonoNL, monospace",
                fozntWeight: "bold",
              }}
              codeTagProps={{
                style: {
                  fontFamily: "inherit",
                  letterSpacing: "inherit",
                  fontWeight: "inherit",
                  fontSize: "inherit",
                },
              }}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {text}
            </code>
          );
        },
      }}
    />
  );
}

export default memo(Markdown);
