import { fade, makeStyles, Theme } from '@material-ui/core';

export const HEADER_HEIGHT_XS = 66;
export const HEADER_HEIGHT_XL = 80;

export const useGiftHeaderStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5, 0),
    background: theme.palette.background.default,
    // color: theme.palette.text.primary,
    color: '#fff',
    height: HEADER_HEIGHT_XS,
  },
}));
