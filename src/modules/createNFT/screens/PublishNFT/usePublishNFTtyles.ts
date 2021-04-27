import { makeStyles, Theme } from '@material-ui/core';

export const usePublishNFTtyles = makeStyles<Theme>(theme => ({
  form: {
    display: 'grid',
    gap: theme.spacing(4, 9),

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr minmax(380px, auto)',
    },
  },

  formImgCol: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
      marginTop: 38,
    },
  },

  formImgBox: {
    [theme.breakpoints.up('lg')]: {
      position: 'sticky',
      top: theme.spacing(2),
    },
  },
}));
