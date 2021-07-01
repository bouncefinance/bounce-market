import { fade, makeStyles, Theme } from '@material-ui/core';

export const useTransferTokenDialogStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),

    [theme.breakpoints.up('md')]: {
      fontSize: 40,
    },
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 40,
    height: 40,
    padding: 0,
    color: theme.palette.text.primary,
    border: 'none',

    [theme.breakpoints.up('md')]: {
      top: 20,
      right: 20,
    },

    '&:hover': {
      border: 'none',
    },
  },

  adornedEnd: {
    paddingRight: 0,
  },

  inputNumber: {
    '& input': {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        textAlign: 'center',
      },
    },
  },

  spinBtns: {
    alignSelf: 'stretch',
    flexShrink: 0,
    width: 30,
    borderLeft: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
  },

  spinBtn: {
    width: '100%',
    height: '50%',
    padding: 0,
    border: 'none',

    '&:hover': {
      border: 'none',
      background: fade(theme.palette.text.primary, 0.04),
    },

    '& + &': {
      borderTop: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    },
  },

  spinBtnUp: {
    borderRadius: '0 8px 0 0',
  },

  spinBtnDown: {
    borderRadius: '0 0 8px 0',
  },

  spinBtnIcon: {
    fontSize: 12,
  },
}));
