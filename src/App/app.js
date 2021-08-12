import React, { useEffect } from 'react';
import { Suspense } from 'react';

import { useWindowWidth } from '@react-hook/window-size';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import shallow from 'zustand/shallow';

import DocumentPage from '../Document/documentPage';
import DocumentsPage from '../Documents/documentsPage';
import Home from '../Home/home';
import Navigation from '../Navigation/navigation';
import { Box } from '../Primitives';
import breakpoints from '../Theme/breakpoints';
import GlobalStyles from '../Theme/global';
import theme from '../Theme/theme';
import ErrorBoundary from './errorBoundary';
import Spinner from './spinner';
import { useAppStore } from './stores';

const App = () => {
  const [isDark, setWindowWidth, setIsDesktop] = useAppStore(
    (state) => [state.isDark, state.setWindowWidth, state.setIsDesktop],
    shallow
  );

  const windowWidth = useWindowWidth();

  useEffect(() => {
    setWindowWidth(windowWidth);
    setIsDesktop(windowWidth > parseInt(breakpoints[1]) * 16);
  }, [windowWidth, setWindowWidth, setIsDesktop]);

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
