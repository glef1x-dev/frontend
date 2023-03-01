import { z } from "zod";
import createPaginatedResponseSchema from "./base";

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
  likesCount: z.number().gte(0).optional(),
});

export const ArticleList = createPaginatedResponseSchema(Article);
