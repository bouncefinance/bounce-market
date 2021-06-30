import { makeStyles, Theme } from '@material-ui/core';

export const useDropListStyles = makeStyles<Theme>(theme => ({
  list: {
    margin: theme.spacing(-3, 0, 0),
    padding: '0.1px 0 0',
    listStyle: 'none',

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(-7.5),
    },
  },

  item: {
    padding: 0,
    marginTop: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(7.5),
    },
  },
}));
