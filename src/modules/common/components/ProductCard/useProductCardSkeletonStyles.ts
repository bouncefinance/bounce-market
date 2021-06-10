import { makeStyles, Theme } from '@material-ui/core';

export const useProductCardSkeletonStyles = makeStyles<Theme>(theme => ({
  media: {
    display: 'block',
    height: 'auto',

    '&:before': {
      content: `''`,
      display: 'block',
      paddingBottom: '100%',
    },
  },
}));
