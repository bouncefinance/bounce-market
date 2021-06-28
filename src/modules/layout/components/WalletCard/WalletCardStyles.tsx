import { fade, makeStyles, Theme } from '@material-ui/core';

export const useWalletCardStyles = makeStyles<Theme>(theme => ({
  root: {
    minWidth: 235,
    maxWidth: 400,
    borderRadius: 12,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2, 3, 1),
    border: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
  },
  row: {
    padding: theme.spacing(0.5, 0),
  },
  name: {
    fontSize: 22,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
  },
  walletBalance: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    fontSize: 14,
    fontWeight: 500,
  },
  walletLogo: {
    marginRight: theme.spacing(1),
    width: 24,
    height: 24,
    verticalAlign: 'middle',
  },
  menuList: {
    borderTop: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    margin: theme.spacing(2, -3, 0),
  },
  menuItem: {
    fontSize: 14,
    padding: theme.spacing(1.5, 2, 1.5, 3),
  },
}));
