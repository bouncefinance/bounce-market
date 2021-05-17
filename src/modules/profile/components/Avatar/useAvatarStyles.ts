import { fade, makeStyles, Theme } from '@material-ui/core';

export const PROFILE_AVATAR_SIZE = 145;
const BORDER_SIZE = 10;

export const useAvatarStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    width: PROFILE_AVATAR_SIZE,
    height: PROFILE_AVATAR_SIZE,
    borderRadius: '50%',
    background: theme.palette.background.default,
  },

  editable: {
    '&:after': {
      content: `''`,
      position: 'absolute',
      left: BORDER_SIZE,
      top: BORDER_SIZE,
      right: BORDER_SIZE,
      bottom: BORDER_SIZE,

      background: fade(theme.palette.text.primary, 0.2),
      opacity: 0,
      borderRadius: 'inherit',

      transition: 'all 0.2s',
    },

    '&:hover:after': {
      opacity: 1,
    },
  },

  avatar: {
    width: '100%',
    height: '100%',
    border: `${BORDER_SIZE}px solid ${theme.palette.background.default}`,
  },

  editButton: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 50,
    height: 50,
    margin: 'auto',

    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    opacity: 0,
    transition: 'all 0.2s',

    '&:hover': {
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
    },

    '$root:hover &': {
      opacity: 1,
    },
  },
}));
