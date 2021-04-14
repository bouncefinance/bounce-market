import { makeStyles, Theme } from '@material-ui/core/styles';

export const useDefaultLayoutStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    minWidth: 375,

    background: theme.palette.background.default,
  },

  main: {
    flexGrow: 1,
  },
}));
