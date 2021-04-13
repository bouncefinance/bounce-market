import { makeStyles, Theme } from '@material-ui/core';

export const useSearchTriggerStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(1),
    minWidth: 0,
  },

  icon: {
    fill: 'none',
  },
}));
