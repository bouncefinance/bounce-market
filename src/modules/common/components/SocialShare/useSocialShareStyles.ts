import { fade, makeStyles, Theme } from '@material-ui/core';

export const useSocialShareStyles = makeStyles<Theme>(theme => ({
  root: {
    minWidth: 140,
    padding: 0,
    background: theme.palette.background.default,
    border: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
    borderRadius: 12,
    color: theme.palette.text.primary,
  },

  menuItem: {
    fontSize: 13,
    display: 'block',
    width: '100%',
    padding: 0,
  },

  menuButton: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    background: 'transparent',
    color: 'inherit',
    border: 0,
    font: 'inherit',
    fontWeight: 500,
    cursor: 'pointer',
    padding: theme.spacing(1, 2.5),
  },

  menuIcon: {
    '--fb-inner-color': theme.palette.background.paper,
    marginRight: theme.spacing(1.5),
    verticalAlign: 'middle',
  },
}));
