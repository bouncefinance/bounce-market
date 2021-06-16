import { makeStyles, Theme } from '@material-ui/core';

export const useEmptyPageDataStyles = makeStyles<Theme>(theme => ({
  root: {
    textAlign: 'center',
  },

  title: {
    marginBottom: theme.spacing(2),
  },

  text: {
    marginBottom: theme.spacing(3),
  },
}));
