import { makeStyles, Theme } from '@material-ui/core';

export const useConnectWalletStyles = makeStyles<Theme>(theme => ({
  root: {
    textAlign: 'center',
  },

  descr: {
    marginBottom: theme.spacing(3),
  },
}));
