import {
  createMuiTheme,
  darken,
  fade,
  lighten,
  ThemeOptions,
} from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { BREAKPOINTS, BTN_TRANSITION_TIME } from './const';
import { Themes } from './types';

const TEN_SECONDS = 10 * 1000;
const NOTIFICATION_AUTO_HIDE_DURATION = 3000;

export const FONTS = {
  primary: ['"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  secondary: ['"Graphik"', 'sans-serif'].join(','),
  monument: ['"Monument Extended"', 'sans-serif'].join(','),
};

export const PALETTE = {
  type: Themes.light,
  primary: {
    light: lighten('#0075FF', 0.1),
    main: '#0075FF',
    dark: darken('#0075FF', 0.2),
  },
  background: {
    default: '#fff',
    paper: '#fff',
    reverse: '#000',
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
  grey: {
    300: '#F1F1F1',
  },
};

export const defaultTheme = createMuiTheme({
  spacing: 8,
  palette: PALETTE as PaletteOptions,
  breakpoints: BREAKPOINTS,
});

export const mainTheme = createMuiTheme({
  spacing: defaultTheme.spacing,
  palette: defaultTheme.palette,
  breakpoints: defaultTheme.breakpoints,

  typography: {
    fontFamily: FONTS.primary,
    color: PALETTE.text.primary,
  },

  props: {
    MuiSnackbar: {
      autoHideDuration: NOTIFICATION_AUTO_HIDE_DURATION,
    },
    MuiAlert: {
      icon: false,
    },
    MuiContainer: {
      maxWidth: 'xl',
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
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
    MuiTextField: {
      variant: 'outlined',
      InputLabelProps: {
        shrink: true,
        variant: 'standard',
      },
    },
    MuiSelect: {
      MenuProps: {
        elevation: 0,
        getContentAnchorEl: null,

        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },

        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      },
    },

    MuiDialog: {
      fullWidth: true,
      maxWidth: 'md',
      PaperProps: {
        elevation: 0,
      },
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
      root: {
        [defaultTheme.breakpoints.up('xl')]: {
          paddingLeft: defaultTheme.spacing(7.5),
          paddingRight: defaultTheme.spacing(7.5),
        },
      },

      maxWidthXl: {
        [defaultTheme.breakpoints.up('xl')]: {
          maxWidth: 1520 + 48,
        },
      },
    },

    MuiTypography: {
      root: {
        '& b': {
          fontWeight: 'bold',
        },
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
        fontSize: 28,

        [defaultTheme.breakpoints.up('md')]: {
          fontSize: 32,
        },
      },

      h3: {
        fontFamily: FONTS.secondary,
        fontWeight: 600,
        fontSize: 18,

        [defaultTheme.breakpoints.up('md')]: {
          fontSize: 22,
        },
      },

      h4: {
        fontSize: 18,
        fontWeight: 700,
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
        fontSize: 16,
        border: `1px solid ${fade(defaultTheme.palette.common.black, 0.1)}`,
        transition: 'border 0.2s',

        '&:hover, &.Mui-focused': {
          borderColor: fade(defaultTheme.palette.common.black, 0.3),
        },

        '& fieldset': {
          display: 'none',
        },
      },

      input: {
        '&[type=number]': {
          '-moz-appearance': 'textfield',
        },

        '&::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
        },

        '&::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
        },
      },
    },

    MuiInputLabel: {
      shrink: {
        position: 'static',
        marginBottom: 20,
        fontSize: 16,
        fontWeight: 700,
        color: '#000',
        transform: 'none',
      },
    },

    MuiOutlinedInput: {
      root: {
        borderRadius: 8,
      },

      input: {
        padding: defaultTheme.spacing(2.3, 2),
        minHeight: 58,
        boxSizing: 'border-box',
      },
    },

    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'none',
        },
      },

      outlined: {
        '&&': {
          paddingRight: 52,
        },
      },

      iconOutlined: {
        color: defaultTheme.palette.text.primary,
        fontSize: 20,
        right: 16,
        top: 'calc(50% - 10px)',
      },
    },

    MuiButtonBase: {
      root: {
        '&:active': {
          transform: 'translateY(1px)',
        },
      },
    },

    MuiIconButton: {
      root: {
        border: `1px solid ${fade(defaultTheme.palette.common.black, 0.1)}`,
        color: defaultTheme.palette.text.primary,
        transition: `border ${BTN_TRANSITION_TIME}s`,

        '&:hover': {
          borderColor: fade(defaultTheme.palette.common.black, 0.3),
          backgroundColor: 'none',
        },
      },
    },

    MuiButton: {
      root: {
        borderRadius: 12,
        height: 44,
        padding: defaultTheme.spacing(0, 3),
        textTransform: 'none',
        fontWeight: 500,
        minWidth: 95,

        '&$disabled': {
          pointerEvents: 'none',
          borderColor: fade(defaultTheme.palette.common.black, 0),

          '&:before': {
            display: 'none',
          },

          '&:active': {
            transform: 'none',
          },

          '&:hover': {
            borderColor: fade(defaultTheme.palette.common.black, 0),
          },
        },
      },

      label: {
        position: 'relative',
      },

      sizeLarge: {
        height: 60,
        fontSize: 16,
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
        border: `1px solid ${fade(defaultTheme.palette.common.black, 0.1)}`,
        overflow: 'hidden',
        transition: `color ${BTN_TRANSITION_TIME}s ease-in, border ${BTN_TRANSITION_TIME}s ease-in`,

        '&$disabled': {
          border: '1px solid #E6E6E6',
          color: fade(defaultTheme.palette.common.black, 0.4),
        },

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
          color: defaultTheme.palette.common.white,
          background: 'none',
          borderColor: fade(defaultTheme.palette.common.black, 0.3),

          '&:before': {
            transform: 'translateY(0)',
          },
        },
      },

      outlinedPrimary: {
        color: defaultTheme.palette.text.primary,
        border: `1px solid ${defaultTheme.palette.common.black}`,

        '&:before': {
          background:
            'linear-gradient(360deg, #FFD18B 0%, rgba(255, 0, 0, 0) 50%), linear-gradient(259.57deg, #2663FF 1.58%, #FF3828 92.54%)',
        },

        '&:hover': {
          color: defaultTheme.palette.common.white,
          borderColor: fade(defaultTheme.palette.common.black, 0),
        },
      },

      outlinedSecondary: {
        border: `1px solid ${fade(defaultTheme.palette.text.primary, 0.1)}`,
        transition: `background ${BTN_TRANSITION_TIME}s ease-in, border ${BTN_TRANSITION_TIME}s ease-in`,
        color: defaultTheme.palette.text.primary,

        '&:before': {
          display: 'none',
        },

        '&:hover': {
          backgroundColor: fade(defaultTheme.palette.text.primary, 0),
          borderColor: fade(defaultTheme.palette.text.primary, 0.3),
          color: defaultTheme.palette.text.primary,
        },
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

    MuiTabs: {
      root: {
        minHeight: 40,
      },

      indicator: {
        background: defaultTheme.palette.text.primary,
      },
    },

    MuiTab: {
      root: {
        minWidth: 0,
        minHeight: 40,
        padding: defaultTheme.spacing(1, 0),
        textTransform: 'none',
        fontWeight: 700,
        fontSize: 16,
        transition: 'color 0.2s',

        [defaultTheme.breakpoints.up('sm')]: {
          minWidth: 0,
        },

        '&.Mui-selected': {
          color: defaultTheme.palette.text.primary,
        },

        '& + &': {
          marginLeft: defaultTheme.spacing(3),
        },
      },

      textColorInherit: {
        opacity: 1,
        color: fade(defaultTheme.palette.text.primary, 0.3),
      },
    },

    MuiDialog: {
      paper: {
        margin: defaultTheme.spacing(4, 1),
        padding: defaultTheme.spacing(4, 2.5),
        borderRadius: 22,

        [defaultTheme.breakpoints.up('md')]: {
          margin: defaultTheme.spacing(4, 4),
          padding: defaultTheme.spacing(3, 5),
        },
      },

      paperFullWidth: {
        width: `calc(100% - ${defaultTheme.spacing(1)}px)`,
      },
    },

    MuiPaper: {
      rounded: {
        borderRadius: 8,
      },

      outlined: {
        border: `1px solid ${fade('#000', 0.1)}`,
      },
    },

    MuiTableCell: {
      root: {
        padding: defaultTheme.spacing(2),
      },

      head: {
        paddingTop: defaultTheme.spacing(1.75),
        paddingBottom: defaultTheme.spacing(1.75),
        lineHeight: 1.2,
        fontWeight: 700,
        color: defaultTheme.palette.text.secondary,
        background: '#F3F3F3',
        borderBottom: 'none',

        '&:first-child': {
          borderRadius: '8px 0 0 8px',
        },

        '&:last-child': {
          borderRadius: '0 8px 8px 0',
        },
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
    MuiSnackbar: {
      root: {
        '&&': {
          top: 0,
          right: 0,
          left: 0,
          bottom: 'auto',
          width: '100%',
          transform: 'translateX(0)',
        },
      },
    },
    MuiAlert: {
      root: {
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 0,
      },
      standardError: {
        backgroundColor: '#FF362D',
        color: defaultTheme.palette.common.white,
      },
      standardSuccess: {
        color: defaultTheme.palette.common.black,
      },
      message: {
        fontSize: 14,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
      },
    },

    MuiSwitch: {
      root: {
        width: 60,
        height: 32,
        padding: 0,
      },

      switchBase: {
        '&&': {
          border: 'none',
          padding: '4px 4px',
        },

        '&:active': {
          transform: 'none',
        },

        '&&$checked': {
          transform: 'translateX(28px)',
        },
      },

      colorSecondary: {
        '&$checked': {
          color: defaultTheme.palette.text.primary,

          '&:hover': {
            backgroundColor: 'none',
          },
        },
      },

      disabled: {},

      thumb: {
        width: 24,
        height: 24,
        boxShadow: 'none',
      },

      track: {
        borderRadius: 32,
        opacity: 0.18,
        backgroundColor: defaultTheme.palette.text.primary,

        '$switchBase$checked + &': {
          opacity: 0.08,
        },

        '$colorSecondary$checked + &': {
          backgroundColor: defaultTheme.palette.text.primary,
        },
      },
    },
  },
} as ThemeOptions);
