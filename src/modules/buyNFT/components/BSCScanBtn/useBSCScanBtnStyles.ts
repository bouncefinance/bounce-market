import { makeStyles, Theme } from '@material-ui/core';

export const useBSCScanBtnStyles = makeStyles<Theme>(theme => ({
  root: {
    height: 48,

    '&:before': {
      display: 'none',
    },

    '&:hover': {
      color: 'inherit',
      borderColor: theme.palette.text.primary,
    },
  },

  icon: {
    marginRight: theme.spacing(1.25),

    '& svg': {
      display: 'block',
    },
  },
}));
