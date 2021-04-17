import { makeStyles, Theme } from '@material-ui/core/styles';

export const useArtistsStyles = makeStyles<Theme>(theme => ({
  root: {
    background: 'linear-gradient(259.57deg, #2663FF 1.58%, #FF3828 92.54%)',
  },

  moreBtn: {
    width: 134,
  },

  slider: {
    margin: theme.spacing(0, -2),
    padding: theme.spacing(0, 2),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, -3),
      padding: theme.spacing(0, 3),
    },
  },

  slide: {
    width: 134,
  },
}));
