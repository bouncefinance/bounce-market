import { makeStyles, Theme } from '@material-ui/core';

const IMG_SIDE = 350;

export const usePublishNFTtyles = makeStyles<Theme>(theme => ({
  form: {
    display: 'grid',
    gap: theme.spacing(5, 9),

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: `1fr minmax(${IMG_SIDE}px, 40%)`,
    },
  },

  formImgCol: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
      marginTop: 38,
      width: IMG_SIDE,
    },
  },

  formImgBox: {
    maxWidth: 500,
    height: IMG_SIDE,
    overflow: 'hidden',

    [theme.breakpoints.up('lg')]: {
      maxWidth: 'none',
      // position: 'sticky',
      top: theme.spacing(2),
    },

    '& video': {
      display: 'block',
      maxWidth: '100%',
      borderRadius: 'inherit',
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
  textCenter: {
    textAlign: 'center',
  },
  royaltyWrapper: {
    marginTop: -20,
    marginBottom: 40,
  },
  royaltyItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  divLine: {
    padding: '0 12px',
    width: '100%',
    height: 1,
    '&>i': {
      display: 'block',
      width: '100%',
      height: 1,
      backgroundColor: 'rgba(0,0,0,.1)',
    },
  },
}));
