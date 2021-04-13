import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useToggleStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 32,
    height: 32,
    minWidth: 0,
    padding: 0,

    '& span': {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  active: {
    '& $lineTop': {
      transform: 'translateY(4px) rotate(45deg)',
    },
    '& $lineBottom': {
      transform: 'translateY(-4px) rotate(-45deg)',
    },
  },

  line: {
    width: 22,
    height: 2,
    transition: 'transform 0.2s',
    transformOrigin: 'center',
    background: 'currentColor',
  },

  lineTop: {
    marginBottom: 6,
  },

  lineBottom: {},
}));
