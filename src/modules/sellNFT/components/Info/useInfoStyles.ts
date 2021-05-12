import { fade, makeStyles, Theme } from '@material-ui/core';

export const useInfoStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5.5, 0),
  },

  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'grid',
    gap: theme.spacing(3, 0),

    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },

  item: {
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(3.5),
      paddingBottom: theme.spacing(3.5),
      borderBottom: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    },

    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(5.5),
      paddingRight: theme.spacing(5.5),
    },

    '&:first-of-type': {
      [theme.breakpoints.up('lg')]: {
        paddingTop: 0,
      },
    },

    '&:last-of-type': {
      [theme.breakpoints.up('lg')]: {
        borderBottom: 'none',
        paddingBottom: 0,
      },
    },
  },

  itemInner: {
    border: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    borderRadius: 20,
    padding: theme.spacing(2.5),

    [theme.breakpoints.up('lg')]: {
      border: 'none',
      borderRadius: 0,
      padding: 0,
    },

    '$item:first-of-type &': {
      border: 'none',
      borderRadius: 0,
      padding: 0,
    },
  },
}));
