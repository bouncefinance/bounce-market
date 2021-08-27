import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useProductCardStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '&:hover $likeSite': {
      opacity: 1,
    },
  },

  avatarTips: {
    backgroundColor: '#000',
  },
  avatarTipsText: {
    color: '#000',
  },
  imgBox: {
    position: 'relative',
    display: 'block',
    '&:hover img': {
      transform: 'scale(1.1)',
    },
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
    background: theme.palette.common.white,
    color: theme.palette.common.black,
  },

  title: {
    marginBottom: theme.spacing(2),
    fontSize: 16,
    height: 21,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },

  devider: {
    margin: theme.spacing(2, 0),
    border: `solid ${fade(theme.palette.common.black, 0.1)}`,
    borderWidth: '1px 0 0',
  },

  saleContainer: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: 'auto max-content',
    rowGap: theme.spacing(0.6),
    marginTop: 'auto',
    gridTemplateAreas: `'a c' 'b c'`,
  },

  saleType: {
    fontSize: 14,
    lineHeight: '17px',
    opacity: 0.4,
    gridArea: 'a',
  },

  price: {
    fontSize: 15,
    lineHeight: '18px',
    fontWeight: 'bold',
    gridArea: 'b',
    whiteSpace: 'nowrap',
  },

  infoRight: {
    gridArea: 'c',
    textAlign: 'center',
  },

  meta: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'auto max-content',
  },

  saleMeta: {
    display: 'grid',
    gridTemplateRows: '1fr auto',
  },

  timeMeta: {
    display: 'flex',
    alignItems: 'center',
  },

  infoContainer: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'max-content auto',
    marginTop: 5,
  },

  info: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 13,
    color: fade(theme.palette.text.primary, 0.5),
  },
  itemCopiesInfo: {
    width: 84,
  },

  ratio: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    columnGap: 5,
  },

  status: {
    fontSize: 15,
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.75),
  },

  icon: {
    fontSize: 16,
    fill: 'none',
  },

  iconRightOffset: {
    marginRight: theme.spacing(1),
  },

  relative: {
    position: 'relative',
  },
  topBar: {
    padding: '10px 17px',
  },
  topChiaIcon: {},
  topChiaText: {
    color: fade(theme.palette.text.primary, 0.5),
    padding: theme.spacing(0, 1),
  },
  likeSite: {
    zIndex: 2,
    userSelect: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.1s linear',
  },
  likeBtn: {
    padding: 6,
    transform: 'rotateY(0)',
    transition: 'transform .4s ease',
  },

  saleBtn: {},

  likeBtnActive: {
    color: 'red',
    transform: 'rotateY(180deg)',
    '& svg': {
      fill: 'red',
    },
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
  stateTip: {
    fontWeight: 500,
    opacity: 0.5,
  },
  rightWrapper: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    columnGap: 5,
    alignItems: 'center',
  },
}));
