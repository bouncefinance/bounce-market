import { makeStyles, Theme } from '@material-ui/core';

export const useChangeWalletStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    minHeight: 300,
    height: '70vh',
    maxHeight: 600,
    padding: theme.spacing(5, 0),
    textAlign: 'center',
  },
}));
