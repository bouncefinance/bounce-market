import { lighten, makeStyles, Theme } from '@material-ui/core';

export const useSearchStyles = makeStyles<Theme>(theme => ({
  root: {},

  iconButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 46,
    padding: 0,
    color: theme.palette.text.secondary,
  },

  input: {
    borderRadius: 44,
    width: '100%',
    height: 44,
    background: theme.palette.background.paper,
    transition: 'background 0.2s',

    '&:hover': {
      background: lighten(theme.palette.background.paper, 0.05),
    },
  },

  inputFocused: {
    '&&': {
      background: lighten(theme.palette.background.paper, 0.1),
    },
  },

  inputBase: {
    padding: '0 20px 0 48px',
    height: '100%',
  },
}));
