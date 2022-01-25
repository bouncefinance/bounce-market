import { makeStyles, Theme } from '@material-ui/core';

export const useDepositStyles = makeStyles<Theme>(theme => ({
  form: {
    minWidth: 300,
    maxWidth: 500,
    // width: '100%',
  },
  tips: {
    color: theme.palette.text.secondary,
  },
  tokenItem: {
    height: 60,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    fontSize: 16,
    boxSizing: 'border-box',
    transition: 'border 0.2s',
    paddingLeft: 18,
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  maxBtn: {
    zoom: 0.65,
    fontSize: 18,
    // width: 62,
    // height: 34,
    // backgroundColor: 'rgba(0,0,0,0.16)',
    // color: '#000',
    // border: 'none',
    // outline: 'none',
    // borderRadius: 6,
    // cursor: 'pointer',
    // fontWeight: 'bold',
  },
  dialogHead: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  viewExplorer: {
    color: theme.palette.text.secondary,
    textDecoration: 'underline',
  },
}));
