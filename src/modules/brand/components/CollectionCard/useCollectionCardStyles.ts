import { makeStyles, Theme } from '@material-ui/core';

export const useCollectionCardStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5, 3),
    borderRadius: 20,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 7, 6, 8),
    },
  },

  row: {
    minHeight: 270,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },

  logo: {
    width: 64,
    height: 64,
    marginRight: theme.spacing(2),
  },

  title: {
    textTransform: 'uppercase',
  },

  descr: {
    marginBottom: theme.spacing(3),
  },
}));
