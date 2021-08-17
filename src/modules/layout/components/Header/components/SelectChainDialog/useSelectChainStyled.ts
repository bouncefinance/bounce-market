import { makeStyles, Theme } from '@material-ui/core';

export const useSelectChainStyled = makeStyles<Theme>(theme => ({
  root: {
    maxWidth: 620,
    padding: theme.spacing(4, 2.5),
    borderRadius: 22,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 5),
    },
  },
  h1: {
    margin: '61px auto 48px',
    fontSize: 40,
  },
  cardWrapper: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 76,
  },
  cardItem: {
    width: 105,
    height: 153,
    boxSizing: 'border-box',
    padding: '20px 10px',
    borderRadius: 14,
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor:
        theme.palette.type === 'dark'
          ? 'rgba(243,243,243,0.05)'
          : 'rgba(0,0,0,.05)',
    },
  },
  textBox: {
    '&>h3': {
      lineHeight: '20.8px',
      display: 'line-block',
      marinTop: '12px',
      '& span': {
        fontSize: '12px',
        fontWeight: 500,
      },
    },
  },
}));
