import { fade, makeStyles, Theme } from '@material-ui/core';

export const useInfoTabsListStyles = makeStyles<Theme>(theme => ({
  root: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },

  item: {
    borderBottom: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    padding: theme.spacing(2.5, 0),

    '&:last-of-type': {
      borderBottom: 'none',
    },
  },
}));
