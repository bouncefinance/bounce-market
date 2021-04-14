import { makeStyles, Theme } from '@material-ui/core';

export const useHeaderLinksStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',

    [theme.breakpoints.up('xl')]: {
      justifyContent: 'center',
      gridAutoFlow: 'column',
      gap: theme.spacing(0, 4),
    },
  },

  link: {
    transition: 'color 0.2s',
    fontSize: 16,
    justifyContent: 'flex-start',
    padding: theme.spacing(1, 0),
    minWidth: 0,

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
