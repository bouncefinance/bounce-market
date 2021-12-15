import { makeStyles, Theme } from '@material-ui/core';

export const useDropTimerStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    fontSize: 20,
    padding: theme.spacing(0, 1.5),
    fontWeight: 500,
    color: theme.palette.common.white,
    // background: fade(theme.palette.common.black, 0.35),
    // borderRadius: 21,

    [theme.breakpoints.up('md')]: {
      height: 42,
      fontSize: 18,
    },
  },
}));
