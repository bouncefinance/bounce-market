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

  mailImg: {
    width: 175,
    height: 175,

    marginTop: 40,
  },

  pwdInput: {
    // width: 358,
    height: 50,
    border: '1px solid rgba(0, 0, 0, 0.4)',
    boxSizing: 'border-box',
    borderRadius: 8,

    marginTop: 40,

    background: '#fff',

    '&.MuiOutlinedInput-input': {
      minHeight: 50,
    },
  },

  enterBtn: {
    background: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    borderRadius: 39,

    marginTop: 52,

    '&.MuiButton-contained': {
      color: '#000',
    },
  },
}));
