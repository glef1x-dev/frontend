import * as Sentry from "@sentry/react";
import { ParseParams, z } from "zod";

export declare type CleanData<T extends z.ZodType> = z.infer<T>;

export const parseAs = <T extends z.ZodType>(
  data: unknown,
  type: T,
  params?: Partial<ParseParams>,
): z.TypeOf<T> => {
  try {
    return type.parse(data, params);
  } catch (e) {
    Sentry.withScope((scope) => {
      scope.setTags({
        stage: "validation",
        validationLibrary: "zod",
        handled: true,
      });
      scope.setLevel("error");
      Sentry.captureException(e);
    });
  }
};
