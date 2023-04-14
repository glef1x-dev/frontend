import { useTheme } from '@/core/ui/mui/theme.js';
import { Helmet } from 'react-helmet';

type MetaProps = {
  description?: string;
  imageUrl?: string;
  title?: string;
};

const SEO: React.FC<MetaProps> = function ({ title, description, imageUrl }) {
  const theme = useTheme();
  const openGraphUrl = window.location.origin + window.location.pathname;

  return (
    <Helmet>
      <meta name="description" content={description} />
      <title lang="en">
        {title
          ? `${title} | Hlib Haranin`
          : "The best opensource blog you've ever seen."}
      </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content={theme.palette.background.default} name="theme-color" />
      <meta
        property="og:title"
        content={title ?? "The best opensource blog you've ever seen."}
      />
      <meta property="og:type" content="website.blog" />
      <meta property="og:url" content={openGraphUrl} />
      <meta
        property="og:description"
        content={
          description
          ?? 'glefix.dev is an opensource project powered by React and Django'
        }
      />
      <meta
        property="og:image"
        content={imageUrl ?? 'https://glefix.dev/my-avatar.webp'}
      />
      <meta
        property="og:image:secure_url"
        content={imageUrl ?? 'https://glefix.dev/my-avatar.webp'}
      />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="314" />
      <meta property="og:image:height" content="314" />
      <meta property="og:image:alt" content="The GLEF1X's avatar" />
    </Helmet>
  );
};

export default SEO;
