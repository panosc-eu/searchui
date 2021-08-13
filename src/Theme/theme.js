import breakpoints from './breakpoints';
import { light, dark } from './colors';

const theme = (isDark) => {
  return {
    colors: isDark ? dark : light,
    breakpoints,
    fonts: {
      body: 'Open Sans, system-ui, sans-serif',
      heading: 'inherit',
      monospace: 'Menlo, monospace',
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
    fontWeights: {
      light: 300,
      body: 400,
      heading: 700,
      bold: 700,
    },
    lineHeights: {
      body: 1.5,
      heading: 1.25,
      badge: 1.75,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    sizes: {
      navIcon: 25,
      nav: 60,
    },
    text: {
      heading: {
        fontFamily: 'heading',
        lineHeight: 'heading',
        color: 'heading',
        fontSize: [1, 2, 2, 3],
        fontWeight: 'body',
        mb: [1, 2],
      },
      display: {
        fontFamily: 'heading',
        lineHeight: 'heading',
        fontSize: [3, 4, 4, 5],
        fontWeight: 'light',
        mb: 3,
      },
      small: {
        fontSize: [2],
        fontWeight: 600,
        mb: 2,
      },
      caps: {
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      },
      badge: {
        px: 2,
        borderRadius: 16,
        bg: 'foreground',
        color: 'badge',
        fontSize: 0,
        lineHeight: 'badge',
      },
    },
    variants: {
      avatar: {
        width: 'avatar',
        height: 'avatar',
        borderRadius: 'circle',
      },
      card: {
        p: [1, 2, 3, 4],
        bg: 'middleground',
        lineHeight: 'body',
      },
      accentedCard: {
        p: [1, 1, 2, 3],
        my: [1, 2, 3, 4],
        lineHeight: 'body',
        bg: 'foreground',
      },
      keyword: {
        p: [1],
        mr: [1],
        my: [1],
        bg: 'foreground',
      },
      link: {
        color: 'primary',
        textDecoration: 'none',
        ':hover, :focus, .active': {
          color: 'text',
        },
        ':hover': {
          textDecoration: 'underline',
        },
      },
      nav: {
        fontSize: 1,
        fontWeight: 'bold',
        display: 'inline-block',
        p: 2,
        color: 'inherit',
        textDecoration: 'none',
        ':hover,:focus,.active': {
          color: 'primary',
        },
      },
      navIcon: {
        width: 'navIcon',
        height: 'navIcon',
      },
    },
    buttons: {
      primary: {
        fontSize: [2],
        fontWeight: 'bold',
        color: 'primary',
        bg: 'foreground',
        borderRadius: 0,
        ':hover': {
          color: 'text',
        },
      },
      nav: {
        color: 'text',
        fontWeight: 'bold',
        fontSize: 2,
        border: 0,
        outline: 'none',
        cursor: 'pointer',
        borderRadius: 0,
        p: 0,
        px: 2,
        height: '100%',
        bg: ['foreground', 'foreground', 'transparent'],
        ':hover': {
          color: 'primary',
          bg: ['foreground', 'foreground', 'background'],
        },
      },
      secondary: {
        variant: 'buttons.primary',
        bg: 'foreground',
        color: 'text',
        outline: 'none',
        ':hover': {
          color: 'primary',
        },
      },
      small: {
        variant: 'buttons.primary',
        px: 2,
        py: 0,
        fontSize: 1,
      },
    },
    styles: {
      root: {
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: 'body',
      },
    },
  };
};
export default theme;
