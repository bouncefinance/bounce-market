import { makeStyles, Theme } from '@material-ui/core';

export const useBioStyles = makeStyles<Theme>(theme => ({
  bioDescr: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '70%',
    },
  },
}));
