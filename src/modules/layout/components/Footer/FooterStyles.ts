import { fade, makeStyles, Theme } from '@material-ui/core';

export const useFooterStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(3, 0),
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderTop: `1px solid ${fade(theme.palette.common.black, 0.1)}`,
  },

  col: {
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },

  socialCol: {
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
    },
  },
}));
