import { makeStyles, Theme } from '@material-ui/core';

export const useTermsOfServiceStyles = makeStyles((theme: Theme) => ({
  iframeWrapper: {
    width: 870,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  iframe: {
    border: '0 none',
    height: 5320,
    width: 870,
  },
}));
