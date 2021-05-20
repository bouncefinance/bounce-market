import { makeStyles, Theme } from '@material-ui/core';

const IMG_SIDE = 380;

export const useCreateNFTStyles = makeStyles<Theme>(theme => ({
  form: {
    display: 'grid',
    gap: theme.spacing(4, 9),

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: `1fr minmax(${IMG_SIDE}px, 50%)`,
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
