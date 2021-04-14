import { makeStyles, Theme } from '@material-ui/core';

export const useLogoStyles = makeStyles<Theme>(theme => ({
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

  text: {
    display: 'block',
    fontSize: 11,
    marginLeft: 85,
  },
}));
