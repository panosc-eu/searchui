import React from 'react';
import { Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import DocumentPage from '../Document/DocumentPage';
import ExplorePage from '../Explore/ExplorePage';
import HomePage from '../Home/HomePage';
import { Box } from '../Primitives';
import { useTheme } from '../theme';
import ErrorBoundary from './ErrorBoundary';
import GlobalStyles from './GlobalStyles';
import Navigation from './Navigation';
import Spinner from './Spinner';

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Box as="nav" sx={{ position: 'sticky', top: 0, mb: [3, 4] }}>
        <Navigation />
      </Box>

      <Box mx={[3, 3, 3, 4]} mb={5}>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/documents" component={ExplorePage} />
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
}

export default App;
