import { fade, makeStyles, Theme } from '@material-ui/core';
import { getPercentage } from 'modules/common/utils/styleUtils';

export const useStoriesSliderItemStyles = makeStyles<
  Theme,
  { gradientColor?: string }
>(theme => ({
  root: {
    position: 'relative',
  },

  imgLink: {
    display: 'block',
    position: 'relative',

    '&:after': {
      content: `''`,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: fade('#000', 0.2),
      opacity: 0,
      transition: 'opacity 0.2s',
    },

    '&:hover:after': {
      opacity: 1,
    },
  },

  imgWrap: {
    borderRadius: 24,
    marginBottom: theme.spacing(3.5),
    maxHeight: 500,
    // overflow: 'hidden',

    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
    },

    '&:before': {
      paddingTop: getPercentage(220, 296),

      [theme.breakpoints.up('md')]: {
        paddingTop: getPercentage(500, 584),
      },
    },

    '&:after': {
      [theme.breakpoints.up('md')]: {
        content: `''`,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',

        background: ({ gradientColor }) =>
          `linear-gradient(
          0deg,
          ${fade(gradientColor || theme.palette.background.default, 0.8)} 21%,
          ${fade(gradientColor || theme.palette.background.default, 0)} 50%
          )`,
      },
    },
  },

  imgWrapThumb: {
    display: 'block',
    height: 'auto',

    '&:before': {
      content: `''`,
      display: 'block',
    },
  },

  imgWrapBg: {
    background: ({ gradientColor }) =>
      `linear-gradient(
      0deg,
      ${fade(gradientColor || theme.palette.background.default, 0.8)} 50%,
      ${fade('#000', 0)} 100%
    )`,
  },

  content: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      padding: theme.spacing(3, 4.5),
    },
  },

  contentWrap: {
    textAlign: 'center',
  },

  title: {
    display: 'block',
    marginBottom: theme.spacing(2),

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },

  titleThumb: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  text: {
    marginBottom: theme.spacing(2.5),
    opacity: 0.7,
    maxHeight: `${3 * 1.5}em`,
    overflow: 'hidden',

    [theme.breakpoints.up('md')]: {
      opacity: 1,
      marginBottom: theme.spacing(3),
      height: `${2 * 1.5}em`,
    },
  },

  textThumb: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  profileInfo: {
    display: 'inline-block',
  },

  chips: {
    position: 'absolute',
    zIndex: 1,
    top: theme.spacing(1.5),
    left: theme.spacing(1.5),

    display: 'grid',
    gridAutoFlow: 'column',
    gap: theme.spacing(0, 1),

    [theme.breakpoints.up('md')]: {
      gap: theme.spacing(0, 2),
      top: theme.spacing(3),
      left: theme.spacing(3),
    },
  },
}));
