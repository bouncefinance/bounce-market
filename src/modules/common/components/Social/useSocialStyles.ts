import { makeStyles, Theme } from '@material-ui/core';

export const useSocialStyles = makeStyles<Theme>(theme => ({
  list: {
    display: 'flex',
    margin: theme.spacing(0, -1),
    padding: 0,
    listStyle: 'none',
  },

  item: {
    padding: theme.spacing(0, 1),
  },

  icon: {
    width: 44,
    height: 44,
  },
}));
