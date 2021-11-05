import { makeStyles, Theme } from '@material-ui/core';

export const useConfirmProfileStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 14,
    marginRight: 16,
  },

  title: {
    fontSize: 25,
    lineHeight: '27px',
    color: '#fff',
    textAlign: 'center',
  },

  addPhotoField: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    marginTop: 40,
  },

  avatar: {
    width: 82,
    height: 82,

    '& img': {
      width: 32,
    },
  },

  verifiedIcon: {
    width: 30,
    height: 30,
    right: 0,
  },

  addPhotoBtn: {
    color: 'white',
    textDecoration: 'underline',
    height: 16,
    fontWeight: 'normal',
    fontSize: 10,

    marginTop: 8,
  },

  textField: {
    width: '100%',
    marginTop: 40,
  },

  inputLabel: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#eee',
  },

  Input: {
    height: 50,
    border: '1px solid rgba(0, 0, 0, 0.4)',
    boxSizing: 'border-box',
    borderRadius: 8,
    background: '#fff',

    marginTop: 10,

    '&.MuiOutlinedInput-input': {
      minHeight: 50,
    },
  },

  continueBtn: {
    background: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    borderRadius: 39,

    marginTop: 192,

    '&.MuiButton-contained': {
      color: '#000',
    },
  },
}));
