import { makeStyles, Theme } from '@material-ui/core';

export const useLikeBtnStyles = makeStyles<Theme>(theme => ({
  btnIcon: {
    fontSize: 18,
  },

  btnText: {
    marginLeft: theme.spacing(1),
  },

  btnIconActive: {
    color: 'red',
  },
}));
