import { makeStyles, Theme } from '@material-ui/core';

export const useButtonStyles = makeStyles<Theme>(theme => ({
  root: {
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      transition: '0.2s',
    },
  },

  rounded: {
    borderRadius: 44,
  },

  loading: {
    pointerEvents: 'none',

    '&:active': {
      transform: 'none',
    },

    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      opacity: 0,
      transform: 'scale(0.8)',
    },
  },

  content: {
    width: '100%',
    display: 'inherit',
    position: 'relative',
    alignItems: 'inherit',
    justifyContent: 'inherit',

    transition: 'opacity 0.2s, transform 0.2s',
  },

  contentHidden: {
    opacity: 0,
    transform: 'scale(0.8)',
  },

  loadingIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-0.5em',
    marginLeft: '-0.5em',
    fontSize: 18,

    '& svg': {
      display: 'block',
      width: '1em',
      height: '1em',
    },
  },
}));
