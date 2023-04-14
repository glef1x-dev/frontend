const formatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
});

export function formatReadingTime(readingTimeInMinutes: number): string {
  if (readingTimeInMinutes < 1) {
    return 'less than a minute read';
  }

  return `${Math.ceil(readingTimeInMinutes)} min read`;
}

export function formatStargazersCount(stargazersCount: number): string {
  return formatter.format(stargazersCount);
}
