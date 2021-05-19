import { makeStyles, Theme } from '@material-ui/core';

export const useProductsPanelStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: '0.1px 0',
  },

  select: {
    fontSize: 14,
    fontWeight: 700,
    color: theme.palette.text.secondary,
    borderRadius: 60,

    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: 'auto',
      fontSize: 16,
    },
  },

  tab: {
    fontSize: 18,
  },
}));
