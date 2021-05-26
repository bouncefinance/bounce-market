import { makeStyles, Theme } from '@material-ui/core';

export const useActivityTableStyles = makeStyles<Theme>(theme => ({
  table: {
    minWidth: 1240,
  },

  eventIcon: {
    marginRight: theme.spacing(1),
  },

  itemImg: {
    width: 52,
    marginRight: theme.spacing(2),
    borderRadius: 4,
  },

  itemTitle: {
    maxWidth: 190,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  avatar: {
    width: 24,
    height: 24,
    marginRight: theme.spacing(1),
  },

  name: {
    maxWidth: 135,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));
