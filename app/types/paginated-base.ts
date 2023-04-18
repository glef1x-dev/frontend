import { z } from "zod";

export default function createPaginatedResponseSchema<
  ItemType extends z.ZodTypeAny
>(
  itemSchema: ItemType
): z.ZodObject<{
  results: z.ZodArray<ItemType, "many">;
  count: z.ZodOptional<z.ZodNumber>;
  next: z.ZodOptional<z.ZodNullable<z.ZodString>>;
  previous: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}> {
  return z.object({
    results: z.array(itemSchema),
    count: z.number().optional(),
    next: z.string().url().nullish(),
    previous: z.string().url().nullish(),
  });
}
