import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useProductCardStyles = makeStyles<Theme>(theme => ({
  root: {},

  imgLink: {
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

    '$imgLink:hover &': {
      '&:after': {
        background: fade(theme.palette.common.black, 0.3),
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

  title: {
    marginBottom: theme.spacing(2),

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
  },

  info: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr auto',
    gap: theme.spacing(0, 2),
    margin: theme.spacing(1.5, 0, 0),
  },

  status: {
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    fontSize: 16,
  },

  iconRightOffset: {
    marginRight: theme.spacing(1),
  },

  likes: {
    display: 'flex',
    alignItems: 'center',
  },

  likeBtn: {
    padding: 6,

    '&:hover': {
      color: 'red',
    },
  },

  likeBtnActive: {
    color: 'red',
  },
}));
