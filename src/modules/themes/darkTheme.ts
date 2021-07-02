import { createMuiTheme, darken, fade, lighten } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { BREAKPOINTS, BTN_TRANSITION_TIME } from './const';
import { FONTS, mainTheme } from './mainTheme';
import { Themes } from './types';

export const PALETTE = {
  type: Themes.dark,
  background: {
    default: '#010101',
    paper: '#232323',
    reverse: '#fff',
  },
  primary: {
    light: lighten('#0075FF', 0.1),
    main: '#0075FF',
    dark: darken('#0075FF', 0.2),
  },
  text: {
    primary: '#fff',
    secondary: fade('#fff', 0.4),
  },
  success: {
    main: '#38FF70',
  },
};

const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE as PaletteOptions,
  breakpoints: BREAKPOINTS,
});

export const darkTheme = createMuiTheme({
  ...mainTheme,
  typography: {
    fontFamily: FONTS.primary,
    color: PALETTE.text.primary,
  },
  palette: PALETTE as PaletteOptions,
  overrides: {
    ...mainTheme.overrides,

    MuiTypography: {
      ...mainTheme.overrides?.MuiTypography,
      root: {
        ...mainTheme.overrides?.MuiTypography?.root,
        '& a': {
          '&:hover': {
            color: PALETTE.text.primary,
          },
        },
      },
    },

    MuiButton: {
      ...mainTheme.overrides?.MuiButton,

      contained: {
        ...mainTheme.overrides?.MuiButton?.contained,
        backgroundColor: '#282828',

        '&:hover': {
          color: mainTheme.palette.common.black,
          borderColor: fade(mainTheme.palette.common.black, 0),
          backgroundColor: '#282828',

          '&:before': {
            transform: 'translateY(0)',
          },
        },
      },

      outlined: {
        ...mainTheme.overrides?.MuiButton?.outlined,
        border: `1px solid ${mainTheme.palette.common.white}`,

        '&:before': {
          content: `''`,
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          width: 'auto',
          height: 'auto',
          background: defaultTheme.palette.text.primary,
          transition: `transform ${BTN_TRANSITION_TIME}s cubic-bezier(0.7, 0, 0.2, 1)`,
          transform: 'translateY(100%)',
        },

        '&:hover': {
          color: defaultTheme.palette.common.black,
          background: 'none',
          borderColor: fade(defaultTheme.palette.common.black, 0),

          '&:before': {
            transform: 'translateY(0)',
          },
        },
      },

      outlinedPrimary: {
        ...mainTheme.overrides?.MuiButton?.outlinedPrimary,
        border: `1px solid ${defaultTheme.palette.text.primary}`,
        color: defaultTheme.palette.text.primary,
      },
    },

    MuiIconButton: {
      root: {
        ...mainTheme.overrides?.MuiIconButton?.root,
        border: `1px solid ${fade(PALETTE.text.primary, 0.1)}`,
        color: PALETTE.text.primary,

        '&:hover': {
          borderColor: fade(PALETTE.text.primary, 0.3),
          backgroundColor: 'none',
        },
      },
    },

    MuiInputBase: {
      ...mainTheme.overrides?.MuiInputBase,
      root: {
        ...mainTheme.overrides?.MuiInputBase?.root,
        border: `1px solid ${fade(PALETTE.text.primary, 0.1)}`,

        '&:hover, &.Mui-focused': {
          borderColor: fade(PALETTE.text.primary, 0.3),
        },
      },
    },

    MuiSelect: {
      ...mainTheme.overrides?.MuiSelect,
      iconOutlined: {
        ...mainTheme.overrides?.MuiSelect?.iconOutlined,
        color: PALETTE.text.primary,
      },
    },
  },
} as ThemeOptions);
