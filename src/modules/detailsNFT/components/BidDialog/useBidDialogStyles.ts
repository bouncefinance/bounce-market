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

    [theme.breakpoints.up('md')]: {
      top: 20,
      right: 20,
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
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      width: 88,
    },

    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0,
    },

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
    borderRadius: 'inherit',

    '& + &': {
      borderTop: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    },
  },

  spinBtnIcon: {
    fontSize: 12,
  },
}));
