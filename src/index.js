import { StrictMode } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App/App';
import ErrorBoundary from './App/ErrorBoundary';
import SWRProvider from './App/SWRProvider';

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
