import { Indicator } from "~/components/Status/Indicator.component";
import { useLanyard } from "~/hooks/use-lanyard";

export function DynamicIndicator(): JSX.Element {
  const { statusColor } = useLanyard();
  return <Indicator color={statusColor} pulse />;
}
