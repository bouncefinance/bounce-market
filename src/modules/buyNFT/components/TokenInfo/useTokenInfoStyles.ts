import { makeStyles, Theme } from '@material-ui/core';

export const useTokenInfoStyles = makeStyles<Theme>(theme => ({
  paragraph: {
    marginBottom: '1em',
    fontSize: 14,
    wordBreak: 'break-all',
    overflow: 'hidden',
  },
}));
