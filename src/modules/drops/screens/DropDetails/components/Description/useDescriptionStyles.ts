import { fade, makeStyles, Theme } from '@material-ui/core';

export const useDescriptionStyles = makeStyles<Theme>(theme => ({
  root: {},

  title: {
    marginBottom: theme.spacing(3.5),
    fontSize: 28,

    [theme.breakpoints.up('md')]: {
      fontSize: 44,
    },
  },

  shareBtn: {
    borderColor: fade(theme.palette.text.primary, 0.1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    height: 50,

    '&:hover': {
      borderColor: fade(theme.palette.text.primary, 0.4),
      color: theme.palette.text.primary,
    },

    '&:before': {
      display: 'none',
    },
  },

  infoCol: {
    [theme.breakpoints.up('lg')]: {
      position: 'sticky',
      top: theme.spacing(2),
    },
  },

  socCol: {
    [theme.breakpoints.up('md')]: {
      order: 1,
    },
  },
}));
