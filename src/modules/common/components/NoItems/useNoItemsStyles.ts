import { makeStyles, Theme } from '@material-ui/core';

export const useNoItemsStyles = makeStyles<Theme>(theme => ({
  wrapper: {},

  title: {
    marginBottom: theme.spacing(1.5),
  },

  descr: {
    margin: theme.spacing(0, 'auto', 3.5),
    maxWidth: 550,
  },
}));
