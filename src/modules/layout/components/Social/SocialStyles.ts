import { makeStyles, Theme } from '@material-ui/core';

const X_SPACING = 1.25;

export const useSocialStyles = makeStyles<Theme>(theme => ({
  title: {
    display: 'inline-block',
    padding: theme.spacing(0, X_SPACING, 2 * X_SPACING, X_SPACING),
    fontSize: 16,
    fontWeight: 'bold',
  },

  list: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    margin: theme.spacing(0, -X_SPACING),
    padding: 0,
    listStyle: 'none',
  },

  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, X_SPACING),
  },

  link: {
    '--medium-icon-color': theme.palette.background.default,
    color: theme.palette.text.primary,
    transition: 'color 0.2s',
    padding: theme.spacing(1),
    minWidth: 0,
    height: 'auto',
    border: 'none',

    '&:hover': {
      background: 'none',
      color: theme.palette.primary.main,
      border: 'none',
    },
  },

  icon: {
    fontSize: 20,

    [theme.breakpoints.up('md')]: {
      fontSize: 20,
    },
  },

  a: {
    padding: theme.spacing(X_SPACING),
    fontWeight: 'normal',
    fontSize: 16,
    '&:hover': {
      opacity: 0.7,
    },
  },
}));
