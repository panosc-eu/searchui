import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import DocumentPage from '../Document/DocumentPage';
import ExplorePage from '../Explore/ExplorePage';
import HomePage from '../Home/HomePage';
import { Box } from '../Primitives';
import { useTheme } from '../theme';
import Boundary from './Boundary';
import GlobalStyles from './GlobalStyles';
import Navigation from './Navigation';

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Navigation />

      <Box mx={[3, 3, 3, 4]} mb={5}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/documents">
            <ExplorePage />
          </Route>
          <Route exact path="/documents/:documentId">
            <Boundary>
              <DocumentPage />
            </Boundary>
          </Route>
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

export default App;
