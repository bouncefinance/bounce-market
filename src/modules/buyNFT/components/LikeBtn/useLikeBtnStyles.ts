import { fade, makeStyles, Theme } from '@material-ui/core';

export const useLikeBtnStyles = makeStyles<Theme>(theme => ({
  root: {
    color: theme.palette.text.secondary,
    borderColor: fade(theme.palette.text.primary, 0.1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    height: theme.spacing(4.5),
    minWidth: theme.spacing(10),

    '&:hover': {
      color: theme.palette.text.primary,
      borderColor: 'inherit',

      '&:before': {
        display: 'none',
      },
    },
  },

  btnIcon: {
    fontSize: 18,
    '& svg': {
      fill: 'none',
    },
  },

  btnText: {
    marginLeft: theme.spacing(1),
  },

  btnIconActive: {
    color: 'red',
    '& svg': {
      fill: 'red',
    },
  },
}));
