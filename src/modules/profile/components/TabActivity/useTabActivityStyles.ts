import { makeStyles, Theme } from '@material-ui/core';

export const useTabActivityStyles = makeStyles<Theme>(theme => ({
  itemPreview: {
    width: 52,
    height: 52,
    marginRight: theme.spacing(2),
    borderRadius: 4,
    overflow: 'hidden',
  },

  tabs: {
    marginBottom: 25,
    position: 'relative',
    zIndex: 1,
  },

  tabsIndicator: {
    backgroundColor: '#000',
    borderRadius: 36,
    height: 36,
    bottom: 4,
    zIndex: -1,
  },

  tabRoot: {
    color: '#000',
    height: 36,
    minHeight: 'auto',
    padding: '0 30px',
    backgroundColor: '#F3F3F3',
    borderRadius: 36,
  },

  tabSelected: {
    background: 'none',
    '& span': {
      color: '#fff',
    },
  },

  tableItemIcon: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 240,
    '& .icon': {
      width: 52,
      height: 52,
      marginRight: 16,
      borderRadius: 4,
    },
    '& span': {
      flex: 1,
    },
  },

  tableItemVideo: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 240,
    '& span': {
      flex: 1,
    },
  },

  tableUserIcon: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 240,
    '& .avator': {
      width: 24,
      height: 24,
      marginRight: 8,
    },
    '& span': {
      flex: 1,
    },
  },

  emptyTitle: {
    marginBottom: theme.spacing(1.5),
  },

  emptyDescription: {
    margin: theme.spacing(0, 'auto', 3.5),
    maxWidth: 480,
  },

  eventIcon: {
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      height: 24,
      width: 24,
      marginRight: theme.spacing(1),
    },
  },

  eventIconPlus: {
    fontSize: '1rem',
    marginLeft: '4px',
    marginRight: '12px',
  },
}));
