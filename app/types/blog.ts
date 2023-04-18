import { z } from "zod";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import createPaginatedResponseSchema from "~/types/paginated-base";

export interface RawFrontMatter {
  banner_alt?: string;
  banner_show?: boolean;
  banner?: string;
  date: string;
  description_show?: boolean;
  description?: string;
  title_prefix?: string;
  title: string;
}

export interface FrontMatter extends RawFrontMatter {
  slug: string;
}

export interface Post {
  frontmatter: FrontMatter;
  source: MDXRemoteSerializeResult;
}

export const ArticleTag = z.object({
  id: z.number(),
  title: z.string(),
});

export const Article = z.object({
  id: z.number().or(z.string().uuid()),
  title: z.string(),
  description: z.string(),
  tags: z.array(ArticleTag),
  created: z.string().datetime(),
  modified: z.string().datetime().nullish(),
  image: z.string().url(),
  body: z.string(),
  slug: z.string(),
  likesCount: z.number().gte(0),
  readingTimeInMinutes: z.number(),
});

export const ArticleList = createPaginatedResponseSchema(
  Article.merge(
    z.object({
      description: z.string().optional(),
      body: z.string().optional(),
      readingTimeInMinutes: z.number().gte(0),
    })
  )
);
