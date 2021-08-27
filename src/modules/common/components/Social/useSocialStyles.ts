import { makeStyles, Theme } from '@material-ui/core';

export const useSocialStyles = makeStyles<Theme>(theme => ({
  list: {
    display: 'flex',
    margin: theme.spacing(0, -1),
    padding: 0,
    listStyle: 'none',
    height: 86,
  },

  item: {
    padding: theme.spacing(0, 1),
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    width: 44,
    height: 44,
  },
}));
