import { makeStyles, Theme } from '@material-ui/core/styles';
import { darkTheme } from 'modules/themes/darkTheme';

export const useDefaultLayoutStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    minWidth: 375,

    background: theme.palette.background.default,
  },

  darkBg: {
    background: darkTheme.palette.background.default,
  },

  main: {
    flexGrow: 1,
  },
}));
