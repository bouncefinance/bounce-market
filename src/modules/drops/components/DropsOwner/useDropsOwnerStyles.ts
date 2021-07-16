import { makeStyles, Theme } from '@material-ui/core';
import { getEm } from 'modules/common/utils/styleUtils';

export const useDropsOwnerStyles = makeStyles<Theme>(theme => ({
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
    bottom: -7,
    right: -7,
    fontSize: getEm(30, 48),
  },

  title: {
    textAlign: 'left',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [theme.breakpoints.up('md')]: {
      fontSize: 18,
    },
  },
}));
