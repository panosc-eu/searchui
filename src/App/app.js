import React, { Suspense, useRef, useState, useEffect } from 'react';

import { useWindowWidth } from '@react-hook/window-size';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ErrorBoundary from '../App/errorBoundary';
import DocumentPage from '../Document/documentPage';
import DocumentsPage from '../Documents/documentsPage';
import Navigation from '../Navigation/navigation';
import { Box } from '../Primitives';
import breakpoints from '../Theme/breakpoints';
import Global from '../Theme/global';
import theme from '../Theme/theme';
import Spinner from './spinner';
import { useAppStore } from './stores';
import SWRProvider from './swrProvider';

const App = () => {
  const [isDark, setWindowWidth, setIsDesktop] = useAppStore((state) => [
    state.isDark,
    state.setWindowWidth,
    state.setIsDesktop,
  ]);
  const windowWidth = useWindowWidth();
  const ref = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    const height = ref.current.getBoundingClientRect().top + window.scrollY;
    setContentHeight(height);
  }, [ref]);

  useEffect(() => {
    setWindowWidth(windowWidth);
    setIsDesktop(windowWidth > parseInt(breakpoints[1]) * 16);
  }, [windowWidth, setWindowWidth, setIsDesktop]);

  return (
    <SWRProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme(isDark)}>
          <Global />
          <Box as="nav" sx={{ position: 'sticky', top: 0, mb: [4, 5] }}>
            <Navigation />
          </Box>
          <Box
            ref={ref}
            mx={[4, 4, 4, 5]}
            sx={{
              height: `calc(100vh - ${contentHeight + 64}px)`,
            }}
          >
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Route exact path="/" component={DocumentsPage} />
                <Route exact path="/documents" component={DocumentsPage} />
                <Route
                  exact
                  path="/documents/:documentId"
                  component={DocumentPage}
                />
              </Suspense>
            </ErrorBoundary>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </SWRProvider>
  );
};

export default App;
