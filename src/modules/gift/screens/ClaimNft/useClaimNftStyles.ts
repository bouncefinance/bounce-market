import { makeStyles, Theme } from '@material-ui/core';

export const useClaimNftStyles = makeStyles<Theme>(theme => ({
  loadingBox: {
    color: '#fff',
  },

  waitStr: {
    position: 'absolute',
    top: '43%',
    left: 'calc(50% - 33px)',
  },

  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 14,
    marginRight: 16,
    marginBottom: 20,
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

  skeleton: {
    background: 'rgba(255,255,255,0.2)',
  },

  nftImg: {
    marginTop: 40,

    '& img': {
      objectFit: 'contain',
    },
  },

  smallNftImg: {
    width: 230,
    height: 230,
  },

  bigNftImg: {
    width: 420,
    height: 420,
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
