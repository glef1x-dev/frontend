import { Helmet } from "react-helmet";
import { useTheme } from "@/core/ui/mui/theme.js";

type MetaProps = {
  description: string;
  imageUrl?: string;
};

export default function SEO({ description, imageUrl }: MetaProps) {
  const theme = useTheme();

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <title lang="en">The best opensource blog you've ever seen.</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content={theme.palette.background.default} name="theme-color" />
      <meta
        property="og:title"
        content="The best opensource blog you've ever seen."
      />
      <meta
        property="og:description"
        content="glefix.dev is an opensource project powered by React and Django"
      />
      <meta property="og:image" content={imageUrl ?? "https://glefix.dev/my-avatar.webp"} />
      <meta property="og:image:type" content="image/webp" />
    </Helmet>
  );
}