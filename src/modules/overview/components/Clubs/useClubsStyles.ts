import { makeStyles, Theme } from '@material-ui/core/styles';

export const useClubsStyles = makeStyles<Theme>(theme => ({
  root: {
    background: 'linear-gradient(233.26deg, #407C1F 28.63%, #96C53E 71.79%)',
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

  clubsItem: {
    textAlign: 'center',
  },

  imgLink: {
    position: 'relative',
    display: 'block',
    marginBottom: theme.spacing(2.5),
  },

  imgWrap: {
    borderRadius: 22,
    overflow: 'hidden',

    '& img': {
      transition: 'all 0.3s ease',
    },

    '& .swiper-lazy': {
      opacity: 0,
      transition: 'all 0.2s',
    },

    '& .swiper-lazy-loaded': {
      opacity: 1,
    },
  },

  name: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: theme.spacing(1.5),
  },
}));
