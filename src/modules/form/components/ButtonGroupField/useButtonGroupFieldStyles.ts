import { makeStyles, Theme } from '@material-ui/core';

export const useButtonGroupFieldStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'inline-flex',
  },

  fullWidth: {
    width: '100%',
    display: 'block',
  },

  list: {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: theme.spacing(-2.5, 0, 0, -2.5),
  },

  btn: {
    width: '100%',
    maxWidth: '100%',
    flex: '1 0 0%',
    margin: theme.spacing(2.5, 0, 0, 2.5),
  },

  btnActive: {
    background: theme.palette.text.primary,
    color: theme.palette.background.default,
    cursor: 'default',

    '&:before': {
      display: 'none',
    },

    '&:active': {
      transform: 'none',
    },

    '&:hover': {
      background: theme.palette.text.primary,
      color: theme.palette.background.default,
    },
  },
}));
