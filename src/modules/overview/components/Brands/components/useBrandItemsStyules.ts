import { fade, Theme, makeStyles } from '@material-ui/core';

export const useBrandItemsStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: 35,
    width: '100%',
    overflow: 'hidden',
  },

  row: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },

  root: {
    position: 'relative',
    margin: theme.spacing(0, -3),
    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },

  slider: {
    padding: theme.spacing(0, 3),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      padding: 0,
    },
  },

  item: {
    position: 'relative',
    overflow: 'hidden',
  },

  slide: {
    [theme.breakpoints.down('sm')]: {
      width: 'auto !important',
    },
  },

  itemImgBox: {
    borderRadius: 8,
    width: 72,
    height: 72,
  },

  name: {
    fontSize: 22,
    lineHeight: '27px',
    fontWeight: 'bold',
    marginBottom: 2,
    width: '100%',
    maxWidth: 160,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  count: {
    color: fade(theme.palette.common.white, 0.5),
    fontWeight: 500,
    fontSize: 15,
    lineHeight: '18px',
  },

  brandImgWrap: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    marginRight: 16,
  },
}));
