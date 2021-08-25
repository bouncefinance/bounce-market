import { fade, makeStyles, Theme } from '@material-ui/core';
import { FOOTER_MIN_HEIGHT } from 'modules/layout/components/Footer/FooterStyles';
import {
  HEADER_HEIGHT_XL,
  HEADER_HEIGHT_XS,
} from 'modules/layout/components/Header/HeaderStyles';

export const useBuyNFTStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,

    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      alignItems: 'start',
      gridTemplateColumns: '1fr 400px',
    },

    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: '1fr 505px',
    },
  },

  imgContainer: {
    [theme.breakpoints.up('lg')]: {
      position: 'sticky',
      top: 0,
      minHeight: `calc(100vh - ${HEADER_HEIGHT_XS + FOOTER_MIN_HEIGHT}px)`,
    },

    [theme.breakpoints.up('xl')]: {
      minHeight: `calc(100vh - ${HEADER_HEIGHT_XL + FOOTER_MIN_HEIGHT}px)`,
    },
  },

  info: {
    [theme.breakpoints.up('lg')]: {
      alignSelf: 'stretch',
      borderLeft: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    },
  },

  ownerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  ownerBuy: {},
}));
