import { makeStyles, Theme } from '@material-ui/core';

export const useTabActivityStyles = makeStyles<Theme>(theme => ({
  table: {},

  empty: {
    textAlign: 'center',
    margin: theme.spacing(2),
  },

  eventIcon: {
    marginRight: theme.spacing(1),
  },
  eventIconPlus: {
    fontSize: '1rem',
    marginLeft: '4px',
    marginRight: '12px',
  },

  itemPreview: {
    width: 52,
    height: 52,
    marginRight: theme.spacing(2),
    borderRadius: 4,
    overflow: 'hidden',
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
