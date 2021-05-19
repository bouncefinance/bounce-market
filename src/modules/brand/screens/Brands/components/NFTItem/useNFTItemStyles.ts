import { makeStyles, Theme } from '@material-ui/core';

export const useNFTItemStyles = makeStyles<Theme>(theme => ({
  root: {},
  holder: {
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
  },
  img: {
    width: 120,
    height: 120,
  },
  info: {
    fontSize: 20,
    wordBreak: 'break-all',
  },
}));
