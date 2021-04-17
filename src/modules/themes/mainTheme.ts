import {
  createMuiTheme,
  darken,
  fade,
  lighten,
  ThemeOptions,
} from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Themes } from './types';

const TEN_SECONDS = 10 * 1000;
const BTN_TRANSITION_TIME = 0.25;

export const FONTS = {
  primary: ['"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  secondary: ['"Graphik"', 'sans-serif'].join(','),
  monument: ['"Monument Extended"', 'sans-serif'].join(','),
};

export const PALETTE = {
  type: Themes.light,
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
      disableElevation: true,
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
          color: 'inherit',
          fontSize: 'inherit',
          textDecoration: 'none',
          transition: 'color 0.2s',

          '&:hover': {
            color: 'inherit',
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
      root: {
        '& a': {
          '&:hover': {
            color: PALETTE.text.primary,
          },
        },
      },

      h1: {
        fontFamily: FONTS.secondary,
        fontWeight: 500,
        fontSize: 36,
      },

      h2: {
        fontFamily: FONTS.secondary,
        fontWeight: 600,
        fontSize: 32,
      },

      h5: {
        fontSize: 15,
        fontWeight: 500,
      },

      body1: {
        fontSize: 14,

        [defaultTheme.breakpoints.up('md')]: {
          fontSize: 16,
        },
      },

      body2: {
        fontSize: 13,
        fontWeight: 500,
      },
    },

    MuiInputBase: {
      root: {
        fontSize: 14,
        border: `1px solid ${fade(defaultTheme.palette.common.black, 0.1)}`,
        transition: 'boreder 0.2s',

        '&.Mui-focused': {
          border: `1px solid ${fade(defaultTheme.palette.common.black, 0.7)}`,
        },
      },
    },

    MuiButton: {
      root: {
        borderRadius: 44,
        height: 44,
        padding: defaultTheme.spacing(0, 3),
        textTransform: 'none',
        fontWeight: 500,
        minWidth: 95,

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

      label: {
        position: 'relative',
      },

      sizeLarge: {
        height: 52,
        fontSize: 14,
        fontWeight: 500,
      },

      contained: {
        backgroundColor: defaultTheme.palette.common.black,
        overflow: 'hidden',
        border: `1px solid ${defaultTheme.palette.common.black}`,
        transition: `color ${BTN_TRANSITION_TIME}s ease-in, border ${BTN_TRANSITION_TIME}s ease-in`,
        color: defaultTheme.palette.common.white,

        '&:before': {
          content: `''`,
          position: 'absolute',
          borderRadius: 'inherit',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          width: 'auto',
          height: 'auto',
          background: defaultTheme.palette.common.white,
          transition: `transform ${BTN_TRANSITION_TIME}s cubic-bezier(0.7, 0, 0.2, 1)`,
          transform: 'translateY(100%)',
        },

        '&:hover': {
          color: defaultTheme.palette.common.black,
          backgroundColor: defaultTheme.palette.common.black,
          borderColor: fade(defaultTheme.palette.common.black, 0),

          '&:before': {
            transform: 'translateY(0)',
          },
        },

        '&:active, &:focus': {
          boxShadow: 'none',
        },

        '& svg': {
          color: 'inherit',
        },
      },

      outlined: {
        textTransform: 'none',
        fontWeight: 500,
        border: `1px solid ${defaultTheme.palette.common.black}`,
        overflow: 'hidden',
        transition: `color ${BTN_TRANSITION_TIME}s ease-in, border ${BTN_TRANSITION_TIME}s ease-in`,

        '&$disabled': {
          border: '1px solid #E6E6E6',
          color: fade(defaultTheme.palette.common.black, 0.4),
        },

        '&:before': {
          content: `''`,
          position: 'absolute',
          borderRadius: 'inherit',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          width: 'auto',
          height: 'auto',
          background:
            'linear-gradient(360deg, #FFD18B 0%, rgba(255, 0, 0, 0) 50%), linear-gradient(259.57deg, #2663FF 1.58%, #FF3828 92.54%)',
          transition: `transform ${BTN_TRANSITION_TIME}s cubic-bezier(0.7, 0, 0.2, 1)`,
          transform: 'translateY(100%)',
        },

        '&:hover': {
          color: defaultTheme.palette.common.white,
          background: 'none',
          borderColor: fade(defaultTheme.palette.common.black, 0),

          '&:before': {
            transform: 'translateY(0)',
          },
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

    MuiCard: {
      root: {
        borderRadius: 12,
      },
    },

    MuiCardContent: {
      root: {
        padding: defaultTheme.spacing(2, 2.5),

        '&:last-child': {
          paddingBottom: defaultTheme.spacing(2),
        },
      },
    },
  },
} as ThemeOptions);
