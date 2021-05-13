import { fade, makeStyles, Theme } from '@material-ui/core';
import { getEm } from 'modules/common/utils/styleUtils';

export const useInfoPricesStyles = makeStyles<Theme>(theme => ({
  bid: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    marginBottom: theme.spacing(1.5),
  },

  bidDevider: {
    display: 'inline-block',
    height: getEm(20, 14),
    width: 1,
    margin: theme.spacing(0, 1.5),
    background: fade(theme.palette.text.primary, 0.1),
  },

  cryptoPrice: {
    marginBottom: theme.spacing(1.5),
    fontSize: 28,
  },

  price: {
    fontWeight: 500,
    lineHeight: 1,
  },
}));
