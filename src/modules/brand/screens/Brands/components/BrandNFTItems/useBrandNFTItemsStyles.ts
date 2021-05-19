import { makeStyles, Theme } from '@material-ui/core';

const BTN_SIZE = 50;

export const useBrandNFTItemsStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    margin: theme.spacing(0, -3),

    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },

  slider: {
    padding: theme.spacing(0, 3),

    [theme.breakpoints.up('md')]: {
      padding: 0,
    },
  },

  buttons: {
    position: 'absolute',
    zIndex: 1,
    top: 65,
    left: theme.spacing(1),
    right: theme.spacing(1),

    display: 'flex',
    justifyContent: 'space-between',
    height: 0,

    [theme.breakpoints.up('md')]: {
      left: `-${BTN_SIZE / 2}px`,
      right: `-${BTN_SIZE / 2}px`,
      top: '50%',
      marginTop: -20,
      alignItems: 'center',
    },
  },

  navBtn: {
    background: theme.palette.background.paper,
    width: BTN_SIZE,
    height: BTN_SIZE,

    '&.swiper-button-disabled': {
      opacity: 0,
      visibility: 'hidden',
    },
  },

  slide: {
    [theme.breakpoints.down('sm')]: {
      width: '180px !important',
    },
  },

  itemImgFrame: {
    position: 'relative',
    overflow: 'hidden',
  },

  videoWrapper: {
    display: 'block',
    overflow: 'hidden',
    position: 'relative',

    '&:before': {
      content: `''`,
      display: 'block',
      paddingTop: '100%',
    },
  },

  video: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    objectFit: 'scale-down',
  },

  itemImgBox: {
    borderRadius: 'inherit',
  },

  itemTitle: {
    maxWidth: '100%',
    marginTop: theme.spacing(2),
    overflow: 'hidden',

    fontSize: 15,
    fontWeight: 500,
  },
}));
