import { makeStyles, Theme } from '@material-ui/core';

const X_SPACING = 1;

export const useSocialStyles = makeStyles<Theme>(theme => ({
  root: {},

  list: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: theme.spacing(0, -X_SPACING),
    padding: 0,
    listStyle: 'none',
  },

  listItem: {
    padding: theme.spacing(0, X_SPACING),
  },

  link: {
    color: theme.palette.text.primary,
    transition: 'color 0.2s',
    padding: theme.spacing(1),
    minWidth: 0,
    height: 'auto',

    '&:hover': {
      background: 'none',
      color: theme.palette.primary.main,
    },
  },

  icon: {
    fontSize: 18,

    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
  },
}));
