import { z } from "zod";

export default function createPaginatedResponseSchema<
  ItemType extends z.ZodTypeAny,
>(itemSchema: ItemType) {
  return z.object({
    results: z.array(itemSchema),
    count: z.number().optional(),
    next: z.string().url().nullish(),
    previous: z.string().url().nullish(),
  });
}
