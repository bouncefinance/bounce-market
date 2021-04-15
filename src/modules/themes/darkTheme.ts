import { createMuiTheme, darken, fade, lighten } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { FONTS, mainTheme } from './mainTheme';
import { Themes } from './types';

export const PALETTE = {
  type: Themes.dark,
  background: {
    default: '#010101',
    paper: '#232323',
  },
  primary: {
    light: lighten('#8FC436', 0.1),
    main: '#8FC436',
    dark: darken('#8FC436', 0.2),
  },
  text: {
    primary: '#fff',
    secondary: '#7b7b7b',
  },
  success: {
    main: '#38FF70',
  },
};

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
      },
    },
  },
} as ThemeOptions);
