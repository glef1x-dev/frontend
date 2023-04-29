import Graphemer from "graphemer";

const numberFormat = Intl.NumberFormat("en-US", {
  notation: "compact",
});

export function formatStargazersCount(stargazersCount: number): string {
  return numberFormat.format(stargazersCount);
}

export function splitGraphemes(input: string): Array<string> {
  const splitter = new Graphemer();
  return splitter.splitGraphemes(input);
}
