import { makeStyles, Theme } from '@material-ui/core';

export const useTokenInfoStyles = makeStyles<Theme>(theme => ({
  paragraph: {
    marginBottom: '1em',
    fontSize: 14,
  },

  addr: {
    maxWidth: '100%',
    wordWrap: 'break-word',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));
