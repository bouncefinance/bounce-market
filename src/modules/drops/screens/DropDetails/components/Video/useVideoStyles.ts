import { fade, makeStyles, Theme } from '@material-ui/core';
import { getPercentage } from 'modules/common/utils/styleUtils';

export const useVideoStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    borderRadius: 16,

    '&:before': {
      content: `''`,
      display: 'block',
      paddingTop: getPercentage(675, 1200),
    },
  },

  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  player: {
    borderRadius: 'inherit',

    '& video': {
      borderRadius: 'inherit',
    },
  },

  overlay: {
    borderRadius: 'inherit',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.2s',

    background: fade(theme.palette.common.black, 0.5),
  },

  overlayActive: {
    opacity: 1,
    visibility: 'visible',
  },

  playBtn: {
    fontSize: 66,
    margin: 'auto',
    transition: 'transform 0.3s',
    cursor: 'pointer',

    [theme.breakpoints.up('sm')]: {
      fontSize: 122,
    },

    '& circle': {
      fill: fade(theme.palette.common.white, 0.4),
      transition: 'fill 0.2s',
    },

    '&:hover ': {
      transform: 'scale(1.17)',

      '& circle': {
        fill: fade(theme.palette.common.white, 0.6),
      },
    },
  },

  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,

    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.2s',
    transform: 'scale(0.8)',

    background: theme.palette.common.white,
    color: theme.palette.common.black,

    [theme.breakpoints.up('md')]: {
      width: 50,
      height: 50,
    },
  },

  closeBtnActive: {
    transform: 'none',
    opacity: 0.5,
    visibility: 'visible',

    '&:hover': {
      opacity: 1,
    },
  },
}));
