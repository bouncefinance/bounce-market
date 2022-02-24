import { makeStyles, Theme } from '@material-ui/core';
import { Themes } from 'modules/themes/types';

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
  [theme.palette.type === Themes.light ? 'ableLight' : 'ableDark']: {
    display: 'none',
  },
}));
