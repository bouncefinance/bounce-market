import { makeStyles, Theme } from '@material-ui/core';
import { getEm } from 'modules/common/utils/styleUtils';

export const useStoriesOwnerStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gap: theme.spacing(0, 1.5),
  },

  avatarBox: {
    position: 'relative',
    fontSize: 32,

    [theme.breakpoints.up('md')]: {
      fontSize: 48,
    },
  },

  avatar: {
    width: '1em',
    height: '1em',
    fontSize: 'inherit',
  },

  verifiedIcon: {
    position: 'absolute',
    bottom: 0,
    right: -2,
    fontSize: getEm(20, 48),
  },

  title: {
    textAlign: 'left',
    fontWeight: 500,

    [theme.breakpoints.up('md')]: {
      fontSize: 18,
    },
  },
}));
