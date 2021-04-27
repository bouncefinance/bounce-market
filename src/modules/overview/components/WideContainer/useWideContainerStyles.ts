import { makeStyles, Theme } from '@material-ui/core';

export const useWideContainerStyles = makeStyles<Theme>(theme => ({
  root: {
    [theme.breakpoints.up('xl')]: {
      maxWidth: 1520 + 48,
    },
  },
}));
