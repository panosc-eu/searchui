import { StrictMode } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App/app';
import ErrorBoundary from './App/errorBoundary';
import SWRProvider from './App/swrProvider';

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <SWRProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SWRProvider>
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById('root')
);
