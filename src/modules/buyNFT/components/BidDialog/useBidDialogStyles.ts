import { fade, makeStyles, Theme } from '@material-ui/core';

export const useBidDialogStyles = makeStyles<Theme>(theme => ({
  root: {
    maxWidth: 700,
    padding: theme.spacing(4, 2.5),
    borderRadius: 22,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 5),
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

  closeIcon: {
    fontSize: 25,
  },

  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),

    [theme.breakpoints.up('md')]: {
      fontSize: 40,
    },
  },

  imgWrap: {
    width: 60,

    [theme.breakpoints.up('md')]: {
      width: 100,
    },
  },

  currency: {
    fontSize: 24,
    fontWeight: 500,
    textTransform: 'uppercase',
  },

  inputWithoutSpin: {
    '& input': {
      '&[type=number]': {
        '-moz-appearance': 'textfield',
      },

      '&::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
      },

      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
      },
    },
  },

  inputNumber: {
    padding: 0,
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0,
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

  highlyBraced: {
    lineHeight: '20px',
  },

  inputWrapper: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    gridColumnGap: 23,

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '2fr 1fr',
    },
  },
}));
