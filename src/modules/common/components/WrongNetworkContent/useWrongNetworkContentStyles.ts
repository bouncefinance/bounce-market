import { makeStyles, Theme } from '@material-ui/core';

export const useWrongNetworkContentStyles = makeStyles<Theme>(theme => ({
  root: {},
  caption: {
    fontSize: 40,
    marginBottom: theme.spacing(2),
  },
  text: {
    fontSize: 16,
    margin: theme.spacing(2, 'auto', 3),
    maxWidth: 320,
    color: theme.palette.text.secondary,
  },
  connectBtn: {
    fontSize: 16,
    minHeight: 60,
  },
}));
