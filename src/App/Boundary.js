import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Card } from '../Primitives';
import Spinner from './Spinner';

function ErrorFallback(props) {
  const { error, componentStack, resetErrorBoundary } = props;

  return (
    <Card role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </Card>
  );
}

function Boundary(props) {
  const { children } = props;

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default Boundary;
