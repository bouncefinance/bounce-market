import { fade, makeStyles, Theme } from '@material-ui/core';

export const useWalletStyles = makeStyles<Theme>(theme => ({
  accountBtn: {
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

  accountBtnMd: {
    marginBottom: theme.spacing(2.5),
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

  dropdown: {
    position: 'absolute',
    zIndex: theme.zIndex.tooltip,
    top: `calc(100% - ${theme.spacing(1)}px)`,
    right: theme.spacing(3),

    pointerEvents: 'none',
    opacity: 0,
    transform: `translateY(${theme.spacing(-1)}px)`,
    transition: 'opacity 0.2s, transform 0.2s',
  },

  dropdownActive: {
    opacity: 1,
    transform: 'translateY(0)',
    pointerEvents: 'auto',
  },
}));
