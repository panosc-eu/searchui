import css from '@styled-system/css';
import normalize from 'normalize.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle(
  css({
    normalize,
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      backgroundColor: 'background',
      color: 'text',
      fontFamily: 'body',
      fontSize: [0, 0, 1],
      lineHeight: 'body',
    },
  })
);

export default GlobalStyles;
