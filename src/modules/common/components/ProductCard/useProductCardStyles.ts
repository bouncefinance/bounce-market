import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useProductCardStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  imgBox: {
    position: 'relative',
    display: 'block',
  },

  imgWrap: {
    overflow: 'hidden',

    '&:after': {
      content: `''`,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',

      background: fade(theme.palette.common.black, 0),
      transition: '0.2s',
    },

    '$imgBox:hover &': {
      '&:after': {
        background: fade(theme.palette.common.black, 0.2),
      },
    },

    '& .swiper-lazy': {
      opacity: 0,
      visibility: 'hidden',
      transition: '0.2s',
    },

    '& .swiper-lazy-loaded': {
      opacity: 1,
      visibility: 'visible',
    },

    '.swiper-slide &': {
      visibility: 'hidden',
      opacity: 0,
      transition: '0.2s',
    },

    '.swiper-slide-visible &': {
      visibility: 'visible',
      opacity: 1,
    },
  },

  cardStatus: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    background: fade(theme.palette.common.black, 0.3),
    color: theme.palette.common.white,
  },

  statusTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1.5),
    fontSize: 16,
    fontWeight: 500,
  },

  statusSpinner: {
    margin: theme.spacing(0, 1, 0, 0),
  },

  statusSubTitle: {},

  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    marginBottom: theme.spacing(2),

    fontSize: 16,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },

  devider: {
    margin: theme.spacing(2, 0),
    border: `solid ${fade(theme.palette.text.primary, 0.1)}`,
    borderWidth: '1px 0 0',
  },

  price: {
    fontSize: 15,
    fontWeight: 700,
    margin: theme.spacing(0, 0, 1.5),
  },

  infoContainer: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr auto',
    gap: theme.spacing(0, 1.5),
    marginTop: 'auto',
  },

  info: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 13,
    color: theme.palette.text.secondary,
  },

  status: {
    fontSize: 15,
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.75),
  },

  icon: {
    fontSize: 16,
  },

  iconRightOffset: {
    marginRight: theme.spacing(1),
  },

  likeBtn: {
    padding: 6,

    '&:hover': {
      color: 'red',
    },
  },

  saleBtn: {},

  likeBtnActive: {
    color: 'red',
  },

  menuPopover: {
    marginTop: theme.spacing(1),
  },

  menuBtn: {
    padding: theme.spacing(1, 1),
    marginRight: -16,
  },

  menuIcon: {
    fontSize: 20,
    color: theme.palette.text.secondary,
  },

  menuItem: {
    fontSize: 13,
    fontWeight: 500,
    minWidth: 170,
  },

  videoWrapper: {
    display: 'block',
    position: 'relative',
    backgroundPosition: 'center',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      paddingTop: '100%',
      display: 'block',
    },
    '&:after': {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      content: '""',
      position: 'absolute',
      transition: '0.2s',
    },
  },

  video: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
}));
