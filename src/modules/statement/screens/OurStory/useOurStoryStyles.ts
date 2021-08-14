import { makeStyles, Theme } from '@material-ui/core';

export const useOurStoryStyles = makeStyles((theme: Theme) => ({
  iframeWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  iframe: {
    border: '0 none',
    height: 800,
    width: 870,
  },

  headerImgWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    '& img': {
      objectFit: 'contain',
      width: '100%',
      height: 'auto',
    },
  },
}));
