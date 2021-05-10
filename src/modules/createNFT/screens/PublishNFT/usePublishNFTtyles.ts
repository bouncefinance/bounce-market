import { makeStyles, Theme } from '@material-ui/core';

export const usePublishNFTtyles = makeStyles<Theme>(theme => ({
  form: {
    display: 'grid',
    gap: theme.spacing(5, 9),

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

  currencySelect: {
    border: 'none',
    marginRight: -14,

    '&.Mui-focused': {
      border: 'none',
    },
  },

  formControl: {
    marginBottom: theme.spacing(5),
  },

  fieldText: {
    marginTop: theme.spacing(1.5),
  },

  labelNoMargin: {
    margin: 0,
  },
}));
