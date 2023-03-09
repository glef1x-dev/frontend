export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatReadingTime(readingTimeInMinutes: number): string {
  if (readingTimeInMinutes < 1) {
    return "less than a minute read";
  }

  return `${Math.ceil(readingTimeInMinutes)} min read`;
}
