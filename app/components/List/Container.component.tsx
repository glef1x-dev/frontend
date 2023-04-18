import type { WithChildren } from '~/types';

type ContainerProps = WithChildren

export function Container({ children }: ContainerProps): JSX.Element {
  return (
    <ul className="flex flex-col space-y-4" role="list">
      {children}
    </ul>
  );
}
