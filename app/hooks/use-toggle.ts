import { useCallback, useState } from 'react';

export default function useToggle(
  initialState = false,
): readonly [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback(
    () => setState((prevState: boolean) => !prevState),
    [],
  );

  return [state, toggle] as const;
}
