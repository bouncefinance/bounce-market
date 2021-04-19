import { fade, makeStyles, Theme } from '@material-ui/core';
import {
  HEADER_HEIGHT_XL,
  HEADER_HEIGHT_XS,
} from 'modules/layout/components/Header/HeaderStyles';

const FOOTER_HEIGHT = 91;

export const useDetailsNFTStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,

    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 400px',
    },

    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: '1fr 505px',
    },
  },

  content: {
    [theme.breakpoints.up('lg')]: {
      position: 'sticky',
      top: 0,
      minHeight: `calc(100vh - ${HEADER_HEIGHT_XS + FOOTER_HEIGHT}px)`,
    },

    [theme.breakpoints.up('xl')]: {
      minHeight: `calc(100vh - ${HEADER_HEIGHT_XL + FOOTER_HEIGHT}px)`,
    },
  },

  descr: {
    [theme.breakpoints.up('lg')]: {
      borderLeft: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    },
  },
}));
