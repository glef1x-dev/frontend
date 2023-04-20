import { Icon } from "@iconify/react";
import starRateRounded from "@iconify/icons-material-symbols/star-rate-rounded";
import { formatStargazersCount } from "~/utils/intl";

interface GithubStarsCountProps {
  stargazersCount: number;
}

export default function GithubStarsCount({
  stargazersCount,
}: GithubStarsCountProps): JSX.Element {
  return (
    <div className="flex items-center max-h-[60px] max-w-[60px]">
      <span className="text-sm">{formatStargazersCount(stargazersCount)}</span>
      <Icon icon={starRateRounded} />
    </div>
  );
}
