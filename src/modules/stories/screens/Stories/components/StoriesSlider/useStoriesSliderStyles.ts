import { makeStyles, Theme } from '@material-ui/core';

export const useStoriesSliderStyles = makeStyles<Theme>(theme => ({
  root: {
    overflow: 'hidden',
  },

  slider: {
    overflow: 'visible',
    padding: theme.spacing(0, 2),

    [theme.breakpoints.up('xl')]: {
      padding: 0,
    },
  },

  slide: {
    opacity: 0.2,
    transition: '0.2s',

    '&.swiper-slide-active': {
      opacity: 1,
    },

    '&.swiper-slide-next': {
      [theme.breakpoints.up('md')]: {
        opacity: 1,
      },
    },
  },
}));
