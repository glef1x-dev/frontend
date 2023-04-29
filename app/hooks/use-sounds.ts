import { useSound } from "use-sound";
import type { ReturnedValue } from "use-sound/dist/types";
import { useAppSelector } from "~/hooks/use-redux";
import { selectSettings } from "~/lib/state/settings/slice";

export function useClick(): ReturnedValue | [() => null, null] {
  const settings = useAppSelector(selectSettings);
  const result = useSound("/sounds/click.ogg", {
    volume: 0.05,
  });

  if (!settings.playClickSound) {
    return [
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (): null => null,
      null,
    ];
  }

  return result;
}
