import dayjs from "dayjs";

const DEFAULT_DATETIME_FORMAT = "MMM DD YYYY";

export function formatDate(
  date: string,
  dateFormat: string = DEFAULT_DATETIME_FORMAT,
): string {
  return dayjs(date).format(dateFormat);
}
