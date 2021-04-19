import { makeStyles, Theme } from '@material-ui/core';

export const useTimerStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: 14,
  },

  icon: {
    marginRight: theme.spacing(1),
    fontSize: 16,
  },
}));
