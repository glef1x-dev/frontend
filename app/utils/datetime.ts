import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

const DEFAULT_DATETIME_FORMAT = "MM DD YYYY";
export const VERBOSE_DATETIME_FORMAT = "MMMM Do, YYYY";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

export function formatDate(
  date: string,
  dateFormat: string = DEFAULT_DATETIME_FORMAT
): string {
  return dayjs(date).format(dateFormat);
}

export function parseAndFormatDate(
  date: string | Date,
  inputFormat: string,
  outputFormat: string = DEFAULT_DATETIME_FORMAT
): string {
  return dayjs(date, inputFormat).format(outputFormat);
}
