import { makeStyles, Theme } from '@material-ui/core';

export const useTopCreatorsStyles = makeStyles<Theme>(theme => ({
  root: {},

  header: {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: theme.spacing(0, 4),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(7.5),
    },
  },

  navBtn: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      width: 60,
      height: 60,
      display: 'flex',
    },

    '&.swiper-button-disabled': {
      cursor: 'default',
      opacity: 0.3,

      '&:active': {
        transform: 'none',
      },
    },
  },

  navBtnIcon: {
    fontSize: 16,
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
      width: '128px !important',
    },

    [theme.breakpoints.down('sm')]: {
      width: '90px !important',
    },
  },
}));
