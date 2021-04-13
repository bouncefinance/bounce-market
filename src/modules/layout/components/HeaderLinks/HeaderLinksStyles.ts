import { makeStyles, Theme } from '@material-ui/core';

export const useHeaderLinksStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',

    [theme.breakpoints.up('xl')]: {
      justifyContent: 'center',
      gridAutoFlow: 'column',
      gap: theme.spacing(0, 2),
    },
  },

  link: {
    transition: 'color 0.2s',
    fontSize: 16,
    color: theme.palette.common.black,
    justifyContent: 'flex-start',

    [theme.breakpoints.up('xl')]: {
      color: theme.palette.text.secondary,
    },

    '&:hover': {
      background: 'none',

      [theme.breakpoints.up('xl')]: {
        color: theme.palette.text.primary,
      },
    },
  },
}));
