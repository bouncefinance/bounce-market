import { fade, makeStyles, Theme } from '@material-ui/core';

export const useDropTimerStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    height: 28,
    padding: theme.spacing(0, 2.5),
    fontWeight: 500,
    background: fade(theme.palette.common.black, 0.35),
    color: theme.palette.common.white,
    borderRadius: 21,

    [theme.breakpoints.up('md')]: {
      height: 42,
      fontSize: 18,
    },
  },
}));
