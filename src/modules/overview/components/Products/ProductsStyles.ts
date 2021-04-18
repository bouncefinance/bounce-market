import { makeStyles, Theme } from '@material-ui/core/styles';

export const useProductsStyles = makeStyles<Theme>(theme => ({
  select: {
    fontSize: 14,
    fontWeight: 700,
    color: theme.palette.text.secondary,
    borderRadius: 60,

    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: 'auto',
      fontSize: 16,
    },
  },

  moreBtn: {
    maxWidth: 245,
  },
}));
