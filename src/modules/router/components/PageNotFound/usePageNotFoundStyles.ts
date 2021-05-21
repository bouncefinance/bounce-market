import { makeStyles, Theme } from '@material-ui/core';

export const usePageNotFoundStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: '20vh 0',
  },

  title: {
    marginBottom: theme.spacing(2),
    fontSize: 60,

    [theme.breakpoints.up('md')]: {
      fontSize: 80,
    },
  },

  button: {
    minWidth: 180,
  },
}));
