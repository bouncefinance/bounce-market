import { makeStyles, Theme } from '@material-ui/core/styles';

export const usePromoThumbStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '64px auto',
    gap: theme.spacing(0, 2.5),
    alignItems: 'center',
  },

  imgWrap: {
    borderRadius: 8,
  },

  title: {
    fontSize: 15,
    fontWeight: 500,
  },

  videoWrapper: {
    display: 'block',
    position: 'relative',
    backgroundPosition: 'center',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      paddingTop: '100%',
      display: 'block',
    },
    '&:after': {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      content: '""',
      position: 'absolute',
      transition: '0.2s',
    },
  },

  video: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
}));
