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

  nftImg: {
    width: 175,
    height: 175,

    marginTop: 40,
  },

  continueBtn: {
    width: 170,
    height: 50,

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
