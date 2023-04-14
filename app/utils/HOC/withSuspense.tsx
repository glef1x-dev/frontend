import * as React from 'react';
import Spinner from '../../components/Spinner/Spinner.js';

export function withSuspense<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback: React.SuspenseProps['fallback'] | null = null,
): React.ComponentType<P> {
  if (fallback === null) {
    fallback = <Spinner />;
  }

  function ComponentWithSuspense(props: P): JSX.Element {
    return (
      <React.Suspense fallback={fallback}>
        <WrappedComponent {...props} />
      </React.Suspense>
    );
  }

  return ComponentWithSuspense;
}
