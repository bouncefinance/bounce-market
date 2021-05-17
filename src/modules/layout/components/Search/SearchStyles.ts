import { makeStyles, Theme } from '@material-ui/core';

export const useSearchStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
  },

  iconButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 46,
    padding: 0,
    color: '#7b7b7b',
    border: 'none',

    '&:hover': {
      border: 'none',
    },
  },

  input: {
    borderRadius: 44,
    width: '100%',
    height: 44,
    background: theme.palette.common.white,
    transition: 'background 0.2s, color 0.2s, border 0.2s',
    color: theme.palette.common.black,
    fontSize: 14,

    [theme.breakpoints.up('xl')]: {
      background: theme.palette.background.paper,
      color: 'inherit',
    },

    '$root:hover &': {
      background: theme.palette.common.white,
      color: theme.palette.common.black,
    },
  },

  inputFocused: {
    '&&': {
      background: theme.palette.common.white,
      color: theme.palette.common.black,
    },
  },

  inputBase: {
    padding: '0 20px 0 48px',
    height: '100%',
  },
  searchResult: {
    position: 'absolute',
    top: 46,
    width: 410,
    borderRadius: 4,
    zIndex: 10,
    backgroundColor: theme.palette.common.white,
    padding: 20,
  }
}));
