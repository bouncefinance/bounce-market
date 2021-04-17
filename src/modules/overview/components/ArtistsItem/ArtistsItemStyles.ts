import { makeStyles, Theme } from '@material-ui/core/styles';

export const useArtistsItemStyles = makeStyles<Theme>(theme => ({
  root: {
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

    '$imgLink:hover &': {
      '& img': {
        transform: 'scale(1.05)',
      },
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
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  subs: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    fontWeight: 700,
  },

  subsIcon: {
    fontSize: 'inherit',
    color: theme.palette.text.primary,
    marginRight: theme.spacing(0.5),
  },
}));
