import { fade, makeStyles, Theme } from '@material-ui/core';

export const FOOTER_MIN_HEIGHT = 90;

export const useFooterStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 0),
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderTop: `1px solid ${fade(theme.palette.common.black, 0.1)}`,

    [theme.breakpoints.up('md')]: {
      minHeight: FOOTER_MIN_HEIGHT,
    },
  },

  container: {
    [theme.breakpoints.up('WXGAPlus')]: {
      paddingLeft: theme.spacing(5.5),
      paddingRight: theme.spacing(5.5),
    },
  },

  col: {
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
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
}));
