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
    maxWidth: 240,
  },

  buttons: {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: theme.spacing(0, 2),
  },

  navBtn: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    border: '1px solid #ccc',
    color: theme.palette.text.secondary,

    '&.swiper-button-disabled': {
      cursor: 'default',
      opacity: 0.3,
    },
  },

  navBtnIcon: {
    fontSize: 16,
  },
}));
