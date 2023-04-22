import { serialize } from "next-mdx-remote/serialize";

import RehypeAutolinkHeadings from "rehype-autolink-headings";
import RemarkCodeTitles from "remark-code-titles";
import RemarkEmoji from "remark-emoji";
import RemarkPrism from "remark-prism";
import RemarkSlug from "remark-slug";

export async function parseBlogPostMarkdown(rawBody: string): Promise<ReturnType<typeof serialize>> {
  return await serialize(rawBody, {
    mdxOptions: {
      rehypePlugins: [[RehypeAutolinkHeadings, {}]],
      remarkPlugins: [RemarkCodeTitles, RemarkEmoji, RemarkPrism, RemarkSlug],
    },
  });
}
