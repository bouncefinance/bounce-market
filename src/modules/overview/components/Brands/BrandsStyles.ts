import { makeStyles, Theme } from '@material-ui/core';

export const useBrandsStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: '#110E12',
  },

  moreBtn: {
    width: 134,
  },

  slider: {
    margin: theme.spacing(0, -2),
    padding: theme.spacing(0, 2),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, -3),
      padding: theme.spacing(0, 3),
    },
  },

  slide: {
    [theme.breakpoints.down('lg')]: {
      width: '240px !important',
    },
  },

  brand: {
    position: 'relative',
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 116,
  },

  brandLight: {
    background: theme.palette.common.white,
  },

  brandDark: {
    background: '#303030',
  },

  brandImgWrap: {
    height: '80%',
    width: '80%',
  },
}));
