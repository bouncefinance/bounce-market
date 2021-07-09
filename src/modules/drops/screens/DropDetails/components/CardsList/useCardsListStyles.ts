import { makeStyles, Theme } from '@material-ui/core';

const SPACING_XS = 3;
const SPACING_MD = 5;

export const useCardsListStyles = makeStyles<Theme>(theme => ({
  row: {
    margin: theme.spacing(-SPACING_XS, -(SPACING_XS / 2), 0),
    width: `calc(100% + ${theme.spacing(SPACING_XS)}px)`,

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(-SPACING_MD, -(SPACING_MD / 2), 0),
      width: `calc(100% + ${theme.spacing(SPACING_MD)}px)`,
    },
  },

  col: {
    marginTop: theme.spacing(SPACING_XS),
    padding: theme.spacing(0, SPACING_XS / 2),

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(SPACING_MD),
      padding: theme.spacing(0, SPACING_MD / 2),
    },
  },
}));
