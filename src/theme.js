import { useAppStore } from './App/stores'
import { breakpoints } from './breakpoints'
import { light, dark } from './colors'

export function useTheme() {
  const isDark = useAppStore((state) => state.isDark)

  return {
    colors: isDark ? dark : light,
    breakpoints,
    fonts: {
      text: 'Open Sans, system-ui, sans-serif',
      heading: 'inherit',
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
    fontWeights: {
      light: 300,
      semibold: 600,
      heading: 'normal',
    },
    lineHeights: {
      text: 1.5,
      heading: 1.25,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    sizes: {
      navHeight: 60,
      logoHeight: 25,
    },
    shadows: {
      rangeHandle: `0 0 0 3px ${isDark ? 'white' : 'black'}`,
    },
    text: {
      heading: {
        color: 'textVivid',
        fontSize: [1, 2, 2, 3],
        lineHeight: 1.25,
        mb: [1, 2],
      },
      display: {
        fontSize: [3, 4, 4, 5],
        fontWeight: 'light',
        mb: 3,
      },
      filterGroup: {
        fontSize: 0,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        mb: 2,
      },
      filter: {
        fontSize: 1,
        mb: 2,
        '&[data-active]': { color: 'textVivid', fontWeight: 'semibold' },
      },
      keyword: {
        bg: 'foreground',
        borderRadius: 16,
        color: 'textVivid',
        fontSize: 0,
        lineHeight: 1.75,
        px: 2,
      },
    },
    variants: {
      card: { p: 3, bg: 'middleground' },
      link: {
        color: 'primary',
        textDecoration: 'none',
        ':hover, :focus, .active': { color: 'text' },
        ':hover': { textDecoration: 'underline' },
      },
    },
    buttons: {
      base: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left',
        px: 0,
        py: 0,
        bg: 'transparent',
        border: 'none',
        borderRadius: 8,
        color: 'inherit',
        fontSize: 'inherit',
        cursor: 'pointer',
        outlineOffset: 2,
        ':disabled': { pointerEvents: 'none', opacity: 0.2 },
        ':focus-visible': { outlineColor: 'currentColor' },
      },
      primary: {
        variant: 'buttons.base',
        px: 3,
        py: 2,
        bg: 'foreground',
        color: 'textVivid',
        fontSize: [1, 1, 2],
        fontWeight: 'bold',
        ':hover': { bg: 'bgInverted', color: 'textInverted' },
      },
      action: {
        variant: 'buttons.base',
        flex: 'none',
        p: 2,
        ml: 2,
        border: '1px solid transparent',
        fontSize: 2,
        ':hover': {
          bg: 'background',
          color: 'textVivid',
          boxShadow: `0 0 2px ${isDark ? 'black' : 'white'}`,
        },
      },
    },
    forms: {
      input: {
        p: 1,
        bg: 'highlight',
        borderRadius: 4,
        borderColor: 'secondary',
      },
      select: {
        width: '100%',
        bg: 'highlight',
        borderRadius: 4,
        borderColor: 'secondary',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        pr: '24px',
        option: {
          color: 'black',
        },
      },
      switch: {
        p: '2px',
        bg: 'bgInverted',
        border: 'none',
        cursor: 'pointer',
        '&[aria-checked=true]': { bg: 'ternary' },
        ':focus': { boxShadow: 'none' },
        thumb: {
          border: 'none',
          width: 20,
          height: 20,
          mt: '0',
          ml: '0',
        },
      },
    },
  }
}
