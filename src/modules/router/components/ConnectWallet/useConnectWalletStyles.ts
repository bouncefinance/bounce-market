import { makeStyles, Theme } from '@material-ui/core';

export const useConnectWalletStyles = makeStyles<Theme>(theme => ({
  root: {
    minHeight: 300,
    height: '70vh',
    maxHeight: 600,
    padding: theme.spacing(5, 0),
    textAlign: 'center',
  },
  caption: {
    fontSize: 40,
    marginBottom: theme.spacing(2),
  },
  text: {
    fontSize: 16,
    margin: theme.spacing(2, 'auto', 3),
    maxWidth: 320
  },
  connectBtn: {
    fontSize: 16,
    minHeight: 60
  }
}));
