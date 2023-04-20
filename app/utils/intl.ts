const numberFormat = Intl.NumberFormat("en-US", {
  notation: "compact",
});

export function formatStargazersCount(stargazersCount: number): string {
  return numberFormat.format(stargazersCount);
}
