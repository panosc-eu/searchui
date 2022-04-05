import css from '@styled-system/css'
import normalize from 'normalize.css'
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
  }),
)

export default GlobalStyles
