import { createMuiTheme, darken, fade, lighten } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { FONTS, mainTheme } from './mainTheme';

const PALETTE = {
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

export const lightTheme = createMuiTheme({
  ...mainTheme,
  typography: {
    fontFamily: FONTS.primary,
    color: PALETTE.text.primary,
  },
  palette: PALETTE as PaletteOptions,
  overrides: {
    ...mainTheme.overrides,
  },
} as ThemeOptions);
