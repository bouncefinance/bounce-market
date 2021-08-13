import { fade, makeStyles, Theme } from '@material-ui/core';

export const FOOTER_MIN_HEIGHT = 90;

export const useFooterStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(8, 6, 3, 6),
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderTop: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,

    [theme.breakpoints.up('md')]: {
      minHeight: FOOTER_MIN_HEIGHT,
    },
  },

  container: {
    [theme.breakpoints.up('WXGAPlus')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  },

  col: {
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },
  menusCol: {
    backgroundColor: 'red',
  },
  localeCol: {
    '&&': {
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(4),
      },
    },
  },

  socialCol: {
    [theme.breakpoints.up('md')]: {
      flexGrow: 0,
      justifyContent: 'flex-end',
    },
  },

  description: {
    fontWeight: 'normal',
    fontSize: 12,
    color: theme.palette.text.primary,
    opacity: 0.5,
  },
}));
