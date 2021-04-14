import { createMuiTheme, darken, lighten } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { FONTS, mainTheme } from './mainTheme';

export const PALETTE = {
  type: 'dark',
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
    MuiCssBaseline: {
      '@global': {
        a: {
          color: PALETTE.text.primary,

          '&:hover': {
            color: PALETTE.text.primary,
          },
        },
      },
    },
  },
} as ThemeOptions);
