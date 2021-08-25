import { makeStyles, Theme } from '@material-ui/core';
import { PROFILE_AVATAR_SIZE } from '../../components/Avatar/useAvatarStyles';

export const useCollectionStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: 0,
  },

  avatar: {
    marginTop: -PROFILE_AVATAR_SIZE / 2,
    marginBottom: theme.spacing(5),
    zIndex: 2,
    width: 125,
    height: 125,
  },

  tabs: {
    marginBottom: theme.spacing(3),
  },

  // CollectionDescDialog
  close: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 40,
    height: 40,
    padding: 0,
    color: theme.palette.text.primary,
    border: 'none',

    [theme.breakpoints.up('md')]: {
      top: 20,
      right: 20,
    },

    '&:hover': {
      border: 'none',
    },
  },
  descBox: {
    marginTop: 55,
  },

  optionHeaderBtnWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
