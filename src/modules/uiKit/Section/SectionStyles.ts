import { makeStyles, Theme } from '@material-ui/core/styles';

const RADIUS_MOBILE = 5;
const RADIUS_DESKTOP = 7.5;
export const OFFSET_Y_MOBILE = 6;
export const OFFSET_Y_DESKTOP = 9;

export const useSectionStyles = makeStyles<Theme>(theme => ({
  section: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  },

  stackUp: {
    borderRadius: theme.spacing(RADIUS_MOBILE, RADIUS_MOBILE, 0, 0),
    marginTop: theme.spacing(-RADIUS_MOBILE),

    [theme.breakpoints.up('md')]: {
      borderRadius: theme.spacing(RADIUS_DESKTOP, RADIUS_DESKTOP, 0, 0),
      marginTop: theme.spacing(-RADIUS_DESKTOP),
    },
  },

  stackDown: {
    paddingBottom: theme.spacing(RADIUS_MOBILE + OFFSET_Y_MOBILE),

    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(RADIUS_DESKTOP + OFFSET_Y_DESKTOP),
    },
  },
}));
