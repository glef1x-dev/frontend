import { useTheme } from '@/core/ui/mui/theme.js';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
import oneLight from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type MarkdownProps = {
  text: string;
};

function Markdown({ text }: MarkdownProps): JSX.Element {
  const theme = useTheme();
  const isDarkThemeEnabled = theme.palette.mode === 'dark';
  const syntaxHighlighterThemeStyle = isDarkThemeEnabled ? oneDark : oneLight;

  return (
    <ReactMarkdown
      children={text}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      css={{ fontSize: '20px' }}
      components={{
        /* eslint-disable react/no-unstable-nested-components */
        code({ className, children, ...other }) {
          const match = /language-(\w+)/.exec(className || '');
          return (
            match && (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                // @ts-expect-error
                style={syntaxHighlighterThemeStyle}
                customStyle={{
                  borderRadius: '10px',
                  padding: 'clamp(1rem, 0.96rem + 0.18vw, 1.125rem)',
                  fontFamily: 'JetbrainsMonoNL, monospace',
                }}
                codeTagProps={{
                  style: {
                    letterSpacing: 'inherit',
                    fontSize: '18px',
                    fontFamily: 'inherit',
                    overscrollBehaviorX: 'contain',
                    overflow: 'auto',
                  },
                }}
                {...other}
              />
            )
          );
        },
        /* eslint-enable react/no-unstable-nested-components */
      }}
    />
  );
}

export default React.memo(Markdown);
