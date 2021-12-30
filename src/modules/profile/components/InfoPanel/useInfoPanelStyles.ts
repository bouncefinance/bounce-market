import { makeStyles, Theme } from '@material-ui/core';

export const useInfoPanelStyles = makeStyles<Theme>(theme => ({
  root: {
    marginBottom: 32,
  },
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
  menuIcon: {
    width: 50,
    height: 50,
    marginLeft: 4,
  },
  desc: {
    width: '100%',
    marginTop: 20,
    [theme.breakpoints.up('md')]: {
      width: 720,
    },
  },
}));
