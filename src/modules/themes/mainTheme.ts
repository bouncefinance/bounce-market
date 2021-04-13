import {
  createMuiTheme,
  darken,
  fade,
  lighten,
  ThemeOptions,
} from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const TEN_SECONDS = 10 * 1000;

export const FONTS = {
  primary: ['"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  secondary: ['"Graphik"', 'sans-serif'].join(','),
  monument: ['"Monument Extended"', 'sans-serif'].join(','),
};

export const PALETTE = {
  type: 'light',
  primary: {
    light: lighten('#8FC436', 0.1),
    main: '#8FC436',
    dark: darken('#8FC436', 0.2),
  },
  background: {
    default: '#fff',
    paper: '#fff',
  },
  text: {
    primary: '#000',
    secondary: fade('#000', 0.5),
  },
  warning: {
    main: '#FFB63C',
  },
  success: {
    main: '#36C98E',
  },
};

const BREAKPOINTS = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
  },
};

export const defaultTheme = createMuiTheme({
  breakpoints: BREAKPOINTS,
});

export const mainTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE as PaletteOptions,
  breakpoints: BREAKPOINTS,

  typography: {
    fontFamily: FONTS.primary,
    color: PALETTE.text.primary,
  },

  props: {
    MuiContainer: {
      maxWidth: 'xl',
    },
    MuiButton: {
      disableRipple: true,
      variant: 'contained',
    },
    MuiPaper: {
      elevation: 0,
    },
    MuiTooltip: {
      enterTouchDelay: 0,
      leaveTouchDelay: TEN_SECONDS,
    },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        a: {
          color: PALETTE.text.primary,
          fontSize: 14,
          textDecoration: 'none',
          transition: 'color 0.2s',

          '&:hover': {
            color: PALETTE.text.primary,
          },
        },
      },
    },

    MuiContainer: {
      maxWidthXl: {
        [defaultTheme.breakpoints.up('xl')]: {
          maxWidth: 1520 + 48,
        },
      },
    },

    MuiTypography: {
      h2: {
        fontFamily: FONTS.secondary,
        fontWeight: 600,
        fontSize: 32,
      },
    },

    MuiInputBase: {
      root: {
        fontSize: 14,
      },
    },

    MuiButton: {
      root: {
        borderRadius: 44,
        height: 44,
        padding: '0 24px',
        textTransform: 'none',
        fontWeight: 500,

        '&:active': {
          transform: 'translateY(1px)',
        },

        '&$disabled': {
          cursor: 'not-allowed',
          pointerEvents: 'auto',

          '&:active': {
            transform: 'none',
          },
        },
      },

      sizeLarge: {
        height: 52,
        fontSize: 14,
        fontWeight: 500,
      },

      contained: {
        boxShadow: 'none',
        backgroundColor: defaultTheme.palette.common.white,

        '&:hover': {
          boxShadow: 'none',
          backgroundColor: darken(defaultTheme.palette.common.white, 0.1),
        },

        '&:active, &:focus': {
          boxShadow: 'none',
        },

        '& svg': {
          color: 'inherit',
        },
      },

      containedPrimary: {
        backgroundColor: PALETTE.primary.main,
        color: defaultTheme.palette.common.black,

        '&:hover': {
          backgroundColor: PALETTE.primary.light,
        },
      },

      outlined: {
        textTransform: 'none',
        fontWeight: 500,
        border: '1px solid #E6E6E6',

        '&$disabled': {
          border: '1px solid #E6E6E6',
          color: fade(defaultTheme.palette.common.black, 0.4),
        },
      },

      outlinedPrimary: {
        border: `1px solid ${PALETTE.primary.main}`,
      },

      text: {
        textTransform: 'none',

        '&:hover': {
          background: 'none',
        },
      },
    },
  },
} as ThemeOptions);
