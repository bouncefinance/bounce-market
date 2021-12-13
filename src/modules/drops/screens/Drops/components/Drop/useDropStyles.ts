import { fade, makeStyles, Theme } from '@material-ui/core';
import { getPercentage } from 'modules/common/utils/styleUtils';

export const useDropStyles = makeStyles<Theme, { bgColor?: string }>(theme => ({
  root: {
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 430,
    overflow: 'hidden',

    padding: theme.spacing(3, 3.5),

    textAlign: 'center',
    background: ({ bgColor }) => bgColor,
    borderRadius: 24,
    transition: 'background 0.2s',

    [theme.breakpoints.up('md')]: {
      minHeight: 500,
      padding: theme.spacing(4.5, 3.5),
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(4.5, 9),
    },

    '&:hover': {
      background: ({ bgColor }) => (bgColor ? fade(bgColor, 0.8) : undefined),
      // 'boxShadow': '5px 5px 20px #666',
      '& img': {
        transform: 'scale(1.05)',
      },
    },
  },

  link: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  bgImgBox: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    transition: 'opacity 0.2s',
    opacity: 0.9,

    '$root:hover &': {
      opacity: 1,
    },

    '&:before': {
      display: 'none',
    },

    '&:after': {
      content: `''`,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 'inherit',
      // background: ({ bgColor }) =>
      //   `linear-gradient(
      //     0deg,
      //     ${fade(bgColor || '#000', 0.53)} 18.41%,
      //     ${fade(bgColor || '#000', 0.36)} 38.42%,
      //     ${fade(bgColor || '#000', 0)} 56.27%
      //     )`,
    },
  },

  nftList: {
    display: 'block',
    width: 'auto',
    margin: theme.spacing(0, -3.5),

    overflow: 'hidden',
    overflowX: 'auto',

    textAlign: 'center',
    whiteSpace: 'nowrap',
    lineHeight: 0,

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, -2),
    },
  },

  nftItem: {
    display: 'inline-block',
    padding: theme.spacing(0, 1),

    [theme.breakpoints.up('md')]: {
      width: '100%',
      padding: theme.spacing(0, 2),
      maxWidth: getPercentage(1, 4),
    },

    [theme.breakpoints.up('xl')]: {
      maxWidth: getPercentage(1, 5),
    },

    '&:first-child': {
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(3.5),
      },
    },

    '&:last-child': {
      [theme.breakpoints.down('sm')]: {
        paddingRight: theme.spacing(3.5),
      },
    },
  },

  itemImgBox: {
    borderRadius: 8,
    width: 104,
    backgroundColor: '#fff',

    [theme.breakpoints.up('md')]: {
      borderRadius: 12,
      width: 'auto',
    },

    '&:before': {
      paddingTop: getPercentage(130, 180),
    },
  },

  itemImgBoxThumb: {
    position: 'relative',

    '&:before': {
      content: `''`,
      display: 'block',
    },
  },

  itemImgThumb: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 'inherit',
  },

  title: {
    margin: theme.spacing('auto', 0, 2),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(3),
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },

    '& > span': {
      whiteSpace: 'nowrap',
    },
  },

  text: {
    margin: theme.spacing(0, 0, 3.5),
    color: fade(theme.palette.text.primary, 0.7),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },

    '& > span': {
      whiteSpace: 'nowrap',
    },
  },

  creator: {
    position: 'relative',
    margin: '0 auto',
  },
}));
