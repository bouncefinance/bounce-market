import { fade, makeStyles, Theme } from '@material-ui/core';

export const useTabsStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',

    '&:after': {
      content: `''`,
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      borderBottom: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    },
  },

  tab: {
    fontSize: 18,
  },

  tabWrapper: {
    flexDirection: 'row',
  },

  tabCount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 23,
    minWidth: 23,
    padding: theme.spacing(0, 0.75),
    marginLeft: theme.spacing(0.75),
    border: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    borderRadius: 23,
    fontSize: 12,
    fontWeight: 700,
  },
}));
