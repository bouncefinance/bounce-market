import { makeStyles, Theme } from '@material-ui/core';

export const useInfoTabsItemStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gap: theme.spacing(0.5, 2),
    gridTemplateAreas: `
      'title'
      'date'
    `,
  },

  withPrice: {
    gridTemplateColumns: '1fr auto',
    gridTemplateAreas: `
      'title cryptoPrice'
      'date price'
    `,
  },

  title: {
    gridArea: 'title',
    fontSize: 15,
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },

  author: {
    color: theme.palette.text.primary,
  },

  date: {
    gridArea: 'date',
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },

  cryptoPrice: {
    gridArea: 'cryptoPrice',

    display: 'flex',
    alignItems: 'center',

    textAlign: 'right',
    fontSize: 15,
    fontWeight: 700,
  },

  price: {
    gridArea: 'price',
    textAlign: 'right',
  },

  link: {
    color: theme.palette.text.secondary,
    padding: 10,
    margin: '-10px -10px -10px 0',

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },

  linkIcon: {
    display: 'block',
    fontSize: 14,
  },
}));

export const useInfoTabsIsTokenInfoStyled = makeStyles<Theme>(theme => ({
  title: {
    fontSize: 16,
    fontWeight: 500,
  },

  desc: {
    '& p': {
      fontSize: 14,
      fontWeight: 400,

      '& span': {
        fontWeight: 500,
      },
    },
  },

  button: {
    width: 416,
    height: 48,
    border: '1px solid #000',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    cursor: 'pointer',
    userSelect: 'none',
    marginTop: 10,
  },

  btnSpan: {
    marginLeft: 10.5,
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    fontWeight: 500,
  },
}));
