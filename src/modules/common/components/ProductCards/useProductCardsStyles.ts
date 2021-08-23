import { makeStyles, Theme } from '@material-ui/core';
import { getPercentage } from 'modules/common/utils/styleUtils';

export const useProductCardsStyles = makeStyles<Theme>(theme => ({
  row: {
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2),
    marginTop: theme.spacing(-4),
    width: 'auto',

    [theme.breakpoints.up('HD')]: {
      marginLeft: theme.spacing(-1.25),
      marginRight: theme.spacing(-1.25),
      marginTop: theme.spacing(-2.5),
    },

    [theme.breakpoints.up('WXGAPlus')]: {
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
      marginTop: theme.spacing(-4),
    },
  },
  // colAllHover: {
  //   '&:hover > $col:not(:hover)': {
  //     // filter: 'brightness(0.7) saturate(0) contrast(1.1) blur(10px)',
  //     filter: 'brightness(0.8)  blur(1.5px)',
  //   },
  // },

  col: {
    // transition: 'filter 200ms linear, transform 200ms linear',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(4),

    [theme.breakpoints.up('HD')]: {
      flex: '0 0 auto',
      width: getPercentage(1, 5),
      paddingLeft: theme.spacing(1.25),
      paddingRight: theme.spacing(1.25),
      marginTop: theme.spacing(2.5),
    },

    [theme.breakpoints.up('WXGAPlus')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginTop: theme.spacing(4),
    },
  },
}));
