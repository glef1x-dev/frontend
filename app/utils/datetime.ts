import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

const DEFAULT_DATETIME_FORMAT = "MM DD YYYY";
export const VERBOSE_DATETIME_FORMAT = "MMMM Do, YYYY";
export const BIRTHDAY_DATE = dayjs("2005-07-04");

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

export function calculateMyAge(): number {
  return dayjs().diff(BIRTHDAY_DATE, "years");
}

export function isTodayMyBirthday(): boolean {
  const today = dayjs();
  return (
    today.date() === BIRTHDAY_DATE.date() &&
    today.month() === BIRTHDAY_DATE.month()
  );
}

export function isTodayChristmasDay(): boolean {
  const today = dayjs();
  return today.date() === 25 && today.month() === 11;
}
