import { makeStyles, Theme } from '@material-ui/core';

export const useClaimNftStyles = makeStyles<Theme>(theme => ({
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

  nftImg: {
    width: 230,
    height: 230,

    marginTop: 40,
  },

  nftDescription: {
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '16px',
    textAlign: 'center',
    color: '#fff',

    marginTop: 20,
  },

  continueBtn: {
    width: 170,
    height: 50,

    background: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    borderRadius: 39,

    marginTop: 80,

    '&.MuiButton-contained': {
      color: '#000',
    },
  },
}));
