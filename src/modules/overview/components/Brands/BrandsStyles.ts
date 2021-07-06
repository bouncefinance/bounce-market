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
    width: '308px !important',
    height: 214,
    backgroundColor: '#222',
    borderRadius: 22,
    paddingTop: 22,
    paddingLeft: 20,
    boxSizing: 'border-box',
    [theme.breakpoints.down('lg')]: {
      width: '240px !important',
    },
  },

  brand: {
    position: 'relative',
  },

  item: {
    height: 60,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    justifyContent: 'center',
  },
}));
