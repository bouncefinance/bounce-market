import { makeStyles, Theme } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

export const useGoBackStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  icon: {
    padding: 0,
    width: 36,
    height: 36,
    border: `1px solid ${fade(theme.palette.common.black, 0.1)}`,
    marginRight: theme.spacing(1.5),
  },
}));
