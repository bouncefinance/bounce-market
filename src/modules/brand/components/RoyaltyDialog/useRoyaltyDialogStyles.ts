import { makeStyles, Theme } from '@material-ui/core';

export const useRoyaltyDialogStyles = makeStyles((theme: Theme) => ({
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
    paddingRight: 23,
    fontSize: 18,
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

  royaltyRate: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  input: {
    width: 131,
    marginRight: 8,
  },
}));
