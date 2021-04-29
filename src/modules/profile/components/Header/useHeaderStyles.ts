import { makeStyles, Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    height: 200,
    display: 'flex',
    alignItems: 'flex-end',
    padding: theme.spacing(4, 0),
    background: '#E1E1E1',

    [theme.breakpoints.up('md')]: {
      height: 300,
    },
  },

  imgWrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',

    '&:before': {
      display: 'none',
    },
  },

  container: {
    position: 'relative',
  },

  visibleOnHover: {
    [theme.breakpoints.up('xl')]: {
      opacity: 0,
      transition: 'all 0.2s',
    },

    '$root:hover &': {
      opacity: 1,
    },
  },
}));
