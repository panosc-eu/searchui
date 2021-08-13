import React from 'react';
import { Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import DocumentPage from '../Document/documentPage';
import DocumentsPage from '../Documents/documentsPage';
import Home from '../Home/home';
import Navigation from '../Navigation/navigation';
import { Box } from '../Primitives';
import GlobalStyles from '../Theme/global';
import theme from '../Theme/theme';
import ErrorBoundary from './errorBoundary';
import Spinner from './spinner';
import { useAppStore } from './stores';

const App = () => {
  const isDark = useAppStore((state) => state.isDark);

  return (
    <ThemeProvider theme={theme(isDark)}>
      <GlobalStyles />

      <Box as="nav" sx={{ position: 'sticky', top: 0, mb: [3, 4] }}>
        <Navigation />
      </Box>

      <Box mx={[3, 3, 3, 4]} mb={5}>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/documents" component={DocumentsPage} />
              <Route
                exact
                path="/documents/:documentId"
                component={DocumentPage}
              />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </ThemeProvider>
  );
};

export default App;
