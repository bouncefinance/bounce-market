import { makeStyles, Theme } from '@material-ui/core';

export const useEnterPwdStyles = makeStyles<Theme>(theme => ({
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

  description: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: '20px',
    textAlign: 'center',
    color: '#fff',

    marginTop: 20,
  },

  mobileMailImg: {
    width: 175,
    height: 175,

    marginTop: 40,
    marginBottom: 40,
  },

  desktopMailImg: {
    width: 200,
    height: 200,

    marginTop: 40,
    marginBottom: 60,
  },

  inputField: {
    height: 76,

    marginTop: 40,
  },

  pwdInput: {
    width: 358,
    height: 50,

    border: '1px solid rgba(0, 0, 0, 0.4)',
    boxSizing: 'border-box',
    borderRadius: 8,

    background: '#fff',

    '& .MuiOutlinedInput-input': {
      minHeight: 50,
    },
  },

  errorPwdInput: {
    borderColor: 'rgba(255, 0, 0, 0.4)',

    '&.MuiInputBase-root:hover, &.MuiInputBase-root.Mui-focused': {
      borderColor: 'rgba(255, 0, 0, 0.4)',
    },
  },

  helperText: {
    fontSize: 10,
    lineHeight: '16px',
    textAlign: 'center',
    color: '#FF7373',

    marginTop: 10,
  },

  enterBtn: {
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

  mobileEnterBtn: {
    marginTop: 26,
    marginBottom: 40,
  },

  desktopEnterBtn: {
    marginTop: 14,
  },
}));
