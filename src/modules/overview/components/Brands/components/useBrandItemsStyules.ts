import {
  fade,
  Theme,
  makeStyles,
} from '@material-ui/core';

const BTN_SIZE = 50;

export const useBrandItemsStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: 35,
    width: '100%',
  },

  row: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },

  root: {
    position: 'relative',
    margin: theme.spacing(0, -3),
    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },

  slider: {
    padding: theme.spacing(0, 3),
    width: '100%',
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

  item: {

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

  itemImgBox: {
    borderRadius: 'inherit',
    width: 72,
    height: 72,
  },

  name: {
    fontSize: 22,
    lineHeight: '27px',
    fontWeight: 'bold',
    marginBottom: 2,
    width: '100%',
    maxWidth: 160,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  count: {
    color: fade(theme.palette.common.white, 0.5),
    fontWeight: 500,
    fontSize: 15,
    lineHeight: '18px',
  },

  brandImgWrap: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    marginRight: 16,
  },
}))