import React from 'react';

import { ErrorBoundary as Boundary } from 'react-error-boundary';

import { Card } from '../Primitives';

const ErrorBoundary = (props) => {
  const ErrorFallback = ({ error, componentStack, resetErrorBoundary }) => {
    return (
      <Card role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <pre>{componentStack}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </Card>
    );
  };
  return (
    <Boundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {props.children}
    </Boundary>
  );
};

export default ErrorBoundary;
