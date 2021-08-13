import React from 'react';

import { ErrorBoundary as Boundary } from 'react-error-boundary';

import { Card } from '../Primitives';

function ErrorFallback(props) {
  const { error, componentStack, resetErrorBoundary } = props;

  return (
    <Card role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </Card>
  );
}

function ErrorBoundary(props) {
  const { children } = props;

  return (
    <Boundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </Boundary>
  );
}

export default ErrorBoundary;
