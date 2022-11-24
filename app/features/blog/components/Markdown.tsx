import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { default as materialDark } from "react-syntax-highlighter/dist/esm/styles/prism/material-dark";
import { default as materialLight } from "react-syntax-highlighter/dist/esm/styles/prism/material-light";
import { memo } from "react";
import { useTheme } from "@/lib/ui/mui/theme.js";

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
    dark: materialDark,
    light: materialLight,
  };
  const theme = useTheme();
  const isDarkThemeEnabled = theme.palette.mode === "dark";

  return (
    <ReactMarkdown
      children={text}
      className="markdown"
      components={{
        code({ node, inline, className, children, ...props }) {
          const guessedLanguageName = /language-(\w+)/
            .exec(className || "")
            ?.at(1);
          return !inline && guessedLanguageName ? (
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
                language={guessedLanguageName}
                style={
                  isDarkThemeEnabled
                    ? prismCodeStyles.dark
                    : prismCodeStyles.light
                }
                customStyle={{
                  borderRadius: "10px",
                  padding: "20px",
                }}
                {...props}
              />
            </Box>
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
