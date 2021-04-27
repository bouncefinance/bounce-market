import { fade, makeStyles, Theme } from '@material-ui/core';

export const useWalletStyles = makeStyles<Theme>(theme => ({
  root: {
    background: fade('#C4C4C4', 0.2),
    color: theme.palette.text.secondary,
    padding: theme.spacing(0, 0, 0, 2.5),
    border: 'none',
    transition: 'background 0.2s',

    '&:hover': {
      background: fade('#C4C4C4', 0.3),
      color: theme.palette.text.secondary,
    },

    '&:before': {
      display: 'none',
    },
  },

  walletLogo: {
    width: 44,
    height: 44,
    marginLeft: theme.spacing(1.5),
    borderRadius: '50%',

    background: `
      linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 50%),
      linear-gradient(259.57deg, #2663FF 1.58%, #FF3828 92.54%)
    `,
  },
}));
