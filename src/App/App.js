import React from 'react';

import { useMediaQuery } from '@react-hookz/web';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { breakpoints } from '../breakpoints';
import DocumentPage from '../Document/DocumentPage';
import ExplorePage from '../Explore/ExplorePage';
import HomePage from '../Home/HomePage';
import { Box } from '../Primitives';
import { useTheme } from '../theme';
import Boundary from './Boundary';
import GlobalStyles from './GlobalStyles';
import Navigation from './Navigation';
import ScrollToTop from './ScrollToTop';

function App() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints[1]})`);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Navigation />

      <Box mx={[3, 3, 3, 4]} mb={5}>
        <Switch>
          <Route exact path="/">
            <ScrollToTop />
            <HomePage />
          </Route>
          <Route exact path="/documents">
            <ExplorePage isDesktop={isDesktop} />
          </Route>
          <Route exact path="/documents/:documentId">
            <Boundary>
              <ScrollToTop />
              <DocumentPage />
            </Boundary>
          </Route>
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

export default App;
