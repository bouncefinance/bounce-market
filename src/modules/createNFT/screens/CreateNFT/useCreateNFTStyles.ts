import { makeStyles, Theme } from '@material-ui/core';

const IMG_SIDE = 360;

export const useCreateNFTStyles = makeStyles<Theme>(theme => ({
  form: {
    display: 'grid',
    gap: theme.spacing(4, 9),
    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: `1fr minmax(${IMG_SIDE}px, 40%)`,
    },

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: `1fr minmax(${IMG_SIDE}px, 40%)`,
    },
  },

  formImgCol: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
      marginTop: 38,
    },
  },

  formImgBox: {
    height: IMG_SIDE,
    [theme.breakpoints.up('lg')]: {
      position: 'sticky',
      top: theme.spacing(2),
    },
  },
}));
