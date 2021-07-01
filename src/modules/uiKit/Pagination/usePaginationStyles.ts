import { fade, makeStyles, Theme } from '@material-ui/core';

export const usePaginationStyles = makeStyles<Theme>(theme => ({
  root: {
    '& li:last-child button': {
      marginRight: 0,
    },

    '& li:first-child button': {
      marginLeft: 0,
    },
  },

  itemRoot: {
    width: 34,
    height: 34,
    margin: theme.spacing(0, 0.5),
    padding: 0,
    borderRadius: 8,
    border: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    fontWeight: 500,

    [theme.breakpoints.up('md')]: {
      width: 50,
      height: 50,
      margin: theme.spacing(0, 1),
      borderRadius: 12,
      fontSize: 16,
    },

    '&.Mui-selected': {
      backgroundColor: '#000000',
      color: '#ffffff',

      '&:hover': {
        backgroundColor: '#000000',
      },
    },
  },

  itemIcon: {
    [theme.breakpoints.up('md')]: {
      fontSize: 32,
    },
  },

  ellipsis: {
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    minWidth: 14,
    width: 14,
    margin: 0,

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 1.5),
    },
  },
}));
