import { makeStyles, Theme } from '@material-ui/core';

export const useLogoByBounceStyles = makeStyles<Theme>(theme => ({
  root: {
    color: 'inherit',
    textDecoration: 'none',

    '&:hover': {
      color: 'inherit',
    },
  },

  img: {
    display: 'block',
    height: 43,
  },
}));
