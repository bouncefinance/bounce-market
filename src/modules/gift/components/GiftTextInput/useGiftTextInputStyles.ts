import { makeStyles, Theme } from '@material-ui/core';

export const useGiftTextInputStyles = makeStyles<Theme>(theme => ({
  root: {
    // width: 315,
    // height: 50,
  },

  pwdInput: {
    height: '100%',
    width: '100%',
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
}));
