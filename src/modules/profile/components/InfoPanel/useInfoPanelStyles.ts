import { makeStyles, Theme } from '@material-ui/core';

export const useInfoPanelStyles = makeStyles<Theme>(theme => ({
  email: {
    fontWeight: 500,
    marginTop: theme.spacing(1),
  },

  address: {
    display: 'flex',
    alignItems: 'center',

    height: 50,
    padding: theme.spacing(0, 2.5),

    borderRadius: 50,
    background: '#F3F3F3',

    fontSize: 16,
    fontWeight: 500,
  },

  linksCol: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: 'auto',
    },
  },

  socialContainer: {
    marginTop: -86,
  },
  socialBox: {
    marginLeft: 'auto',
  },
}));
