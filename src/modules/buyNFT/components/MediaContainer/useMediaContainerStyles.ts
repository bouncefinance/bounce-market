import { fade, makeStyles, Theme } from '@material-ui/core';

export const useMediaContainerStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(3.5),
      paddingBottom: theme.spacing(3.5),
    },

    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(3.5, 4),
    },
  },

  content: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: 240,
    textAlign: 'center',
    margin: 'auto',
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },

  img: {
    display: 'block',
    margin: theme.spacing(0, 'auto'),
    maxWidth: '100%',
    objectFit: 'scale-down',

    [theme.breakpoints.up('xl')]: {
      maxHeight: '48vh',
    },
  },

  btn: {
    borderColor: fade(theme.palette.text.primary, 0.1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    minWidth: 115,

    '&:hover': {
      color: theme.palette.text.primary,
      borderColor: 'inherit',

      '&:before': {
        display: 'none',
      },
    },
  },

  btnIcon: {
    fontSize: 18,
    marginRight: theme.spacing(1),
  },
}));
