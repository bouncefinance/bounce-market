import { fade, makeStyles, Theme } from '@material-ui/core';

export const useSubscribersStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    border: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    borderRadius: 50,
    height: 50,
  },

  count: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 3.25),

    fontSize: 16,
    fontWeight: 500,
  },

  countWithFollow: {
    padding: theme.spacing(0, 2, 0, 3.25),
  },

  icon: {
    fontSize: 18,
  },

  iconOffsetRight: {
    marginRight: theme.spacing(1),
  },

  followBtn: {
    border: `solid ${fade(theme.palette.text.primary, 0.1)}`,
    borderWidth: '0 0 0 1px',
    height: 'auto',
    padding: theme.spacing(0, 3.25, 0, 2),
    borderRadius: '0 50px 50px 0',

    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'inherit',

    '&:hover': {
      backgroundColor: fade(theme.palette.text.primary, 0.04),
      borderWidth: '0 0 0 1px',
    },

    '&:active': {
      backgroundColor: fade(theme.palette.text.primary, 0.08),
    },
  },
}));
