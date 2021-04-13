import { fade, lighten, makeStyles, Theme } from '@material-ui/core';

const HEADER_MIN_HEIGHT = 66;

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.25, 0),
    borderBottom: `1px solid ${fade(theme.palette.text.primary, 0.15)}`,
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: HEADER_MIN_HEIGHT,

    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(2, 0),
    },
  },

  container: {
    display: 'grid',
    alignItems: 'center',
    gap: theme.spacing(0, 2),
    gridTemplateColumns: 'auto auto',
    justifyContent: 'space-between',

    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: 'auto auto 1fr repeat(3, auto)',
      justifyContent: 'initial',
    },
  },

  search: {
    [theme.breakpoints.up('xl')]: {
      width: 410,
    },
  },

  btnCreate: {
    [theme.breakpoints.up('xl')]: {
      marginLeft: theme.spacing(1),
    },
  },

  wallet: {
    background: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    padding: theme.spacing(0, 0, 0, 2.5),

    '&:hover': {
      background: lighten(theme.palette.background.paper, 0.05),
    },
  },

  walletLogo: {
    width: 44,
    height: 44,
    marginLeft: theme.spacing(1.5),
    borderRadius: '50%',

    background: `
      linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 50%),
      linear-gradient(259.57deg, #2663FF 1.58%, #FF3828 92.54%)
    `,
  },

  buttons: {
    display: 'grid',
    alignItems: 'center',
    gap: theme.spacing(0, 2),
    gridTemplateColumns: 'auto auto',
  },

  drawer: {
    top: `${HEADER_MIN_HEIGHT}px !important`,
  },

  drawerPaper: {
    position: 'absolute',
    width: '100%',
    background: theme.palette.common.white,
    color: theme.palette.common.black,

    [theme.breakpoints.up('sm')]: {
      width: 410,
    },
  },

  drawerBackdrop: {
    position: 'absolute',
  },

  navInner: {
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
}));
