import { useMemo } from "react";

const AVERAGE_APPROXIMATE_WORDS_PER_MINUTE_READ = 225;

export function calculateApproximateReadingTime(
  text: string,
  wpm = AVERAGE_APPROXIMATE_WORDS_PER_MINUTE_READ
): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

export function useCalculateApproximateReadingTime(text: string): number {
  return useMemo(() => {
    return calculateApproximateReadingTime(text);
  }, [text]);
}
