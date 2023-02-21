import { ParseParams, z } from "zod";
import * as Sentry from "@sentry/react";

export const parseAs = <T extends z.ZodType>(
  data: unknown,
  type: T,
  params?: Partial<ParseParams>
) => {
  try {
    return type.parse(data, params);
  } catch (e) {
    Sentry.withScope((scope) => {
      scope.setTags({ stage: "validation", validationLibrary: "zod" });
      scope.setLevel("error");
      Sentry.captureException(e);
    });
  }
};
