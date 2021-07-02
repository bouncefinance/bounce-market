import { fade, makeStyles, Theme } from '@material-ui/core';

export const useStoriesChipStyles = makeStyles<Theme>(theme => ({
  root: {
    minWidth: 70,
    height: 28,
    background: fade(theme.palette.common.black, 0.35),
    color: theme.palette.common.white,
    fontSize: 14,
    borderRadius: 21,

    [theme.breakpoints.up('md')]: {
      height: 42,
      minWidth: 90,
      fontSize: 18,
    },
  },

  icon: {
    fontSize: 'inherit',
    marginRight: theme.spacing(-0.75),
    marginLeft: theme.spacing(1.5),

    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(-1.5),
      marginLeft: theme.spacing(2.5),
    },
  },

  label: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),

    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
    },
  },
}));
