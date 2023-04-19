import { z } from "zod";
import createPaginatedResponseSchema from "~/types/paginated-base";
import { VERBOSE_DATETIME_FORMAT, formatDate } from "~/utils/datetime";

export const BlogPostTagModel = z.object({
  id: z.number(),
  title: z.string(),
});

export const BlogPostModel = z.object({
  id: z.number().or(z.string().uuid()),
  title: z.string(),
  description: z.string(),
  tags: z.array(BlogPostTagModel),
  created: z
    .string()
    .datetime()
    .transform((date) => formatDate(date, VERBOSE_DATETIME_FORMAT)),
  modified: z.string().datetime().nullish(),
  image: z.string().url(),
  slug: z.string(),
  body: z.string(),
  likesCount: z.number().gte(0),
  readingTimeInMinutes: z.number().gte(0),
});

export const BlogPosts = createPaginatedResponseSchema(
  BlogPostModel.omit({
    body: true,
  })
);
