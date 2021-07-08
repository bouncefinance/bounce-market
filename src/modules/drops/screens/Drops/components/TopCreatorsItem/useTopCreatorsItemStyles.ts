import { makeStyles, Theme } from '@material-ui/core';
import { getPercentage } from 'modules/common/utils/styleUtils';

export const useTopCreatorsItemStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'block',
  },

  imgWrap: {
    marginBottom: theme.spacing(2),
    borderRadius: 18,
    overflow: 'hidden',

    [theme.breakpoints.up('md')]: {
      borderRadius: 32,
      marginBottom: theme.spacing(3),
    },

    '&:before': {
      paddingTop: getPercentage(1, 1),
    },

    '& img': {
      transition: 'transform 0.25s ease-out, opacity 0.4s ease-out',

      '$root:hover &': {
        transform: 'scale(1.2) rotate(3deg)',
      },
    },

    '& .swiper-lazy': {
      opacity: 0,
    },

    '& .swiper-lazy-loaded': {
      opacity: 1,
    },
  },

  imgWrapThumb: {
    '&:before': {
      content: `''`,
      display: 'block',
    },
  },

  title: {
    fontWeight: 500,
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      fontSize: 18,
    },
  },
}));
