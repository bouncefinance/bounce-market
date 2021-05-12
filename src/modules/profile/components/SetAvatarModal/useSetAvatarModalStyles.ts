import { makeStyles, Theme } from '@material-ui/core';

export const useSetAvatarModalStyles = makeStyles<Theme>(theme => ({
  root: {
    maxWidth: 700,
    padding: theme.spacing(4, 2.5),
    borderRadius: 22,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 5),
    },
  },

  close: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 40,
    height: 40,
    padding: 0,
    color: theme.palette.text.primary,
    border: 'none',

    [theme.breakpoints.up('md')]: {
      top: 20,
      right: 20,
    },

    '&:hover': {
      border: 'none',
    },
  },
}));
