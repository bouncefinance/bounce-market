import { fade, makeStyles, Theme } from '@material-ui/core';
import { getEm } from 'modules/common/utils/styleUtils';

export const useNFTDescriptionStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5.5, 0),
  },

  sections: {},

  section: {
    borderBottom: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    paddingTop: theme.spacing(3.5),
    paddingBottom: theme.spacing(3.5),

    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(5.5),
      paddingRight: theme.spacing(5.5),
    },

    '&:first-of-type': {
      paddingTop: 0,
    },

    '&:last-of-type': {
      borderBottom: 'none',
      paddingBottom: 0,
    },
  },

  title: {
    fontSize: 28,
  },

  copies: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 1.75),
    borderRadius: 8,
    background: '#F3F3F3',
    fontSize: 13,
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },

  copiesIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },

  hr: {
    border: `solid ${fade(theme.palette.text.primary, 0.1)}`,
    borderWidth: '1px 0 0',
  },

  description: {
    fontSize: 15,
  },

  textToggle: {
    height: 'auto',
    minWidth: 0,
    padding: theme.spacing(1, 0, 0),
    color: theme.palette.primary.main,
    transition: 'color 0.2s',

    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },

  bid: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    marginBottom: theme.spacing(1),
  },

  bidDevider: {
    display: 'inline-block',
    height: getEm(20, 14),
    width: 1,
    margin: theme.spacing(0, 1.5),
    background: fade(theme.palette.text.primary, 0.1),
  },

  cryptoPrice: {},

  price: {
    fontWeight: 500,
  },
}));
