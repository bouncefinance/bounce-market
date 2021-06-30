import { makeStyles, Theme } from '@material-ui/core';

export const useProductsStyles = makeStyles<Theme>(theme => ({
  paginationTop: {
    margin: theme.spacing(0, 0, 4),
  },

  paginationBottom: {
    marginTop: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: theme.spacing(7),
    },
  },
}));
