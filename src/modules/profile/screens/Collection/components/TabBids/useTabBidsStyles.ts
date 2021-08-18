import { makeStyles, Theme } from '@material-ui/core';

export const useTabBidsStyles = makeStyles<Theme>(
  theme => ({
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

    tab: {
      minWidth: 50,

      '&+&': {
        marginLeft: theme.spacing(0.5),
      },
    },
  }),
  { index: 2 },
);
