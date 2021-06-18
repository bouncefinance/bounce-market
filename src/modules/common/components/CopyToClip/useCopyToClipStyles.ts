import { makeStyles, Theme } from '@material-ui/core';

export const useCopyToClipStyles = makeStyles<Theme>(theme => ({
  addressText: {
    color: theme.palette.text.secondary,
    fontSize: 14,
  },

  clipboardBtn: {
    fontSize: 20,
    border: 'none !important',
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
  },

  clipboardBtnIcon: {
    fontSize: 'inherit',
  },

  clipboardBtnIconDone: {
    color: theme.palette.success.light,
  },
}));
