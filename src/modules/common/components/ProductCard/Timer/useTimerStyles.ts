import { makeStyles, Theme } from '@material-ui/core';

export const useTimerStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateRows: '1fr auto',
    rowGap: 7,
    // alignItems: 'center',

    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: 14,
  },

  tip: {
    color: theme.palette.text.secondary,
    fontDize: 14,
    lineHeight: '17px',
  },

  timeLeft: {
    color: theme.palette.text.primary,
    fontDize: 13,
    lineHeight: '16px',
  },

  icon: {
    marginRight: theme.spacing(1),
    fontSize: 16,
  },
}));
