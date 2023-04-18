import { ParseParams, z } from "zod";

export declare type CleanData<T extends z.ZodType> = z.infer<T>;

export const parseAs = <T extends z.ZodType>(
  data: unknown,
  type: T,
  params?: Partial<ParseParams>
): z.TypeOf<T> => {
  return type.parse(data, params);
};
