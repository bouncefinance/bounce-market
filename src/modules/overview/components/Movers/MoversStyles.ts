import { makeStyles, Theme } from '@material-ui/core/styles';

export const useMoversStyles = makeStyles<Theme>(theme => ({
  root: {},

  slider: {
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, -3),
      padding: theme.spacing(0, 3),
    },

    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, -2),
      padding: theme.spacing(0, 2),
    },
  },

  slide: {
    height: 'auto',
    paddingBottom: 2,

    [theme.breakpoints.down('lg')]: {
      width: '240px !important',
    },
  },

  buttons: {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: theme.spacing(0, 2),
  },

  navBtn: {
    width: 50,
    height: 50,

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
}));
