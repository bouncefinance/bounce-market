import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const usePromoStyles = makeStyles<Theme>(theme => ({
  root: {},

  container: {
    maxWidth: 1095,
  },

  slider: {},

  pagination: {
    display: 'grid',
    gridAutoColumns: 'minmax(10px, 70px)',
    gridAutoFlow: 'column',
    gap: theme.spacing(0, 1),
    justifyContent: 'center',
    marginTop: theme.spacing(3),

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },

  bullet: {
    height: 2,
    background: fade(theme.palette.text.primary, 0.2),
  },

  bulletActive: {
    background: theme.palette.text.primary,
  },

  slide: {
    background: theme.palette.background.default,

    '&&': {
      height: 'auto',
    },
  },

  thumbsCol: {
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(8),
      display: 'block',
    },
  },

  thumbs: {
    height: 275,
  },

  thumbsSlide: {
    display: 'flex',
    alignItems: 'center',
  },

  thumb: {
    opacity: 0.5,
    cursor: 'pointer',
    transition: 'all 0.2s',

    '&:hover': {
      opacity: 0.7,
    },

    '.swiper-slide-thumb-active &': {
      opacity: 1,
    },
  },
}));
