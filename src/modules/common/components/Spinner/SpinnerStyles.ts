import { makeStyles, Theme } from '@material-ui/core/styles';

const DEFAULT_SIZE = 40;

export const useSpinnerStyles = makeStyles<Theme, { size?: number }>(() => ({
  component: {
    animationName: '$spin',
    animationDuration: '1s',
    animationDelay: '0s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    willChange: 'transform',
    margin: 'auto',
    width: ({ size }) => size ?? DEFAULT_SIZE,
    height: ({ size }) => size ?? DEFAULT_SIZE,
  },
  '@keyframes spin': {
    '100%': { transform: 'rotate(360deg)' },
  },
  centered: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
}));
