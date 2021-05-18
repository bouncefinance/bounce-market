import { makeStyles, Theme } from '@material-ui/core';

export const useLogoStyles = makeStyles<Theme>(() => ({
  root: {
    color: 'inherit',
    textDecoration: 'none',

    '&:hover': {
      color: 'inherit',
    },
  },

  img: {
    display: 'block',
    height: 27,
  },
}));
