import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

export const DEFAULT_DATETIME_FORMAT = "MM DD YYYY";
export const BLOG_POST_DATETIME_FORMAT = "MMMM Do, YYYY";

dayjs.extend(advancedFormat);

export function formatDate(
  date: string,
  dateFormat: string = DEFAULT_DATETIME_FORMAT
): string {
  return dayjs().format(dateFormat);
}
