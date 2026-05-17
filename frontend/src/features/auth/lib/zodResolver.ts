import type {
  FieldError,
  FieldErrors,
  FieldValues,
  Resolver,
  ResolverResult,
} from "react-hook-form";
import type { ZodType } from "zod";

/** Bridges Zod schemas to react-hook-form without an extra dependency. */
export function zodResolver<T extends FieldValues>(schema: ZodType<T>): Resolver<T> {
  return async (values): Promise<ResolverResult<T>> => {
    const result = schema.safeParse(values);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: FieldErrors<T> = {};

    for (const issue of result.error.issues) {
      const path = issue.path[0];
      if (typeof path === "string" && !(path in errors)) {
        (errors as Record<string, FieldError>)[path] = {
          type: issue.code,
          message: issue.message,
        };
      }
    }

    return { values: {}, errors };
  };
}
