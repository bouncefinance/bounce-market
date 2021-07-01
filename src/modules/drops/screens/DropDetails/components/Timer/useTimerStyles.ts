import { makeStyles, Theme } from '@material-ui/core';

export const useTimerStyles = makeStyles<Theme>(theme => ({
  root: {},

  duration: {
    fontSize: 18,
    fontWeight: 500,
  },

  text: {
    marginLeft: theme.spacing(1.5),
    fontSize: 14,
  },
}));
