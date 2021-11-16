import { makeStyles, Theme } from '@material-ui/core';

export const useLandingPageStyles = makeStyles<Theme>(theme => ({
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

    marginTop: 20,
  },

  description1: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: '20px',
    textAlign: 'center',
    color: '#fff',

    width: 358,

    marginTop: 20,
  },

  mobileDescription1: {
    marginTop: 20,
  },

  desktopDescription1: {
    marginTop: 40,
  },

  avatar: {
    width: 170,
    height: 170,

    '& img': {
      minWidth: 60,
    },
  },

  desktopAvatar: {
    marginTop: 120,
    marginBottom: 60,
  },

  mobileAvatar: {
    marginTop: 40,
    marginBottom: 20,
  },

  continueBtn: {
    width: 170,
    height: 50,

    background: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    borderRadius: 39,

    '&.MuiButton-contained': {
      color: '#000',
    },
  },

  desktopContinueBtn: {
    marginTop: 60,
  },

  mobileContinueBtn: {
    marginTop: 40,
  },

  description2: {
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: '16px',
    textAlign: 'center',
    color: '#eee',

    width: 358,

    marginTop: 20,
  },
}));
