import { useSound } from 'use-sound';
import type { ReturnedValue } from 'use-sound/dist/types';
import { useSettings } from './use-settings';

export function useClick(): ReturnedValue | [() => null, null] {
  const [settings] = useSettings();
  const result = useSound('/sounds/click.ogg', {
    volume: 0.05,
  });

  if (!settings.playClickSound) {
    return [
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (): void => null,
      null,
    ];
  }

  return result;
}
