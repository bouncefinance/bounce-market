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

  brandInfo: {
    display: 'flex',
    alignItems: 'center',

    marginBottom: 60,
  },

  brandAvatar: {
    width: 40,
    height: 40,
  },

  brandName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',

    marginLeft: 15,
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
    marginTop: 40,
  },

  inputLabel: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#eee',

    marginBottom: 10,
  },

  mobileInput: {
    width: 345,
    height: 60,
  },

  desktopInput: {
    width: 416,
    height: 60,
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
