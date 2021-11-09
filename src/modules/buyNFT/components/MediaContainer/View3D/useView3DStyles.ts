import { makeStyles, Theme } from '@material-ui/core';

export const useView3DStyles = makeStyles<Theme>(theme => ({
  canvas: {
    [theme.breakpoints.up('md')]: {
      '& canvas': {
        width: 300,
        height: 150,
      },
    },

    [theme.breakpoints.up('xl')]: {
      '& canvas': {
        width: 500,
        height: 500,
      },
    },
  },
}));
