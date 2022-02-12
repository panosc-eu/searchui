import css from '@styled-system/css'
import normalize from 'normalize.css'
import rcSlider from 'rc-slider/assets/index.css'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle(
  css({
    normalize,
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      bg: 'background',
      color: 'text',
      fontFamily: 'text',
      fontSize: [0, 0, 1],
      lineHeight: 'text',
    },
    ul: {
      listStyleType: 'square',
      color: 'ternary',
    },
    rcSlider,
    '.rc-slider-track': { bg: 'secondary' },
    '.rc-slider-handle': { border: 'none', bg: 'ternary' },
    '.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging':
      {
        boxShadow: 'rangeHandle',
      },
  }),
)

export default GlobalStyles
