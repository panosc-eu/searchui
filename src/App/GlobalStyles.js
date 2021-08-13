import css from '@styled-system/css';
import normalize from 'normalize.css';
import rcSlider from 'rc-slider/assets/index.css';
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
    ul: {
      listStyleType: 'square',
      color: 'pink',
    },
    rcSlider,
    '.rc-slider-track': { bg: 'secondary' },
    '.rc-slider-handle': { border: 'none', bg: 'pink' },
    '.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging':
      {
        boxShadow: '0 0 0 3px white',
      },
  })
);

export default GlobalStyles;
