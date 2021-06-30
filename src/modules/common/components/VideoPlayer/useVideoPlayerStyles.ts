import { makeStyles, Theme } from '@material-ui/core';

export const useVideoPlayerStyles = makeStyles<Theme>(theme => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& $cover, & $contain, & $fill, & $none, & $scale-down': {
      minWidth: '100%',
      minHeight: '100%',
    },
  },
  rootError: {
    backgroundColor: '#E0E0E0',
  },
  player: {
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
    '$&cover': {},
  },
  cover: { objectFit: 'cover' },
  contain: { objectFit: 'contain' },
  fill: { objectFit: 'fill' },
  none: { objectFit: 'none' },
  'scale-down': {
    objectFit: 'scale-down',
  },

  errorIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: '50px',
    transform: 'translate3d(-50%, -50%, 0px)',
  },
}));
