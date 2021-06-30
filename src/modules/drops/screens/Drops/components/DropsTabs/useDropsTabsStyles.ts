import { makeStyles, Theme } from '@material-ui/core';

export const useDropsTabsStyles = makeStyles<Theme>(theme => ({
  root: {},

  indicator: {
    display: 'none',
  },

  tab: {
    maxWidth: 'none',
    color: theme.palette.text.primary,
    opacity: 0.5,
    fontSize: 20,
    transition: 'opacity 0.2s',
    lineHeight: 1,
    padding: 0,

    [theme.breakpoints.up('md')]: {
      fontSize: 32,
    },

    '&:active': {
      transform: 'none',
    },

    '& + &': {
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(5),
      },
    },

    '&$tabSelected': {
      color: theme.palette.text.primary,
      opacity: 1,
      cursor: 'default',
    },
  },

  tabSelected: {},
}));
