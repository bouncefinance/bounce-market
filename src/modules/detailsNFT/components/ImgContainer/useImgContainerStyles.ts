import { fade, makeStyles, Theme } from '@material-ui/core';

export const useImgContainerStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.up('md')]: {
      paddingTop: '8vh',
      paddingBottom: '8vh',
    },

    [theme.breakpoints.up('xl')]: {
      padding: '8vh 8vw',
    },
  },

  content: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: 240,
  },

  img: {
    display: 'block',
    maxWidth: '100%',
    objectFit: 'scale-down',
    borderRadius: 12,

    [theme.breakpoints.up('xl')]: {
      maxHeight: '48vh',
    },
  },

  actions: {
    marginTop: theme.spacing(2.5),
    display: 'grid',
    gridTemplateColumns: 'repeat(2, auto)',
    justifyContent: 'space-between',
  },

  btn: {
    color: theme.palette.text.secondary,
    borderColor: 'inherit',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),

    '&:hover': {
      color: theme.palette.text.primary,
      borderColor: 'inherit',

      '&:before': {
        display: 'none',
      },
    },
  },

  btnIcon: {
    fontSize: 18,
    marginRight: theme.spacing(1),
  },

  tooltip: {
    minWidth: 140,
    padding: 0,
    background: theme.palette.background.default,
    border: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
    borderRadius: 12,
    color: theme.palette.text.primary,
  },

  tooltipItem: {
    fontSize: 13,
    display: 'block',
    width: '100%',
    padding: 0,
  },

  tooltipButton: {
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

  tooltipIcon: {
    marginRight: theme.spacing(1.5),
    verticalAlign: 'middle',
  },
}));
