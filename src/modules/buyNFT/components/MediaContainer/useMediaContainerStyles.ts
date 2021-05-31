import { makeStyles, Theme } from '@material-ui/core';
import { featuresConfig } from 'modules/common/conts';

export const useMediaContainerStyles = makeStyles<Theme>(theme => ({
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
    textAlign: 'center',
  },

  img: {
    display: 'block',
    margin: theme.spacing(0, 'auto'),
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
    justifyContent: featuresConfig.nftLikes ? 'space-between' : 'center',
  },

  btn: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },

  btnIcon: {
    fontSize: 18,
    marginRight: theme.spacing(1),
  },
}));
