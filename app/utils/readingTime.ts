const AVERAGE_APPROXIMATE_WORDS_PER_MINUTE_READ = 225;

export default function useCalculateApproximateReadingTime(
  text: string,
  howMuchWordsAreReadPerMinute = AVERAGE_APPROXIMATE_WORDS_PER_MINUTE_READ
): string {
  const words = text.trim().split(/\s+/).length;
  const readingTimeInMinutes = words / howMuchWordsAreReadPerMinute;

  if (readingTimeInMinutes < 1) {
    return "less than a minute read";
  }

  return `${Math.ceil(readingTimeInMinutes)} min read`;
}
